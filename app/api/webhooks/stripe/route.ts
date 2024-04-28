import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request){
    const body = await req.text();
    const signature = headers().get("Stripe-Signature") as string;

    let event : Stripe.Event;

    try{
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!,
        );
    }
    catch(error: any){
        return new NextResponse(`Webhook error : ${error.message}`, {status: 400})
    }

    const session = event.data.object as Stripe.Checkout.Session;

    if(event.type === "checkout.session.completed"){
        console.log("Hi there this the log message ****************************************************************************************************");
         
        const payment = await stripe.paymentIntents.retrieve(
            session.payment_intent as string
        );

        if(!session?.metadata?.userId || !session?.metadata?.campaignId || !session?.metadata?.amount){
            return new NextResponse("Meta data is missing", {status: 400});
        }

        await db.campaignDonation.create({
            data: {
                userId: session.metadata.userId,
                campaignId: session.metadata.campaignId,
                amount: parseInt(session.metadata.amount),
            }
        });

        revalidatePath("/donate");
        revalidatePath("/profile");
    }

    return new NextResponse(null, {status: 200});
}