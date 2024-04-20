"use client";

import { useUpdateEmailModal } from "@/store/use-update-email-modal";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { useEffect, useState, useTransition } from "react";
import { FormInput } from "../form/form-input";
import { SquarePen } from "lucide-react";
import { Separator } from "../ui/separator";
import { FormSubmit } from "../form/form-submit";
import { toast } from "sonner";
import { getAlertEmailData, updateUserAlertEmail } from "@/actions/alert-email";
import { useEmailVerificationModal } from "@/store/use-verification-modal";

export const UpdateEmailModal = () => {
    const { id, isOpen, close } = useUpdateEmailModal();
    const { open } = useEmailVerificationModal();
    const [isClient, setIsClient] = useState(false);
    const [prevEmail, setPrevEmail] = useState<string | undefined>();
    const [prevLocation, setPrevLocation] = useState<string | undefined>("");

    const [pending, startTransition] = useTransition();

    useEffect(() => {
        if(id){
            startTransition(() => {
                getAlertEmailData({userId: id})
                .then((data) => {
                    setPrevEmail(data.alertEmailData?.email);
                    setPrevLocation(data.alertEmailData?.location)
                })
                .catch(() => console.log("Something went wrong while getting alert email data"));
            })
        }
    },[id]);

    useEffect(() => setIsClient(true), []);

    const handleSubmit = (event: any) => {
        event.preventDefault();

        if (pending) return;

        const formData = new FormData(event.target);

        startTransition(() => {

            const email = formData.get("email") as string;
            const location = formData.get("location") as string;

            updateUserAlertEmail({ email, location })
                .then((data) => {
                    close();
                    if(!data.isVerified){
                        toast.success("Verification email sent");
                        open();
                    }
                    else{
                        toast.success("Alert info updated successfully!");
                    }
                    setPrevEmail(data.userAlertEmail.email);
                    setPrevLocation(data.userAlertEmail.location);
                })
                .catch(() => {
                    toast.error("Something went wrong");
                })
        });

    };

    if (!isClient) return null;

    return (
        <Dialog open={isOpen} onOpenChange={close}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-2xl flex gap-2 items-center justify-center">
                        <SquarePen className="h-6 w-6" /> Update Email or Location
                    </DialogTitle>
                    <DialogDescription className="py-1 text-center">
                        Set Your Email and Preferred Location for Timely Notifications
                    </DialogDescription>
                    <Separator />
                    <form onSubmit={handleSubmit} className="mx-0">
                        <div className="space-y-4">
                            <FormInput
                                label="Location"
                                id="location"
                                type="text"
                                defaultValue={prevLocation}
                            />
                            <FormInput
                                label="Email"
                                id="email"
                                type="email"
                                defaultValue={prevEmail}
                            />
                            <Separator />
                            <FormSubmit
                                isProcessing={pending}
                                className="w-full"
                            >
                                Update
                            </FormSubmit>
                        </div>
                    </form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};
