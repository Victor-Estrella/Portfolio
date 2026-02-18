import './styles/App.css'
import 'devicon/devicon.min.css';
import TextType from '../Reactbits/TextType/TextType';
import Particles from '../Reactbits/Particles/Particles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

import EnovaPreview from './components/EnovaPreview';
import PortoSeguroPreview from './components/PortoSeguroPreview';
import SmartMottuPreview from './components/SmartMottuPreview';

import SafeHubPreview from './components/SafeHubPreview';
import SoulBalancePreview from './components/SoulBalancePreview';



function App() {
  // Handler para scroll suave sem alterar o hash na URL
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, sectionId: string) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="portfolio-container">
      <header>
        <nav className="header-nav">
          <a href="#home" onClick={e => handleNavClick(e, 'home')}>Home</a>
          <a href="#sobre" onClick={e => handleNavClick(e, 'sobre')}>Sobre mim</a>
          <a href="#skills" onClick={e => handleNavClick(e, 'skills')}>Skills</a>
          <a href="#projetos" onClick={e => handleNavClick(e, 'projetos')}>Projetos</a>
          <a href="#contato" onClick={e => handleNavClick(e, 'contato')}>Contato</a>
        </nav>
      </header>
      {/* Home */}
      <section className="home" id="home">
        <div style={{ width: '100%', height: '720px', position: 'relative' }}>
          <Particles particleColors={['#8a8686', '#8a8686']} particleCount={400} particleSpread={20} speed={0.1} particleBaseSize={100} moveParticlesOnHover={false} alphaParticles={true} disableRotation={false} />
        </div>
        <h1 className='home-titulo'>Olá, eu sou Victor Henrique Estrella Carracci</h1>
        <TextType text={["Desenvolvedor Full Stack | React | React Native | Spring Boot | TypeScript", "Construindo aplicações web e mobile com integração real entre front-end e back-end"]}
          typingSpeed={30} pauseDuration={1500} deletingSpeed={20} showCursor={true} cursorCharacter="|" className='home-subtitulo' 
        />
      </section>

      {/* Sobre Mim */}
      <section id="sobre" className="sobre-section">
        <h2 className='sobre-titulo'>Sobre Mim</h2>
        <p className='sobre-descricao'>
          Desenvolvedor Full Stack com foco em aplicações web e mobile utilizando React, React Native, TypeScript e Java com Spring Boot.
          Tenho experiência na construção de sistemas com integração completa entre front-end e back-end, consumo e criação de APIs REST, persistência de dados e arquitetura modular.
          Atuei em projetos envolvendo geolocalização, dashboards analíticos e integração com IA Generativa para recomendações personalizadas.
          Valorizo código limpo, boas práticas (SOLID, Clean Code) e desenvolvimento orientado à performance e escalabilidade.
        </p>

      </section>

      {/* Skills */}
      <section id="skills" className="skills-section">
        <h2 className='skills-titulo'>Skills</h2>
          <div className="skills-container-icons">
            <div className='skill-icon'>
              <p className='skill-texto'>HTML5</p>
              <i style={{ fontSize: '3rem' }} className="devicon-html5-plain" title="HTML5"></i>
            </div>
            <div className='skill-icon'>
              <p className='skill-texto'>CSS3</p>
              <i style={{ fontSize: '3rem' }} className="devicon-css3-plain" title="CSS3"></i>
            </div>
            <div className='skill-icon'>
              <p className='skill-texto'>JavaScript</p>
              <i style={{ fontSize: '3rem' }} className="devicon-javascript-plain" title="JavaScript"></i>
            </div>
            <div className='skill-icon'>
              <p className='skill-texto'>TypeScript</p>
              <i style={{ fontSize: '3rem' }} className="devicon-typescript-plain" title="TypeScript"></i>
            </div>
            <div className='skill-icon'>
              <p className='skill-texto'>React</p>
              <i style={{ fontSize: '3rem' }} className="devicon-react-original" title="React"></i>
            </div>
            <div className='skill-icon'>
              <p className='skill-texto'>Tailwind CSS</p>
              <i style={{ fontSize: '3rem' }} className="devicon-tailwindcss-plain" title="Tailwind CSS"></i>
            </div>
            <div className='skill-icon'>
              <p className='skill-texto'>React Native</p>
              <i style={{ fontSize: '3rem' }} className="devicon-react-original" title="React Native"></i>
            </div>
            <div className='skill-icon'>
              <p className='skill-texto'>Next.js</p>
              <i style={{ fontSize: '3rem' }} className="devicon-nextjs-plain" title="Next.js"></i>
            </div>
            <div className='skill-icon'>
              <p className='skill-texto'>Node.js</p>
              <i style={{ fontSize: '3rem' }} className="devicon-nodejs-plain" title="Node.js"></i>
            </div>
            <div className='skill-icon'>
              <p className='skill-texto'>Java</p>
              <i style={{ fontSize: '3rem' }} className="devicon-java-plain" title="Java"></i>
            </div>
            <div className='skill-icon'>
              <p className='skill-texto'>Python</p>
              <i style={{ fontSize: '3rem' }} className="devicon-python-plain" title="Python"></i>
            </div>
            <div className='skill-icon'>
              <p className='skill-texto'>SQL Developer</p>
              <i style={{ fontSize: '3rem' }} className="devicon-sqldeveloper-plain" title="SQL Developer"></i>
            </div>
            <div className='skill-icon'>
              <p className='skill-texto'>Git</p>
              <i style={{ fontSize: '3rem' }} className="devicon-git-plain" title="Git"></i>
            </div>
            <div className='skill-icon'>
              <p className='skill-texto'>Figma</p>
              <i style={{ fontSize: '3rem' }} className="devicon-figma-plain" title="Figma"></i>
            </div>
            <div className='skill-icon'>
              <p className='skill-texto'>Docker</p>
              <i style={{ fontSize: '3rem' }} className="devicon-docker-plain" title="Docker"></i>
            </div>
          </div>
      </section>

      {/* Projetos */}
      <section id="projetos" className="projetos-section">
        <h2 className='projetos-titulo'>Projetos</h2>
        <div className="projetos-cards-container">
          {/* Card Enova Global Solution */}
          <EnovaPreview />

          {/* Card Porto Seguro Challenge */}
          <PortoSeguroPreview/>
          
          {/* Card SmartMottu */}
          <SmartMottuPreview/>
          
          {/* Card SafeHu/b */}
          <SafeHubPreview/>
         
           {/* Card SoulBalance */}
           <SoulBalancePreview/>
        
        </div>
      </section>


      {/* Contato */}
      <section id="contato" className="contato-section">
        <h2 className="contato-titulo">Contato</h2>
        <p className="contato-descricao">
          Busco oportunidades como Desenvolvedor Full Stack Júnior para atuar em projetos reais. Também estou aberto a freelas e parcerias técnicas focadas em performance, escalabilidade e boas práticas.
        </p>
        <div className="contato-links">
          <a className="contato-link" href="mailto:victorhcarracci@gmail.com">
            <i className="devicon-google-plain" style={{ fontSize: '1.5em', color: '#EA4335' }}></i>
            Email
          </a>
          <a className="contato-link" href="https://www.linkedin.com/in/victorcarracci/" target="_blank" rel="noopener noreferrer">
            <i className="devicon-linkedin-plain" style={{ fontSize: '1.5em', color: '#0A66C2' }}></i>
            LinkedIn
          </a>
          <a className="contato-link" href="https://github.com/Victor-Estrella" target="_blank" rel="noopener noreferrer">
            <i className="devicon-github-original" style={{ fontSize: '1.5em', color: '#fff' }}></i>
            GitHub
          </a>
          <a className="contato-link" href="https://wa.me/5511971478515" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faWhatsapp} style={{ fontSize: '1.5em', color: '#25D366' }}/>
            WhatsApp
          </a>
        </div>
        <div className="contato-local">📍 São Paulo - SP</div>
      </section>

    </div>
  );
}

export default App
