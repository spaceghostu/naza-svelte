import { strapi } from '$lib/strapi';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { BlogPost } from '../+page.server';

export const load: PageServerLoad = async ({ params }) => {
  try {
    // Fetch the blog post by slug
    const response = await strapi.find<BlogPost>('articles', {
      filters: {
        slug: params.slug
      }
    });

    if (!response.data || response.data.length === 0) {
      throw error(404, 'Blog post not found');
    }

    return {
      post: response.data[0]
    };
  } catch (err: any) {
    if (err.status === 404) {
      throw err;
    }

    console.error('Error fetching blog post:', err);
    throw error(500, 'Unable to fetch blog post');
  }
};
