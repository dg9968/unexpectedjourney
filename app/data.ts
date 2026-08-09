export type Destination = {
  slug: string;
  name: string;
  country: string;
  ages: string;
  eyebrow: string;
  summary: string;
  image: string;
  duration: string;
  highlights: string[];
  included: string[];
  accent: string;
};

export type School = {
  slug: string;
  name: string;
  city: string;
  intro: string;
  coordinator: string;
  featured: string[];
};

export const destinations: Destination[] = [
  {
    slug: "londres",
    name: "Londres",
    country: "Reino Unido",
    ages: "12–17 años",
    eyebrow: "Inglés en acción",
    summary: "Una experiencia residencial en el corazón de Londres para aprender inglés, explorar la ciudad y ganar independencia.",
    image: "/hero.avif",
    duration: "Programa de verano",
    highlights: ["Ramsay Hall · Universidad de Londres", "20 horas de inglés por semana", "Excursiones, deportes y cultura"],
    included: ["Vuelos con equipaje documentado", "Traslados aeropuerto–campamento", "Seguro médico", "Supervisión y seguridad 24/7", "Actividades y excursiones programadas"],
    accent: "coral",
  },
  {
    slug: "toronto",
    name: "Toronto",
    country: "Canadá",
    ages: "7–17 años",
    eyebrow: "Campus internacional",
    summary: "Cursos de inglés, vida universitaria y experiencias culturales en una de las ciudades más diversas del mundo.",
    image: "/toronto.webp",
    duration: "2 semanas",
    highlights: ["Universidad de Toronto", "Programas Kids y Teens", "Actividades y visitas culturales"],
    included: ["Alojamiento residencial", "Tres alimentos al día", "Clases de inglés", "Transporte local", "Seguro médico de emergencia", "Certificado de finalización"],
    accent: "blue",
  },
  {
    slug: "montreal",
    name: "Montreal",
    country: "Canadá",
    ages: "7–17 años",
    eyebrow: "Cultura y aprendizaje",
    summary: "Un verano bilingüe y multicultural con aprendizaje práctico, nuevas amistades y recorridos inolvidables.",
    image: "/montreal.webp",
    duration: "Programa residencial",
    highlights: ["Entorno bilingüe", "Clases y talleres interactivos", "Excursiones culturales"],
    included: ["Alojamiento y alimentos", "Programa académico", "Entradas a actividades", "Transporte local", "Supervisión continua", "Seguro médico de emergencia"],
    accent: "gold",
  },
  {
    slug: "rancho-el-lucero",
    name: "Rancho El Lucero",
    country: "Estado de México",
    ages: "7–17 años",
    eyebrow: "Aventura en la naturaleza",
    summary: "Un campamento bilingüe de aventura para fortalecer la confianza, el liderazgo y el trabajo en equipo.",
    image: "/camp-extra.webp",
    duration: "3, 5 o 7 días",
    highlights: ["Kayak, escalada y cabalgata", "Senderismo, lunada y deportes", "Cabañas separadas por género"],
    included: ["Alojamiento en cabañas", "Alimentos", "Vigilancia 24 horas", "Médicos y enfermeras en sitio", "Servicio de ambulancia", "Excursiones elegidas por la escuela"],
    accent: "green",
  },
];

export const schools: School[] = [
  {
    slug: "sierra-nevada",
    name: "Escuela Sierra Nevada",
    city: "Ciudad de México",
    intro: "Una invitación especial para que las familias de Sierra Nevada descubran programas de verano seguros, formativos e inolvidables.",
    coordinator: "Miss Mariana y Miss Angie",
    featured: ["londres", "toronto", "rancho-el-lucero"],
  },
  {
    slug: "thomas-jefferson",
    name: "Thomas Jefferson",
    city: "Ciudad de México",
    intro: "Experiencias internacionales y nacionales diseñadas para desarrollar idioma, autonomía y una mirada más amplia del mundo.",
    coordinator: "Equipo Unexpected Journey",
    featured: ["toronto", "montreal", "londres"],
  },
  {
    slug: "academia-maddox",
    name: "Academia Maddox",
    city: "Estado de México",
    intro: "Campamentos con acompañamiento cercano, aprendizaje real y aventuras que los estudiantes recordarán toda la vida.",
    coordinator: "Equipo Unexpected Journey",
    featured: ["rancho-el-lucero", "toronto", "montreal"],
  },
];

export const getDestination = (slug: string) => destinations.find((item) => item.slug === slug);
export const getSchool = (slug: string) => schools.find((item) => item.slug === slug);

