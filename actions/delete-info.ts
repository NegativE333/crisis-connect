"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

type Props = {
    postId: string;
}

export const deletePost = async ({
    postId
}: Props) => {

    const {userId} = await auth();

    if(!userId){
        throw new Error("Unauthorized");
    }

    const shareInfoPost = await db.shareInfo.delete({
        where: {
            id: postId
        }
    });

    if(!shareInfoPost){
        throw new Error("Post does not exists");
    }

    revalidatePath("/");
    revalidatePath("/add-alert");
    revalidatePath("/profile");
}