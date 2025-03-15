// Project data types

export interface ProjectImage {
  src: string;
  alt: string;
}

export interface ProjectCredit {
  label: string;
  value: string;
}

export interface ProjectData {
  title: string;
  heroImage: ProjectImage;
  description: string;
  verticalTitles: {
    left: string;
    right: string;
  };
  credits: ProjectCredit[];
  galleryImages: ProjectImage[];
  nextProject: {
    title: string;
    subtitle: string;
  };
  photographer: {
    name: string;
    description: string;
  };
}

export interface AppState {
  isLoading: boolean;
  isEntered: boolean;
  projectData: ProjectData | null;
  error: string | null;
}
