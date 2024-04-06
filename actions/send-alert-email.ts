"use server";

import { db } from '@/lib/db';
import { sendEmails } from '@/lib/send-email';

type Props = {
    title: string;
    type: string;
    description: string;
    location: string;
}

export const sendAlertEmails = async ({
    title,
    type,
    description,
    location
}: Props) => {

    const emails = await db.email.findMany({
        where: {
            location
        },
        select:{
            email: true
        }
    });

    const compatableEmails = [] as string [];

    emails.map((e) => {
        compatableEmails.push(e.email);
    })

    const sentStatus = await sendEmails(title, type, compatableEmails, description, location);

    return {sentStatus};
}