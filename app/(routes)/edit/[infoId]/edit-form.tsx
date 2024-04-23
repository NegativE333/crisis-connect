"use client";

import { updateShareInfo } from "@/actions/share-info";
import { FormInput } from "@/components/form/form-input"
import { FormSubmit } from "@/components/form/form-submit";
import { ImageUpload } from "@/components/form/image-upload"
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label"
import { ShareInfo } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

type Props = {
    infoData: ShareInfo;
}

export const EditForm = ({
    infoData
}: Props) => {
    const [imageUrl, setImageUrl] = useState<string | undefined>(infoData.imageUrl);
    const [pending, startTransition] = useTransition();
    const router = useRouter();

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if(pending) return;

        const formData = new FormData(e.target);
        const title = formData.get("title") as string;
        const type = formData.get("type") as string;
        const description = formData.get("desc") as string;
        const location = formData.get("location") as string;
        const imageUrlNotUndefined = imageUrl === undefined ? "" : imageUrl;

        startTransition(() => {
            updateShareInfo({ id: infoData.id, title, type, description, imageUrl: imageUrlNotUndefined, location })
                .then(() => {
                    toast.success("Info updated");
                    router.push("/profile");
                })
                .catch(() => toast.error("Something went wrong"));
        })
    }

    return(
        <div>
            <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
                <FormInput
                    id="title"
                    label="Title"
                    defaultValue={infoData.title}
                />
                <FormInput
                    label="Type"
                    id="type"
                    defaultValue={infoData.type}
                />
                <FormInput
                    label="Description"
                    id="desc"
                    defaultValue={infoData.description}
                />
                <div className="flex flex-col gap-2">
                    <Label className="text-xs font-semibold text-neutral-700">
                        Choose Photo
                    </Label>
                    <ImageUpload
                        value={imageUrl}
                        onChange={(value) => setImageUrl(value)}
                    />
                </div>
                <FormInput
                    id="location"
                    label="Location"
                    defaultValue={infoData.location}
                />
                <div className="flex gap-2">
                    <FormSubmit
                        className="w-full"
                        isProcessing={pending}
                    >
                        Update
                    </FormSubmit>
                    <Button
                        onClick={(e) => {
                            e.preventDefault();
                            router.push('/profile');
                        }}
                        className="w-full" 
                        variant="outline"
                    >
                        Cancle
                    </Button>
                </div>
            </form>
        </div>
    )
}