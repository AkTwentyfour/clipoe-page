import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { BookOpenCheck } from "lucide-react";

interface Recipe {
  title: string;
  image: string;
  time: number;
  description: string;
  vegan: boolean;
  id: string;
}

async function getRecipes(): Promise<Recipe[]> {
  const result = await fetch("http://localhost:4000/recipes");

  return result.json();
}

export default async function DiscoverPage() {
  const recipes = await getRecipes();

  return (
    <main>
      <nav>
        <div className="flex gap-3 items-center">
          <BookOpenCheck className="h-4 w-4" />
          <h3>Tutorials</h3>
        </div>
        <p className="text-gray-400">
          Follow structured, step-by-step guides from the Clipoe experts
        </p>
      </nav>
      <div>
        <Carousel
          opts={{
            align: "center",
            // dragFree: true,
          }}
        >
          <CarouselContent>
            {recipes.map((recipe) => (
              <CarouselItem
                key={recipe.id}
                className="basis-full sm:basis-1/3 flex flex-col"
              >
                <a
                  href="https://youtube.com"
                  className="group w-full h-52 relative rounded-lg bg-center bg-cover"
                  style={{ backgroundImage: `url(/img/${recipe.image})` }}>
                    <div className="absolute w-full h-full top-0 left-0  bg-black opacity-0 group-hover:opacity-30 transition duration-300"></div>
                    <Badge className="absolute top-1/2 -translate-y-1/2 right-1/2 translate-x-1/2 px-5 py-2 rounded-xxl opacity-0 group-hover:opacity-100 transition duration-300">Open</Badge>
                  </a>
                <p className="mt-2">{recipe.title}</p>
                <p className="text-gray-400">{recipe.time} to cook</p>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="h-10 w-10" />
          <CarouselNext className="h-10 w-10" />
        </Carousel>
      </div>
    </main>
  );
}
