"use client";

import { useState, useMemo } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { FilterSelect } from "@/components/FilterSelect";
import { Item } from "@radix-ui/react-dropdown-menu";

export default function Home() {
  // dummy json data ges hehe
  const allItems = [
    {
      id: 1,
      title: "Product 1",
      desc: "This is the first product.",
      price: "$19.99",
      category: "Electronics",
      image: {
        thumbnail: "1.webp",
        image: "image1.webp",
      },
      pricing: "paid",
      rating: 4.2,
      popular: true,
      date: "2025-08-10",
      username: "techie01",
    },
    {
      id: 2,
      title: "Product 2",
      desc: "This is the second product.",
      price: "$24.99",
      category: "Electronics",
      image: {
        thumbnail: "2.webp",
        image: "image2.webp",
      },
      pricing: "paid",
      rating: 3.9,
      popular: false,
      date: "2025-08-08",
      username: "gadgetGuy",
    },
    {
      id: 3,
      title: "Product 3",
      desc: "This is the third product.",
      price: "",
      category: "Books",
      image: {
        thumbnail: "3.webp",
        image: "image3.webp",
      },
      pricing: "free",
      rating: 4.8,
      popular: true,
      date: "2025-08-05",
      username: "pageTurner",
    },
    {
      id: 4,
      title: "Product 4",
      desc: "This is the fourth product.",
      price: "$34.99",
      category: "Electronics",
      image: {
        thumbnail: "4.webp",
        image: "image4.webp",
      },
      pricing: "paid",
      rating: 4.5,
      popular: true,
      date: "2025-08-12",
      username: "circuitKing",
    },
    {
      id: 5,
      title: "Product 5",
      desc: "This is the fifth product.",
      price: "",
      category: "Clothing",
      image: {
        thumbnail: "5.webp",
        image: "image5.webp",
      },
      pricing: "free",
      rating: 3.5,
      popular: false,
      date: "2025-08-07",
      username: "styleSeeker",
    },
    {
      id: 6,
      title: "Product 6",
      desc: "This is the sixth product.",
      price: "",
      category: "Books",
      image: {
        thumbnail: "6.webp",
        image: "image6.webp",
      },
      pricing: "free",
      rating: 4.1,
      popular: false,
      date: "2025-08-06",
      username: "novelNerd",
    },
    {
      id: 7,
      title: "Product 7",
      desc: "A premium gadget for tech lovers.",
      price: "$59.99",
      category: "Electronics",
      image: {
        thumbnail: "7.webp",
        image: "image7.webp",
      },
      pricing: "paid",
      rating: 4.9,
      popular: true,
      date: "2025-08-11",
      username: "digitalPro",
    },
    {
      id: 8,
      title: "Product 8",
      desc: "Stylish jacket for winter.",
      price: "$49.99",
      category: "Clothing",
      image: {
        thumbnail: "8.webp",
        image: "image8.webp",
      },
      pricing: "paid",
      rating: 4.3,
      popular: false,
      date: "2025-08-09",
      username: "fashionista",
    },
    {
      id: 9,
      title: "Product 9",
      desc: "A bestselling novel.",
      price: "",
      category: "Books",
      image: {
        thumbnail: "9.webp",
        image: "image9.webp",
      },
      pricing: "free",
      rating: 4.6,
      popular: true,
      date: "2025-08-04",
      username: "booklover99",
    },
  ];

  //   filter and short function
  const [pricing, setPricing] = useState("");
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("");

  const priceOptions = ["paid", "free"];
  const categoryOption = Array.from(new Set(allItems.map((i) => i.category)));
  const sortOptions = ["popular", "newest"];

  const filtered = useMemo(() => {
    return allItems
      .filter((item) => {
        if (pricing === "paid" && (!item.price || item.price.trim() === ""))
          return false;
        if (pricing === "free" && item.price && item.price.trim() !== "")
          return false;
        if (category && item.category !== category) return false;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "popular") {
          return (b.popular ? 1 : 0) - (a.popular ? 1 : 0);
        }
        if (sortBy === "newest") {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        }
        return 0;
      });
  }, [pricing, category, sortBy]);
  //   end of filter and short function

  //   count total item per category
  const categoryCount = allItems.reduce((acc: Record<string, number>, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  //   check if any state active
  const checkState = pricing !== "" || category !== "" || sortBy !== "";
  
  return (
    <main className="min-h-screen p-6">
      {/* hero */}
      <section className="py-20 flex flex-col items-center justify-center px-4">
        <h1 className="mt-6 mb-5 text-center font-medium text-4xl tracking-[-0.12rem] md:text-6xl">
          Discover endless possibilities.
        </h1>
        <p className="max-w-2xl text-center text-muted-foreground tracking-[-0.01rem] sm:text-lg">
          Discover how our platform brings together AI tools seamlessly to help
          you design, create, and innovate without limits.
        </p>
      </section>

      {/* category section */}
      <section className="border-b border-muted pb-5">
        {/* category header */}
        <div className="flex justify-between mb-3">
          <h4>Categories</h4>
          <h6 className="text-gray-400">
            <a href="" className="flex items-center gap-1 text-sm">
              See All <ArrowRight className="h-4" />
            </a>
          </h6>
        </div>

        {/* category content */}
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5 mb-5">
          {allItems.slice(0, 5).map((item, index) => (
            <Card
              key={item.id}
              className="flex flex-col justify-between border-none hover:bg-[#313131] transition duration-200"
            >
              <a href="">
                <CardHeader className="grid grid-cols-1 gap-1 md:grid-cols-2 p-1">
                  <div className="md:col-span-2">
                    <img
                      src={`img/${item.image.thumbnail}`}
                      className="w-full h-auto aspect-[4/3] rounded-sm"
                    />
                  </div>
                  <div className="hidden md:block !mt-0">
                    <img
                      src={`img/${item.image.image}`}
                      className="w-full h-auto aspect-[4/3] rounded-sm"
                    />
                  </div>
                  <div className="hidden md:block !mt-0">
                    <img
                      src={`img/${item.image.image}`}
                      className="w-full h-auto aspect-[4/3] rounded-sm"
                    />
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="text-sm font-semibold">{item.category}</p>
                  <p className="text-xsm text-muted-foreground">
                    {categoryCount[item.category]}.4k Item
                  </p>
                </CardContent>
              </a>
            </Card>
          ))}
        </div>
      </section>

      {/* All items section */}
      <section className="mt-7">
        {/* filter button */}
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex gap-2 items-center">
            <FilterSelect
              options={categoryOption}
              value={category}
              onChange={setCategory}
              placeholder="Category"
            />
            <FilterSelect
              options={priceOptions}
              value={pricing}
              onChange={setPricing}
              placeholder="Pricing"
            />
            <a
              className={`text-sm text-gray-400 h-max cursor-pointer ${
                checkState ? "inline-block" : "hidden"
              }`}
              onClick={() => {
                setCategory("");
                setPricing("");
                setSortBy("");
              }}
            >
              Clear All
            </a>
          </div>
          <FilterSelect
            options={sortOptions}
            value={sortBy}
            onChange={setSortBy}
            placeholder="Sort By"
          />
        </div>

        {/* All items content */}
        <div className="grid gap-2 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((item) => (
            <a href="" key={item.id}>
              <Card className="group flex flex-col justify-between border-none bg-transparent overflow-hidden">
                <CardHeader className="p-0 relative overflow-hidden">
                  <img
                    src={`img/${item.image.thumbnail}`}
                    alt={item.title}
                    className="aspect-[4/3] w-full !m-0 rounded-sm border transition-opacity duration-300 group-hover:opacity-0"
                  />
                  <img
                    src={`img/${item.image.image}`}
                    alt={item.title}
                    className="aspect-[4/3] w-full !m-0 rounded-sm border absolute top-0 left-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                </CardHeader>
                <CardContent className="p-0 mt-2">
                  <p className="font-semibold">{item.title}</p>
                  <div className="relative pb-1">
                    <p className="text-muted-foreground transition-opacity duration-300 group-hover:opacity-0">
                      {item.price !== "" ? item.price : "Free"}
                    </p>
                    <p className="text-muted-foreground absolute top-0 left-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      @{item.username}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
