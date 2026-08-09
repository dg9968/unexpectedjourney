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
          <h1>Un verano que les cambia <em>la mirada.</em></h1>
          <p>Experiencias seguras y formativas para aprender idiomas, descubrir nuevas culturas y crecer con independencia.</p>
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

      <section className="intro-strip" aria-label="Ventajas del programa">
        <div><b>01</b><span>Supervisión<br />especializada</span></div>
        <div><b>02</b><span>Inmersión<br />en el idioma</span></div>
        <div><b>03</b><span>Cultura, aventura<br />y comunidad</span></div>
        <div><b>04</b><span>Acompañamiento<br />de principio a fin</span></div>
      </section>

      <section className="section" id="destinos">
        <div className="section-heading">
          <div><span className="eyebrow">Verano 2026</span><h2>Elige su próxima aventura</h2></div>
          <p>Cada programa combina aprendizaje, acompañamiento profesional y experiencias que fortalecen la confianza.</p>
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
          <span className="eyebrow">Experiencia que da tranquilidad</span>
          <h2>Maestras de vocación.<br />Viajeras de corazón.</h2>
          <p>Miss Mariana y Miss Angie han dedicado más de 25 años a la educación y al cuidado de niños. Conocen lo que una familia necesita para sentirse tranquila y lo que un estudiante necesita para crecer.</p>
          <blockquote>“No organizamos solamente un viaje. Creamos el espacio para que cada niño descubra de lo que es capaz.”</blockquote>
          <div className="signature-row"><span>Mariana Jiménez</span><i /><span>Angélica Galindo</span></div>
        </div>
      </section>

      <section className="school-section" id="escuelas">
        <div className="school-copy">
          <span className="eyebrow eyebrow-light">Alianzas con escuelas</span>
          <h2>Una experiencia hecha para tu comunidad escolar.</h2>
          <p>Creamos una página informativa exclusiva para cada escuela, con sus programas recomendados, contacto dedicado y mensaje institucional.</p>
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

