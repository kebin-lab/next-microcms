import parse from "html-react-parser";
import { client } from "@/libs/client";
import { Blog } from "@/types/blog";
import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
  NextPage,
} from "next";

export default function BlogPage({ blog }: Props) {
  return (
    <>
      <main>{blog.id}</main>
      <h2>{blog.title}</h2>
      <div>{parse(blog.content)}</div>
    </>
  );
}

// [id].jsはbuild時にどんな名前にするか決める必要がある
// その場合にはgetStaticPathsを定義する(idはstringである必要がある)
export const getStaticPaths: GetStaticPaths = async () => {
  const data = await client.get({ endpoint: "blogs" });
  const paths = data.contents.map((blog: Blog) => {
    return { params: { id: blog.id } };
  });
  console.log(paths);
  return {
    paths,
    fallback: false,
  };
};

type Props = {
  blog: Blog;
};

// この関数はgetStaticPathsのpathsの数だけ呼ばれる
export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const id = context.params?.id as string;
  console.log(id);
  const data: Blog = await client.get({ endpoint: "blogs", contentId: id });

  return {
    props: {
      blog: data,
    },
  };
};
