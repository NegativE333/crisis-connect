"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";

type Props = {
    postId: string;
}

export const getInfoById = async ({
    postId
}: Props) => {

    const {userId} = await auth();

    if(!userId){
        throw new Error("Unauthorized");
    }

    const infoPost = await db.shareInfo.findUnique({
        where: {
            id: postId
        }
    });

    if(!infoPost){
        throw new Error("Post does not exists");
    }

    return(infoPost);
}