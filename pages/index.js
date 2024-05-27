import Link from 'next/link';
import { getAllPosts} from '../lib/post';
import styles from "../styles/index.module.css"
import { useState } from 'react';

export async function getStaticProps() {
    const posts = getAllPosts();
    return {
    props: {
        posts
    }
    };
}

export default function Home({ posts }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredPosts, setFilteredPosts] = useState(posts);

    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearch = (event) => {
        event.preventDefault();
        const query = searchQuery.toLowerCase().trim();
        const filtered = posts.filter(post => 
        post.title.toLowerCase().includes(query) || 
        post.summary.toLowerCase().includes(query) ||
        post.author.toLowerCase().includes(query)
        );
        setSearchQuery(" ");
        setFilteredPosts(filtered);
    };

    const handleBack = ()=>{
        setFilteredPosts(posts);
    }

    return (<>
    <div className={styles.sidebar}> 
        <div>
        <input className={styles.inputbox} placeholder='enter relevant search keyword' value={searchQuery} onChange={handleInputChange}></input>
        <button className={styles.btn} onClick={handleSearch}>Search</button>
        </div>
        <div className={styles.back}>
            <button className={styles.btn} onClick={handleBack}>Back</button>
        </div>
    </div>
    <div className={styles.container}>
        {filteredPosts.length > 0 ? (filteredPosts.map((post, index) => (
            <div key={index} className={styles.box}>
                <Link href={`/posts/${post.id}`}>
                    <div className={styles.titlebox}><h2>{post.title}</h2></div>
                    <p className={styles.sum}>{post.summary}</p>
                    <div className={styles.author}>
                        <p>{post.author}</p>
                        <p>{post.date}</p>
                    </div>
                </Link>
            </div>
        ))): (
            <p>No blog posts found with this keyword.</p>
          )}  
    </div>
    </>
    );
}
