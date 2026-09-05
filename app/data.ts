export type CampSession = {
  id: string;
  label: string;
  startDate: string;
  endDate: string;
  // Omit priceAmount while the price is still TBD — the registration form falls back to "Precio por confirmar".
  priceAmount?: number;
  currency: string;
  priceNote?: string;
  capacity: number;
};

export type Destination = {
  slug: string;
  name: string;
  country: string;
  ages: string;
  eyebrow: string;
  summary: string;
  image: string;
  imagePosition?: string;
  duration: string;
  highlights: string[];
  included: string[];
  accent: string;
  sessions?: CampSession[];
};

export type ProgramStage = {
  title: string;
  description: string;
};

export type ProgramFact = {
  value: string;
  label: string;
};

export type SchoolProgram = {
  name: string;
  tagline: string;
  concept: string;
  facts: ProgramFact[];
  stages: ProgramStage[];
  included: string[];
};

export type School = {
  slug: string;
  name: string;
  city: string;
  intro: string;
  coordinator: string;
  featured: string[];
  image?: string;
  imagePosition?: string;
  program?: SchoolProgram;
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
    sessions: [
      {
        id: "montreal-2027-verano",
        label: "18 de julio – 1 de agosto",
        startDate: "2027-07-18",
        endDate: "2027-08-01",
        priceAmount: 5700,
        currency: "CAD",
        priceNote: "más boleto de avión",
        capacity: 30,
      },
    ],
  },
  {
    slug: "rancho-el-lucero",
    name: "Rancho El Lucero",
    country: "Estado de México",
    ages: "7–17 años",
    eyebrow: "Aventura en la naturaleza",
    summary: "Un campamento bilingüe de aventura para fortalecer la confianza, el liderazgo y el trabajo en equipo.",
    image: "/rancho-cabalgata.jpg",
    imagePosition: "center 18%",
    duration: "3, 5 o 7 días",
    highlights: ["Kayak, escalada y cabalgata", "Senderismo, lunada y deportes", "Cabañas separadas por género"],
    included: ["Alojamiento en cabañas", "Alimentos", "Vigilancia 24 horas", "Médicos y enfermeras en sitio", "Servicio de ambulancia", "Excursiones elegidas por la escuela"],
    accent: "green",
    sessions: [
      {
        // TODO: placeholder — confirm fecha calendario real antes de publicar (formato confirmado: Viernes–Domingo).
        // El retiro requiere un mínimo de 20 participantes para abrirse; el cupo máximo aún no está definido,
        // así que se deja alto a propósito para no bloquear registros mientras se confirma.
        // Precio de referencia $4,500 MXN, aún no confirmado — priceAmount se deja sin definir a propósito.
        id: "rancho-travesia-epica",
        label: "Travesía Épica: Retiro Aventura & Propósito · fecha por confirmar",
        startDate: "2027-01-01",
        endDate: "2027-01-03",
        currency: "MXN",
        priceNote: "grupo mínimo de 20 participantes",
        capacity: 100,
      },
    ],
  },
];

export const schools: School[] = [
  {
    slug: "univdep",
    name: "UNIVERSIDAD DEL DESARROLLO EMPRESARIAL Y PEDAGÓGICO (UNIVDEP)",
    city: "Ciudad de México",
    intro: "Un fin de semana que puede cambiar tu vida: bootcamp de liderazgo y aventura para su comunidad en Rancho El Lucero.",
    coordinator: "Equipo Unexpected Journey",
    featured: ["rancho-el-lucero"],
    image: "/univdep-bootcamp.jpg",
    program: {
      name: "Travesía Épica",
      tagline: "Retiro Aventura & Propósito",
      concept: "Un retiro de desarrollo personal para jóvenes en Rancho El Lucero, Acambay, Estado de México: un fin de semana diseñado para que descubran quiénes son, aprendan a colaborar con otros, desarrollen resiliencia ante los retos y despierten su liderazgo personal, a través de experiencias en la naturaleza, retos colaborativos y espacios de reflexión guiada. Salida desde CDMX el viernes, con regreso el domingo a las 12:00 pm.",
      facts: [
        { value: "Rancho El Lucero", label: "Sede" },
        { value: "Viernes – Domingo", label: "Duración" },
        { value: "Por confirmar", label: "Inversión" },
        { value: "20 personas", label: "Grupo mínimo" },
      ],
      stages: [
        {
          title: "Conectar y colaborar",
          description: "Autoconocimiento y trabajo en equipo: cada joven identifica su estilo dentro de un equipo y aprende a colaborar y comunicarse, comenzando con una plática de reflexión individual.",
        },
        {
          title: "Superar",
          description: "Resiliencia ante retos: aprender a enfrentar dificultades, adaptarse a cambios y desarrollar perseverancia a través de aventura y actividades guiadas.",
        },
        {
          title: "Liderar",
          description: "Descubrir su liderazgo personal: liderar desde el ejemplo, influir positivamente en otros y asumir responsabilidad personal, cerrando con un plan de acción concreto.",
        },
      ],
      included: [
        "Playera del campamento",
        "Mascada o pañoleta distintiva",
        "Cuaderno guía con actividades del retiro",
        "Materiales para las actividades",
        "Fotografías del evento como memorabilia",
        "Transporte redondo desde CDMX",
        "Hospedaje en habitaciones compartidas",
        "Alimentos durante toda la experiencia",
        "Excursión a zona arqueológica",
        "Actividades guiadas de reflexión y aventura",
        "Fogata y dinámicas nocturnas",
        "Acompañamiento de facilitadores expertos y staff de apoyo",
        "Protocolo de seguridad y atención básica",
      ],
    },
  },
];

export const getDestination = (slug: string) => destinations.find((item) => item.slug === slug);
export const getSchool = (slug: string) => schools.find((item) => item.slug === slug);
