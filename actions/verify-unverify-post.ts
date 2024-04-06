"use server";

import { db } from "@/lib/db";
import { auth, currentUser } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

type Props = {
    postId: string;
}

export const verifyPost = async ({
    postId
}: Props) => {
    const {userId} = await auth();
    const user = await currentUser();

    if(!userId || !user){
        throw new Error("Unauthorized");
    }

    const shareInfoPost = await db.shareInfo.findUnique({
        where: {
            id: postId
        },
        select: {
            verifiedBy: true
        }
    });

    if(!shareInfoPost){
        throw new Error("Post does not exists");
    }

    const updatedVerifiedBy = [...shareInfoPost.verifiedBy, userId];

    await db.shareInfo.update({
        where: {
            id: postId
        },
        data:{
            verifiedBy: {
                set: updatedVerifiedBy
            }
        }
    });

    revalidatePath("/");
    revalidatePath("/add-alert");
}

export const unVerifyPost = async ({
    postId
}: Props) => {
    const {userId} = await auth();
    const user = await currentUser();

    if(!userId || !user){
        throw new Error("Unauthorized");
    }

    const shareInfoPost = await db.shareInfo.findUnique({
        where: {
            id: postId
        },
        select: {
            verifiedBy: true
        }
    });

    if(!shareInfoPost){
        throw new Error("Post does not exists");
    }

    const updatedVerifiedBy = shareInfoPost.verifiedBy.filter((id) => id !== userId);

    await db.shareInfo.update({
        where: {
            id: postId
        },
        data:{
            verifiedBy: {
                set: updatedVerifiedBy
            }
        }
    });

    revalidatePath("/");
    revalidatePath("/add-alert");
}