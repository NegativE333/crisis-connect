"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { useEffect, useState, useTransition } from "react";
import { AlertTriangle } from "lucide-react";
import { Separator } from "../ui/separator";
import { toast } from "sonner";
import { useDeleteInfoModal } from "@/store/use-delete-info-modal";
import { Button } from "../ui/button";
import { deletePost } from "@/actions/delete-info";


export const DeleteInfoModal = () => {
    const { id, isOpen, close } = useDeleteInfoModal();
    const [isClient, setIsClient] = useState(false);

    const [pending, startTransition] = useTransition();

    const handleDelete = () => {
        if(pending) return;

        if(id){
            startTransition(() => {
                deletePost({postId : id})
                .then(() => {
                    toast.success("Post deleted")
                    close();
                })
                .catch(() => toast.error("Something went wrong"));
            })
        }
        else{
            toast.error("Id is missing");
        }
    }

    useEffect(() => setIsClient(true), []);

    if (!isClient) return null;

    return (
        <Dialog open={isOpen} onOpenChange={close}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-2xl flex gap-2 items-center justify-center">
                        <AlertTriangle className="h-6 w-6" /> Delete this post?
                    </DialogTitle>
                    <DialogDescription className="py-2 pb-2 text-center">
                        Deleting this post is irreversible. Once deleted, it cannot be restored.
                    </DialogDescription>
                    <Separator className="my-3"/>
                    <div className="flex justify-between gap-4 w-full pt-4">
                        <Button
                            className="w-full"
                            variant="destructive"
                            onClick={handleDelete}
                            disabled={pending}
                        >
                            Delete
                        </Button>
                        <Button
                            className="w-full"
                            variant="outline"
                            onClick={close}
                        >
                            Cancle
                        </Button>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};
