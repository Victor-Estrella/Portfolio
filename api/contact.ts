/**
 * POST /api/contact — Vercel Function que envia o formulário do portfólio por e-mail via Resend.
 *
 * Variáveis de ambiente (Vercel → Settings → Environment Variables; localmente em `.env.local`):
 *   RESEND_API_KEY      obrigatória — chave da API do Resend (re_...)
 *   CONTACT_TO_EMAIL    destino das mensagens (padrão: victorhcarracci@gmail.com)
 *   CONTACT_FROM_EMAIL  remetente; precisa ser de um domínio verificado no Resend.
 *                       Sem domínio, use "Portfólio <onboarding@resend.dev>" — nesse modo o Resend
 *                       só entrega para o e-mail dono da conta.
 *
 * Arquivo autocontido de propósito (sem imports locais) para rodar igual na Vercel e no `npm run dev`.
 */

const DEFAULT_TO = 'victorhcarracci@gmail.com'
const DEFAULT_FROM = 'Portfólio <onboarding@resend.dev>'

const LIMITS = {
  name: { min: 2, max: 80 },
  company: { max: 100 },
  email: { max: 160 },
  message: { min: 10, max: 4000 },
}
const MAX_BODY_CHARS = 12_000
/** Formulários preenchidos mais rápido que isso são quase sempre robôs. */
const MIN_FILL_MS = 2_500

/* Limite simples por IP, em memória. Em serverless cada instância tem a própria memória,
   então é uma proteção básica (somada ao honeypot e ao tempo mínimo de preenchimento). */
const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 5
const hits = new Map<string, number[]>()

function rateLimited(ip: string, now: number) {
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  if (hits.size > 5000) {
    for (const [key, times] of hits) if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key)
  }
  return recent.length > MAX_PER_WINDOW
}

type ErrorCode = 'invalid' | 'validation' | 'rate_limited' | 'forbidden' | 'unavailable' | 'failed'

function json(body: { ok: true } | { ok: false; error: ErrorCode; fields?: Record<string, string> }, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  })
}

const clean = (value: unknown, max: number) =>
  typeof value === 'string' ? value.replace(/\s+/g, ' ').trim().slice(0, max + 1) : ''

const cleanMultiline = (value: unknown, max: number) =>
  typeof value === 'string'
    ? value.replace(/\r\n?/g, '\n').replace(/\n{3,}/g, '\n\n').trim().slice(0, max + 1)
    : ''

const escapeHtml = (text: string) =>
  text.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!)

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export async function POST(request: Request): Promise<Response> {
  const apiKey = process.env.RESEND_API_KEY?.trim()
  if (!apiKey) return json({ ok: false, error: 'unavailable' }, 503)

  // Só aceita chamadas do próprio site
  const origin = request.headers.get('origin')
  const host = request.headers.get('x-forwarded-host') ?? request.headers.get('host')
  if (origin) {
    let sameOrigin = false
    try {
      sameOrigin = new URL(origin).host === host
    } catch {
      /* origin inválido */
    }
    if (!sameOrigin) return json({ ok: false, error: 'forbidden' }, 403)
  }
  if (!request.headers.get('content-type')?.includes('application/json')) {
    return json({ ok: false, error: 'invalid' }, 415)
  }

  const now = Date.now()
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'desconhecido'
  if (rateLimited(ip, now)) return json({ ok: false, error: 'rate_limited' }, 429)

  let body: Record<string, unknown>
  try {
    const text = await request.text()
    if (text.length > MAX_BODY_CHARS) return json({ ok: false, error: 'invalid' }, 413)
    const parsed: unknown = JSON.parse(text)
    if (typeof parsed !== 'object' || parsed === null) throw new Error('corpo inválido')
    body = parsed as Record<string, unknown>
  } catch {
    return json({ ok: false, error: 'invalid' }, 400)
  }

  // Honeypot preenchido → robô. Responde "ok" para não ensinar o robô a contornar.
  if (typeof body.website === 'string' && body.website.trim() !== '') return json({ ok: true }, 200)

  const elapsed = now - Number(body.startedAt)
  if (!Number.isFinite(elapsed) || elapsed < MIN_FILL_MS || elapsed > 24 * 60 * 60 * 1000) {
    return json({ ok: false, error: 'invalid' }, 400)
  }

  const name = clean(body.name, LIMITS.name.max)
  const company = clean(body.company, LIMITS.company.max)
  const email = clean(body.email, LIMITS.email.max).toLowerCase()
  const message = cleanMultiline(body.message, LIMITS.message.max)

  const fields: Record<string, string> = {}
  if (name.length < LIMITS.name.min || name.length > LIMITS.name.max) fields.name = 'Informe seu nome.'
  if (!EMAIL_RE.test(email) || email.length > LIMITS.email.max) fields.email = 'Informe um e-mail válido.'
  if (company.length > LIMITS.company.max) fields.company = 'Nome da empresa muito longo.'
  if (message.length < LIMITS.message.min) fields.message = 'Escreva uma mensagem um pouco maior.'
  if (message.length > LIMITS.message.max) fields.message = 'Mensagem muito longa.'
  if (Object.keys(fields).length > 0) return json({ ok: false, error: 'validation', fields }, 422)

  const subject = `Portfólio · ${name}${company ? ` (${company})` : ''}`
  const text = [`Nome: ${name}`, company && `Empresa: ${company}`, `E-mail: ${email}`, '', message]
    .filter((line) => line !== '')
    .join('\n')
  const html = `
    <div style="font-family:system-ui,-apple-system,sans-serif;max-width:560px;color:#111">
      <p style="margin:0 0 4px;font-size:12px;color:#666;text-transform:uppercase;letter-spacing:.08em">Nova mensagem pelo portfólio</p>
      <h2 style="margin:0 0 16px;font-size:20px">${escapeHtml(name)}${company ? ` <span style="color:#666;font-weight:400">· ${escapeHtml(company)}</span>` : ''}</h2>
      <p style="margin:0 0 16px"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
      <div style="white-space:pre-wrap;line-height:1.6;padding:16px;border-radius:12px;background:#f5f6f8">${escapeHtml(message)}</div>
      <p style="margin:16px 0 0;font-size:12px;color:#888">Responda este e-mail para falar direto com ${escapeHtml(name)}.</p>
    </div>`

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL?.trim() || DEFAULT_FROM,
        to: [process.env.CONTACT_TO_EMAIL?.trim() || DEFAULT_TO],
        reply_to: email,
        subject,
        text,
        html,
      }),
      signal: AbortSignal.timeout(10_000),
    })
    // Só o status no log: o corpo pode ecoar dados pessoais.
    if (!response.ok) throw new Error(`Resend respondeu ${response.status}`)
  } catch (error) {
    console.error('[contact] falha ao enviar:', error instanceof Error ? error.message : 'erro desconhecido')
    return json({ ok: false, error: 'failed' }, 502)
  }

  return json({ ok: true }, 200)
}
