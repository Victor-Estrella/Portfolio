import type { CSSProperties, ReactNode } from 'react'
import './GradientText.css'

interface GradientTextProps {
  children: ReactNode
  className?: string
  colors?: string[]
  animationSpeed?: number
  showBorder?: boolean
}

export default function GradientText({
  children,
  className = '',
  colors = ['#38bdf8', '#a78bfa', '#38bdf8'],
  animationSpeed = 8,
  showBorder = false,
}: GradientTextProps) {
  const gradientStyle: CSSProperties = {
    backgroundImage: `linear-gradient(to right, ${colors.join(', ')})`,
    animationDuration: `${animationSpeed}s`,
  }

  return (
    <span className={`animated-gradient-text ${className}`}>
      {showBorder && <span className="gradient-overlay" style={gradientStyle} />}
      <span className="text-content" style={gradientStyle}>
        {children}
      </span>
    </span>
  )
}
