import { Star, Clock, Users, Bookmark, Share2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";

interface RecipeHeaderProps {
  title: string;
  image: string;
  rating: number;
  reviewCount: number;
  cookTime: string;
  servings: number;
  onSave: () => void;
  onToggleEdit: () => void;
  showEdits: boolean;
}

export function RecipeHeader({
  title,
  image,
  rating,
  reviewCount,
  cookTime,
  servings,
  onSave,
  onToggleEdit,
  showEdits,
}: RecipeHeaderProps) {
  return (
    <div className="space-y-4">
      {/* Recipe Image */}
      <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden">
        <ImageWithFallback
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Recipe Info */}
      <div className="space-y-3">
        <h1>{title}</h1>

        {/* Rating and Stats */}
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(rating)
                      ? "fill-orange-400 text-orange-400"
                      : i < rating
                      ? "fill-orange-200 text-orange-400"
                      : "fill-gray-200 text-gray-200"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground ml-1">
              {rating} ({reviewCount.toLocaleString()})
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 flex-wrap items-center">
          <Button variant="outline" size="sm" onClick={onSave}>
            <Bookmark className="w-4 h-4 mr-1" />
            {/* Add to list */}
          </Button>
          <Clock className="w-3.5 h-3.5 mr-1.5" />
          {cookTime}
          <Users className="w-3.5 h-3.5 mr-1.5" />
          {servings} servings
          <Button variant="ghost" size="sm">
            <Share2 className="w-4 h-4" />
          </Button>
        </div>


        <div className="flex gap-1">
            <button className="border border-grey-500 hover:bg-blue-600 text-sm text-blacktext-sm py-2 px-2 rounded-full transition-colors duration-300">Save to list</button>
            <button onClick={onToggleEdit} className="border border-grey-500 hover:bg-blue-600 text-sm text-black py-2 px-2 rounded-full transition-colors duration-300">
                {showEdits ? "Save scribbles " : "Add scribbles "}
            </button>
            <button className="border border-grey-500 hover:bg-blue-600 text-sm text-black py-2 px-2 text-sm  rounded-full transition-colors duration-300">Save to cookbook</button>
        </div>
      </div>
    </div>
  );
}
