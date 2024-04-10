import Link from "next/link"
import { Button } from "../ui/button"
import { ListChecks } from "lucide-react"
import { client } from "@/lib/sanity";
import { tipsProps } from "@/lib/sanity-interface";
import { PortableText } from "next-sanity";

type Props = {
    disasterType: string;
}

async function getData(disasterType: string) {
    const query = `
        *[_type == 'tips' && title == '${disasterType}s'] | order(_createdAt desc){
            title,
            content
        }
    `;

    const data = await client.fetch(query);

    return data;
}

export const Suggestions = async ({
    disasterType
}: Props) => {

    const data : tipsProps [] = await getData(disasterType);

    return (
        <div className="border-2 rounded-xl p-4 space-y-4">
            <div className="flex items-center justify-between w-full space-y-2">
                <h3 className="font-bold text-lg flex items-center gap-2">
                    <ListChecks />
                    {data.length !== 0 ? `${disasterType}` : "Preparedness Tips"}
                </h3>
                <Link href="/preparedness-tips">
                    <Button
                        size="sm"
                        variant="outline"
                    >
                        View all
                    </Button>
                </Link>
            </div>
            {data.length !== 0 && (
                <div className="prose prose-ul:marker:text-red-400 text-justify -ml-2 mr-1">
                    <PortableText value={data[0].content}/>
                </div>
            )}
        </div>
    )
}