"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useDeleteInfoModal } from "@/store/use-delete-info-modal";
import { MapPin, ShieldCheck, ShieldXIcon, Trash } from "lucide-react";
import Image from "next/image"
import { useRouter } from "next/navigation";

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
    verifiedBy
}: Props) => {

    const router = useRouter();

    const {open} = useDeleteInfoModal();

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
                        alt="hi there"
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
                <div className="flex flex-col">
                    <p className="flex gap-1 items-center font-semibold justify-start text-start">
                        <MapPin className="h-4 w-4"/>
                        {location}
                    </p>
                    <Separator className="my-2"/>
                    <div className="flex justify-between items-center">
                        <div className="rounded-full bg-opacity-65 text-green-900 flex gap-1 items-center text-base">
                            <ShieldCheck className="h-4 w-4"/> {verifiedBy.length}
                        </div>
                        <Button
                            variant="outline"
                            size="heightFit"
                            className="border border-red-600 text-red-900 ml-auto hover:bg-red-600 hover:bg-opacity-20 w-[30px] h-[30px]"
                            onClick={userId !== '' ? () => open(postId) : handleSignIn}
                        >
                            <Trash className="h-4 w-4"/>
                         </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}