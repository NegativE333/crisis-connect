import { Separator } from "@/components/ui/separator";
import { client } from "@/lib/sanity";
import { infoProps } from "@/lib/sanity-interface";
import { DisasterInfoCard } from "./disaster-info-card";

async function getData() {
    const query = `
        *[_type == 'info'] | order(_createdAt desc){
            title,
            desc,
            "currSlug" : slug.current,
            titleImage
        }
    `;
    const data = await client.fetch(query);

    return data;
}

const DisasterInfoPage = async () => {

    const data : infoProps [] = await getData();

    return (  
        <div className="">
            <h1 className="text-lg sm:text-4xl font-bold leading-snug">
                <span className="text-rose-500">Disaster&apos;s</span> Info
            </h1>
            <Separator className="mt-4 h-0.5"/>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
                {data.map((d) => (
                    <DisasterInfoCard
                        key={d.title} 
                        title={d.title}
                        image={d.titleImage}
                        slug={d.currSlug} 
                    />
                ))}
            </div>
        </div>
    );
}
 
export default DisasterInfoPage;