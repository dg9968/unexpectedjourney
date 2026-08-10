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
        <img src={destination.image} alt={`Campamento de verano en ${destination.name}`} style={{ objectPosition: destination.imagePosition ?? "center" }} />
        <div className="detail-overlay" />
        <div className="detail-hero-copy">
          <a href="/#destinos" className="back-link">← Todos los destinos</a>
          <span className="eyebrow eyebrow-light">{destination.eyebrow}</span>
          <h1>{destination.name}</h1>
          <p>{destination.summary}</p>
          <div className="detail-tags"><span>{destination.country}</span><span>{destination.ages}</span><span>{destination.duration}</span></div>
        </div>
      </section>

