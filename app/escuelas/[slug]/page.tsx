import { notFound } from "next/navigation";
import { ContactBand, DestinationCard, Footer, Header } from "../../components";
import { destinations, getSchool, schools } from "../../data";

export function generateStaticParams() {
  return schools.map(({ slug }) => ({ slug }));
}

export default async function SchoolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const school = getSchool(slug);
  if (!school) notFound();
  const featured = school.featured.map((item) => destinations.find((destination) => destination.slug === item)).filter(Boolean);

  return (
    <main>
      <Header />
      <section className="school-hero">
        <div className="school-hero-art"><img src="/camp-wide.webp" alt="Estudiantes durante un campamento internacional" /></div>
        <div className="school-hero-copy">
          <span className="eyebrow">Unexpected Journey × {school.name}</span>
          <h1>El mundo también<br />es un salón de clases.</h1>
          <p>{school.intro}</p>
          <a className="button" href="#programas">Conocer los programas</a>
        </div>
      </section>
      <section className="school-welcome">
        <span>Una página exclusiva para</span>
        <strong>{school.name}</strong>
        <p>{school.city} · Atención: {school.coordinator}</p>
      </section>
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
        <div><span>01</span><h3>Comunicación clara</h3><p>Información y seguimiento cercano para familias y escuela.</p></div>
        <div><span>02</span><h3>Seguridad primero</h3><p>Supervisión continua y proveedores cuidadosamente seleccionados.</p></div>
        <div><span>03</span><h3>Aprendizaje real</h3><p>Idioma, cultura, autonomía y nuevas habilidades para la vida.</p></div>
      </section>
      <ContactBand title="Hablemos del verano que viene." school={school.name} />
      <Footer />
    </main>
  );
}

