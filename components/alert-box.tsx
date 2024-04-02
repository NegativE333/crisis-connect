"use client";

import { useLocationModal } from "@/store/use-location-modal";
import { Location } from "@prisma/client";
import { AlertCircle } from "lucide-react"
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

type Props = {
    userLocation?: Location | null;
    userId?: string;
}

export const AlertBox = ({
    userLocation,
    userId
} : Props) => {

    const {open} = useLocationModal();

    const router = useRouter();
    
    if(!userId){
        return(
            <div className="w-full flex gap-4 items-center justify-center">
                <Button 
                    className="w-full" 
                    onClick={() => router.push("/map")}
                >
                    Login
                </Button>
                <Button 
                    className="w-full"
                    onClick={() => router.push("/map")}
                >
                    Sign up
                </Button>
            </div>
        )
    }

    return(
        <div className="border-2 rounded-xl p-4 space-y-4">
            <div className="space-y-2">
                <h3 className="font-bold text-lg flex gap-2 items-center">
                    <AlertCircle 
                        className="h-6 w-6"
                    />
                    Alert&apos;s
                </h3>
            </div>
            {userLocation ? (
                <p className="text-muted-foreground">
                    There is no alert in your location.
                </p>
            ) : (
                <Button
                    onClick={open}
                    variant="outline"
                >
                    Add your location
                </Button>
            )}
        </div>
    )
}