"use client";

import { createCampaign } from "@/actions/create-campaign";
import { FormInput } from "@/components/form/form-input";
import { FormSubmit } from "@/components/form/form-submit";
import { ImageUpload } from "@/components/form/image-upload";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";


const CreateCampaignPage = () => {

    const [pending, startTransition] = useTransition();
    const [imageUrl, setImageUrl] = useState<string | undefined>();
    const router = useRouter();

    const handleSubmit = (event: any) => {
        event.preventDefault();

        if (pending) return;

        const formData = new FormData(event.target);

        startTransition(() => {
            const title = formData.get("title") as string;
            const need = formData.get("need") as string;
            const description = formData.get("desc") as string;
            const imageUrlNotUndefined = imageUrl === undefined ? "" : imageUrl;
            const location = formData.get("location") as string;
            createCampaign({
                title,
                need,
                description,
                imageUrl: imageUrlNotUndefined,
                location
            })
                .then(() => {
                    toast.success("Campaign Created");
                    router.push('/donate');
                })
                .catch((error) => toast.error("Something went wrong!"));
        });
    }

    return (  
        <div>
            <h1 className="text-lg sm:text-4xl font-bold leading-snug">
                Create Campaign
            </h1>
            <Separator className="mt-4 h-0.5" />
            <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
                <FormInput
                    id="title"
                    label="Title"
                />
                <FormInput
                    label="Need"
                    id="need"
                />
                <FormInput
                    label="Description"
                    id="desc"
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
                />
                <FormSubmit
                    className="w-full"
                    isProcessing={pending}
                >
                    Submit
                </FormSubmit>
            </form>
        </div>
    );
}
 
export default CreateCampaignPage;