import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactBand, Footer, Header } from "../../components";
import { destinations, getDestination } from "../../data";

export function generateStaticParams() {
  return destinations.map(({ slug }) => ({ slug }));
}

export default async function DestinationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const destination = getDestination(slug);
  if (!destination) notFound();

  return (
    <main>
      <Header />
      <section className="detail-hero">
        <img src={destination.image} alt={`Campamento de verano en ${destination.name}`} />
        <div className="detail-overlay" />
        <div className="detail-hero-copy">
          <Link href="/#destinos" className="back-link">← Todos los destinos</Link>
          <span className="eyebrow eyebrow-light">{destination.eyebrow}</span>
          <h1>{destination.name}</h1>
          <p>{destination.summary}</p>
          <div className="detail-tags"><span>{destination.country}</span><span>{destination.ages}</span><span>{destination.duration}</span></div>
        </div>
      </section>

      <section className="detail-content">
        <div className="detail-intro">
          <span className="eyebrow">La experiencia</span>
          <h2>Aprender. Explorar.<br />Volver diferente.</h2>
        </div>
        <div className="detail-body">
          <p>Un programa pensado para que cada estudiante disfrute con libertad dentro de un entorno cuidado, con acompañamiento profesional y actividades que combinan aprendizaje, convivencia y aventura.</p>
          <div className="highlight-list">
            {destination.highlights.map((item, index) => <div key={item}><span>0{index + 1}</span><strong>{item}</strong></div>)}
          </div>
        </div>
      </section>

      <section className="included-section">
        <div><span className="eyebrow eyebrow-light">Todo lo esencial</span><h2>¿Qué incluye?</h2></div>
        <ul>{destination.included.map((item) => <li key={item}><span>✓</span>{item}</li>)}</ul>
      </section>
      <ContactBand title={`Tu aventura en ${destination.name} empieza aquí.`} />
      <Footer />
    </main>
  );
}

