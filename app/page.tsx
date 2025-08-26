import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent
} from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { resolve } from 'path'
import { ModeToggle } from '@/components/mode-toggle'

interface Recipe {
  title : string,
  image : string,
  time : number,
  description : string,
  vegan : boolean,
  id : string
}

async function getRecipes(): Promise<Recipe[]> {
  const result = await fetch('http://localhost:4000/recipes')

  await new Promise((resolve) => setTimeout(resolve, 1))

  return result.json()
}


export default async function HomePage() {
  const recipes = await getRecipes()

  return (

    <main>
      <nav className='flex justify-between'>
        <h1>Food Recipe</h1>
        <ModeToggle />
      </nav>
      <div className="grid grid-cols-3 gap-8">
        {recipes.map(recipe => (
          <Card key={recipe.id} className='flex flex-col justify-between'>
            <CardHeader className='flex-row gap-4 items-center'>
              <Avatar>
                <AvatarImage src={`img/${recipe.image}`} alt={recipe.title.split(' ',)[1]} />
                <AvatarFallback>{recipe.title.slice(0,2)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{recipe.title}</CardTitle>
                <CardDescription className='mt-1'>{recipe.time} To Cook</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p>{recipe.description}</p>
            </CardContent>
            <CardFooter className='flex justify-between'>
              <Button>View Recipe</Button>
              {recipe.vegan && <Badge variant={'secondary'}>Vegan!</Badge>}
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
}
