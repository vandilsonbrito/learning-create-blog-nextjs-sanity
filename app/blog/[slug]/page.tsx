import { client, urlFor } from "@/lib/sanity";
import { fullBlogData } from "@/utils/interafces";
import { PortableText } from "next-sanity";
import Image from "next/image";

export const revalidate = 30;

async function getData(slug: string) {
    const query = `
        *[_type == "blog" && slug.current == '${slug}'] {
            "currentSlug": slug.current,
                title,
                content,
                titleImage

        }[0]
    `;
    const data = await client.fetch(query);
    return data;
};

export default async function BlogArticle({params}: {params: { slug: string}}) {
    const data: fullBlogData = await getData(params.slug)

    return (
        <section className="py-8">
            <h1>
                <span className="block text-base text-center text-primary font-semibold tracking-wide uppercase">Next.js 14 - Blog</span>
                <span className="mt-2 block text-3xl text-center leading-8 font-bold tracking-tight sm:text-4xl">{data.title}</span>
            </h1>

            <Image 
                src={urlFor(data.titleImage).url()} 
                alt="image" 
                width="800" 
                height="800"
                priority
                className="rounded-lg mt-8 border"
                />

            <section className="mt-16 prose prose-blue prose-h4:text-2xl prose-xl dark:prose-invert prose-li:marker:text-primary">
                <PortableText value={data.content}/>                
            </section>
        </section>
    )
}