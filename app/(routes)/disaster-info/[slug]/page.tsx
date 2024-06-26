import { Separator } from "@/components/ui/separator";
import { client, urlFor } from "@/lib/sanity";
import { fullInfoProps } from "@/lib/sanity-interface";
import { PortableText } from "next-sanity";
import Image from "next/image";

type Props = {
    params: { slug: string }
  }

async function getData(slug: string) {
    const query = `
      *[_type == "info" && slug.current == '${slug}'] {
          "currentSlug": slug.current,
            title,
            desc,
            content,
            titleImage,
        }[0]`;
  
    const data = await client.fetch(query);
    return data;
  }

const BlogPage = async ({
    params
}: Props) => {
  
    const data: fullInfoProps = await getData(params.slug);

    return(
        <div className="">
            <h1 className="text-lg sm:text-4xl font-bold leading-snug">
                {data.title}
            </h1>
            <Separator className="mt-4 h-0.5"/>
            <div className="w-full flex items-center justify-center mt-4">
                <Image 
                    src={urlFor(data.titleImage).url()}
                    alt="image"
                    height={600}
                    width={600}
                    className="rounded-lg"
                />
            </div>
            <Separator className="mt-4 h-0.5"/>
            <div className="prose prose-h4:text-2xl mt-4 text-justify">
                <PortableText value={data.content}/>
            </div>
            <Separator className="mt-4 h-0.5"/>
        </div>
    )

}

export default BlogPage;