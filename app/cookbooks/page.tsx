'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
// import {mockCookbooks} from "@/data/mockCookbooks";

interface Cookbook {
  id: string;
  title: string;
  description: string;
  coverImage?: string;
}

const mockCookbooks = [
    {
      id: "1",
      title: "Personal Cookbook",
      description: "",
      coverImage: "https://files.mob-cdn.co.uk/recipes/2025/8/Crispy-Cod-with-Spring-Onion-Sesame-Butter-Sauce.jpg",
    },
    {
      id: "2",
      title: "What Sara Loves to Eat",
      description: "",
      image: "https://files.mob-cdn.co.uk/recipes/2025/9/Creamy-Mushroom-Miso-Udon.jpg",

    },
    {
      id: "3",
      title: "Easy Batch Recipes",
      description: "",
      image: "https://files.mob-cdn.co.uk/recipes/Commercial/Aldi/Chicken-Teriyaki-Noodle.jpg"
    },
];
  

export default function UserCookbooksPage() {
    const [cookbooks, setCookbooks] = useState<Cookbook[]>([]);
  
    useEffect(() => {
        setCookbooks(mockCookbooks);
    }, []);
  
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Cooked books</h1>
  
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Add Cookbook Slot */}
          <Link
            href="/cookbooks/new" // Replace with your create page or modal trigger
            className="border border-dashed rounded-lg h-48 flex flex-col items-center justify-center text-muted-foreground hover:bg-gray-50 transition cursor-pointer"
          >
            <Plus className="w-8 h-8 mb-2" />
            <span className="font-medium">Add Cookbook</span>
          </Link>
  
          {/* Existing Cookbooks */}
          {cookbooks.length ? (
            cookbooks.map((cookbook) => (
              <Link
                key={cookbook.id}
                href={`/cookbooks/${cookbook.id}`}
                className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow bg-white"
              >
                {cookbook.coverImage ? (
                  <div className="relative w-full h-48">
                    <Image
                      src={cookbook.coverImage}
                      alt={cookbook.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-full h-48 bg-blue-100 flex items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}
  
                <div className="p-4">
                  <h2 className="font-semibold text-lg mb-1">{cookbook.title}</h2>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {cookbook.description}
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center col-span-full text-muted-foreground mt-4">
              No cookbooks yet.
            </p>
          )}
        </div>
      </div>
    );
  }
