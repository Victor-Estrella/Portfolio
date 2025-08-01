import { useState } from 'react';
import '../styles/ProjectPreview.css';
import PortoSeguroModal from './PortoSeguroModal';

const stacks = [
    'React.js',
    'Next.js',
    'Tailwind CSS',
    'TypeScript',
    'Java'
];

export default function PortoSeguroPreview() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <div className="projeto-card" onMouseEnter={e => e.currentTarget.classList.add('hover')} onMouseLeave={e => e.currentTarget.classList.remove('hover')} onClick={() => setOpen(true)}>
                <div className="projeto-nome">Porto Seguro</div>
                    <div className="projeto-stacks">
                        {stacks.map(stack => (
                            <span className="projeto-stack" key={stack}>{stack}</span>
                        ))}
                    </div>
                    <button className="projeto-vermais">Ver mais</button>
                </div>
            {open && <PortoSeguroModal onClose={() => setOpen(false)} />}
        </>
    );
}
