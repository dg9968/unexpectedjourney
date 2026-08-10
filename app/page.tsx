import Link from "next/link";
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
        </div>
        <div className="destination-grid">
          {destinations.map((destination) => <DestinationCard key={destination.slug} destination={destination} />)}
        </div>
      </section>

      <section className="trust-section" id="confianza">
        <div className="trust-collage">
          <img className="trust-main" src="/founder-mariana.webp" alt="Miss Mariana durante una excursión" />
          <img className="trust-small" src="/founder-angelica.webp" alt="Miss Angie" />
          <div className="stamp">Desde<br /><strong>1999</strong></div>
        </div>
        <div className="trust-copy">
          <span className="eyebrow">Nuestra historia</span>
          <h2>Un espíritu explorador que se convirtió en propósito.</h2>
          <p>Unexpected Journey nació del deseo de descubrir los tesoros de México y compartir experiencias transformadoras. Hoy, Miss Mariana y Miss Angie suman más de 25 años acompañando a niños y jóvenes con cuidado, experiencia y cercanía.</p>
          <blockquote>“Cada viaje abre la mente, fortalece la independencia y crea conexiones auténticas.”</blockquote>
          <div className="signature-row"><span>Mariana Jiménez</span><i /><span>Angélica Galindo</span></div>
        </div>
      </section>

      <section className="school-section" id="escuelas">
        <div className="school-copy">
          <span className="eyebrow eyebrow-light">Alianzas con escuelas</span>
          <h2>Los campamentos de sus sueños, hechos para su comunidad.</h2>
          <p>Diseñamos una experiencia y una página exclusiva para cada escuela, con programas recomendados, acompañamiento cercano y comunicación clara para las familias.</p>
          <a className="button button-light" href="mailto:paulina@unexpectedjourneymx.com?subject=Alianza%20con%20mi%20escuela">Quiero sumar a mi escuela</a>
        </div>
        <div className="school-list">
          {schools.map((school, index) => (
            <Link href={`/escuelas/${school.slug}`} key={school.slug}>
              <span>0{index + 1}</span><strong>{school.name}</strong><small>Ver página →</small>
            </Link>
          ))}
        </div>
      </section>

      <ContactBand />
      <Footer />
    </main>
  );
}
