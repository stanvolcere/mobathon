import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog-simple";
import { Button } from "@/components/ui/button";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { Clock } from "lucide-react";
import type { Recipe } from "@/types/recipe";

interface SaveToCookbookModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentRecipe: Recipe;
  relatedRecipes: Recipe[];
  onSave: () => void;
}

export function SaveToCookbookModal({
  open,
  onOpenChange,
  currentRecipe,
  relatedRecipes,
  onSave,
}: SaveToCookbookModalProps) {
  const handleSave = () => {
    onSave();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Save to your cookbook</DialogTitle>
          <DialogDescription>
            Your customized recipe will be saved with all your notes and edits
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Current Recipe Preview */}
          <div className="space-y-3">
            <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden">
              <ImageWithFallback
                src={currentRecipe.image}
                alt={currentRecipe.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-1">
              <h4>{currentRecipe.title}</h4>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                {currentRecipe.cookTime}
              </div>
            </div>
          </div>

          {/* Save Button */}
          <button onClick={handleSave} className="w-full bg-slate-500 hover:bg-blue-600 text-white py-2 px-2 rounded-full transition-colors duration-300">
            Save to Cookbook
          </button>

          {/* Related Recipes */}
          {relatedRecipes.length > 0 && (
            <div className="space-y-3">
              <h4>You might also like</h4>
              <div className="grid grid-cols-2 gap-3">
                {relatedRecipes.slice(0, 4).map((recipe) => (
                  <div
                    key={recipe.id}
                    className="space-y-2 cursor-pointer hover:opacity-80 transition-opacity"
                  >
                    <div className="relative w-full aspect-square rounded-lg overflow-hidden">
                      <ImageWithFallback
                        src={recipe.image}
                        alt={recipe.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-2 left-2 right-2">
                        <p className="text-white text-sm line-clamp-2">
                          {recipe.title}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {recipe.cookTime}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
