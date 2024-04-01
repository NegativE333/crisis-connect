"use client";

import { useLocationModal } from "@/store/use-location-modal";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { useEffect, useState, useTransition } from "react";
import { FormInput } from "../form-input";
import { MapPin } from "lucide-react";
import { Separator } from "../ui/separator";
import { FormSubmit } from "../form-submit";
import { setUserLocation } from "@/actions/user-location";
import { toast } from "sonner";

export const LocationModal = () => {
    const { isOpen, close } = useLocationModal();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => setIsClient(true), []);

    const [pending, startTransition] = useTransition();

    const handleSubmit = (event: any) => {
        event.preventDefault(); 
        
        if (pending) return;

        const formData = new FormData(event.target);

        startTransition(() => {
            setUserLocation(formData.get("location") as string)
                .then(() => {
                    close();
                    toast.success("Location set!");
                })
                .catch(() => toast.error("Something went wrong"));
        });
    };

    if (!isClient) return null;

    return (
        <Dialog open={isOpen} onOpenChange={close}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-3xl flex gap-2 items-center">
                        <MapPin className="h-6 w-6" /> Location
                    </DialogTitle>
                    <DialogDescription className="mx-0">
                        Add your location to get alerts related to that particular location only.
                    </DialogDescription>
                    <form onSubmit={handleSubmit} className="mx-0">
                        <div className="space-y-4">
                            <FormInput
                                label="Location"
                                id="location"
                                type="text"
                            />
                            <Separator />
                            <FormSubmit className="w-full">
                                Set
                            </FormSubmit>
                        </div>
                    </form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};
