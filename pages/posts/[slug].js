import { getPostBySlug, getAllPosts } from '../../lib/post';
import { marked } from 'marked';
import styles from "../../styles/post.module.css"

export async function getStaticPaths() {
    const posts = getAllPosts();
    const paths = posts.map(post => ({
    params: { slug: `${post.id}` }
    }));
    return {
    paths,
    fallback: false
    };
}

export async function getStaticProps(context) {
    const id = context.params.slug;
    const post = getPostBySlug(id);
    const content = marked(post.content);
    return {
    props: {
        post: {
        ...post,
        content
        }
    }
    };
}

export default function Post({ post }) {
    return (
    <div className={styles.container}>
        <h1>{post.title}</h1>
        <p>{post.date} by {post.author}</p>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
    );
};