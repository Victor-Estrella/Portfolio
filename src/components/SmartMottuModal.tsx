import '../styles/ProjectModal.css';
import SmartMottu from '../assets/smartmottu.png';

interface SmartMottuModalProps {
  onClose: () => void;
}

const stackIcons = [
  { name: 'React Native (Expo)', icon: 'devicon-react-original colored'},
  { name: 'TypeScript', icon: 'devicon-typescript-plain colored'},
  { name: 'Java (Spring Boot)', icon: 'devicon-java-plain colored'},
  { name: 'CSS-In-JS', icon: 'devicon-css3-plain colored'},
];

export default function SmartMottuModal({ onClose }: SmartMottuModalProps) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="modal-flex-row">
          <div className="modal-image-col">
            <img src={SmartMottu} alt="SmartMottu" className="modal-image-native" />
          </div>
          <div className="modal-info-col">
            <h2>SmartMottu</h2>
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
              Aplicativo mobile criado para solucionar o principal problema interno da Mottu: a dificuldade de localizar motos nos pátios, especialmente quando não possuem placas ou quando o GPS está inativo. O app conta com um mapa interativo e integração futura com modelos de IA para reconhecimento visual, otimizando a rotina dos operadores.
            </p>
            <div className="modal-links">
              <a href="https://github.com/Victor-Estrella/SmartMottu-Mobile" target="_blank" rel="noopener noreferrer" className="modal-btn">GitHub</a>
              <button className="modal-btn" disabled style={{ opacity: 0.6, cursor: 'not-allowed' }}>Sem site disponível</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
