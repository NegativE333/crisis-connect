"use client";

import { ImagePlus } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";

declare global{
   var cloudinary: any; 
} 

type Props = {
    onChange: (value: string) => void;
    value: string | undefined;
}

export const ImageUpload: React.FC<Props> = ({
    onChange,
    value
}) => {

    const handleUpload = useCallback((res: any) => {
        onChange(res.info.secure_url);
    },[]);

    return(
        <CldUploadWidget 
            onUpload={handleUpload}
            uploadPreset="p3nvzvpt"
            options={{
                maxFiles: 1
            }}
        >
            {({open}) => {
                return(
                    <div
                        onClick={() => open?.()}
                        className="relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-16 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600"
                    >
                        <ImagePlus />
                        <div className="font-semibold text-md">
                            Click to upload
                        </div>
                        {value && (
                            <div className="absolute inset-0 w-full h-full">
                                <Image 
                                    alt="upload"
                                    src={value}
                                    fill
                                    style={{objectFit: 'cover'}}
                                />
                            </div>
                        )}
                    </div>
                )
            }}
        </CldUploadWidget>
    )
}