import { Separator } from "@/components/ui/separator";
import { Loader } from "lucide-react";


const HomePageLoading = () => {
    return (  
        <div>
            <h1 className="text-lg sm:text-4xl font-bold leading-snug">
                Crowd-Sourced Insights on <span className="text-rose-500">Disasters</span>
            </h1>
            <Separator className="mt-4 h-0.5"/>
            <div className="h-[80vh] flex items-center justify-center">
                <Loader className="animate-spin"/>
            </div>
        </div>
    );
}
 
export default HomePageLoading;