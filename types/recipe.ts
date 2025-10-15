export interface Recipe {
  id: string;
  title: string;
  image: string;
  rating: number;
  reviewCount: number;
  cookTime: string;
  servings: number;
  author: {
    name: string;
    avatar?: string;
  };
  description: string;
  ingredients: Ingredient[];
  method: MethodStep[];
  tags: string[];
}

export interface Ingredient {
  id: string;
  name: string;
  amount?: string;
  checked: boolean;
}

export interface MethodStep {
  id: string;
  step: number;
  title: string;
  description: string;
}

export interface Note {
  id: string;
  recipeId: string;
  category: 'ingredients' | 'method' | 'nutrition';
  content: string;
  timestamp: Date;
}
