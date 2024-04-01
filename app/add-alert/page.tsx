import { AlertBox } from "@/components/alert-box";
import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { Suggestions } from "@/components/suggestions";
import { Separator } from "@/components/ui/separator";
import { getUserLocation } from "@/db/queries";


const AddAlertPage = async () => {

    const userLocationData = await getUserLocation();

    const [
        userLocation
    ] = await Promise.all([
        userLocationData
    ]);

    return (  
        <div className="flex gap-[48px] px-6">
            <FeedWrapper>
                <h1 className="text-lg sm:text-4xl font-bold leading-snug">
                    Contribute to Disaster Awareness: Share Your Insights and Stay Connected
                </h1>
                <Separator className="mt-4 h-0.5"/>
            </FeedWrapper>
            <StickyWrapper>
                <AlertBox 
                userLocation={userLocation}
                />
                <Suggestions />
            </StickyWrapper>
        </div>
    );
}
 
export default AddAlertPage;