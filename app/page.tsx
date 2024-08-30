import Image from "next/image";
import { client, urlFor } from "../lib/sanity";
import { simpleBlogCard } from "@/utils/interafces";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const revalidate = 30;

async function getData() {
  const query = `
  *[_type == 'blog'] {
    title,
      smallDescription,
      "currentSlug": slug.current,
      titleImage
  }`;
  const data = await client.fetch(query);
  return data;
};


export default async function Home() {
  const data: simpleBlogCard[] = await getData();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 my-5 gap-5">
        {
          data.map((post, index) => (
            <Card key={index}>
                <Image 
                  src={urlFor(post.titleImage).url()} 
                  alt="image" 
                  width={500} 
                  height={500}
                  className="rounded-t-lg h-[200px] object-cover"
                  />

                  <CardContent className="mt-5">
                      <h3 className="text-lg line-clamp-2">{post.title}</h3>
                      <p className="text-sm line-clamp-3 mt-2 text-gray-600 dark:text-gray-300">{post.smallDescription}</p>
                      <Button asChild className="w-full mt-7">
                          <Link href={`/blog/${post.currentSlug}`}>Read More</Link>
                      </Button>
                  </CardContent>
            </Card>
          ))
        }
    </div>
  );
}
