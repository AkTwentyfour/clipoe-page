"use client";
import { BorderTrail } from "@/components/motion-primitives/border-trail";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Check, Flower, Heading1, LucideFlower, Minus, Section } from "lucide-react";
import React from "react";
import { useEffect, useRef, useState } from "react";

export default function Page() {
  const [enabled, setEnabled] = React.useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // kalau elemen keluar dari viewport (karena sticky nempel), ubah state
        setIsSticky(!entry.isIntersecting);
      },
      { threshold: [1] }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);


  return (
    <main className="container max-w-6xl mx-auto px-4 relative">
      {/* hero */}
      <section className="py-5 mb-15 flex flex-col items-center justify-center px-4">
        <h1 className="mb-4 font-medium text-center text-4xl tracking-[-0.14rem] md:text-4xl">
          Your teams new all-in-one creative solution
        </h1>
        <p className="max-w-2xl text-center text-muted-foreground tracking-[-0.01rem] sm:text-lg" ref={ref}>
          Simple plans that scale with your team
        </p>
      </section>

      <section className={`grid sm:grid-cols-2 lg:grid-cols-3 mb-5 relative md:sticky md:top-4 z-10 gap-7`}>
        {/* Pro Plan */}
        <Card className={`relative flex flex-col border-blue-500/15 bg-gradient-to-tr from-blue-500/10 to-background backdrop-blur-md shadow-md transition-transform duration-500 ease-out scale-105 ${isSticky ? "h-max scale-100" : " h-auto"}`}>
          <BorderTrail className={`bg-blue-500`} size={200} />
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl">Pro</CardTitle>
              <div className="flex items-center gap-2 text-sm">
                <span>{enabled ? "Yearly" : "Monthly"}</span>
                <Switch
                  checked={enabled}
                  onCheckedChange={setEnabled}
                  className="data-[state=checked]:bg-blue-500"
                />
              </div>
            </div>
            <CardDescription className="my-3">
              For full Editor access
            </CardDescription>
            <p className="text-4xl">
              <span className="text-4xl font-medium tracking-[-0.1rem] me-2">
                {enabled ? "$16" : "$20"}
              </span>
              <span className="text-base font-normal mb-3">
                per seat / month
              </span>
            </p>
          </CardHeader>
          <CardContent className={`flex-1 space-y-4 ${isSticky ? "hidden" : "block"}`}>
            <div className="border-2 border-blue-500/10 mt-5 mb-10 px-4 py-3 rounded-lg flex items-center justify-between">
              <div className="flex gap-2 items-center">
                <LucideFlower size={20} />
                <span className="font-semibold">20,000</span>
              </div>
              <span className="text-sm">per seat / month</span>
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-blue-400" /> Access to all 40+ AI
                models
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-blue-400" /> Team workspace &
                collaboration
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-blue-400" /> Custom Styles
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-blue-800 hover:bg-blue-700">
              Get Pro
            </Button>
          </CardFooter>
        </Card>

        {/* Agency Plan */}
        <Card className={`relative flex flex-col border-green-500/15 bg-gradient-to-tr from-green-500/10 to-background backdrop-blur-md shadow-md transition-transform duration-500 ease-out scale-105 ${isSticky ? "h-max scale-100" : " h-auto"}`}>
          <BorderTrail className={`bg-green-500`} size={200} />
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl">Agency</CardTitle>
              <div className="flex items-center gap-2 text-sm">
                <span>{enabled ? "Yearly" : "Monthly"}</span>
                <Switch
                  checked={enabled}
                  onCheckedChange={setEnabled}
                  className="data-[state=checked]:bg-green-500"
                />
              </div>
            </div>
            <CardDescription className="my-3">
              For high-output creatives
            </CardDescription>
            <p className="text-4xl">
              <span className="text-4xl font-medium tracking-[-0.1rem] me-2">
                {enabled ? "$96" : "$120"}
              </span>
              <span className="text-base font-normal mb-3">
                per seat / month
              </span>
            </p>
          </CardHeader>
          <CardContent className={`flex-1 space-y-4 ${isSticky ? "hidden" : "blcok"}`}>
            <div className="border-2 border-green-500/10 mt-5 mb-10 px-4 py-3 rounded-lg flex items-center justify-between">
              <div className="flex gap-2 items-center">
                <LucideFlower size={20} />
                <span className="font-semibold">80,000</span>
              </div>
              <span className="text-sm">per seat / month</span>
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                Everything in Pro, plus:
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-400" />
                Buy more credits
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-green-800 hover:bg-green-700">
              Get Agency
            </Button>
          </CardFooter>
        </Card>

        {/* Enterprise Plan */}
        <Card className={`relative flex flex-col justify-between border-gray-500/15 bg-gradient-to-tr from-gray-500/10 to-background backdrop-blur-md shadow-md transition-transform duration-500 ease-out scale-105 ${isSticky ? "h-max scale-100" : " h-auto"}`}>
          <BorderTrail className={`bg-gray-500`} size={200} />
          <CardHeader>
            <CardTitle className="text-2xl">Enterprise</CardTitle>
            <CardDescription>
              Master creative AI tools with custom pricing, onboarding, and
              support
            </CardDescription>
          </CardHeader>
          <CardContent className="">
            <ul className={`space-y-2 text-sm mt-4 ${isSticky ? "hidden" : " blcok"}`}>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-gray-400" /> Advanced team
                management
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-gray-400" /> Custom credit limits
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-gray-400" /> Custom AI workflows
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-gray-400" /> White-glove support
              </li>
            </ul>
            <Button
              variant="outline"
              className="w-full bg-gray-800 hover:bg-gray-700 border-none text-white mt-5"
            >
              Get in touch
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* credit and generation estimates table */}
      <section>

        <div className="flex gap-2 items-center mt-10 mb-3">
          <LucideFlower size={20} />
          <p className="font-medium">Credits and Generation Estimates</p>
        </div>

        <Table>
          <TableBody>
            <TableRow className="">
              <TableCell className="align-top w-1/3 py-4">
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <span className="font-medium">
                      20,000 credits
                    </span>
                    <span className=" ml-2">per seat / month</span>
                  </div>
                </div>
              </TableCell>
              <TableCell className="align-top w-1/3 py-4">
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <span className=" font-medium">80,000</span>
                    <span className=" ml-1">to</span>
                    <span className=" font-medium ml-1">240,000</span>
                    <span className=" ml-2">
                      credits per seat / month
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell className="align-top w-1/3 py-4">
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                  <span className="">Custom credit limits</span>
                </div>
              </TableCell>
            </TableRow>

            <TableRow className="">
              <TableCell className="align-top w-1/3 py-4">
                <div className="flex items-start gap-3">
                  <Minus className="w-4 h-4 text-muted mt-1 flex-shrink-0" />
                  <span className="text-muted">Buy more credits</span>
                </div>
              </TableCell>
              <TableCell className="align-top w-1/3 py-4">
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                  <span className="">Buy more credits</span>
                </div>
              </TableCell>
              <TableCell className="align-top w-1/3 py-4">
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                  <span className="">Buy more credits</span>
                </div>
              </TableCell>
            </TableRow>

            <TableRow className="">
              <TableCell className="align-top w-1/3 py-4">
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                  <span className="">Credit rollover</span>
                </div>
              </TableCell>
              <TableCell className="align-top w-1/3 py-4">
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                  <span className="">Credit rollover</span>
                </div>
              </TableCell>
              <TableCell className="align-top w-1/3 py-4">
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                  <span className="">Credit rollover</span>
                </div>
              </TableCell>
            </TableRow>

            <TableRow className="">
              <TableCell className="align-top w-1/3 py-4">
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <span className="">~10,000 text generations</span>
                    <div className="">per month</div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="align-top w-1/3 py-4">
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <span className="">~40,000</span>
                    <span className=" ml-1">to</span>
                    <span className=" ml-1">120,000</span>
                    <span className=" ml-1">text generations</span>
                    <div className="">per month</div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="align-top w-1/3 py-4">
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <span className="">
                      Custom number of text generations
                    </span>
                    <div className="">per month</div>
                  </div>
                </div>
              </TableCell>
            </TableRow>

            <TableRow className="">
              <TableCell className="align-top w-1/3 py-4">
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <span className="">~1,000 images</span>
                    <div className="">per month</div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="align-top w-1/3 py-4">
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <span className="">~4,000</span>
                    <span className=" ml-1">to</span>
                    <span className=" ml-1">12,000</span>
                    <span className=" ml-1">images</span>
                    <div className="">per month</div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="align-top w-1/3 py-4">
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <span className="">Custom number of images</span>
                    <div className="">per month</div>
                  </div>
                </div>
              </TableCell>
            </TableRow>

            <TableRow className="">
              <TableCell className="align-top w-1/3 py-4">
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <span className="">~100 videos</span>
                    <div className="">per month</div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="align-top w-1/3 py-4">
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <span className="">~400</span>
                    <span className=" ml-1">to</span>
                    <span className=" ml-1">1,200</span>
                    <span className=" ml-1">videos</span>
                    <div className="">per month</div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="align-top w-1/3 py-4">
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <span className="">Custom number of videos</span>
                    <div className="">per month</div>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

      </section>
      
      {/* credit and generation estimates table */}
      <section>

        <div className="flex gap-2 items-center mt-10 mb-3">
          <LucideFlower size={20} />
          <p className="font-medium">Credits and Generation Estimates</p>
        </div>

        <Table>
          <TableBody>
            <TableRow className="">
              <TableCell className="align-top w-1/3 py-4">
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <span className="font-medium">
                      20,000 credits
                    </span>
                    <span className=" ml-2">per seat / month</span>
                  </div>
                </div>
              </TableCell>
              <TableCell className="align-top w-1/3 py-4">
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <span className=" font-medium">80,000</span>
                    <span className=" ml-1">to</span>
                    <span className=" font-medium ml-1">240,000</span>
                    <span className=" ml-2">
                      credits per seat / month
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell className="align-top w-1/3 py-4">
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                  <span className="">Custom credit limits</span>
                </div>
              </TableCell>
            </TableRow>

            <TableRow className="">
              <TableCell className="align-top w-1/3 py-4">
                <div className="flex items-start gap-3">
                  <Minus className="w-4 h-4 text-muted mt-1 flex-shrink-0" />
                  <span className="text-muted">Buy more credits</span>
                </div>
              </TableCell>
              <TableCell className="align-top w-1/3 py-4">
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                  <span className="">Buy more credits</span>
                </div>
              </TableCell>
              <TableCell className="align-top w-1/3 py-4">
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                  <span className="">Buy more credits</span>
                </div>
              </TableCell>
            </TableRow>

            <TableRow className="">
              <TableCell className="align-top w-1/3 py-4">
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                  <span className="">Credit rollover</span>
                </div>
              </TableCell>
              <TableCell className="align-top w-1/3 py-4">
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                  <span className="">Credit rollover</span>
                </div>
              </TableCell>
              <TableCell className="align-top w-1/3 py-4">
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                  <span className="">Credit rollover</span>
                </div>
              </TableCell>
            </TableRow>

            <TableRow className="">
              <TableCell className="align-top w-1/3 py-4">
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <span className="">~10,000 text generations</span>
                    <div className="">per month</div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="align-top w-1/3 py-4">
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <span className="">~40,000</span>
                    <span className=" ml-1">to</span>
                    <span className=" ml-1">120,000</span>
                    <span className=" ml-1">text generations</span>
                    <div className="">per month</div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="align-top w-1/3 py-4">
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <span className="">
                      Custom number of text generations
                    </span>
                    <div className="">per month</div>
                  </div>
                </div>
              </TableCell>
            </TableRow>

            <TableRow className="">
              <TableCell className="align-top w-1/3 py-4">
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <span className="">~1,000 images</span>
                    <div className="">per month</div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="align-top w-1/3 py-4">
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <span className="">~4,000</span>
                    <span className=" ml-1">to</span>
                    <span className=" ml-1">12,000</span>
                    <span className=" ml-1">images</span>
                    <div className="">per month</div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="align-top w-1/3 py-4">
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <span className="">Custom number of images</span>
                    <div className="">per month</div>
                  </div>
                </div>
              </TableCell>
            </TableRow>

            <TableRow className="">
              <TableCell className="align-top w-1/3 py-4">
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <span className="">~100 videos</span>
                    <div className="">per month</div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="align-top w-1/3 py-4">
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <span className="">~400</span>
                    <span className=" ml-1">to</span>
                    <span className=" ml-1">1,200</span>
                    <span className=" ml-1">videos</span>
                    <div className="">per month</div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="align-top w-1/3 py-4">
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <span className="">Custom number of videos</span>
                    <div className="">per month</div>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

      </section>
    </main>
  );
}
