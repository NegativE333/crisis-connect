"use client";

import { Button } from "../ui/button";
import { Mail, MailWarning, MapPin, SquarePen} from "lucide-react";
import { useSetEmailModal } from "@/store/use-set-email-modal";
import { useRouter } from "next/navigation";
import { TooltipWrapper } from "../wrapper/tooltip-wrapper";
import { useUpdateEmailModal } from "@/store/use-update-email-modal";
import { useResendVerificationEmailModal } from "@/store/use-resend-verification-email-modal";

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

    const { open: openSetModal } = useSetEmailModal();
    const { open: openUpdateModal } = useUpdateEmailModal();
    const { open : openResendModal } = useResendVerificationEmailModal();

    const router = useRouter();

    return (
        <div className="border-2 rounded-xl p-4 space-y-4">
            <div className="flex items-center justify-between w-full space-y-2">
                <h3 className="font-bold text-lg flex items-center gap-2">
                    <MailWarning />
                    Email Alerts
                </h3>
                {!email ? (
                    <Button
                        onClick={userId ? () => openSetModal() : () => router.push('/sign-in')}
                        size="sm"
                        variant="outline"
                    >
                        Set
                    </Button>
                ) : (
                    <div>
                        <TooltipWrapper tip="Edit">
                            <SquarePen 
                                onClick={() => openUpdateModal(userId ?? "")}
                                className="h-5 w-5 cursor-pointer"
                            />
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
                    <div className="text-sm flex flex-col gap-2 relative">
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
                                    <div 
                                        className="border border-red-400 rounded-full text-xs px-1 text-red-900"
                                    >
                                        Not Verified
                                    </div>
                                )}
                            </div>
                        </div>
                        <p className="flex gap-1 items-center">
                            <MapPin className="h-4 w-4" />
                            {location}
                        </p>
                        {!isVerified && (
                            <div 
                                onClick={() => openResendModal(email)}
                                className="text-[10px] px-1 border rounded-full absolute bottom-0 right-0 cursor-pointer"
                            >
                                Resend Verificaion Link
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}