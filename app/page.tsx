import { AlertBox } from "@/components/alert-box";
import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { Suggestions } from "@/components/suggestions";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getUserLocation } from "@/db/queries";
import { auth } from "@clerk/nextjs";

export default async function Home() {

  const userLocationData = await getUserLocation();
  const {userId} = auth();

  const [
      userLocation
  ] = await Promise.all([
      userLocationData
  ]);

  return (
    <div className="flex gap-[48px] px-6">
      <FeedWrapper>
        <h1 className="text-lg sm:text-4xl font-bold leading-snug">
          Crowd-Sourced Insights on Disasters
        </h1>
        <Separator className="mt-4 h-0.5"/>
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
