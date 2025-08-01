import '../styles/ProjectModal.css';
import SafeHub from '../assets/safehub.png';

interface SafeHubModalProps {
  onClose: () => void;
}

const stackIcons = [
  { name: 'React Native (Expo)', icon: 'devicon-react-original colored'},
  { name: 'TypeScript', icon: 'devicon-typescript-plain colored'},
  { name: 'Java (Spring Boot)', icon: 'devicon-java-plain colored'},
  { name: 'CSS-In-JS', icon: 'devicon-css3-plain colored'},
];

export default function SafeHubModal({ onClose }: SafeHubModalProps) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="modal-flex-row">
          <div className="modal-image-col">
            <img src={SafeHub} alt="SafeHub" className="modal-image-native" />
          </div>
          <div className="modal-info-col">
            <h2>SafeHub</h2>
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
              Aplicativo desenvolvido para facilitar a gestão de abrigos emergenciais em situações de crise. Com funcionalidades como cadastro de abrigo, controle de estoque, dashboard, mapa com geolocalização e sistema de alertas por cor de pino (baseado na ocupação), o SafeHub ajuda na organização e monitoramento eficiente de recursos.
            </p>
            <div className="modal-links">
              <a href="https://github.com/Victor-Estrella/SafeHub-Mobile" target="_blank" rel="noopener noreferrer" className="modal-btn">GitHub</a>
              <button className="modal-btn" disabled style={{ opacity: 0.6, cursor: 'not-allowed' }}>Sem site disponível</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
