"use server";

import { db } from "@/lib/db";
import { auth, currentUser } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import AWS from 'aws-sdk';
import { checkVerificationStatus } from "@/lib/verify-email";

type Props = {
    location : string;
    email : string;
};

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY_KEY,
    region: process.env.AWS_REGION_KEY,
});

const ses = new AWS.SES({ apiVersion : "2010-12-10" });

export const setUserAlertEmail = async ({
    location,
    email
} : Props) => {

    const isVerified = await checkVerificationStatus(email);

    const {userId} = await auth();
    const user = await currentUser();

    if(!userId || !user){
        throw new Error("Unauthorized");
    }

    const userAlertEmail = await db.email.create({
        data:{
            userId,
            email,
            location
        }
    });

    if(!isVerified){
        const verifyProps = {
            EmailAddress: email
        };

        await ses.verifyEmailAddress(verifyProps, (err, data) => {
            if(err){
                throw new Error("Error while sending verfication email");
            }
            else{
                console.log("Email Sent");
            }
        });
    }
    else{
        console.log("email verified");
    }

    revalidatePath("/");
    revalidatePath("/map");
    revalidatePath("/add-alert");
    revalidatePath("/help");

    return { userAlertEmail, isVerified };
}