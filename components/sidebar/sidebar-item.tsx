"use client";

import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import Link from "next/link";
import { Coins, HandCoins, HeartHandshake, Home, Library, ListChecks, MessageSquareWarning, ReceiptText, Share2, User } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
    label: string;
    href: string;
}

export const SidebarItem = ({
    label,
    href
}: Props) => {

    const pathName = usePathname();
    const active = pathName === href;
    let Icon;

    if (label === "Home") {
        Icon = <Home className={cn("h-6 w-6", active && "text-red-500")} />;
    }
    else if (label === "Preparedness Tips") {
        Icon = <ListChecks className={cn("h-8 w-8", active && "text-red-500")} />;
    }
    else if (label === "Share Info") {
        Icon = <Share2 className={cn("h-6 w-6", active && "text-red-500")} />;
    }
    else if (label === "Help") {
        Icon = <HeartHandshake className={cn("h-6 w-6", active && "text-red-500")} />
    }
    else if (label === "Disaster's Info") {
        Icon = <Library className={cn("h-6 w-6", active && "text-red-500")} />
    }
    else if(label === "Send Alert"){
        Icon = <MessageSquareWarning className={cn("h-6 w-6", active && "text-red-500")} />
    }
    else if(label === "Learn More"){
        Icon = <ReceiptText className={cn("h-6 w-6", active && "text-red-500")} />
    }
    else if(label === "Profile"){
        Icon = <User className={cn("h-6 w-6", active && "text-red-500")} />
    }
    else if(label === "Donate"){
        Icon = <HandCoins className={cn("h-6 w-6", active && "text-red-500")} />
    }
    else if(label === "Create Campaign"){
        Icon = <Coins className={cn("h-6 w-6", active && "text-red-500")} />
    }

    return (
        <Button
            variant={active ? "outline" : "ghost"}
            className="justify-start h-[52px]"
            asChild
        >
            <Link href={href} className="flex gap-3">
                {Icon}
                <p className="text-lg font-semibold">
                    {label}
                </p>
            </Link>
        </Button>
    )
}