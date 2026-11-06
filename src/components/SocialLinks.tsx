import { Mail } from 'lucide-react'

import { Github, Linkedin } from '@/components/icons'
import { cn } from '@/lib/utils'
import { profile } from '@/data/profile'

const links = [
  { key: 'github', label: 'GitHub', href: profile.contact.github, icon: Github, external: true },
  { key: 'linkedin', label: 'LinkedIn', href: profile.contact.linkedin, icon: Linkedin, external: true },
  { key: 'email', label: 'E-mail', href: `mailto:${profile.contact.email}`, icon: Mail, external: false },
] as const

type SocialKey = (typeof links)[number]['key']

interface SocialLinksProps {
  include?: SocialKey[]
  className?: string
  itemClassName?: string
  iconClassName?: string
}

export default function SocialLinks({
  include = ['github', 'linkedin'],
  className,
  itemClassName,
  iconClassName,
}: SocialLinksProps) {
  return (
    <div className={cn('flex items-center gap-1.5', className)}>
      {links
        .filter((link) => include.includes(link.key))
        .map((link) => (
          <a
            key={link.key}
            href={link.href}
            aria-label={link.label}
            title={link.label}
            {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className={cn(
              'grid size-9 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-foreground/[0.06] hover:text-foreground',
              itemClassName
            )}
          >
            <link.icon className={cn('size-4.5', iconClassName)} />
          </a>
        ))}
    </div>
  )
}
