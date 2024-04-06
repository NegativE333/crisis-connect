"use server";

import { db } from "@/lib/db";
import { auth, currentUser } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

type Props = {
    title: string;
    type?: string | undefined;
    description: string;
    imageUrl: string;
    location: string;
}

export const setShareInfo = async ({
    title,
    type = "",
    description,
    imageUrl,
    location
}: Props) => {
    const {userId} = await auth();
    const user = await currentUser();

    if(!userId || !user){
        throw new Error("Unauthorized");
    }

    const shareInfo = await db.shareInfo.create({
        data:{
            userId,
            title,
            type,
            description,
            imageUrl,
            location
        }
    });

    revalidatePath("/");
    revalidatePath("/add-alert");

    return { shareInfo };
}