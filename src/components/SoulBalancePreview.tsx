
import { useState } from 'react';
import '../styles/SoulBalancePreview.css';
import '../styles/ProjectPreview.css';
import SoulBalanceModal from './SoulBalanceModal';


const stacks = [
    'React Native (Expo)',
    'TypeScript',
    'Java (Spring Boot)',
    'CSS-In-JS',
    'Gemini 2.5 Flash'
];

export default function SoulBalancePreview() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className="projeto-card"
        onMouseEnter={e => e.currentTarget.classList.add('hover')}
        onMouseLeave={e => e.currentTarget.classList.remove('hover')}
        onClick={() => setOpen(true)}
      >
        <div className="projeto-nome">SoulBalance</div>
        <div className="projeto-stacks">
          {stacks.map(stack => (
            <span className="projeto-stack" key={stack}>{stack}</span>
          ))}
        </div>
        <button className="projeto-vermais">Ver mais</button>
      </div>
      {open && <SoulBalanceModal onClose={() => setOpen(false)} />}
    </>
  );
}
