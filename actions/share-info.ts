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

type updateProps = {
    id: string;
    title: string;
    type?: string | undefined;
    description: string;
    imageUrl: string;
    location: string;
}

export const updateShareInfo = async ({
    id,
    title,
    type = "",
    description,
    imageUrl,
    location
}: updateProps) => {
    const {userId} = await auth();
    const user = await currentUser();

    if(!userId || !user){
        throw new Error("Unauthorized");
    }

    const updatedShareInfo = await db.shareInfo.update({
        where: {
            id
        },
        data:{
            userId,
            title,
            type,
            description,
            imageUrl,
            location,
            isUpdated: true,
        }
    });

    revalidatePath("/");
    revalidatePath("/add-alert");
    revalidatePath("/profile");

    return { updatedShareInfo };
}

type DeleteProps = {
    postId: string;
}

export const deletePost = async ({
    postId
}: DeleteProps) => {

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

type GetInfoByIdProps = {
    postId: string;
}

export const getInfoById = async ({
    postId
}: GetInfoByIdProps) => {

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