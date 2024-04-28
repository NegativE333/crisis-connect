"use server";

//4000003560000008 test card number

import { stripe } from '@/lib/stripe';
import { absoluteUrl } from '@/lib/utils';
import { auth, currentUser } from '@clerk/nextjs';

const returnUrl = absoluteUrl("/donate");

type Props = {
    campaignId: string;
    amount: number;
    campaignName: string;
}

export const createStripUrl = async ({
    campaignId, 
    amount,
    campaignName
}: Props) => {
    const { userId } = auth();
    const user = await currentUser();

    if (!user) {
        throw new Error("Unauthorized");
    }

    const stripeSession = await stripe.checkout.sessions.create({
        mode: "payment",
        payment_method_types: ['card'],
        customer_email: user.emailAddresses[0].emailAddress,
        line_items: [
            {
                quantity: 1,
                price_data: {
                    currency: "INR",
                    product_data: {
                        name: `Donation to Campaign "${campaignName}"`,
                        description: `Your donation can change lives. Help us make a difference today. Thank you!`
                    },
                    unit_amount: amount * 100, // Default to a minimal unit amount (e.g., 1 INR)
                }
            }
        ],
        metadata: {
            userId,
            campaignId,
            amount,
        },
        success_url: returnUrl,
        cancel_url: returnUrl
    });

    return { data: stripeSession.url }
}
