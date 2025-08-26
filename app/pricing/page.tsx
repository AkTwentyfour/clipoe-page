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
import { Switch } from "@/components/ui/switch";
import { Check, Heading1, LucideFlower, Section } from "lucide-react";
import React from "react";

export default function Page() {
  const [enabled, setEnabled] = React.useState(true);
  return (
    <main className="container max-w-6xl mx-auto px-4">
      {/* hero */}
      <section className="py-5 mb-15 flex flex-col items-center justify-center px-4">
        <h1 className="mb-4 font-medium text-center text-4xl tracking-[-0.14rem] md:text-4xl">
          Your team's new all-in-one creative solution
        </h1>
        <p className="max-w-2xl text-center text-muted-foreground tracking-[-0.01rem] sm:text-lg">
          Simple plans that scale with your team
        </p>
      </section>

      <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-5">
        {/* Pro Plan */}
        <Card className="relative flex flex-col border-blue-500/15 bg-gradient-to-tr from-blue-500/10 to-black backdrop-blur-sm">
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
          <CardContent className="flex-1 space-y-4">
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
        <Card className="relative flex flex-col border-green-500/15 bg-gradient-to-tr from-green-500/10 to-black backdrop-blur-sm">
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
          <CardContent className="flex-1 space-y-4">
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
                <Check className="w-4 h-4 text-green-400" />Buy more credits
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
        <Card className="relative flex flex-col justify-between border-yellow-500/15 bg-gradient-to-tr from-yellow-500/10 to-black backdrop-blur-sm">
          <BorderTrail className={`bg-yellow-500`} size={200} />
          <CardHeader>
            <CardTitle className="text-2xl">Enterprise</CardTitle>
            <CardDescription>
              Master creative AI tools with custom pricing, onboarding, and
              support
            </CardDescription>
          </CardHeader>
          <CardContent className="">
            <ul className="space-y-2 text-sm mt-4">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-yellow-400" /> Advanced team
                management
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-yellow-400" /> Custom credit
                limits
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-yellow-400" /> Custom AI workflows
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-yellow-400" /> White-glove support
              </li>
            </ul>
            <Button
              variant="outline"
              className="w-full bg-yellow-800 hover:bg-yellow-700 text-white mt-5"
            >
              Get in touch
            </Button>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
