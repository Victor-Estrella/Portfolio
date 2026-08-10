import { useState } from 'react'
import { motion } from 'motion/react'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ArrowUpRight, Check, Copy, Mail, MapPin } from 'lucide-react'

import { Github, Linkedin } from '@/components/icons'

import SectionHeading from '@/components/sections/SectionHeading'
import { Button } from '@/components/ui/button'
import { profile } from '@/data/profile'
import AnimatedContent from '@reactbits/AnimatedContent/AnimatedContent'
import SpotlightCard from '@reactbits/SpotlightCard/SpotlightCard'

const channels = [
  {
    key: 'email',
    label: 'Email',
    value: profile.contact.email,
    href: `mailto:${profile.contact.email}`,
    icon: Mail,
    accent: 'text-rose-400',
  },
  {
    key: 'linkedin',
    label: 'LinkedIn',
    value: '/in/victorcarracci',
    href: profile.contact.linkedin,
    icon: Linkedin,
    accent: 'text-sky-400',
  },
  {
    key: 'github',
    label: 'GitHub',
    value: '/Victor-Estrella',
    href: profile.contact.github,
    icon: Github,
    accent: 'text-foreground',
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
    <section id="contato" className="relative scroll-mt-24 px-4 py-24 sm:py-32">
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 size-[36rem] -translate-x-1/2 rounded-full bg-accent/10 blur-[160px]"
        aria-hidden
      />

      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Contato"
          title="Vamos construir algo juntos?"
          description="Busco oportunidades como Desenvolvedor Full Stack Júnior e estou aberto a freelas e parcerias técnicas focadas em performance, escalabilidade e boas práticas."
        />

        <AnimatedContent distance={50} duration={0.8} className="mt-14">
          <SpotlightCard
            className="rounded-3xl border border-white/7 bg-card/50 p-7 backdrop-blur-sm sm:p-10"
            spotlightColor="rgba(167, 139, 250, 0.18)"
          >
            <div className="relative z-2 grid gap-8 md:grid-cols-[1.1fr_1fr]">
              {/* CTA principal */}
              <div className="flex flex-col justify-between gap-6">
                <div>
                  <p className="font-mono text-[11px] tracking-[0.18em] text-primary uppercase">
                    Resposta em até 24h
                  </p>
                  <h3 className="mt-3 font-display text-2xl leading-tight font-bold text-balance sm:text-3xl">
                    Me chama no WhatsApp ou manda um e-mail
                  </h3>
                  <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="size-4 text-primary" />
                    {profile.location}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  <Button
                    size="lg"
                    variant="gradient"
                    onClick={() => window.open(profile.contact.whatsapp, '_blank', 'noopener,noreferrer')}
                  >
                    <FontAwesomeIcon icon={faWhatsapp} className="size-4" />
                    WhatsApp
                  </Button>
                  <Button size="lg" variant="outline" onClick={copyEmail}>
                    {copied ? <Check className="size-4 text-emerald-400" /> : <Copy className="size-4" />}
                    {copied ? 'Email copiado!' : 'Copiar email'}
                  </Button>
                </div>
              </div>

              {/* Canais */}
              <div className="flex flex-col gap-2.5">
                {channels.map((channel, i) => (
                  <motion.a
                    key={channel.key}
                    href={channel.href}
                    target={channel.key === 'email' ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="group flex items-center gap-3.5 rounded-2xl border border-white/7 bg-white/2 px-4 py-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-white/6"
                  >
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-white/7 bg-white/3">
                      <channel.icon className={`size-4.5 ${channel.accent}`} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-xs text-muted-foreground">{channel.label}</span>
                      <span className="block truncate text-sm font-medium">{channel.value}</span>
                    </span>
                    <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
                  </motion.a>
                ))}
              </div>
            </div>
          </SpotlightCard>
        </AnimatedContent>
      </div>
    </section>
  )
}
