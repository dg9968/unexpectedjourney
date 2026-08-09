import Link from "next/link";
import type { Destination } from "./data";

export function Header() {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="Unexpected Journey, inicio">
        <img src="/logo.webp" alt="" />
        <span><strong>Unexpected</strong> Journey</span>
      </Link>
      <nav aria-label="Navegación principal">
        <Link href="/#destinos">Destinos</Link>
        <Link href="/#confianza">Quiénes somos</Link>
        <Link href="/#escuelas">Para escuelas</Link>
      </nav>
      <a className="button button-small" href="https://wa.me/525573916896" target="_blank" rel="noreferrer">Hablar con una asesora</a>
    </header>
  );
}

export function Footer() {
  return (
    <footer>
      <div>
        <span className="footer-brand">Unexpected Journey</span>
        <p>Campamentos que abren el mundo.</p>
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
    <Link href={`/destinos/${destination.slug}`} className={`destination-card accent-${destination.accent}`}>
      <div className="card-media"><img src={destination.image} alt={`Campamento en ${destination.name}`} style={{ objectPosition: destination.imagePosition ?? "center" }} /></div>
      <div className="card-copy">
        <span className="eyebrow">{destination.country} · {destination.ages}</span>
        <h3>{destination.name}</h3>
        <p>{destination.summary}</p>
        <span className="text-link">Ver programa <span aria-hidden="true">↗</span></span>
      </div>
    </Link>
  );
}

export function ContactBand({ title = "¿Listos para dar el siguiente paso?", school }: { title?: string; school?: string }) {
  const message = encodeURIComponent(`Hola, quiero recibir información sobre los campamentos de Unexpected Journey${school ? ` para ${school}` : ""}.`);
  return (
    <section className="contact-band">
      <div>
        <span className="eyebrow eyebrow-light">Atención personal para cada familia</span>
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
