import { Separator } from "@/components/ui/separator";
import { Loader } from "lucide-react";


const ShareInfoPageLoading = () => {
    return (  
        <div>
            <h1 className="text-lg sm:text-4xl font-bold leading-snug">
                Contribute to <span className="text-rose-500">Disaster</span> Awareness
            </h1>
            <Separator className="mt-4 h-0.5"/>
            <div className="h-[80vh] flex items-center justify-center">
                <Loader className="animate-spin"/>
            </div>
        </div>
    );
}
 
export default ShareInfoPageLoading;