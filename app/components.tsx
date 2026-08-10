import type { Destination } from "./data";

export function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="/" aria-label="Unexpected Journey, inicio">
        <img src="/brand-lockup.jpg" alt="Unexpected Journey" />
      </a>
      <nav aria-label="Navegación principal">
        <a href="/#destinos">Destinos</a>
        <a href="/#confianza">Nuestra historia</a>
        <a href="/#escuelas">Para escuelas</a>
      </nav>
      <a className="button button-small" href="https://wa.me/525573916896" target="_blank" rel="noreferrer">Hablar con una asesora</a>
    </header>
  );
}

export function Footer() {
  return (
    <footer>
      <div>
        <img className="footer-lockup" src="/brand-lockup.jpg" alt="Unexpected Journey" />
        <p>Descubre tu mundo, vive aventuras infinitas.</p>
      </div>
      <div className="footer-links">
        <a href="mailto:angie@unexpectedjourneymx.com">angie@unexpectedjourneymx.com</a>
        <a href="tel:+525573916896">+52 55 7391 6896</a>
        <a href="https://www.instagram.com/campamentosunexpectedjourney" target="_blank" rel="noreferrer">Instagram</a>
      </div>
      <p className="legal">© 2026 Unexpected Journey</p>
    </footer>
  );
}

export function DestinationCard({ destination }: { destination: Destination }) {
  return (
    <a href={`/destinos/${destination.slug}`} className={`destination-card accent-${destination.accent}`}>
      <div className="card-media"><img src={destination.image} alt={`Campamento en ${destination.name}`} style={{ objectPosition: destination.imagePosition ?? "center" }} /></div>
      <div className="card-copy">
        <span className="eyebrow">{destination.country} · {destination.ages}</span>
        <h3>{destination.name}</h3>
        <p>{destination.summary}</p>
        <span className="text-link">Ver programa <span aria-hidden="true">↗</span></span>
      </div>
    </a>
  );
}

export function ContactBand({ title = "Tu próxima historia empieza aquí.", school }: { title?: string; school?: string }) {
  const message = encodeURIComponent(`Hola, quiero recibir información sobre los campamentos de Unexpected Journey${school ? ` para ${school}` : ""}.`);
  return (
    <section className="contact-band">
      <div>
        <span className="eyebrow eyebrow-light">Confianza en cada paso</span>
        <h2>{title}</h2>
        <p>Cuéntanos la edad de tu hijo y el destino que le interesa. Te ayudaremos a elegir el programa ideal.</p>
      </div>
      <div className="contact-actions">
        <a className="button button-light" href={`https://wa.me/525573916896?text=${message}`} target="_blank" rel="noreferrer">Escribir por WhatsApp</a>
        <a className="quiet-link" href="mailto:angie@unexpectedjourneymx.com">Enviar correo →</a>
      </div>
    </section>
  );
}
