import { Separator } from "@/components/ui/separator";
import { client } from "@/lib/sanity";
import { tipsProps } from "@/lib/sanity-interface";
import { PortableText } from "next-sanity";

async function getData() {
  const query = `
      *[_type == 'tips'] | order(_createdAt asc){
          title,
          content,
      }
  `;
  const data = await client.fetch(query);

  return data;
}

const PreparednessTipsPage = async () => {
  
  const data : tipsProps [] = await getData();

  console.log(data);

  return (
    <div>
      <h1 className="text-lg sm:text-4xl font-bold leading-snug">
        Preparedness Tips
      </h1>
      <Separator className="mt-4 h-0.5" />
      <div>
        {data?.map((d) => (
          <div
            key={d.title}
            className="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-full"
          >
            <div className="p-6">
              <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                {d.title}
              </h5>
              <Separator />
              <div className="prose prose-ul:marker:text-red-400 text-justify">
                <PortableText value={d.content}/>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PreparednessTipsPage;