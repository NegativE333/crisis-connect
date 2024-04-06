"use client";

import { AlertCircle, Loader, MapPin } from "lucide-react"
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { alertProps } from "@/lib/sanity-interface";
import { cn } from "@/lib/utils";
import { AlertHover } from "./alert-hover";
import { toast } from "sonner";

type Props = {
    userLocation?: string;
    userId?: string;
    alert: alertProps[];
    alertTitle?: string;
}

export const AlertBox = ({
    userLocation,
    userId,
    alert,
}: Props) => {

    const router = useRouter();

    const [location, setLocation] = useState(userLocation);
    const [isMounted, setIsMounted] = useState(false);

    
        const fetchLoc = async () => {
            try{
                let url = `https://ipinfo.io/json?token=${process.env.NEXT_PUBLIC_IPINFO_TOKEN}`
                let res = await fetch(url);
                let data = await res.json();
                setLocation(data.city);
            }
            catch(error){
                toast.error("Failed to fetch your current location");
            }
        }

        useEffect(() => {
            fetchLoc();
            setIsMounted(true);
        }, []);

    if (!userId) {
        return (
            <div className="w-full flex gap-4 items-center justify-center">
                <Button
                    className="w-full"
                    onClick={() => router.push("/sign-in")}
                >
                    Login
                </Button>
                <Button
                    className="w-full"
                    onClick={() => router.push("/sign-up")}
                >
                    Sign up
                </Button>
            </div>
        )
    }

    if (!isMounted) {
        return null;
    }

    const alerts = alert.filter((a) => a.location === location);

    return (
        <div className="border-2 rounded-xl p-4 space-y-4">
            <div className="space-y-2 relative">
                <h3 className="font-bold text-lg flex gap-2 items-center">
                    <AlertCircle
                        className="h-6 w-6"
                    />
                    Alert&apos;s
                </h3>
                <p className="absolute -top-3 right-0 text-sm">
                    {location === '' ? (
                        <div className="flex gap-2 items-center">
                            <Loader className="animate-spin duration-1000 h-4 w-4" />
                        </div>
                    ) : (
                        <div className={cn(
                            alert.length === 0 && "text-green-700 bg-green-500/30",
                            alert.length === 1 && "text-yellow-700 bg-yellow-500/30",
                            alert.length === 2 && "text-orange-700 bg-orange-500/30",
                            alert.length >= 3 && "text-red-700 bg-red-500/30",
                            "flex items-center gap-1 p-0.5 px-2 rounded-full"
                        )}>
                            <MapPin className="h-4 w-4" />{location}
                        </div>
                    )}
                </p>
            </div>
            {alerts.length > 0 ? (
                <div className="flex flex-col gap-1">
                    {alerts.map((alert) => (
                        <div
                            className="p-2 rounded-full w-fit bg-opacity-75 flex gap-2 font-semibold"
                            key={alert.title}
                        >
                            <AlertHover
                                title={alert.title}
                                type={alert.type}
                                level={alert.level}
                            >
                                <AlertCircle className={cn(
                                    alert.level === 1 && "text-yellow-500",
                                    alert.level === 2 && "text-orange-500",
                                    alert.level === 3 && "text-red-500",
                                    "cursor-pointer hover:text-black transition"
                                )} />
                            </AlertHover>
                            {alert.type}
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-muted-foreground">
                    There is no alert in your location.
                </p>
            )}
        </div>
    )
}