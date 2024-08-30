import Image from "next/image";

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




  );
}
