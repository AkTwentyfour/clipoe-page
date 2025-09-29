"use client";

import { Button } from "@/components/ui/button";
import {
  Box,
  Settings,
  Settings2,
  Paintbrush,
  Aperture,
  Activity,
} from "lucide-react";

import { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import SearchInput from "@/components/SearchInput";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";

const styles = [
  {
    id: 1,
    title: "Fisheye",
    image: "fisheye.jpg",
  },
  {
    id: 2,
    title: "Motion Blur",
    image: "motionblur.jpg",
  },
  {
    id: 3,
    title: "Monochrome",
    image: "monochrome.jpg",
  },
  {
    id: 4,
    title: "Candid",
    image: "style4.jpg",
  },
  {
    id: 5,
    title: "Street Photography",
    image: "style5.jpg",
  },
  {
    id: 6,
    title: "Portrait",
    image: "style6.jpg",
  },
  {
    id: 7,
    title: "Macro",
    image: "style7.jpg",
  },
  {
    id: 8,
    title: "Landscape",
    image: "style8.jpg",
  },
  {
    id: 9,
    title: "Long Exposure",
    image: "style9.jpg",
  },
];

export default function StickyWatcher() {
  const [value, setValue] = useState([100]);
  const [query, setQuery] = useState("");
  const [modelType, setModelType] = useState(true);
  const [customModel, setCustomModel] = useState(true);

  const filtered = styles.filter((style) =>
    style.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="container flex justify-center items-center h-screen">
      <Dialog>
        <DialogTrigger
          className={"rounded-full border text-muted-foreground p-3"}
        >
          <Settings className={"size-4 text-muted-foreground"} />
        </DialogTrigger>
        <DialogContent className="h-[470px] p-3 py-7 sm:py-8 overflow-hidden border-none !rounded-3xl">
          <Tabs defaultValue="model">
            <div className="flex flex-col sm:flex-row h-full ">
              {/* Tab List */}
              <TabsList className="flex flex-row sm:flex-col w-1/3" variant={"custom"}>
                <DialogTitle className="text-2xl border-b-0 ms-3 mb-2 text-muted-foreground hidden sm:block">
                  Settings
                </DialogTitle>
                <TabsTrigger
                  variant={"custom"}
                  value="model"
                  className="flex items-center text-base gap-2 pb-3"
                >
                  <Box className={"size-5 text-foreground"} />
                  Model
                </TabsTrigger>
                <TabsTrigger
                  variant={"custom"}
                  value="customize"
                  className="flex items-center text-base gap-2 pb-3"
                >
                  <Settings2 className={"size-5 text-foreground"} />
                  Customize
                </TabsTrigger>
                <TabsTrigger
                  variant={"custom"}
                  value="style"
                  className="flex items-center text-base gap-2"
                >
                  <Paintbrush className={"size-5 text-foreground"} />
                  Template Style
                </TabsTrigger>
              </TabsList>
              {/* Tab Content */}
              <div className="w-full sm:w-3/4 px-3 sm:ps-5">
                {/* Model tab content */}
                <TabsContent value="model" className="mt-1">
                  <div className="w-full flex justify-between items-center mb-5">
                    <DialogTitle className="text-2xl border-b-0 p-0 text-muted-foreground">
                      Model
                    </DialogTitle>
                    <div className="flex justify-between items-center gap-2">
                      <p id="modelType" className="text-base">
                        {modelType ? "Auto" : "Custom"}
                      </p>
                      <Switch
                        checked={modelType}
                        onCheckedChange={setModelType}
                      />
                    </div>
                  </div>
                  <Tabs defaultValue="image" className="">
                    <TabsList className="w-full h-auto bg-muted/25 rounded-xl gap-2">
                      <TabsTrigger
                        variant={"custom"}
                        className="p-1 rounded-lg justify-center items-center text-base w-3/4"
                        value="image"
                      >
                        Image
                      </TabsTrigger>
                      <TabsTrigger
                        variant={"custom"}
                        className="p-1 rounded-lg justify-center items-center text-base w-3/4"
                        value="video"
                      >
                        Video
                      </TabsTrigger>
                      <TabsTrigger
                        variant={"custom"}
                        className="p-1 rounded-lg justify-center items-center text-base w-3/4"
                        value="3d"
                      >
                        3D
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="image">
                      <div className="text-base mb-6">Image</div>
                      <div className="h-[275px] pb-4 overflow-scroll [&::-webkit-scrollbar]:hidden">
                        {/* first image model */}
                        <div className="flex items-center gap-4 mb-6">
                          <div className="self-start">
                            <Aperture className={"size-5 text-foreground"} />
                          </div>
                          <div className="me-auto">
                            <div className="leading-none font-bold">
                              Nano Banana
                            </div>
                            <p className="my-2 text-sm font-thin">
                              Google's latest image generation model.
                            </p>
                            <div className="px-1 bg-muted w-max rounded-md">
                              20s
                            </div>
                          </div>
                          <Checkbox
                            checked={modelType ? true : undefined}
                            disabled={modelType}
                          />
                        </div>

                        {/* second image model */}
                        <div className="flex items-center gap-4 mb-6">
                          <div className="self-start">
                            <Activity className={"size-5 text-foreground"} />
                          </div>
                          <div className="me-auto">
                            <div className="leading-none font-bold">
                              Seedream 4
                            </div>
                            <p className="my-2 text-sm font-thin">
                              Bytedance's latest image generation model.
                            </p>
                            <div className="px-1 bg-muted w-max rounded-md">
                              10s
                            </div>
                          </div>
                          <Checkbox
                            checked={modelType ? true : undefined}
                            disabled={modelType}
                          />
                        </div>

                        {/* third image model */}
                        <div className="flex items-center gap-4 mb-6">
                          <div className="self-start">
                            <Aperture className={"size-5 text-foreground"} />
                          </div>
                          <div className="me-auto">
                            <div className="leading-none font-bold">
                              Gemini Imagen 4
                            </div>
                            <p className="my-2 text-sm font-thin">
                              Google's most advance image model.
                            </p>
                            <div className="px-1 bg-muted w-max rounded-md">
                              10s
                            </div>
                          </div>
                          <Checkbox
                            checked={modelType ? true : undefined}
                            disabled={modelType}
                          />
                        </div>

                        {/* fourth image model */}
                        <div className="flex items-center gap-4 mb-6">
                          <div className="self-start">
                            <Activity className={"size-5 text-foreground"} />
                          </div>
                          <div className="me-auto">
                            <div className="leading-none font-bold">
                              Gemini Imagen 4
                            </div>
                            <p className="my-2 text-sm font-thin">
                              Google's most advance image model.
                            </p>
                            <div className="px-1 bg-muted w-max rounded-md">
                              10s
                            </div>
                          </div>
                          <Checkbox
                            checked={modelType ? true : undefined}
                            disabled={modelType}
                          />
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="video">
                      <div className="text-base mb-6">Video</div>
                      <div className="h-[275px] pb-4 overflow-scroll [&::-webkit-scrollbar]:hidden">
                        {/* first video model */}
                        <div className="flex items-center gap-4 mb-6">
                          <div className="self-start">
                            <Aperture className={"size-5 text-foreground"} />
                          </div>
                          <div className="me-auto">
                            <div className="leading-none font-bold">
                              Runway Gen-3
                            </div>
                            <p className="my-2 text-sm font-thin">
                              Runway’s latest text-to-video generation model.
                            </p>
                            <div className="px-1 bg-muted w-max rounded-md">
                              30s
                            </div>
                          </div>
                          <Checkbox
                            checked={modelType ? true : undefined}
                            disabled={modelType}
                          />
                        </div>

                        {/* second video model */}
                        <div className="flex items-center gap-4 mb-6">
                          <div className="self-start">
                            <Activity className={"size-5 text-foreground"} />
                          </div>
                          <div className="me-auto">
                            <div className="leading-none font-bold">
                              Pika Labs V2
                            </div>
                            <p className="my-2 text-sm font-thin">
                              AI-powered video generation with cinematic
                              effects.
                            </p>
                            <div className="px-1 bg-muted w-max rounded-md">
                              15s
                            </div>
                          </div>
                          <Checkbox
                            checked={modelType ? true : undefined}
                            disabled={modelType}
                          />
                        </div>

                        {/* third video model */}
                        <div className="flex items-center gap-4 mb-6">
                          <div className="self-start">
                            <Aperture className={"size-5 text-foreground"} />
                          </div>
                          <div className="me-auto">
                            <div className="leading-none font-bold">
                              Sora (OpenAI)
                            </div>
                            <p className="my-2 text-sm font-thin">
                              OpenAI’s advanced model for generating
                              high-quality videos.
                            </p>
                            <div className="px-1 bg-muted w-max rounded-md">
                              60s
                            </div>
                          </div>
                          <Checkbox
                            checked={modelType ? true : undefined}
                            disabled={modelType}
                          />
                        </div>

                        {/* fourth video model */}
                        <div className="flex items-center gap-4 mb-6">
                          <div className="self-start">
                            <Activity className={"size-5 text-foreground"} />
                          </div>
                          <div className="me-auto">
                            <div className="leading-none font-bold">
                              Kaiber AI
                            </div>
                            <p className="my-2 text-sm font-thin">
                              Creative video transformation model for artists
                              and storytellers.
                            </p>
                            <div className="px-1 bg-muted w-max rounded-md">
                              20s
                            </div>
                          </div>
                          <Checkbox
                            checked={modelType ? true : undefined}
                            disabled={modelType}
                          />
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="3d">
                      <div className="text-base mb-6">3D Model</div>
                      <div className="h-[275px] pb-4 overflow-scroll [&::-webkit-scrollbar]:hidden">
                        {/* first 3D model */}
                        <div className="flex items-center gap-4 mb-6">
                          <div className="self-start">
                            <Aperture className={"size-5 text-foreground"} />
                          </div>
                          <div className="me-auto">
                            <div className="leading-none font-bold">
                              Luma AI
                            </div>
                            <p className="my-2 text-sm font-thin">
                              NeRF-based 3D generation from images or videos.
                            </p>
                            <div className="px-1 bg-muted w-max rounded-md">
                              High
                            </div>
                          </div>
                          <Checkbox
                            checked={modelType ? true : undefined}
                            disabled={modelType}
                          />
                        </div>

                        {/* second 3D model */}
                        <div className="flex items-center gap-4 mb-6">
                          <div className="self-start">
                            <Activity className={"size-5 text-foreground"} />
                          </div>
                          <div className="me-auto">
                            <div className="leading-none font-bold">
                              Meshy AI
                            </div>
                            <p className="my-2 text-sm font-thin">
                              Text-to-3D and texture generation for game assets.
                            </p>
                            <div className="px-1 bg-muted w-max rounded-md">
                              Medium
                            </div>
                          </div>
                          <Checkbox
                            checked={modelType ? true : undefined}
                            disabled={modelType}
                          />
                        </div>

                        {/* third 3D model */}
                        <div className="flex items-center gap-4 mb-6">
                          <div className="self-start">
                            <Aperture className={"size-5 text-foreground"} />
                          </div>
                          <div className="me-auto">
                            <div className="leading-none font-bold">
                              Tripo AI
                            </div>
                            <p className="my-2 text-sm font-thin">
                              Fast text-to-3D generation with editable outputs.
                            </p>
                            <div className="px-1 bg-muted w-max rounded-md">
                              Fast
                            </div>
                          </div>
                          <Checkbox
                            checked={modelType ? true : undefined}
                            disabled={modelType}
                          />
                        </div>

                        {/* fourth 3D model */}
                        <div className="flex items-center gap-4 mb-6">
                          <div className="self-start">
                            <Activity className={"size-5 text-foreground"} />
                          </div>
                          <div className="me-auto">
                            <div className="leading-none font-bold">
                              Sloyd AI
                            </div>
                            <p className="my-2 text-sm font-thin">
                              Procedural 3D model generation for environments.
                            </p>
                            <div className="px-1 bg-muted w-max rounded-md">
                              Medium
                            </div>
                          </div>
                          <Checkbox
                            checked={modelType ? true : undefined}
                            disabled={modelType}
                          />
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </TabsContent>

                {/* Customize tab content */}
                <TabsContent value="customize" className="mt-1">
                  <DialogTitle className="text-2xl border-b-0 mb-2 text-muted-foreground">
                    Customize
                  </DialogTitle>
                  <div className="flex justify-between items-center">
                    Color Theme
                    <Select defaultValue={"warm"}>
                      <SelectTrigger className="border-none w-max justify-end gap-3 focus:ring-0 focus:ring-offset-0 p-0">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="warm">Warm</SelectItem>
                        <SelectItem value="cool">Cool</SelectItem>
                        <SelectItem value="vibrant">Vibrant</SelectItem>
                        <SelectItem value="monochrome">Monochrome</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex justify-between items-center">
                    Quality
                    <div className="text-sm text-muted-foreground border-1 border-muted-foreground bg-muted px-3 py-2 rounded-lg">
                      <span>{value[0]}</span>
                    </div>
                    <Slider
                      className="w-1/2"
                      value={value}
                      onValueChange={setValue}
                      defaultValue={[100]}
                      max={100}
                      step={1}
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    size
                    <Select defaultValue={"square"}>
                      <SelectTrigger className="border-none w-max justify-end gap-3 focus:ring-0 focus:ring-offset-0 p-0">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="square">Square(1:1)</SelectItem>
                        <SelectItem value="landscape">
                          Landscape(16:9)
                        </SelectItem>
                        <SelectItem value="portrait">Portrait(9:16)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </TabsContent>

                {/* Style tab content */}
                <TabsContent value="style" className="mt-1">
                  <DialogTitle className="text-2xl border-b-0 mb-2 text-muted-foreground">
                    Styles
                  </DialogTitle>
                  <SearchInput value={query} onChange={setQuery} />
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 mb-5 mt-3 h-80 gap-3 overflow-scroll [&::-webkit-scrollbar]:hidden">
                    {filtered.length > 0 ? (
                      filtered.map((style) => (
                        <div className="cursor-pointer" key={style.id}>
                          <img
                            src={`img/${style.image}`}
                            alt={style.title}
                            className="rounded-xl aspect-square object-cover"
                          />
                          <p className="text-muted-foreground text-sm mt-2">
                            {style.title}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-sm text-muted-foreground col-span-2">
                        No styles found.
                      </p>
                    )}
                  </div>
                </TabsContent>
              </div>
            </div>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  );
}
