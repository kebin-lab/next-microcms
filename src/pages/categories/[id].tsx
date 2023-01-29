import { client } from "@/libs/client";
import { Blog } from "@/types/blog";
import { Category } from "@/types/category";
import { GetStaticPropsContext } from "next";
import Link from "next/link";

type Props = {
  blog: Array<Blog>;
};

export default function CategoryId({ blog }: Props) {
  // カテゴリーに紐付いたコンテンツがない場合に表示
  if (blog.length === 0) {
    return <div>ブログコンテンツがありません</div>;
  }
  return (
    <div>
      <ul>
        {blog.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "categories" });
  const paths = data.contents.map((category: Category) => {
    return { params: { id: category.id } };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  if (context.params === undefined) return {};
  const id = context.params.id;
  const data = await client.get({
    endpoint: "blogs",
    queries: { filters: `category[equals]${id}` },
  });
  return {
    props: {
      blog: data.contents,
    },
  };
};
