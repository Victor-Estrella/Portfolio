import { useState } from 'react';
import '../styles/ProjectPreview.css';
import ProjectModal from './SmartMottuModal';

const stacks = [
  'React Native (Expo)',
  'TypeScript',
  'Java (Spring Boot)',
  'CSS-In-JS',
];

export default function SmartMottuPreview() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="projeto-card" onMouseEnter={e => e.currentTarget.classList.add('hover')} onMouseLeave={e => e.currentTarget.classList.remove('hover')} onClick={() => setOpen(true)}>
        <div className="projeto-nome">SmartMottu</div>
        <div className="projeto-stacks">
          {stacks.map(stack => (
            <span className="projeto-stack" key={stack}>{stack}</span>
          ))}
        </div>
        <button className="projeto-vermais">Ver mais</button>
      </div>
      {open && <ProjectModal onClose={() => setOpen(false)} />}
    </>
  );
}
