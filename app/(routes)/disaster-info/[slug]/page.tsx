import { Separator } from "@/components/ui/separator";
import { client } from "@/lib/sanity";
import { fullInfoProps } from "@/lib/sanity-interface";

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
        </div>
    )

}

export default BlogPage;