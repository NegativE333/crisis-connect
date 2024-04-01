"use server";

import { db } from "@/lib/db";
import { auth, currentUser } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

export const setUserLocation = async (location : string) => {
    const {userId} = await auth();
    const user = await currentUser();

    if(!userId || !user){
        throw new Error("Unauthorized");
    }

    const userLocation = await db.location.create({
        data:{
            userId,
            location
        }
    });

    revalidatePath("/");
    revalidatePath("/map");
    revalidatePath("/add-alert");
    revalidatePath("/help");

    return { userLocation };
}