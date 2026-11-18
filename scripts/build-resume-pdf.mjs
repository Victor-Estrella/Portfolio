/**
 * Gera os PDFs do currículo a partir de public/curriculo.html (fonte única).
 *
 *   npm run resume:pdf
 *
 * Usa o Chrome/Edge já instalado (headless). Para usar outro navegador:
 *   CHROME_PATH="caminho/do/chrome" npm run resume:pdf
 */
import { execFileSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const pub = path.join(root, 'public')
const source = path.join(pub, 'curriculo.html')

const candidates = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
].filter(Boolean)

const browser = candidates.find((p) => existsSync(p))
if (!browser) {
  console.error('Chrome/Edge não encontrado. Defina CHROME_PATH com o caminho do executável.')
  process.exit(1)
}

const outputs = [
  { lang: 'pt', file: 'curriculo-victor-carracci.pdf' },
  { lang: 'en', file: 'curriculo-victor-carracci-en.pdf' },
]

for (const { lang, file } of outputs) {
  const url = `${pathToFileURL(source).href}?lang=${lang}`
  const out = path.join(pub, file)
  execFileSync(
    browser,
    [
      '--headless=new',
      '--disable-gpu',
      '--no-pdf-header-footer',
      '--virtual-time-budget=10000',
      `--print-to-pdf=${out}`,
      url,
    ],
    { stdio: 'ignore' }
  )
  console.log(`✔ ${lang.toUpperCase()}  →  public/${file}`)
}
