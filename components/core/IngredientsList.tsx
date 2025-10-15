import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox-simple";
import { Input } from "@/components/ui/input";
import type { Ingredient } from "@/types/recipe";
import { Textarea } from "../ui/textarea-simple";

interface IngredientsListProps {
  ingredients: Ingredient[];
  showEdits: boolean;
  onToggle: (id: string) => void;
}

import { Caveat } from 'next/font/google';

const caveat = Caveat({
  weight: '400',   // choose font weight
  subsets: ['latin'], // character subsets
});

export function IngredientsList({
  ingredients,
  onToggle,
  showEdits,
}: IngredientsListProps) {
  // State to store annotations per ingredient ID
  const [annotations, setAnnotations] = useState<Record<string, string>>(() => {
    if (typeof window === "undefined") return {};
    const stored = localStorage.getItem("annotations");
    return stored ? JSON.parse(stored) : {};
  });

  const handleAnnotationChange = (id: string, value: string) => {
    setAnnotations((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  useEffect(() => {
    const addData = async () => { 
      localStorage.setItem('annotations', JSON.stringify(annotations));
    }
    addData();
  }, [annotations]);

  return (
    <div className="space-y-3">
      <div className="space-y-2">
        {ingredients.map((ingredient) => (
          <div key={ingredient.id} className="flex flex-col">
            <div className="flex items-start gap-3 py-2">
              <Checkbox
                id={ingredient.id}
                checked={ingredient.checked}
                onCheckedChange={() => onToggle(ingredient.id)}
                className="mt-0.5"
              />
              <label
                htmlFor={ingredient.id}
                className={`flex-1 cursor-pointer text-sm ${
                  ingredient.checked ? "line-through text-muted-foreground" : ""
                }`}
              >
                {ingredient.amount && (
                  <span className="text-muted-foreground mr-2">
                    {ingredient.amount}
                  </span>
                )}
                {ingredient.name}
              </label>
            </div>

            {showEdits && (
              <Textarea
                placeholder="Add annotation..."
                value={annotations[ingredient.id] || ""}
                onChange={(e) =>
                  handleAnnotationChange(ingredient.id, e.target.value)
                }
                className="ml-7 mt-1 text-xs max-w-xs"
              />
            )}

            {!showEdits && annotations[ingredient.id] && (
              <p className="ml-7 mt-1 text-md bg-orange-100 text-muted-foreground italic">
                <span className={caveat.className}>{annotations[ingredient.id]}</span>
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
