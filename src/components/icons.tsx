import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedinIn, faWhatsapp } from '@fortawesome/free-brands-svg-icons'

/**
 * O lucide-react v1 removeu os ícones de marca, então as marcas vêm do
 * Font Awesome com a mesma assinatura dos ícones lucide (`className`).
 */
type BrandIconProps = {
  className?: string
}

export function Github({ className }: BrandIconProps) {
  return <FontAwesomeIcon icon={faGithub} className={className} />
}

export function Linkedin({ className }: BrandIconProps) {
  return <FontAwesomeIcon icon={faLinkedinIn} className={className} />
}

export function Whatsapp({ className }: BrandIconProps) {
  return <FontAwesomeIcon icon={faWhatsapp} className={className} />
}
