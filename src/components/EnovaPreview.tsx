import { useState } from 'react';
import ProjectModal from './EnovaModal';
import '../styles/ProjectPreview.css';

const stacks = [
  'Next.js',
  'Tailwind CSS',
  'Node.js',
  'Java ',
  'Python',
];

export default function ProjectPreview() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className="projeto-card"
        onMouseEnter={e => e.currentTarget.classList.add('hover')}
        onMouseLeave={e => e.currentTarget.classList.remove('hover')}
        onClick={() => setOpen(true)}
      >
        <div className="projeto-nome">Enova</div>
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
