"use client";

import React from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";

interface FormSubmitProps {
    children: React.ReactNode;
    disabled?: boolean;
    className?: string;
    varient?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "primary";
    isProcessing?: boolean;
}

export const FormSubmit = ({
    children,
    disabled,
    className,
    varient = "primary",
    isProcessing
}: FormSubmitProps) => {

    return (
        <Button
            disabled={disabled}
            type="submit"
            className={cn(className)}
        >
            {isProcessing ? (
                <Loader
                    className="animate-spin h-5 w-5"
                />
            ) : (
                <>
                    {children}
                </>
            )}
        </Button>
    )
}