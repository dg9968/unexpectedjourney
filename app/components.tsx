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

