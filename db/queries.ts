import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { cache } from "react";

export const getUserLocation = cache(async () => {
     const {userId} = auth();

     if(!userId) return null;

     const data = await db.location.findUnique({
        where: {
            userId
        }
     });

     return data;
});