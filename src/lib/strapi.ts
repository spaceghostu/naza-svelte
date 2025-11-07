import { PUBLIC_STRAPI_URL, PUBLIC_STRAPI_API_TOKEN } from '$env/static/public';

export interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiAttributes {
  [key: string]: any;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export interface StrapiEntity<T = StrapiAttributes> {
  id: number;
  attributes: T;
}

class StrapiClient {
  private baseURL: string;
  private token?: string;

  constructor(baseURL: string, token?: string) {
    this.baseURL = baseURL;
    this.token = token;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<StrapiResponse<T>> {
    const url = `${this.baseURL}/api${endpoint}`;
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers
    });

    if (!response.ok) {
      throw new Error(`Strapi API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async find<T = StrapiAttributes>(
    contentType: string,
    params?: {
      populate?: string | string[];
      filters?: Record<string, any>;
      sort?: string | string[];
      pagination?: {
        page?: number;
        pageSize?: number;
      };
    }
  ): Promise<StrapiResponse<StrapiEntity<T>[]>> {
    const searchParams = new URLSearchParams();

    if (params?.populate) {
      const populate = Array.isArray(params.populate) ? params.populate.join(',') : params.populate;
      searchParams.append('populate', populate);
    }

    if (params?.filters) {
      Object.entries(params.filters).forEach(([key, value]) => {
        searchParams.append(`filters[${key}]`, String(value));
      });
    }

    if (params?.sort) {
      const sort = Array.isArray(params.sort) ? params.sort.join(',') : params.sort;
      searchParams.append('sort', sort);
    }

    if (params?.pagination) {
      if (params.pagination.page) {
        searchParams.append('pagination[page]', String(params.pagination.page));
      }
      if (params.pagination.pageSize) {
        searchParams.append('pagination[pageSize]', String(params.pagination.pageSize));
      }
    }

    const queryString = searchParams.toString();
    const endpoint = `/${contentType}${queryString ? `?${queryString}` : ''}`;

    return this.request<StrapiEntity<T>[]>(endpoint);
  }

  async findOne<T = StrapiAttributes>(
    contentType: string,
    id: number | string,
    params?: {
      populate?: string | string[];
    }
  ): Promise<StrapiResponse<StrapiEntity<T>>> {
    const searchParams = new URLSearchParams();

    if (params?.populate) {
      const populate = Array.isArray(params.populate) ? params.populate.join(',') : params.populate;
      searchParams.append('populate', populate);
    }

    const queryString = searchParams.toString();
    const endpoint = `/${contentType}/${id}${queryString ? `?${queryString}` : ''}`;

    return this.request<StrapiEntity<T>>(endpoint);
  }
}

export const strapi = new StrapiClient(PUBLIC_STRAPI_URL, PUBLIC_STRAPI_API_TOKEN);
