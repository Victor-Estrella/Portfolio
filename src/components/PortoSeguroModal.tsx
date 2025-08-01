import '../styles/ProjectModal.css';
import PortoSeguro from '../assets/porto.png';

interface PortoSeguroModalProps {
    onClose: () => void;
}

const stackIcons = [
    { name: 'React.js', icon: 'devicon-react-original colored'},
    { name: 'Next.js', icon: 'devicon-nextjs-plain'},
    { name: 'Tailwind CSS', icon: 'devicon-tailwindcss-plain colored'},
    { name: 'TypeScript', icon: 'devicon-typescript-plain colored'},
    { name: 'Java', icon: 'devicon-java-plain colored'},
];

export default function PortoSeguroModal({ onClose }: PortoSeguroModalProps) {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>×</button>
                <div className="modal-flex-row">
                    <div className="modal-image-col">
                        <img src={PortoSeguro} alt="Porto Seguro" className="modal-image" />
                    </div>
                    <div className="modal-info-col">
                        <h2>Porto Seguro</h2>
                        <div className="modal-stacks">
                            <div className="modal-stacks-label">
                                <span>Stack:</span>
                            </div>
                            <div className="modal-stacks-icons">
                                {stackIcons.map(stack => (
                                <div className="modal-stack-icon" key={stack.name}>
                                    <i className={stack.icon}></i>
                                    <span>{stack.name}</span>
                                </div>
                                ))}
                            </div>
                        </div>
                    <p>
                        Desenvolvido como proposta de inovação para a Porto Seguro, esse projeto envolveu a construção de uma aplicação front-end com React e TypeScript, depois refatorada para Next.js. A solução consumia uma API Java e apresentava dados em tempo real, com foco em segurança e experiência do usuário.
                    </p>
                    <div className="modal-links">
                        <a href="https://github.com/Victor-Estrella/Porto-Seguro-Challenge" target="_blank" rel="noopener noreferrer" className="modal-btn">GitHub</a>
                        <a href="https://challengeporto.vercel.app" target="_blank" rel="noopener noreferrer" className="modal-btn">Site</a>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
}
