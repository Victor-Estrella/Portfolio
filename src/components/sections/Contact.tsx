import { useState } from 'react'
import { motion } from 'motion/react'
import { ArrowUpRight, Check, Copy, Download, MapPin } from 'lucide-react'

import AuroraBackground from '@/components/AuroraBackground'
import ContactForm from '@/components/contact/ContactForm'
import { Github, Linkedin, Whatsapp } from '@/components/icons'
import SectionHeading from '@/components/sections/SectionHeading'
import { Button, buttonVariants } from '@/components/ui/button'
import { profile } from '@/data/profile'
import AnimatedContent from '@reactbits/AnimatedContent/AnimatedContent'
import SpotlightCard from '@reactbits/SpotlightCard/SpotlightCard'

const channels = [
  {
    key: 'linkedin',
    label: 'LinkedIn',
    value: `/in/${profile.contact.linkedinHandle}`,
    href: profile.contact.linkedin,
    icon: Linkedin,
    external: true,
  },
  {
    key: 'github',
    label: 'GitHub',
    value: `/${profile.contact.githubHandle}`,
    href: profile.contact.github,
    icon: Github,
    external: true,
  },
  {
    key: 'whatsapp',
    label: 'WhatsApp',
    value: profile.contact.whatsappLabel,
    href: profile.contact.whatsapp,
    icon: Whatsapp,
    external: true,
  },
] as const

export default function Contact() {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.contact.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard indisponível — o link mailto continua funcionando */
    }
  }

  return (
    <section id="contato" className="relative overflow-hidden px-4 py-24 sm:py-32">
      <AuroraBackground variant="bottom" />

      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          index="05"
          eyebrow="Contato"
          align="center"
          title={
            <>
              Vamos conversar sobre a <span className="accent-serif text-[1.08em]">próxima oportunidade?</span>
            </>
          }
          description="Busco vagas de Desenvolvedor Front-End ou Mobile Júnior. Se você é recrutador(a) ou faz parte de um time de produto, fale comigo pelo canal que preferir."
        />

        <AnimatedContent distance={50} duration={0.8} className="mt-12 sm:mt-14">
          <SpotlightCard
            className="surface rounded-3xl p-5 sm:p-8 lg:p-10"
            spotlightColor="color-mix(in oklch, var(--accent) 14%, transparent)"
          >
            <div className="relative z-2 grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-12">
              {/* Canais diretos */}
              <div className="flex flex-col gap-6">
                <div>
                  {profile.available && (
                    <span className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] text-success uppercase">
                      <span className="size-1.5 rounded-full bg-success" />
                      {profile.availability}
                    </span>
                  )}
                  <h3 className="mt-3 font-display text-2xl leading-tight font-bold text-balance sm:text-3xl">
                    O caminho mais rápido é o e-mail
                  </h3>
                  <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="size-4 text-primary" />
                    {profile.location}
                  </p>
                </div>

                {/* E-mail em destaque */}
                <div className="rounded-2xl border border-border bg-foreground/[0.03] p-4">
                  <p className="text-xs text-muted-foreground">E-mail</p>
                  <a
                    href={`mailto:${profile.contact.email}`}
                    className="mt-1 block truncate font-display text-lg font-semibold transition-colors hover:text-primary sm:text-xl"
                  >
                    {profile.contact.email}
                  </a>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Button size="sm" variant="outline" onClick={copyEmail} aria-live="polite">
                      {copied ? <Check className="size-3.5 text-success" /> : <Copy className="size-3.5" />}
                      {copied ? 'E-mail copiado!' : 'Copiar e-mail'}
                    </Button>
                    <a
                      href={profile.resumeUrl}
                      download={profile.resumeFileName}
                      className={buttonVariants({ size: 'sm', variant: 'ghost' })}
                    >
                      <Download className="size-3.5" />
                      Currículo (PDF)
                    </a>
                  </div>
                </div>

                <ul className="flex flex-col gap-2.5">
                  {channels.map((channel, i) => (
                    <motion.li
                      key={channel.key}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.08 }}
                    >
                      <a
                        href={channel.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-3.5 rounded-2xl border border-border bg-card/40 px-4 py-3 ink-hover hover:bg-card"
                      >
                        <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-border bg-foreground/[0.03]">
                          <channel.icon className="size-4.5" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-xs text-muted-foreground">{channel.label}</span>
                          <span className="block truncate text-sm font-medium">{channel.value}</span>
                        </span>
                        <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Formulário */}
              <ContactForm />
            </div>
          </SpotlightCard>
        </AnimatedContent>
      </div>
    </section>
  )
}
