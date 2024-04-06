import { cn } from "@/lib/utils";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card";
import { Separator } from "../ui/separator";


type Props = {
    children: React.ReactNode;
    type?: string;
    title?: string;
    level?: number;
}

export const AlertHover = ({
    children,
    title,
    type,
    level
}: Props) => {

    let alertType;

    if (level === 1) alertType = "Advisory";
    else if (level === 2) alertType = "Warning";
    else alertType = "Emergency";

    return (
        <HoverCard>
            <HoverCardTrigger asChild>
                {children}
            </HoverCardTrigger>
            <HoverCardContent side="left" className="flex flex-col gap-2 items-center justify-center text-center">
                <div className="font-semibold text-lg">
                    {type}
                </div>
                <div className="font-normal">
                    {title}
                </div>
                <Separator />
                <div
                    className={cn(
                        level === 1 && "bg-yellow-500 text-yellow-900",
                        level === 2 && "bg-orange-500 text-orange-900",
                        level === 3 && "bg-red-500 text-red-900",
                        "p-2 w-fit bg-opacity-60 rounded-full text-xs mx-auto"
                    )}>
                    {alertType} alert
                </div>
            </HoverCardContent>
        </HoverCard>
    )
}