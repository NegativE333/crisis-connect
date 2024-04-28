"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

type Props = {
    title: string;
    need: string;
    description: string;
    imageUrl: string;
    location: string;
}

export const createCampaign  = async ({
    title,
    need,
    description,
    imageUrl,
    location
} : Props) => {

    const campaign = await db.campaign.create({
        data: {
            name: title,
            need,
            description,
            imageUrl,
            location
        }
    })

    revalidatePath("/");
    revalidatePath("/donate");

    return {campaign};
}

type CampaignCollectedAmountProps = {
    campaignId: string;
}

export const getCampaignCollectedAmount = async ({
    campaignId
}: CampaignCollectedAmountProps) => {
    const data = await db.campaignDonation.findMany({
        where: {
            campaignId
        }
    });

    return data;
}