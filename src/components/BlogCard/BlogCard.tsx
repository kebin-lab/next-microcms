import Image from "next/image";
import { BsTags } from "react-icons/bs";
import { Blog } from "@/types/blog";
import styles from "./BlogCard.module.scss";

import Link from "next/link";
type Props = {
  blog: Blog;
};

export const BlogCard = ({ blog }: Props) => {
  return (
    <div className={styles.container}>
      {blog.eyecatch && (
        <div className={styles.eyecatch}>
          <Image src={blog.eyecatch.url} alt="text" width={200} height={150} />
        </div>
      )}
      <div className={styles.content}>
        <Link href={`blogs/${blog.id}`}>
          <div className={styles.title}>
            <h3>{blog.title}</h3>
          </div>
        </Link>
        <div className={styles.tags}>
          <BsTags />
          {blog.tags.map((tag) => (
            <span key={tag.id} className={styles.tag}>
              #{tag.name}
            </span>
          ))}
        </div>
        <span className={styles.postDay}>{blog.createdAt}</span>
      </div>
    </div>
  );
};
