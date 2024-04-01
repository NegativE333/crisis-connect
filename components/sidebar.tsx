import { cn } from "@/lib/utils"
import Link from "next/link";
import { SidebarItem } from "./sidebar-item";

type Props = {
    className?: string;
}

export const Sidebar = ({
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
                    <h1 className="text-xl font-extrabold">
                        CrisisConnect
                    </h1>
                </div>
            </Link>
            <div className="flex flex-col gap-y-2 flex-1">
                <SidebarItem 
                    label="Home"
                    href="/"
                />
                <SidebarItem 
                    label="Map"
                    href="/map"
                />
                <SidebarItem 
                    label="Add Alert"
                    href="/add-alert"
                />
                <SidebarItem 
                    label="Help"
                    href="/help"
                />
            </div>
        </div>
    )
}