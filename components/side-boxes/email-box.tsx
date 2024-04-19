"use client";

import { Button } from "../ui/button";
import { Check, Mail, MailWarning, MapPin, SquarePen, X } from "lucide-react";
import { useSetEmailModal } from "@/store/use-set-email-modal";
import { useRouter } from "next/navigation";
import { TooltipWrapper } from "../wrapper/tooltip-wrapper";

type Props = {
    email?: string,
    location?: string
    isVerified?: boolean;
    userId: string | null;
}

export const EmailBox = ({
    email,
    location,
    isVerified,
    userId
}: Props) => {

    const { open } = useSetEmailModal();
    const router = useRouter();

    console.log(userId);

    return (
        <div className="border-2 rounded-xl p-4 space-y-4">
            <div className="flex items-center justify-between w-full space-y-2">
                <h3 className="font-bold text-lg flex items-center gap-2">
                    <MailWarning />
                    Email Alerts
                </h3>
                {!email ? (
                    <Button
                        onClick={userId ? () => open : () => router.push('/sign-in')}
                        size="sm"
                        variant="outline"
                    >
                        Set
                    </Button>
                ) : (
                    <div>
                        <TooltipWrapper tip="Edit">
                            <SquarePen className="h-5 w-5 cursor-pointer"/>
                        </TooltipWrapper>
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
                        <div className="flex gap-1 items-center">
                            <p className="flex gap-1 items-center">
                                <Mail className="h-4 w-4" />
                                {email}
                            </p>
                            <div className="ml-auto">
                                {isVerified ? (
                                    <div className="border border-green-400 rounded-full text-xs px-1 text-green-900">
                                        Verified
                                    </div>
                                ) : (
                                    <div className="border border-red-400 rounded-full text-xs px-1 text-red-900">
                                        Not Verified
                                    </div>
                                )}
                            </div>
                        </div>
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