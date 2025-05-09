export enum IdeaCategory {
  ENERGY = "ENERGY",
  WASTE = "WASTE",
  TRANSPORTATION = "TRANSPORTATION",
}

export enum IdeaStatus {
  UNDER_REVIEW = "UNDER_REVIEW",
  APPROVED = "APPROVED",
  REJECT = "REJECT",
  DRAFT = "DRAFT",
}

export interface IIdeaImage {
  idea_id: string;
  imageUrl: string;
}

export interface IIdea {
  id: string;
  user_id: string;
  title: string;
  price: number;
  votes: number;
  problem_statement: string;
  proposed_solution: string;
  description: string;
  isPaid: boolean;
  status: IdeaStatus;
  isPublished: boolean;
  category: IdeaCategory;
  images: IIdeaImage[];
  createdAt: string;
  updatedAt: string;
}

export interface IAllUser {
  id: string;
  email: string;
  name:string;
  role: string;
  status: string;
  createdAt: string; 
  updatedAt: string; 
}
