import { cn } from "@/lib/utils"
import Link from "next/link";
import { SidebarItem } from "./sidebar-item";
import { UserButton } from "@clerk/nextjs";
import { Nunito, Urbanist } from "next/font/google";
import { isAdmin } from "@/lib/admin";

const font = Urbanist({subsets: ['latin'], weight: ['600']});

type Props = {
    className?: string;
}

export const Sidebar = async ({
    className
}: Props) => {

    return(
        <div
            className={cn("h-full lg:w-[256px] lg:fixed flex left-0 top-0 px-4 border-r-2 flex-col", className)}
        >
            <Link
                href="/"
            >
                <div className="pt-3 sm:pt-8 pl-1 sm:pl-4 pb-7 flex items-center gap-x-3">
                    <h1 className={cn("text-2xl font-extrabold bg-rose-500 bg-opacity-75 transition px-3 py-0.5 rounded-full", font.className)}>
                        Crisis Connect
                    </h1>
                </div>
            </Link>
            <div className="flex flex-col gap-y-2 flex-1">
                <SidebarItem 
                    label="Home"
                    href="/"
                />
                <SidebarItem 
                    label="Share Info"
                    href="/share-info"
                />
                <SidebarItem 
                    label="Donate"
                    href="/donate"
                />
                {isAdmin() && (
                    <>
                        <SidebarItem
                            label="Create Campaign"
                            href="/create-campaign"
                        />
                        <SidebarItem
                            label="Send Alert"
                            href="/send-alert"
                        />
                    </>
                )}
                <SidebarItem 
                    label="Preparedness Tips"
                    href="/preparedness-tips"
                />
                <SidebarItem 
                    label="Disaster's Info"
                    href="/disaster-info"
                />
                <SidebarItem 
                    label="Help"
                    href="/help"
                />
                <SidebarItem 
                    label="Learn More"
                    href="/learn-more"
                />
                <SidebarItem 
                    label="Profile"
                    href="/profile"
                />
            </div>
        </div>
    )
}