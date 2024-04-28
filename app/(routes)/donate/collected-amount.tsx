import { Progress } from "@/components/ui/progress"
import { getCampaignCollectedAmount } from "@/db/queries";
import { cn } from "@/lib/utils";
import { DonateButton } from "./donate-button";
import {format} from 'date-fns';

type Props = {
    campaignId: string,
    need: number,
    createdAt: Date,
    campaignName: string,
}

export const CollectedAmount = async ({
    campaignId,
    need,
    createdAt,
    campaignName
}: Props) => {

    const collectedAmountData = getCampaignCollectedAmount(campaignId);

    const [collectedAmount] = await Promise.all([collectedAmountData]);

    let amount = 0;

    collectedAmount.map((c) => {
        amount += c.amount;
    })

    const remain = (amount / need) * 100;
    let color = "bg-red-500";

    if (remain < 30) {
        color = "bg-red-500";
    }
    else if (remain < 50) {
        color = "bg-red-400";
    }
    else if (remain < 70) {
        color = "bg-green-400";
    }
    else if (remain < 99) {
        color = "bg-green-500";
    }
    else {
        color = "bg-green-600";
    }

    return (
        <div>
            <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-1 mb-2">
                    <h5 className="flex justify-between">
                        Total amount need: <span className="font-semibold">{need.toLocaleString()} ₹</span>
                    </h5>
                    <h5 className="flex justify-between">
                        Total amount collected: <p className="font-semibold">{amount.toLocaleString()} ₹</p>
                    </h5>
                </div>
                {need > amount && (
                    <Progress value={remain} className={cn(color)} />
                )}
            </div>
            {need > amount ? (
                <div className="w-full flex justify-between items-center gap-2 pt-3 ">
                    <DonateButton 
                        campaignId={campaignId} 
                        campaignName={campaignName}
                    />
                    <div className="text-xs text-center">
                        <p className="text-muted-foreground">Launched on</p> {format(createdAt, "d MMM yyyy")}
                    </div>
                </div>
            ): (
                <div className="w-full flex justify-between mt-3 items-center">
                    <p className="text-center bg-green-400 bg-opacity-50 p-1 rounded-2xl text-green-900 px-2">
                        Donation Target Achived
                    </p>
                    <div className="text-xs text-center">
                        <p className="text-muted-foreground">Launched on</p> {format(createdAt, "d MMM yyyy")}
                    </div>
                </div>
            )}
        </div>
    )
}