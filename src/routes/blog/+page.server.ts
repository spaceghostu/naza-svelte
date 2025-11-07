import { strapi } from '$lib/strapi';
import type { PageServerLoad } from './$types';

export interface BlogPost {
  title: string;
  content: string;
  slug: string;
  publishedAt: string;
}

export const load: PageServerLoad = async () => {
  try {
    // Fetch blog posts from Strapi
    // Replace 'articles' with your actual content type name in Strapi
    const response = await strapi.find<BlogPost>('articles', {
      sort: ['publishedAt:desc'],
      pagination: {
        pageSize: 10
      }
    });

    return {
      posts: response.data || [],
      error: undefined
    };
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    // Return empty array if Strapi is not available or content type doesn't exist
    return {
      posts: [],
      error: 'Unable to fetch blog posts. Make sure your Strapi CMS is running and has an "articles" content type.'
    };
  }
};
