"use client";

import { useState } from "react";
import { RecipeHeader } from "@/components/core/RecipeHeader";
import { NotesSection } from "@/components/core/NotesSection";
import { IngredientsList } from "@/components/core/IngredientsList";
import { MethodSteps } from "@/components/core/MethodSteps";
import { SaveToCookbookModal } from "@/components/core/SaveToCookbookModal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs-simple";
import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";
// import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { ChefHat, Home, Search, BookOpen, User } from "lucide-react";
import { mockRecipes } from "@/data/mockRecipes";
import type { Recipe, Note, Ingredient } from "@/types/recipe";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@supabase/supabase-js";
import router from "next/router";

export default function App() {
  const [recipe, setRecipe] = useState<Recipe>(mockRecipes[0]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [showEdits, setEdits] = useState(false);
  const [savedRecipes, setSavedRecipes] = useState<string[]>([]);

  const handleToggleIngredient = (id: string) => {
    setRecipe((prev) => ({
      ...prev,
      ingredients: prev.ingredients.map((ing) =>
        ing.id === id ? { ...ing, checked: !ing.checked } : ing
      ),
    }));
  };

  const handleAddNote = (category: Note["category"], content: string) => {
    const newNote: Note = {
      id: `note-${Date.now()}`,
      recipeId: recipe.id,
      category,
      content,
      timestamp: new Date(),
    };
    setNotes((prev) => [...prev, newNote]);
    toast.success("Note added successfully!");
  };

  const handleUpdateNote = (id: string, content: string) => {
    setNotes((prev) =>
      prev.map((note) => (note.id === id ? { ...note, content } : note))
    );
    toast.success("Note updated!");
  };

  const handleDeleteNote = (id: string) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
    toast.success("Note deleted");
  };

  const handleSaveRecipe = () => {
    setSavedRecipes((prev) => [...prev, recipe.id]);
    toast.success("Recipe saved to your cookbook!", {
      description: "You can access it anytime with all your notes and edits.",
    });
  };

  const handleToggleEdit = () => {
    setEdits(!showEdits);
  };

  const relatedRecipes = mockRecipes.filter((r) => r.id !== recipe.id);

  return (
    <div className="min-h-screen bg-background">
      {/* <Toaster position="top-center" /> */}

      {/* Mobile App Container */}
      <div className="max-w-md mx-auto bg-white min-h-screen flex flex-col shadow-xl">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white border-b px-4 py-3">
          <div className="flex items-center justify-between">
            <h3>Recipe Details</h3>
            {savedRecipes.includes(recipe.id) && "Saved"}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto pb-20">
          <div className="p-4 space-y-6">
            {/* Recipe Header */}
            <RecipeHeader
              title={recipe.title}
              image={recipe.image}
              rating={recipe.rating}
              reviewCount={recipe.reviewCount}
              cookTime={recipe.cookTime}
              servings={recipe.servings}
              onSave={() => setIsSaveModalOpen(true)}
              onToggleEdit={() => handleToggleEdit()}
            />

            {/* Author */}
            <div className="flex items-center gap-3">
              <div>
                <p className="text-sm">{recipe.author.name}</p>
                <p className="text-xs text-muted-foreground">Recipe creator</p>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground">
              {recipe.description}
            </p>

            {/* <Separator /> */}

            {/* Tabs for Ingredients and Method */}
            <Tabs defaultValue="ingredients" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="ingredients">
                  Ingredients ({recipe.ingredients.length})
                </TabsTrigger>
                <TabsTrigger value="method">
                  Method ({recipe.method.length} steps)
                </TabsTrigger>
              </TabsList>

              <TabsContent value="ingredients" className="mt-4 space-y-4">
                <IngredientsList
                  ingredients={recipe.ingredients}
                  onToggle={handleToggleIngredient}
                  showEdits={showEdits}
                />
              </TabsContent>

              <TabsContent value="method" className="mt-4">
                <MethodSteps steps={recipe.method} showEdits={showEdits} />
              </TabsContent>
            </Tabs>

            {/* <Separator /> */}

            {/* Notes Section */}
            <NotesSection
              notes={notes}
              onAddNote={handleAddNote}
              onUpdateNote={handleUpdateNote}
              onDeleteNote={handleDeleteNote}
            />

            {/* <Separator /> */}

            {/* Tags */}
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Tags</p>
              <div className="flex gap-2 flex-wrap">
                {recipe.tags.map(
                  (tag) =>
                      <Badge key={tag} variant="secondary">
                       {tag}
                      </Badge>
                )}
              </div>
            </div>

            {/* Save Button */}
            <button
              onClick={() => setIsSaveModalOpen(true)}
              className="w-full bg-slate-500 hover:bg-blue-600 text-white py-2 px-2 rounded-full transition-colors duration-300"
          
            >
             
              {savedRecipes.includes(recipe.id)
                ? "Update in Cookbook"
                : "Save to Cookbook"}
            </button>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t">
          <div className="flex items-center justify-around py-3 px-4">
            <Button variant="ghost" size="sm" className="flex-col h-auto gap-1">
              <Home className="w-5 h-5" />
              <span className="text-xs">Home</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex-col h-auto gap-1">
              <Search className="w-5 h-5" />
              <span className="text-xs">Search</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex-col h-auto gap-1 text-primary"
            >
              <BookOpen className="w-5 h-5" />
              <span className="text-xs">Shopping List</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex-col h-auto gap-1" onClick={() => router.push("/cookbooks")}>
              <User className="w-5 h-5" />
              <span className="text-xs">Cookbooks</span>
            </Button>
          </div>
        </div>

        {/* Save to Cookbook Modal */}
        <SaveToCookbookModal
          open={isSaveModalOpen}
          onOpenChange={setIsSaveModalOpen}
          currentRecipe={recipe}
          relatedRecipes={relatedRecipes}
          onSave={handleSaveRecipe}
        />
      </div>
    </div>
  );
}
