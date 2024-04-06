// "use client";

import { Button } from "@/components/ui/button";
import { urlFor } from "@/lib/sanity";
import Image from "next/image"
import Link from "next/link";

type Props = {
    title: string;
    image: string;
    slug: string;
}

export const DisasterInfoCard = ({
    title,
    image,
    slug
}: Props) => {
    return (
        <div
            className="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96"
        >
            <div
                className="relative h-56 mx-4 -mt-6 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
                <Image
                    src={urlFor(image).url()}
                    alt="card-image"
                    fill
                />
            </div>
            <div className="px-6 py-4">
                <h5 className="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                    {title}
                </h5>
            </div>
            <div className="p-6 pt-0">
                <Button type="button">
                    <a href={`/disaster-info/${slug}`}>
                        Read More
                    </a>
                </Button>
            </div>
        </div>
    )
}