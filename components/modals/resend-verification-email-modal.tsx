"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { useEffect, useState, useTransition } from "react";
import { Send } from "lucide-react";
import { Separator } from "../ui/separator";
import { toast } from "sonner";
import { useResendVerificationEmailModal } from "@/store/use-resend-verification-email-modal";
import { Button } from "../ui/button";
import { resendVerificationEmail } from "@/actions/alert-email";
import { useEmailVerificationModal } from "@/store/use-verification-modal";


export const ResendVerificaionEmailModal = () => {
    const { email, isOpen, close } = useResendVerificationEmailModal();
    const {open} = useEmailVerificationModal();
    const [isClient, setIsClient] = useState(false);

    const [pending, startTransition] = useTransition();

    const handleResend = () => {
        if(pending) return;

        if(email){
            startTransition(() => {
                resendVerificationEmail({email})
                .then(() => {
                    toast.success("Verification link resend successfully")
                    close();
                    open();
                })
                .catch(() => toast.error("Something went wrong"));
            })
        }
        else{
            toast.error("Email is missing");
        }
    }

    useEffect(() => setIsClient(true), []);

    if (!isClient) return null;

    return (
        <Dialog open={isOpen} onOpenChange={close}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-2xl flex gap-2 items-center justify-center">
                        <Send className="h-6 w-6" /> Resend Verification link
                    </DialogTitle>
                    <DialogDescription className="py-2 pb-2 text-center">
                        To : <span className="text-black">{email}</span>
                    </DialogDescription>
                    <Separator className="my-3"/>
                    <div className="flex justify-between gap-4 w-full pt-4">
                        <Button
                            className="w-full"
                            onClick={handleResend}
                            disabled={pending}
                        >
                            Resend
                        </Button>
                        <Button
                            className="w-full"
                            variant="outline"
                            onClick={close}
                        >
                            Cancle
                        </Button>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};
