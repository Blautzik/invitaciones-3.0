import { ProjectData } from './types';

// Mock data simulating a database response
const mockProjectData: ProjectData = {
  title: "Chantal Janzen for FifthHouse",
  heroImage: {
    src: "/images/campaign-1.jpg",
    alt: "Chantal Janzen for FifthHouse"
  },
  description: "A stunning campaign featuring Chantal Janzen for FifthHouse. Elegant, stylish, and captivating imagery that showcases both the model's and the brand's essence.",
  verticalTitles: {
    left: "QUINCE",
    right: "AÑOS"
  },
  credits: [
    { label: "Fecha", value: "01/12/2025" },
    { label: "Salón", value: "Palacio Sans Soucí" },
    { label: "Styling", value: "Sanne Berriotte" },
    { label: "Makeup", value: "Gwen van Waveren" },
    { label: "Production", value: "Lisa Verheul" },
    { label: "Category", value: "campaigns" }
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
    title: "Fifth House SS24",
    subtitle: "Next Case"
  },
  photographer: {
    name: "Otto van den Toorn",
    description: "is a beauty & fashion photographer from The Netherlands."
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
