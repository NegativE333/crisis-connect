"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { TooltipWrapper } from "@/components/wrapper/tooltip-wrapper";
import { minVerificationsNeeded } from "@/constants";
import { useDeleteInfoModal } from "@/store/use-delete-info-modal";
import { BadgeCheck, MapPin, PenLine, ShieldCheck, ShieldXIcon, SquarePen, Trash } from "lucide-react";
import Image from "next/image"
import { useRouter } from "next/navigation";
import {format} from 'date-fns';

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
    isUpdated: boolean;
    updatedAt: Date;
    createdAt: Date;
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
    isUpdated,
    createdAt,
    updatedAt
}: Props) => {

    const router = useRouter();

    const {open: openDeleteModal} = useDeleteInfoModal();

    const handleSignIn = () => {
        router.push('/sign-in');
    }

    if(verifiedBy.length >= minVerificationsNeeded) isVerified = true;

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
                {isUpdated && (
                    <div className="absolute left-1 top-1 flex gap-0.5 text-xs justify-center items-center bg-black/20 p-1 rounded-full">
                        <PenLine className="h-3 w-3"/> Edited
                    </div>
                )}
                <div className="absolute left-0.5 bottom-0.5">
                    <Badge className="py-1">
                        {type}
                    </Badge>
                </div>
                <div className="absolute right-0.5 bottom-0.5">
                    <Badge className="py-0.5 bg-green-300 text-emerald-900 hover:bg-emerald-200">
                        <BadgeCheck className="h-3 w-3 mr-1"/>
                        {verifiedBy.length}
                    </Badge>
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
                        <div>
                            {format(createdAt, "d MMM yyyy 'at' p")}
                        </div>
                        <div className="ml-auto flex gap-2">
                            <TooltipWrapper tip="Edit">
                                <Button
                                    variant="outline"
                                    className="border px-0 py-0 text-black ml-auto hover:bg-gray-400 hover:bg-opacity-20 h-[30px] w-[30px]"
                                    onClick={userId !== '' ? () => router.push(`/edit/${postId}`) : handleSignIn}
                                >
                                        <SquarePen className="h-5 w-5"/>
                                </Button>
                            </TooltipWrapper>
                            <TooltipWrapper tip="Delete">
                                <Button
                                    variant="outline"
                                    className="border px-0 py-0 text-red-900 ml-auto hover:bg-red-600 hover:bg-opacity-20 w-[30px] h-[30px]"
                                    onClick={userId !== '' ? () => openDeleteModal(postId) : handleSignIn}
                                >
                                    <Trash className="h-5 w-5"/>
                                </Button>
                            </TooltipWrapper>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}