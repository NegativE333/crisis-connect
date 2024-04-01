"use client";

import { useLocationModal } from "@/store/use-location-modal";
import { Location } from "@prisma/client";
import { AlertCircle } from "lucide-react"
import { Button } from "./ui/button";

type Props = {
    userLocation?: Location | null;
}

export const AlertBox = ({
    userLocation
} : Props) => {

    const {open} = useLocationModal();

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