import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactBand, Footer, Header } from "../../components";
import { destinations, getDestination } from "../../data";

const ranchoGallery = [
  { src: "/rancho-lodo.jpg", alt: "Jóvenes participando en una actividad recreativa con lodo", label: "Retos al aire libre" },
  { src: "/rancho-animales.jpg", alt: "Estudiantes aprendiendo sobre el cuidado de animales", label: "Contacto con animales" },
  { src: "/rancho-apiario.jpg", alt: "Colmenas del apiario en Rancho El Lucero", label: "Aprendizaje en la naturaleza" },
  { src: "/rancho-excursion.jpg", alt: "Grupo de campistas durante una excursión", label: "Excursiones en equipo" },
];

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

      {slug === "rancho-el-lucero" && (
        <section className="rancho-gallery-section">
          <div className="rancho-gallery-heading">
            <div>
              <span className="eyebrow">Así se vive El Lucero</span>
              <h2>Aventura de verdad,<br />recuerdos para siempre.</h2>
            </div>
            <p>Actividades que acercan a los estudiantes a la naturaleza, fortalecen la convivencia y convierten cada día en una historia que contar.</p>
          </div>
          <div className="rancho-gallery">
            {ranchoGallery.map((photo, index) => (
              <figure className={index === 0 ? "gallery-feature" : ""} key={photo.src}>
                <img src={photo.src} alt={photo.alt} loading="lazy" />
                <figcaption>{photo.label}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      <section className="included-section">
        <div><span className="eyebrow eyebrow-light">Todo lo esencial</span><h2>¿Qué incluye?</h2></div>
        <ul>{destination.included.map((item) => <li key={item}><span>✓</span>{item}</li>)}</ul>
      </section>
      <ContactBand title={`Tu aventura en ${destination.name} empieza aquí.`} />
      <Footer />
    </main>
  );
}
