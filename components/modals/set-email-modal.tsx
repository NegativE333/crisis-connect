"use client";

import { useSetEmailModal } from "@/store/use-set-email-modal";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { useEffect, useState, useTransition } from "react";
import { FormInput } from "../form/form-input";
import { MailWarning } from "lucide-react";
import { Separator } from "../ui/separator";
import { FormSubmit } from "../form/form-submit";
import { toast } from "sonner";
import { setUserAlertEmail } from "@/actions/alert-email";
import { useEmailVerificationModal } from "@/store/use-verification-modal";

export const SetEmailModal = () => {
    const { isOpen, close } = useSetEmailModal();
    const { open } = useEmailVerificationModal();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => setIsClient(true), []);

    const [pending, startTransition] = useTransition();

    const handleSubmit = (event: any) => {
        event.preventDefault();

        if (pending) return;

        const formData = new FormData(event.target);

        startTransition(() => {

            const email = formData.get("email") as string;
            const location = formData.get("location") as string;

            setUserAlertEmail({ email, location })
                .then((data) => {
                    close();
                    if(!data.isVerified){
                        toast.success("Verification email sent");
                        open();
                    }
                    else{
                        toast.success("Email set successfully!");
                    }
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
                        <MailWarning className="h-6 w-6" /> Email Alerts
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
                            />
                            <FormInput
                                label="Email"
                                id="email"
                                type="email"
                            />
                            <Separator />
                            <FormSubmit
                                isProcessing={pending}
                                className="w-full"
                            >
                                Set
                            </FormSubmit>
                        </div>
                    </form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};
