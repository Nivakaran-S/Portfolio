export interface Project {
  _id: string;
  title: string;
  projectOverview: string;
  images?: {
    imageUrl1?: string;
    imageUrl2?: string;
    imageUrl3?: string;
    imageUrl4?: string;
    imageUrl5?: string;
    imageUrl6?: string;
  };
  projectCategory: string;
  githubLink: string;
  demoLink: string;
  problem: string;
  solution: string;
  techStack: string | string[] | null | undefined;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProjectCategory {
  _id: string;
  title: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface MiniProject {
  _id?: string;
  title: string;
  description: string;
  imageUrl: string;
  githubUrl: string;
  demoUrl: string;
  miniProjectCategory: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CaseStudy {
  _id?: string;
  title: string;
  challenge: string;
  imageUrl: string;
  githubUrl: string;
  demoUrl: string;
  solution: string;
  learnings:string;
  results:string;
  technologies: string | string[] | null | undefined;
  createdAt?: string;
  updatedAt?: string;
}
