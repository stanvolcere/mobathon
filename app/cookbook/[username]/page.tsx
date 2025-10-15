"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import Image from "next/image";

// import { createClient } from '@/utils/supabase/server';

import { createClient } from "@supabase/supabase-js";
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation";
import { Link } from "lucide-react";

type Recipe = {
  id: number;
  title: string;
  image: string;
  description: string;
  created: string;
  annotations: { id: number; text: string; author: string }[];
};

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!);

export default function Cookbook() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [mounted, setMounted] = useState(false);
  
  const mockRecipes = [
    {
      id: 1,
      title: "Crispy Cod with Spring Onion & Sesame Butter Sauce",
      image: "https://files.mob-cdn.co.uk/recipes/2025/8/Crispy-Cod-with-Spring-Onion-Sesame-Butter-Sauce.jpg",
      description: "Crispy, golden cod with a zingy garlic, ginger & spring onion butter. High-protein, full of flavour, and seriously satisfying.",
      created: "2025-10-10",
      annotations: []
    },
  ]
  //   {
  //     id: 2,
  //     title: "Creamy Garlic Pasta",
  //     image: "/content/template.jpg",
  //     description: "A 15-minute creamy pasta with garlic, parsley and parmesan.",
  //     dateAdded: "2025-10-10",
  //     annotations: []
  //   },
  //   {
  //     id: 3,
  //     title: "Creamy Garlic Pasta",
  //     image: "https://files.mob-cdn.co.uk/recipes/2025/7/Smoky-Prawn-Paprika-Fiduea%CC%81.jpg",
  //     description: "A 15-minute creamy pasta with garlic, parsley and parmesan.",
  //     dateAdded: "2025-10-10",
  //     annotations: []
  //   },
  //   {
  //     id: 4,
  //     title: "One-Pan Chicken & Rice",
  //     image: "/content/template.jpg",
  //     description: "Juicy chicken thighs baked with saffron rice and lemon.",
  //     dateAdded: "2025-09-28",
  //     annotations: [],
  //   },
  // ]);
  const { data: session } = useSession()


  useEffect(() => {
    if (!session) { redirect('/') }
  }, [])

  useEffect(() => {
    setMounted(true);
    // getRecipes(mockRecipes);
    setRecipes(mockRecipes);
  }, []);

  async function getRecipes() {
    const { data, error } = await supabase.from("recipes").select();

     if (error) {
        console.error("Error fetching products:", error);
      } else {
        setRecipes(data || []);
      }
  }

  // const [newAnnotation, setNewAnnotation] = useState<{ [key: number]: string }>({});

  const handleAddAnnotation = (recipeId: number) => {
    // if (!newAnnotation[recipeId]) return;
    // setRecipes((prev) =>
    //   prev.map((r) =>
    //     r.id === recipeId
    //       ? {
    //           ...r,
    //           annotations: [
    //             ...r.annotations,
    //             { id: Date.now(), text: newAnnotation[recipeId], author: "Guest" },
    //           ],
    //         }
    //       : r
    //   )
    // );
    // setNewAnnotation((prev) => ({ ...prev, [recipeId]: "" }));
  };

  if (!mounted) return null; // render nothing until client

  return (
    <div className="min-h-screen bg-neutral-50 py-12 px-6">
      <h1 className="text-4xl font-bold mb-10 text-center">My Mob Cookbook</h1>
      <div>

      </div>
      <div className="flex flex-col items-center space-y-8">
        {recipes.map((recipe, idx) => (
          <motion.div
            key={recipe.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className="overflow-hidden shadow-md hover:shadow-lg transition rounded-2xl">
                <CardHeader className="p-0 relative">
                  <Image
                    src={recipe.image}
                    alt={recipe.title}
                    width={300}
                    height={150}
                    className="w-full h-56 object-cover"
                  />
                  <div className="absolute bottom-2 right-2 bg-white/80 text-sm px-2 py-1 rounded">
                    Added: {new Date(recipe.created).toLocaleDateString()}
                  </div>
                </CardHeader>
              <CardContent className="p-5">
                <h2 className="text-xl font-semibold mb-2">{recipe.title}</h2>
                <p className="text-sm text-gray-600 mb-4">{recipe.description}</p>

                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-gray-700">Annotations</h3>
                  {recipe.annotations && recipe.annotations.length > 0 ? (
                    <ul className="text-sm bg-gray-50 p-2 rounded-md border">
                      {recipe.annotations.map((a) => (
                        <li key={a.id} className="border-b last:border-none py-1">
                          <span className="font-medium">{a.author}:</span> {a.text}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500 italic">No annotations yet.</p>
                  )}
                </div>
                <a href={`/recipes/${recipe.id}`}>View Cookbook</a>
              </CardContent>
              {/* <CardFooter className="flex flex-col space-y-2 p-5">
                <Textarea
                  placeholder="Add your note..."
                  value={newAnnotation[recipe.id] || ""}
                  onChange={(e) =>
                    setNewAnnotation({ ...newAnnotation, [recipe.id]: e.target.value })
                  }
                />
                <Button onClick={() => handleAddAnnotation(recipe.id)}>Add Annotation</Button>
              </CardFooter> */}
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
