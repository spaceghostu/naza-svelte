<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<div class="container">
  <h1>Blog Posts</h1>

  {#if data.error}
    <div class="error">
      <p>{data.error}</p>
      <p>To fix this:</p>
      <ol>
        <li>Make sure your Strapi CMS is running</li>
        <li>Create a content type called "articles" with fields: title, content, slug</li>
        <li>Add some blog posts in the Strapi admin panel</li>
        <li>Make sure the content type is publicly accessible in Settings → Users & Permissions → Roles → Public</li>
      </ol>
    </div>
  {:else if !data.posts || data.posts.length === 0}
    <p class="empty">No blog posts found. Create some content in your Strapi CMS!</p>
  {:else}
    <div class="posts">
      {#each data.posts as post}
        {#if post?.attributes}
          <article class="post-card">
            <h2>
              {#if post.attributes.slug}
                <a href="/blog/{post.attributes.slug}">{post.attributes.title || 'Untitled'}</a>
              {:else}
                {post.attributes.title || 'Untitled'}
              {/if}
            </h2>
            {#if post.attributes.content}
              <div class="excerpt">
                {post.attributes.content.substring(0, 200)}{post.attributes.content.length > 200 ? '...' : ''}
              </div>
            {/if}
            {#if post.attributes.publishedAt}
              <div class="meta">
                Published: {new Date(post.attributes.publishedAt).toLocaleDateString()}
              </div>
            {/if}
          </article>
        {/if}
      {/each}
    </div>
  {/if}

  <div class="back">
    <a href="/">← Back to Home</a>
  </div>
</div>

<style>
  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
  }

  h1 {
    color: #ff3e00;
    font-size: 2.5rem;
    margin-bottom: 2rem;
  }

  .error {
    background: #fee;
    border: 1px solid #fcc;
    padding: 1.5rem;
    border-radius: 8px;
    margin-bottom: 1rem;
  }

  .error ol {
    margin-top: 1rem;
    padding-left: 1.5rem;
  }

  .empty {
    text-align: center;
    color: #666;
    padding: 2rem;
  }

  .posts {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .post-card {
    padding: 1.5rem;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    transition: box-shadow 0.2s;
  }

  .post-card:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .post-card h2 {
    margin: 0 0 1rem 0;
    font-size: 1.5rem;
  }

  .post-card h2 a {
    color: #333;
    text-decoration: none;
  }

  .post-card h2 a:hover {
    color: #ff3e00;
  }

  .excerpt {
    color: #666;
    line-height: 1.6;
    margin-bottom: 1rem;
  }

  .meta {
    font-size: 0.9rem;
    color: #999;
  }

  .back {
    margin-top: 2rem;
  }

  .back a {
    color: #ff3e00;
    text-decoration: none;
  }

  .back a:hover {
    text-decoration: underline;
  }
</style>
