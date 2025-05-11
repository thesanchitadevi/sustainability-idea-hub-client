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

interface IUser {
  id: string;
  name?: string;
  email?: string;
  imageUrl?: string;
  role?: string;
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
  user: IUser;
  createdAt: string;
  updatedAt: string;
}

export interface IAllUser {
  id: string;
  email: string;
  name: string;
  role: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICurrentUser {
  email: string;
  exp: number;    
  iat: number;   
  role: string; 
  userId: string; 
}





// idea types
export interface Image {
  id: string;
  idea_id: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  profile_image: string;
}

export interface IdeaDetails {
  id: string;
  title: string;
  description: string;
  problem_statement: string;
  proposed_solution: string;
  category: string;
  isPaid: boolean;
  isPublished: boolean;
  status: 'UNDER_REVIEW' | 'APPROVED' | 'REJECT';
  rejectionFeedback: string | null;
  createdAt: string;
  updatedAt: string;
  images: Image[];
  user_id: string;
  user: User;
}
