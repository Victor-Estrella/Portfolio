import '../styles/ProjectModal.css';
import SoulBalance from '../assets/SoulBalance.png';
import gemini from '../assets/gemini.webp';

interface SoulBalanceModalProps {
  onClose: () => void;
}

const stackIcons = [
  { name: 'React Native (Expo)', icon: 'devicon-react-original colored'},
  { name: 'TypeScript', icon: 'devicon-typescript-plain colored'},
  { name: 'Java (Spring Boot)', icon: 'devicon-java-plain colored'},
  { name: 'CSS-In-JS', icon: 'devicon-css3-plain colored'},
  { name: 'Gemini 2.5 Flash', icon: { backgroundImage: `url(${gemini})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', width: '3rem', height: '3rem' } },
];

export default function SoulBalanceModal({ onClose }: SoulBalanceModalProps) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="modal-flex-row">
          <div className="modal-image-col">
            <img src={SoulBalance} alt="SoulBalance" className="modal-image-native" />
          </div>
          <div className="modal-info-col">
            <h2>SoulBalance</h2>
            <div className="modal-stacks">
              <div className="modal-stacks-label">
                <span>Stack:</span>
              </div>
              <div className="modal-stacks-icons">
                {stackIcons.map(stack => (
                  <div className="modal-stack-icon" key={stack.name}>
                    {typeof stack.icon === 'string' ? <i className={stack.icon}></i> : <div style={stack.icon}></div>}
                    <span>{stack.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <p>
             Aplicativo mobile que utiliza IA Generativa para promover autoconsciência, equilíbrio entre performance e bem-estar, e desenvolvimento humano personalizado. A plataforma atua como uma mentora digital, interpretando dados diários do usuário e gerando recomendações, análises e experiências de autocuidado.
            </p>
            <div className="modal-links">
              <a href="https://github.com/Victor-Estrella/SoulBalance-Mobile" target="_blank" rel="noopener noreferrer" className="modal-btn">GitHub</a>
              <button className="modal-btn" disabled style={{ opacity: 0.6, cursor: 'not-allowed' }}>Sem site disponível</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
