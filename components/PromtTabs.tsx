import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, Paintbrush, Settings2 } from "lucide-react";

export default function PromtTabs() {
    return (
        <Tabs defaultValue="customize">
            <div className="flex flex-row h-full">
            {/* Tab List */}
            <TabsList className="flex flex-col w-1/3 py-6 pe-4">
                <TabsTrigger
                value="model"
                className="flex items-center gap-2 text-base"
                >
                <Package className={"size-5 text-foreground"} />
                Model
                </TabsTrigger>
                <TabsTrigger
                value="customize"
                className="flex items-center gap-2 text-base pb-3"
                >
                <Settings2 className={"size-5 text-foreground"} />
                Customize
                </TabsTrigger>
                <TabsTrigger
                value="style"
                className="flex items-center gap-2 text-base"
                >
                <Paintbrush className={"size-5 text-foreground"} />
                Template Style
                </TabsTrigger>
            </TabsList>
            {/* Tab Content */}
            <div className="w-3/4 py-6 ps-4">
                <TabsContent value="model" className="mt-0">
                <Tabs defaultValue="account" className="w-[400px]">
                    <TabsList>
                    <TabsTrigger value="account">Account</TabsTrigger>
                    <TabsTrigger value="password">Password</TabsTrigger>
                    </TabsList>
                    <TabsContent value="account">
                    Make changes to your account here.
                    </TabsContent>
                    <TabsContent value="password">
                    Change your password here.
                    </TabsContent>
                </Tabs>
                </TabsContent>
                <TabsContent value="customize" className="mt-0">
                <div className="flex justify-between items-center">
                    model
                </div>
                <div className="flex justify-between items-center">
                    Quality
                </div>
                <div className="flex justify-between items-center">
                    size
                </div>
                </TabsContent>
                <TabsContent value="style" className="mt-0">
                </TabsContent>
            </div>
            </div>
        </Tabs>
    )
}
