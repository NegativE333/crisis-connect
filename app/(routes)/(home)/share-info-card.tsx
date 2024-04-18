"use client";

import { unVerifyPost, verifyPost } from "@/actions/verify-unverify-post";
import { Button } from "@/components/ui/button";
import { Loader, MapPin, PenLine, ShieldCheck, ShieldXIcon } from "lucide-react";
import Image from "next/image"
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

type Props = {
    userId: string;
    postId: string;
    title: string;
    type: string;
    description: string;
    imageSrc: string;
    location: string;
    isVerified: boolean;
    verifiedBy: string[];
    createdAt: Date;
    updatedAt: Date;
}

export const ShareInfoCard = ({
    userId,
    postId,
    title,
    type,
    description,
    imageSrc,
    location,
    isVerified,
    verifiedBy,
    createdAt,
    updatedAt
}: Props) => {

    const router = useRouter();

    const [pending, startTransition] = useTransition();

    
    const isVerifiedByMe = verifiedBy.findIndex((id) => id === userId);

    const handleVerify = () => {
        if(pending) return;

        startTransition(() => {
            verifyPost({postId})
            .then(() => toast.success("Post verified"))
            .catch(() => toast.error("Something went wrong"));
        })
    }

    const handleUnVerify = () => {
        if(pending) return;

        startTransition(() => {
            unVerifyPost({postId})
            .then(() => toast.success("Post unverified"))
            .catch(() => toast.error("Something went wrong"));
        })
    }

    const handleSignIn = () => {
        router.push('/sign-in');
    }

    if(verifiedBy.length >= 1) isVerified = true;

    return (
        <div className="relative flex w-full max-w-[26rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
            <div
                className="relative mx-4 mt-4 overflow-hidden text-white shadow-lg rounded-xl bg-blue-gray-500 bg-clip-border shadow-blue-gray-500/40 h-[200px]">
                {imageSrc ? (
                    <Image
                        alt="info-image"
                        src={imageSrc}
                        fill
                    />
                ) : (
                    <div>
                        Not
                    </div>
                )}
                {isVerified ? (
                    <div className="absolute right-1 top-1 bg-green-300 p-1 rounded-full px-2 bg-opacity-65 text-green-900 flex gap-1 items-center text-sm">
                        <ShieldCheck className="h-4 w-4"/> Verified
                    </div>
                ) : (
                    <div className="absolute right-1 top-1 bg-red-300 p-1 rounded-full px-2 bg-opacity-65 text-red-900 flex gap-1 items-center text-sm">
                        <ShieldXIcon className="h-4 w-4"/> Not Verified
                    </div>
                )}
                {createdAt.getTime().toLocaleString() !== updatedAt.getTime().toLocaleString() && (
                    <div className="absolute left-1 top-1 flex gap-0.5 text-xs justify-center items-center bg-black/20 p-1 rounded-full">
                        <PenLine className="h-3 w-3"/> Edited
                    </div>
                )}
                <div className="absolute right-1 bottom-1 bg-black bg-opacity-40 p-1 px-2 rounded-full">
                    {type}
                </div>
            </div>
            <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                    <h5 className="block font-sans text-xl antialiased font-medium leading-snug tracking-normal text-blue-gray-900">
                        {title}
                    </h5>
                </div>
                <p className="block font-sans text-base antialiased font-light leading-relaxed text-gray-700 mb-3">
                    {description}
                </p>
                <div className="flex items-center">
                    <p className="flex gap-1 items-center font-semibold">
                        <MapPin className="h-4 w-4"/>
                        {location}
                    </p>
                    {isVerifiedByMe < 0 ? (
                        <Button
                            variant="outline"
                            size="heightFit"
                            className="border border-green-600 text-green-900 ml-auto hover:bg-green-600 hover:bg-opacity-20 w-[56px] h-[30px]"
                            onClick={userId !== '' ? handleVerify : handleSignIn}
                        >
                            {pending ? (
                                <Loader className="animate-spin h-4 w-4"/>
                            ) 
                            : 
                            ("Verify")
                            }
                        </Button>
                    ) : (
                        <Button
                            variant="outline"
                            size="heightFit"
                            className="border border-red-600 text-red-900 ml-auto hover:bg-red-600 hover:bg-opacity-20 w-[70px] h-[30px]"
                            onClick={handleUnVerify}
                        >
                            {pending ? (
                                <Loader className="animate-spin h-4 w-4"/>
                            ) 
                            : 
                            ("Unverify")
                            }
                        </Button>
                    )}
                </div>
            </div>
        </div>
    )
}