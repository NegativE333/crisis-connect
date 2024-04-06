"use client";

import { useEmailVerificationModal } from "@/store/use-verification-modal";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { useEffect, useState } from "react";
import { MailCheck } from "lucide-react";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";

export const VerificationModal = () => {
    const { isOpen, close } = useEmailVerificationModal();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => setIsClient(true), []);

    if (!isClient) return null;

    return (
        <Dialog open={isOpen} onOpenChange={close}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-2xl flex gap-2 items-center justify-center">
                        <MailCheck className="h-6 w-6" /> Verification Email Sent
                    </DialogTitle>
                    <DialogDescription className="py-4 text-center">
                        Check Your Inbox for a Verification Email from Amazon SES
                    </DialogDescription>
                    <Separator />
                    <Button
                        onClick={close}
                    >
                        Ok
                    </Button>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};
