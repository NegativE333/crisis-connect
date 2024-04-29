import { Separator } from "@/components/ui/separator";
import { getCampaigns } from "@/db/queries";
import Image from "next/image";
import { CollectedAmount } from "./collected-amount";
import { Badge } from "@/components/ui/badge";
import { Info, MapPin } from "lucide-react";
import { DonateInfoHover } from "./donate-info-hover";

const DonatePage = async () => {

    const campaignsData = getCampaigns();

    const [campaigns] = await Promise.all([campaignsData]);

    return (
        <div>
            <div className="flex items-center justify-between">
                <h1 className="text-lg sm:text-4xl font-bold leading-snug">
                    Support <span className="text-rose-500">Disaster</span> Relief: Donate Now
                </h1>
                <DonateInfoHover>
                    <Info className="ml-auto h-8 w-8 animate-pulse duration-1000"/>
                </DonateInfoHover>
            </div>
            <Separator className="mt-4 h-0.5" />
            <div className="mt-4 flex flex-col gap-4">
                {campaigns?.map((c) => {
                    return (<div key={c.id} className="relative flex bg-clip-border rounded-xl bg-white text-gray-700 shadow-md w-full max-w-[48rem] flex-row">
                        <div
                            className="relative w-2/5 m-0 overflow-hidden text-gray-700 bg-white rounded-r-none bg-clip-border rounded-xl shrink-0">
                            {c.imageUrl && (
                                <Image
                                    src={c.imageUrl}
                                    alt="c-image" 
                                    fill
                                />
                            )}
                            <div className="absolute top-1 right-1">
                                <Badge className="flex gap-1 items-center justify-center">
                                    <MapPin className="h-3 w-3"/>
                                    {c.location}
                                </Badge>
                            </div>
                        </div>
                        <div className="px-6 py-3">
                            <h4 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                                {c.name}
                            </h4>
                            <p className="block mb-4 font-sans text-sm antialiased font-normal leading-relaxed text-gray-700">
                                {c.description}
                            </p>
                            <CollectedAmount 
                                campaignId={c.id}
                                need={parseInt(c.need)}
                                createdAt={c.createdAt}
                                campaignName={c.name}
                            />
                        </div>
                    </div>)
                })}
            </div>
        </div>
    );
}

export default DonatePage;