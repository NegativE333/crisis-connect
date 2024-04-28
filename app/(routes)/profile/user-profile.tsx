"use client";

import { UserButton, useSession } from "@clerk/nextjs";
import Image from "next/image";
import { format } from 'date-fns';
import { Calendar, Mail } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
    infoCount: number;
    totalAmountDonated: number;
}

export const UserProfile = ({
    infoCount,
    totalAmountDonated
}: Props) => {

    const { session } = useSession();

    return (
        <div className="flex">
            <div className="flex gap-2">
                {session ? (
                    <div className="relative">
                        <div className="absolute z-0 top-3 left-3 opacity-0">
                            <UserButton afterSignOutUrl="/"/>
                        </div>
                        <Image
                             src={session?.user.imageUrl}
                             alt="profile"
                             height={50}
                             width={50}
                             className="rounded-full z-50"
                         />
                    </div>
                ) : (
                    <Skeleton className="h-[50px] w-[50px] rounded-full" />
                )}
                <div className="flex flex-col justify-center">
                    {session?.user.fullName ? (
                        <p className="font-semibold">
                            {session.user.fullName}
                        </p>
                    ) : (
                        <Skeleton className="h-6 w-28" />
                    )}
                    {infoCount < 2 ? (
                        <p className="text-sm text-muted-foreground">
                            You&apos;ve shared <span className="text-black">{infoCount}</span>  post and donated <span className="text-black min-w-8">{totalAmountDonated} ₹</span>.
                        </p>
                    ) : (
                        <p className="text-sm text-muted-foreground">
                            You&apos;ve shared <span className="text-black">{infoCount}</span>  posts and donated <span className="text-black">{totalAmountDonated.toLocaleString()} ₹</span>. 
                        </p>
                    )}
                </div>
            </div>
            <div className="ml-auto text-sm flex gap-2 flex-col items-start justify-center">
                {session?.user.createdAt ? (
                    <div className="flex gap-1 items-center justify-center text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        Joined on <span className="text-black">{format(session.user.createdAt, "d MMM yyyy")}</span>
                    </div>
                ) : (
                    <div className="flex gap-1 items-center justify-center text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        Joined on <Skeleton className="h-5 w-20" />
                    </div>
                )}
                {session?.user.emailAddresses[0].emailAddress ? (
                    <div className="flex gap-1 items-center justify-center text-muted-foreground">
                        <Mail className="h-4 w-4" />
                        <span className="text-black">
                            {session.user.emailAddresses[0].emailAddress}
                        </span>
                    </div>
                ) : (
                    <div className="flex gap-1 items-center justify-center text-muted-foreground">
                        <Mail className="h-4 w-4" />
                        <Skeleton className="h-5 w-40" />
                    </div>
                )}
            </div>
        </div>
    )
}