import { urlFor } from "@/lib/sanity";
import Image from "next/image"

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
                <button
                    className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                    type="button">
                    Read More
                </button>
            </div>
        </div>
    )
}