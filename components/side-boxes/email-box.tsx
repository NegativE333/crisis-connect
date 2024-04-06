"use client";

import { Button } from "../ui/button";
import { Mail, MailWarning, MapPin } from "lucide-react";
import { useSetEmailModal } from "@/store/use-set-email-modal";
import { checkVerificationStatus } from "@/lib/verify-email";

type Props = {
    email?: string,
    location?: string
    isVerified?: boolean;
}

export const EmailBox = ({
    email,
    location,
    isVerified
}: Props) => {

    const { open } = useSetEmailModal();

    return (
        <div className="border-2 rounded-xl p-4 space-y-4">
            <div className="flex items-center justify-between w-full space-y-2">
                <h3 className="font-bold text-lg flex items-center gap-2">
                    <MailWarning />
                    Email Alerts
                </h3>
                {!email ? (
                    <Button
                        onClick={open}
                        size="sm"
                        variant="outline"
                    >
                        Set
                    </Button>
                ) : (
                    <div>
                        {isVerified ? (
                            <p className="bg-green-600 bg-opacity-75 p-1 px-2 rounded-full text-xs text-green-900 font-semibold">
                                Verified
                            </p>
                        ) : (
                            <p className="bg-red-600 bg-opacity-75 p-1 px-2 rounded-full text-xs text-red-900 font-semibold">
                                Not verified
                            </p>
                        )}
                    </div>
                )}
            </div>
            <div>
                {!email ? (
                    <p className="text-sm text-muted-foreground">
                        Set Your Email and Preferred Location to Receive Email Alerts.
                    </p>
                ) : (
                    <div className="text-sm flex flex-col gap-2">
                        <p className="flex gap-1 items-center">
                            <Mail className="h-4 w-4" />
                            {email}
                        </p>
                        <p className="flex gap-1 items-center">
                            <MapPin className="h-4 w-4" />
                            {location}
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}