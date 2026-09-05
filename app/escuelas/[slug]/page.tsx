import { notFound } from "next/navigation";
import { ContactBand, DestinationCard, Footer, Header } from "../../components";
import { destinations, getSchool, schools } from "../../data";

const defaultPromise = [
  { title: "Comunicación clara", description: "Información y seguimiento cercano para familias y escuela." },
  { title: "Seguridad primero", description: "Supervisión continua y proveedores cuidadosamente seleccionados." },
  { title: "Aprendizaje real", description: "Idioma, cultura, autonomía y nuevas habilidades para la vida." },
];

export function generateStaticParams() {
  return schools.map(({ slug }) => ({ slug }));
}

export default async function SchoolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const school = getSchool(slug);
  if (!school) notFound();
  const featured = school.featured.map((item) => destinations.find((destination) => destination.slug === item)).filter(Boolean);
  const promise = school.program?.stages ?? defaultPromise;
  const registrable = featured.find((destination) => destination && (destination.sessions?.length ?? 0) > 0);

  return (
    <main>
      <Header />
      <section className="school-hero">
        <div className="school-hero-art">
          <img
            src={school.image ?? "/camp-wide.webp"}
            alt={`Estudiantes de ${school.name} durante un campamento`}
            style={{ objectPosition: school.imagePosition ?? "center" }}
          />
        </div>
        <div className="school-hero-copy">
          <span className="eyebrow">Unexpected Journey × {school.name}</span>
          <h1>El mundo también<br />es un salón de clases.</h1>
          <p>{school.intro}</p>
          <div className="hero-actions">
            {registrable ? (
              <>
                <a className="button" href={`/registro?destino=${registrable.slug}`}>Regístrate</a>
                <a className="quiet-link" href="#programas">Conocer los programas</a>
              </>
            ) : (
              <a className="button" href="#programas">Conocer los programas</a>
            )}
          </div>
        </div>
      </section>
      <section className="school-welcome">
        <span>Una página exclusiva para</span>
        <strong>{school.name}</strong>
        <p>{school.city} · Atención: {school.coordinator}</p>
      </section>
      {school.program && (
        <section className="section">
          <div className="section-heading">
            <div><span className="eyebrow">{school.program.name}</span><h2>{school.program.tagline}</h2></div>
            <p>{school.program.concept}</p>
          </div>
          <div className="intro-strip" aria-label={`Datos del programa ${school.program.name}`}>
            {school.program.facts.map((fact) => (
              <div key={fact.label}><b>{fact.value}</b><span>{fact.label}</span></div>
            ))}
          </div>
          {registrable && (
            <a className="button" style={{ marginTop: "40px" }} href={`/registro?destino=${registrable.slug}`}>
              Inscribe a tu hijo(a)
            </a>
          )}
        </section>
      )}
      <section className="section" id="programas">
        <div className="section-heading">
          <div><span className="eyebrow">Selección para su comunidad</span><h2>Programas recomendados</h2></div>
          <p>Opciones nacionales e internacionales con diferentes edades, duraciones y enfoques de aprendizaje.</p>
        </div>
        <div className="destination-grid three-columns">
          {featured.map((destination) => destination && <DestinationCard key={destination.slug} destination={destination} />)}
        </div>
      </section>
      <section className="school-promise">
        {promise.map((item, index) => (
          <div key={item.title}><span>0{index + 1}</span><h3>{item.title}</h3><p>{item.description}</p></div>
        ))}
      </section>
      {school.program && (
        <section className="included-section">
          <div><span className="eyebrow eyebrow-light">Una experiencia completa</span><h2>¿Qué incluye?</h2></div>
          <ul>{school.program.included.map((item) => <li key={item}><span>✓</span>{item}</li>)}</ul>
        </section>
      )}
      <ContactBand title="Hablemos del verano que viene." school={school.name} />
      <Footer />
    </main>
  );
}

