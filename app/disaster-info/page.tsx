import { AlertBox } from "@/components/alert-box";
import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { Suggestions } from "@/components/suggestions";
import { Separator } from "@/components/ui/separator";
import { getUserLocation } from "@/db/queries";
import { client } from "@/lib/sanity";
import { guide } from "@/lib/sanity-interface";
import { auth } from "@clerk/nextjs";
import { DisasterInfoCard } from "./disaster-info-card";

async function getData() {
    const query = `
        *[_type == 'guide'] | order(_createdAt desc){
            title,
            desc,
            "currSlug" : slug.current,
            titleImage
        }
    `;
    const data = await client.fetch(query);

    return data;
}

const DisasterInfoPage = async () => {

    const userLocationData = await getUserLocation();
    const {userId} = auth();
    const data : guide [] = await getData();
    
    const [
        userLocation
    ] = await Promise.all([
        userLocationData
    ]);

    console.log(navigator.geolocation);

    return (  
        <div className="flex gap-[48px] px-6">
            <FeedWrapper>
                <h1 className="text-lg sm:text-4xl font-bold leading-snug">
                    Disaster&apos;s Info
                </h1>
                <Separator className="mt-4 h-0.5"/>
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {data.map((d) => (
                      <DisasterInfoCard
                        key={d.title} 
                        title={d.title}
                        image={d.titleImage}
                        slug={d.currSlug} 
                      />
                  ))}
                </div>
            </FeedWrapper>
            <StickyWrapper>
                <AlertBox 
                    userLocation={userLocation}
                    userId={userId ?? undefined}
                />
                <Suggestions />
            </StickyWrapper>
        </div>
    );
}
 
export default DisasterInfoPage;