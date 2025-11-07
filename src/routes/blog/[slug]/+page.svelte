<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<svelte:head>
  <title>{data.post.attributes.title} - Naza Blog</title>
</svelte:head>

<article class="container">
  <h1>{data.post.attributes.title}</h1>

  <div class="meta">
    Published: {new Date(data.post.attributes.publishedAt).toLocaleDateString()}
  </div>

  <div class="content">
    {data.post.attributes.content}
  </div>

  <div class="back">
    <a href="/blog">← Back to Blog</a>
  </div>
</article>

<style>
  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
  }

  h1 {
    color: #ff3e00;
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  .meta {
    color: #999;
    font-size: 0.9rem;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #e0e0e0;
  }

  .content {
    line-height: 1.8;
    color: #333;
    white-space: pre-wrap;
  }

  .back {
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 1px solid #e0e0e0;
  }

  .back a {
    color: #ff3e00;
    text-decoration: none;
  }

  .back a:hover {
    text-decoration: underline;
  }
</style>
