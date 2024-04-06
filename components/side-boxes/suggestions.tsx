"use client";

import Link from "next/link"
import { Button } from "../ui/button"
import { BookOpenText } from "lucide-react"
import { useEmailVerificationModal } from "@/store/use-verification-modal"


export const Suggestions = () => {

    return (
        <div className="border-2 rounded-xl p-4 space-y-4">
            <div className="flex items-center justify-between w-full space-y-2">
                <h3 className="font-bold text-lg flex items-center gap-2">
                    <BookOpenText />
                    Guides
                </h3>
                <Link href="/quests">
                    <Button
                        size="sm"
                        variant="outline"
                    >
                        View all
                    </Button>
                </Link>
            </div>
        </div>
    )
}