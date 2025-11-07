<script lang="ts">
  import { PUBLIC_STRAPI_URL } from '$env/static/public';
</script>

<div class="container">
  <h1>Naza CMS + SvelteKit</h1>
  <p>Welcome to your SvelteKit frontend powered by Strapi CMS!</p>

  <div class="info">
    <h2>Getting Started</h2>
    <ul>
      <li>Your Strapi CMS is running at: <code>{PUBLIC_STRAPI_URL}</code></li>
      <li>Create content types in Strapi admin panel</li>
      <li>Fetch content using the Strapi API client in <code>src/lib/strapi.ts</code></li>
    </ul>

    <h3>Example Pages</h3>
    <ul>
      <li><a href="/blog">Blog Posts Example</a> - Demonstrates fetching content from Strapi</li>
    </ul>
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
    margin-bottom: 1rem;
  }

  .info {
    margin-top: 2rem;
    padding: 1.5rem;
    background: #f5f5f5;
    border-radius: 8px;
  }

  code {
    background: #e0e0e0;
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
    font-family: monospace;
  }

  ul {
    line-height: 1.8;
  }

  a {
    color: #ff3e00;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
</style>
