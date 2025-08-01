import '../styles/ProjectModal.css';
import Enova from '../assets/enova.png';

interface ProjectModalProps {
  onClose: () => void;
}

const stackIcons = [
  { name: 'Next.js', icon: 'devicon-nextjs-plain'},
  { name: 'Tailwind CSS', icon: 'devicon-tailwindcss-plain colored'},
  { name: 'Node.js', icon: 'devicon-nodejs-plain colored'},
  { name: 'Java', icon: 'devicon-java-plain colored'},
  { name: 'Python', icon: 'devicon-python-plain colored'},
];

export default function ProjectModal({ onClose }: ProjectModalProps) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="modal-flex-row">
          <div className="modal-image-col">
            <img src={Enova} alt="Enova" className="modal-image" />
          </div>
          <div className="modal-info-col">
            <h2 className='modal-title'>Enova</h2>
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
              Solução desenvolvida para a Global Solutions da FIAP com foco em sustentabilidade e impacto social. O projeto integrou frontend em Next.js com backend em Java e APIs Python para análise e visualização de dados ambientais. Participação em time multidisciplinar com foco em automação e acessibilidade.
            </p>
            <div className="modal-links">
              <a href="https://github.com/Victor-Estrella/Enova" target="_blank" rel="noopener noreferrer" className="modal-btn">GitHub</a>
              <a href="https://enova-omega.vercel.app" target="_blank" rel="noopener noreferrer" className="modal-btn">Site</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
