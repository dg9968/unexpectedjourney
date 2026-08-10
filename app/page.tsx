import { ContactBand, DestinationCard, Footer, Header } from "./components";
import { destinations, schools } from "./data";


export default function Home() {
  return (
    <main>
      <Header />
      <section className="hero">
        <div className="hero-backdrop" />
        <div className="hero-content">
          <span className="eyebrow eyebrow-light">Campamentos nacionales e internacionales · 7–17 años</span>
          <h1>Descubre tu mundo,<br /><em>vive aventuras infinitas.</em></h1>
          <p>Viajes transformadores para aprender, explorar nuevas culturas y volver a casa con una visión más amplia del mundo.</p>
          <div className="hero-actions">
            <a className="button button-light" href="#destinos">Explorar campamentos</a>
            <a className="quiet-link light" href="https://wa.me/525573916896" target="_blank" rel="noreferrer">Hablar con nosotros →</a>
          </div>
        </div>
        <div className="hero-note">
          <span>+25</span>
          <p>años acompañando<br />a niños y familias</p>
        </div>
      </section>


      <section className="intro-strip" aria-label="Valores de Unexpected Journey">
        <div><b>01</b><span>Entusiasmo</span></div>
        <div><b>02</b><span>Responsabilidad</span></div>
        <div><b>03</b><span>Confianza</span></div>
        <div><b>04</b><span>Honestidad</span></div>
      </section>


      <section className="section" id="destinos">
        <div className="section-heading">
          <div><span className="eyebrow">Explora · Desafía · Crece</span><h2>Campamentos nacionales e internacionales</h2></div>
          <p>Experiencias diseñadas para despertar la curiosidad, fortalecer la independencia y crear recuerdos que acompañan toda la vida.</p>
