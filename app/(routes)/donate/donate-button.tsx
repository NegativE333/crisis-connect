"use client";

import { createStripUrl } from "@/actions/campaign-donation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTransition } from "react";
import { toast } from "sonner";

type Props = {
    campaignId: string;
    campaignName: string;
}

export const DonateButton = ({
    campaignId,
    campaignName
}: Props) => {

    const [pending, startTransition] = useTransition();

    const handleDonate = (e : any) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const amountValue = formData.get("amount") as string;

        if (!amountValue) {
            return;
        }
    
        const parsedAmount = parseInt(amountValue, 10);
        if (isNaN(parsedAmount) || parsedAmount <= 0) {
            return;
        }

        startTransition(() => {
            createStripUrl({campaignId, amount: parsedAmount, campaignName})
            .then((res) => {
                if(res.data){
                    window.location.href = res.data;
                }
            })
            .catch(() => toast.error("Something went wrong"));
        })
    }

    return (
        <div>
            <form onSubmit={handleDonate} className="flex gap-2">
                <Input
                    placeholder="Enter Amount"
                    className="w-[50%]"
                    id="amount"
                    name="amount"
                    type="number"
                />
                <Button 
                    disabled={pending}
                    variant="outline"
                    className="bg-green-400 hover:bg-green-500"
                >
                    Donate
                </Button>
            </form>
        </div>
    )
}