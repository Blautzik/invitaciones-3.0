import { ProjectData } from './types';

// Mock data simulating a database response
const mockProjectData: ProjectData = {
  title: "Agus Quince Años",
  heroImage: {
    src: "/images/campaign-1.jpg",
    alt: "Agus Quince años"
  },
  name:"Agus",
  date:"01/12/2025", 
  time:"21:30",
  fraseRegalos: "Si queres regalarme algo más que tu hermosa presencia...",
  alias:"ALIAS.ALIAS.EJEMPLO",
  titular:"Nombre Apellido",
  cbu:"0000000000000000000",
  dni:"50213212",
  formId:"ajajakaskkadskdamsdasdkaskd",
  description: "Te espero para compartir la alegría de esta día inolvidable y único",
  verticalTitles: {
    left: "AÑOS",
    right: "QUINCE"
  },
  credits: [
    { label: "Fecha", value: "01/12/2025" },
    { label: "Hora", value: "21:30" },
    { label: "Salón", value: "Palacio Sans Soucí" },
    { label: "Dirección", value: "Paz 705, Victoria, Bs As" },
    { label: "Ubicación", value: "Ver en maps" },
    { label: "Dress code", value: "Elegante" },
  ],
  galleryImages: [
    { src: "/images/campaign-1.jpg", alt: "Chantal for FifthHouse 1" },
    { src: "/images/campaign-2.jpg", alt: "Chantal for FifthHouse 2" },
    { src: "/images/campaign-3.jpg", alt: "Chantal for FifthHouse 3" },
    { src: "/images/campaign-4.jpg", alt: "Chantal for FifthHouse 4" },
    { src: "/images/campaign-5.jpg", alt: "Chantal for FifthHouse 5" },
    { src: "/images/campaign-6.jpg", alt: "Chantal for FifthHouse 6" }
  ],
  nextProject: {
    title: "Palacio Sans Souci",
    subtitle: ""
  },
  photographer: {
    name: "",
    description: "Gracias por acompañarme en este momento tan importante"
  }
};

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Fetch project data function (simulates an API call)
export const fetchProjectData = async (): Promise<ProjectData> => {
  // Simulate network delay (1-3 seconds)
  await delay(1000 + Math.random() * 2000);

  // Simulate potential error (10% chance)
  if (Math.random() < 0.1) {
    throw new Error("Failed to fetch project data. Please try again.");
  }

  return mockProjectData;
};

// Update project data function (simulates an API POST)
export const updateProjectData = async (data: Partial<ProjectData>): Promise<ProjectData> => {
  // Simulate network delay
  await delay(800);

  // Merge with existing data (simulating a database update)
  const updatedData = { ...mockProjectData, ...data };

  return updatedData;
};
