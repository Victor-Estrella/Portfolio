import { useRef, useState, type FormEvent, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { AlertCircle, CheckCircle2, Loader2, Mail, Send } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { profile } from '@/data/profile'

type Status = 'idle' | 'sending' | 'success' | 'error'
type Field = 'name' | 'email' | 'company' | 'message'

const ERROR_MESSAGES: Record<string, string> = {
  rate_limited: 'Muitas tentativas em pouco tempo. Tente de novo em alguns minutos.',
  unavailable: 'O envio pelo formulário está indisponível no momento.',
  failed: 'Não consegui enviar agora.',
  invalid: 'Não consegui enviar agora.',
  forbidden: 'Não consegui enviar agora.',
}

const fieldClass =
  'w-full rounded-xl border border-input bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 transition-[border-color,box-shadow] outline-none focus:border-primary/60 focus:ring-[3px] focus:ring-ring/30 aria-[invalid=true]:border-destructive/60 disabled:opacity-60'

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<Field, string>>>({})
  // Momento em que o visitante começou a preencher (anti-robô, conferido no servidor)
  const startedAt = useRef<number>(0)

  const markStarted = () => {
    if (!startedAt.current) startedAt.current = Date.now()
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (status === 'sending') return

    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>

    setStatus('sending')
    setErrorMessage('')
    setFieldErrors({})

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, startedAt: startedAt.current || Date.now() }),
      })
      const result = (await response.json().catch(() => null)) as
        | { ok: true }
        | { ok: false; error: string; fields?: Partial<Record<Field, string>> }
        | null

      if (response.ok && result?.ok) {
        form.reset()
        startedAt.current = 0
        setStatus('success')
        return
      }

      if (result && !result.ok && result.error === 'validation' && result.fields) {
        setFieldErrors(result.fields)
        setStatus('idle')
        form.querySelector<HTMLElement>(`[name="${Object.keys(result.fields)[0]}"]`)?.focus()
        return
      }

      setErrorMessage(ERROR_MESSAGES[(result && !result.ok && result.error) || 'failed'] ?? ERROR_MESSAGES.failed)
      setStatus('error')
    } catch {
      setErrorMessage('Sem conexão com o servidor.')
      setStatus('error')
    }
  }

  const sending = status === 'sending'

  return (
    <div className="relative lg:border-l lg:border-border lg:pl-12">
      <AnimatePresence mode="wait" initial={false}>
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            role="status"
            className="flex h-full min-h-[22rem] flex-col items-start justify-center gap-4"
          >
            <span className="grid size-14 place-items-center rounded-2xl bg-success/12 text-success">
              <CheckCircle2 className="size-7" />
            </span>
            <h3 className="font-display text-2xl font-bold">Mensagem enviada!</h3>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              Obrigado pelo contato. Vou responder no e-mail que você informou o quanto antes.
            </p>
            <Button variant="outline" size="sm" onClick={() => setStatus('idle')}>
              Enviar outra mensagem
            </Button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onSubmit={handleSubmit}
            onFocus={markStarted}
            className="flex flex-col gap-4"
            aria-busy={sending}
          >
            <div>
              <h3 className="font-display text-xl font-bold">Envie uma mensagem</h3>
              <p className="mt-1 text-sm text-muted-foreground">Chega direto no meu e-mail — respondo por lá.</p>
            </div>

            {/* Honeypot: invisível para pessoas, preenchido por robôs */}
            <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden>
              <label>
                Site
                <input name="website" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <FieldLabel label="Nome" error={fieldErrors.name} id="contact-name">
                <input
                  id="contact-name"
                  name="name"
                  required
                  minLength={2}
                  maxLength={80}
                  autoComplete="name"
                  placeholder="Seu nome"
                  disabled={sending}
                  aria-invalid={!!fieldErrors.name}
                  aria-describedby={fieldErrors.name ? 'contact-name-error' : undefined}
                  className={fieldClass}
                />
              </FieldLabel>
              <FieldLabel label="E-mail" error={fieldErrors.email} id="contact-email">
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  maxLength={160}
                  autoComplete="email"
                  placeholder="voce@empresa.com"
                  disabled={sending}
                  aria-invalid={!!fieldErrors.email}
                  aria-describedby={fieldErrors.email ? 'contact-email-error' : undefined}
                  className={fieldClass}
                />
              </FieldLabel>
            </div>

            <FieldLabel label="Empresa" hint="opcional" error={fieldErrors.company} id="contact-company">
              <input
                id="contact-company"
                name="company"
                maxLength={100}
                autoComplete="organization"
                placeholder="Onde você trabalha"
                disabled={sending}
                aria-invalid={!!fieldErrors.company}
                className={fieldClass}
              />
            </FieldLabel>

            <FieldLabel label="Mensagem" error={fieldErrors.message} id="contact-message">
              <textarea
                id="contact-message"
                name="message"
                required
                minLength={10}
                maxLength={4000}
                rows={5}
                placeholder="Conte um pouco sobre a vaga ou o projeto…"
                disabled={sending}
                aria-invalid={!!fieldErrors.message}
                aria-describedby={fieldErrors.message ? 'contact-message-error' : undefined}
                className={cn(fieldClass, 'resize-none')}
              />
            </FieldLabel>

            {status === 'error' && (
              <div
                role="alert"
                className="flex items-start gap-2.5 rounded-xl border border-destructive/30 bg-destructive/8 px-4 py-3 text-sm"
              >
                <AlertCircle className="mt-0.5 size-4 shrink-0 text-destructive" />
                <p>
                  {errorMessage}{' '}
                  <a href={`mailto:${profile.contact.email}`} className="font-medium text-primary underline-offset-4 hover:underline">
                    Me escreva direto em {profile.contact.email}
                  </a>
                  .
                </p>
              </div>
            )}

            <Button type="submit" size="lg" variant="gradient" disabled={sending} className="mt-1 w-full sm:w-auto sm:self-start">
              {sending ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
              {sending ? 'Enviando…' : 'Enviar mensagem'}
            </Button>

            <p className="flex items-center gap-2 text-xs text-muted-foreground">
              <Mail className="size-3.5" />
              Seus dados são usados só para eu responder você.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}

function FieldLabel({
  id,
  label,
  hint,
  error,
  children,
}: {
  id: string
  label: string
  hint?: string
  error?: string
  children: ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-xs font-medium text-muted-foreground">
        {label}
        {hint && <span className="ml-1 font-normal text-muted-foreground/70">({hint})</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}
