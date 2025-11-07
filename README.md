# Naza SvelteKit Frontend

This is a SvelteKit frontend application that consumes content from the Naza Strapi CMS.

## Features

- Modern SvelteKit setup with TypeScript
- Strapi API client for fetching CMS content
- Example blog pages demonstrating content fetching
- Railway deployment ready

## Development

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file with your Strapi URL:
```bash
PUBLIC_STRAPI_URL=http://localhost:1337
PUBLIC_STRAPI_API_TOKEN=your_token_here
```

3. Run the development server:
```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

4. Open [http://localhost:5173](http://localhost:5173)

## Strapi Integration

The app includes a Strapi API client in `src/lib/strapi.ts` that provides:
- Type-safe API requests
- Support for filtering, sorting, pagination
- Automatic authentication with API tokens

### Example Usage

```typescript
import { strapi } from '$lib/strapi';

// Fetch all articles
const response = await strapi.find('articles');

// Fetch with filters and pagination
const filtered = await strapi.find('articles', {
  filters: { published: true },
  sort: ['publishedAt:desc'],
  pagination: { pageSize: 10 }
});

// Fetch single item
const post = await strapi.findOne('articles', '1');
```

## Deployment to Railway

1. Make sure your Strapi CMS is deployed first
2. Create a new service in the same Railway project
3. Connect this repository
4. Set environment variables:
   - `PUBLIC_STRAPI_URL`: Your Strapi deployment URL
   - `PUBLIC_STRAPI_API_TOKEN`: (Optional) Your Strapi API token

Railway will automatically detect the build and start commands from `railway.json`.

## Project Structure

- `src/lib/strapi.ts` - Strapi API client
- `src/routes/+page.svelte` - Homepage
- `src/routes/blog/+page.svelte` - Blog list page
- `src/routes/blog/[slug]/+page.svelte` - Individual blog post page

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.
