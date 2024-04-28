import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { cache } from "react";

export const getSharedInfo = cache(async () => {

    const data = await db.shareInfo.findMany({
        orderBy:{
            createdAt: 'desc'
        }
    });

    return data;

});

export const getAlertEmail = cache(async () => {
    const {userId} = auth();

    if(!userId){
        return null;
    }

    const data = await db.email.findUnique({
        where: {
            userId
        }
    });

    return data;
});

export const getSharedInfoByUser = cache(async () => {
    const {userId} = auth();

    if(!userId){
        return null;
    }

    const data = await db.shareInfo.findMany({
        where:{
            userId
        },
        orderBy:{
            createdAt: 'desc'
        }
    });

    return data;

});

export const getCampaigns = cache(async () => {
    const {userId} = auth();

    if(!userId) return null;

    const data = await db.campaign.findMany({
        orderBy:{
            createdAt: 'desc'
        }
    });

    return data;
});

export const getCampaignCollectedAmount = cache(async (campaignId: string) => {
    
    const data = await db.campaignDonation.findMany({
        where: {
            campaignId
        }
    });

    return data;
});

export const getUserDonations = cache(async () => {
    const {userId} = auth();
    if(!userId) return null;

    const data = await db.campaignDonation.findMany({
        where: {
            userId
        }
    });

    return data;
})  