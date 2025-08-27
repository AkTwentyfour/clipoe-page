import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { resolve } from "path";
import { ModeToggle } from "@/components/mode-toggle";

interface Recipe {
  title: string;
  image: string;
  time: number;
  description: string;
  vegan: boolean;
  id: string;
}

export default async function HomePage() {
  const recipes = [
    {
      id: 1,
      title: "Roasted Red Pepper",
      image: "roasted-pepper-soup.png",
      time: "45 minutes",
      description:
        "A smoky and creamy soup made with roasted red peppers and ripe tomatoes, perfect for a cozy evening.",
      vegan: true,
    },
    {
      id: 2,
      title: "Spicy Black Bean Burgers",
      image: "black-bean-burger.png",
      time: "30 minutes",
      description:
        "Homemade black bean burgers with a kick of spice, served on a whole-wheat bun with avocado and salsa.",
      vegan: true,
    },
    {
      id: 3,
      title: "Creamy Mushroom Risotto",
      image: "mushroom-risotto.png",
      time: "50 minutes",
      description:
        "A classic Italian dish with Arborio rice, a mix of wild mushrooms, and a touch of Parmesan cheese.",
      vegan: false,
    },
    {
      id: 4,
      title: "Lemon Herb Roasted Chicken",
      image: "lemon-herb-roasted-chicken.png",
      time: "1 hour 30 minutes",
      description:
        "A whole roasted chicken seasoned with fresh lemon, garlic, and herbs, resulting in a tender and juicy meal.",
      vegan: false,
    },
    {
      id: 5,
      title: "Quinoa Salad with Roasted",
      image: "quinoa-salad.png",
      time: "40 minutes",
      description:
        "A healthy and hearty salad with fluffy quinoa, roasted broccoli, bell peppers, and a light vinaigrette.",
      vegan: true,
    },
    {
      id: 6,
      title: "Classic Beef Lasagna",
      image: "beef-lasagna.png",
      time: "1 hour 45 minutes",
      description:
        "Layers of pasta, rich meat sauce, and creamy béchamel sauce, baked to a golden perfection.",
      vegan: false,
    },
    {
      id: 7,
      title: "Vegan Chocolate Avocado",
      image: "chocolate-avocado.png",
      time: "15 minutes",
      description:
        "A decadent and surprisingly healthy dessert made with avocado, cocoa powder, and a touch of maple syrup.",
      vegan: true,
    },
    {
      id: 8,
      title: "Shrimp Scampi with Linguine",
      image: "shrimp-scapi.png",
      time: "25 minutes",
      description:
        "Quick and easy shrimp scampi with a buttery garlic and white wine sauce, served over a bed of linguine.",
      vegan: false,
    },
    {
      id: 9,
      title: "Spicy Tofu and Broccoli",
      image: "spicy-tofu.png",
      time: "35 minutes",
      description:
        "A fiery and flavorful stir-fry with crispy pan-fried tofu, fresh broccoli, and a spicy ginger-soy sauce.",
      vegan: true,
    },
  ];

  return (
    <main>
      <nav className="flex justify-between">
        <h1>Food Recipe</h1>
        <ModeToggle />
      </nav>
      <div className="grid grid-cols-3 gap-8">
        {recipes.map((recipe) => (
          <Card key={recipe.id} className="flex flex-col justify-between">
            <CardHeader className="flex-row gap-4 items-center">
              <Avatar>
                <AvatarImage
                  src={`img/${recipe.image}`}
                  alt={recipe.title.split(" ")[1]}
                />
                <AvatarFallback>{recipe.title.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{recipe.title}</CardTitle>
                <CardDescription className="mt-1">
                  {recipe.time} To Cook
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p>{recipe.description}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button>View Recipe</Button>
              {recipe.vegan && <Badge variant={"secondary"}>Vegan!</Badge>}
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
}
