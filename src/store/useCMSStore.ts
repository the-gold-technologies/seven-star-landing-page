import { create } from "zustand";

export interface PageSEO {
  metaTitle: string | null;
  metaDescription: string | null;
  targetKeywords: string | null;
  canonicalUrl: string | null;
  noIndex: boolean;
  featuredImage: string | null;
  ogTitle: string | null;
  ogDescription: string | null;
  ogImage: string | null;
  schema: string | null;
}

export interface NavLink {
  title: string;
  link: string;
  desc?: string;
  type?: string;
  dropdown?: NavLink[];
}

export interface ApiNavLink {
  id: string;
  label: string;
  url: string;
  type: string;
  parent: string;
  order: number;
  description: string | null;
  title: string | null;
  isStatic: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  visibility: string;
  featuredImage: string | null;
  excerpt: string;
  content: string;
  postType?: "blog" | "news";
  link?: string;
  area: string;
  readTime: string;
  tag: string;
  views: number;
  date: string;
  metaTitle?: string;
  metaDescription?: string;
  headingTag?: string;
}

interface CMSStoreState {
  pages: Record<string, any>;
  isLoading: Record<string, boolean>;
  errors: Record<string, string | null>;
  navLinks: NavLink[] | null;
  globalSEO: any | null;
  events: any[] | null;
  gallery: any[] | null;
  menu: any[] | null;
  blogs: any[] | null;
  blogPosts: Record<string, any>;
}

interface CMSStoreActions {
  fetchPage: (slug: string) => Promise<any>;
  fetchNavLinks: () => Promise<void>;
  fetchGlobalSEO: () => Promise<void>;
  fetchEvents: () => Promise<void>;
  fetchGallery: () => Promise<void>;
  fetchMenu: () => Promise<void>;
  fetchBlogs: () => Promise<any[]>;
  fetchBlogBySlug: (slug: string) => Promise<any>;
}

const getApiBaseUrl = () => {
  return process.env.NEXT_PUBLIC_CMS_API_URL || "";
};

export const useCMSStore = create<CMSStoreState & CMSStoreActions>(
  (set, get) => ({
    pages: {},
    isLoading: {},
    errors: {},
    navLinks: null,
    globalSEO: null,
    events: null,
    gallery: null,
    menu: null,
    blogs: null,
    blogPosts: {},

    fetchPage: async (slug: string) => {
      // Return cached page data if already fetched to prevent redundant calls
      const cachedPage = get().pages[slug];
      if (cachedPage) {
        return cachedPage;
      }

      set((state) => ({
        isLoading: { ...state.isLoading, [slug]: true },
        errors: { ...state.errors, [slug]: null },
      }));

      try {
        const baseUrl = getApiBaseUrl();
        const response = await fetch(`${baseUrl}/api/pages/${slug}`, {
          next: { revalidate: 60 }, // Cache with ISR/revalidation
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch page: ${response.statusText}`);
        }

        const json = await response.json();
        if (!json.success || !json.data) {
          throw new Error(json.error || "Invalid response format from CMS API");
        }

        const pageData = json.data;

        // Transform sections array into a fast-lookup type map
        const sectionsMap: Record<string, any> = {};
        if (Array.isArray(pageData.sections)) {
          pageData.sections.forEach((section: any) => {
            sectionsMap[section.type] = section.content;
          });
        }

        const transformedPage = {
          ...pageData,
          sections: sectionsMap,
          seo: pageData.seo || {
            metaTitle: pageData.metaTitle,
            metaDescription: pageData.metaDescription,
            targetKeywords: pageData.targetKeywords,
            canonicalUrl: pageData.canonicalUrl,
            noIndex: pageData.noIndex ?? false,
            featuredImage: pageData.featuredImage,
            ogTitle: pageData.ogTitle,
            ogDescription: pageData.ogDescription,
            ogImage: pageData.ogImage,
            schema: pageData.schema || null,
          },
        };

        // Inject page-specific schema markup into <head>
        if (typeof window !== "undefined") {
          const existingSchema = document.getElementById("page-schema");
          if (existingSchema) {
            existingSchema.remove();
          }

          const schemaStr = transformedPage.seo?.schema;
          if (schemaStr) {
            try {
              const script = document.createElement("script");
              script.id = "page-schema";
              script.type = "application/ld+json";
              script.innerHTML = schemaStr;
              document.head.appendChild(script);
            } catch (e) {
              console.error("Failed to inject page schema markup:", e);
            }
          }
        }

        set((state) => ({
          pages: { ...state.pages, [slug]: transformedPage },
          isLoading: { ...state.isLoading, [slug]: false },
        }));

        return transformedPage;
      } catch (error: any) {
        const errorMessage = error.message || "An unexpected error occurred";
        set((state) => ({
          isLoading: { ...state.isLoading, [slug]: false },
          errors: { ...state.errors, [slug]: errorMessage },
        }));
        console.error(`Error fetching page ${slug}:`, error);
        throw error;
      }
    },

    fetchNavLinks: async () => {
      try {
        const baseUrl = getApiBaseUrl();
        const response = await fetch(`${baseUrl}/api/nav-links`, {
          next: { revalidate: 60 },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch navigation links");
        }

        const json = await response.json();
        const rawLinks: ApiNavLink[] = json?.data;

        if (Array.isArray(rawLinks)) {
          const formattedLinks: NavLink[] = rawLinks
            .filter((link) => link.parent === "-")
            .sort((a, b) => a.order - b.order || a.label.localeCompare(b.label))
            .map((mainLink) => {
              let dropdown: NavLink[] | undefined = undefined;

              if (mainLink.type === "Dropdown") {
                dropdown = rawLinks
                  .filter(
                    (child) =>
                      child.parent === mainLink.id ||
                      child.parent === mainLink.label,
                  )
                  .sort(
                    (a, b) =>
                      a.order - b.order || a.label.localeCompare(b.label),
                  )
                  .map((child) => ({
                    title: child.label,
                    link: child.url,
                    desc: child.description || undefined,
                  }));
              }

              return {
                title: mainLink.label,
                link: mainLink.url,
                desc: mainLink.description || undefined,
                type: mainLink.type,
                dropdown,
              };
            });

          set({ navLinks: formattedLinks });
        }
      } catch (error) {
        console.error("Error fetching navigation links:", error);
      }
    },

    fetchGlobalSEO: async () => {
      try {
        const baseUrl = getApiBaseUrl();
        const response = await fetch(`${baseUrl}/api/seo/global`, {
          next: { revalidate: 60 },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch global SEO data");
        }

        const json = await response.json();
        if (json.success && json.data) {
          set({ globalSEO: json.data });
        }
      } catch (error) {
        console.error("Error fetching global SEO data:", error);
      }
    },

    fetchEvents: async () => {
      try {
        const baseUrl = getApiBaseUrl();
        const response = await fetch(`${baseUrl}/api/events`, {
          next: { revalidate: 60 },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch events data");
        }

        const json = await response.json();
        if (json.success && Array.isArray(json.data)) {
          set({ events: json.data });
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    },

    fetchGallery: async () => {
      try {
        const baseUrl = getApiBaseUrl();
        const response = await fetch(`${baseUrl}/api/gallery`, {
          next: { revalidate: 60 },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch gallery data");
        }

        const json = await response.json();
        if (json.success && Array.isArray(json.data)) {
          set({ gallery: json.data });
        }
      } catch (error) {
        console.error("Error fetching gallery:", error);
      }
    },

    fetchMenu: async () => {
      try {
        const baseUrl = getApiBaseUrl();
        const response = await fetch(`${baseUrl}/api/menu`, {
          next: { revalidate: 60 },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch menu data");
        }

        const json = await response.json();
        if (json.success && Array.isArray(json.data)) {
          set({ menu: json.data });
        }
      } catch (error) {
        console.error("Error fetching menu:", error);
      }
    },

    fetchBlogs: async () => {
      const cachedBlogs = get().blogs;
      if (cachedBlogs) {
        return cachedBlogs;
      }
      try {
        const baseUrl = getApiBaseUrl();
        const response = await fetch(
          `${baseUrl}/api/blogs?visibility=published`,
          {
            next: { revalidate: 60 },
          },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch blogs data");
        }

        const json = await response.json();
        if (json.success && Array.isArray(json.data)) {
          set({ blogs: json.data });
          return json.data;
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
      return [];
    },

    fetchBlogBySlug: async (slug: string) => {
      const cachedBlog = get().blogPosts[slug];
      if (cachedBlog) {
        return cachedBlog;
      }
      try {
        const baseUrl = getApiBaseUrl();
        const response = await fetch(`${baseUrl}/api/blogs/${slug}`, {
          next: { revalidate: 60 },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch blog post: ${slug}`);
        }

        const json = await response.json();
        if (json.success && json.data) {
          set((state) => ({
            blogPosts: { ...state.blogPosts, [slug]: json.data },
          }));
          return json.data;
        }
      } catch (error) {
        console.error(`Error fetching blog post ${slug}:`, error);
      }
      return null;
    },
  }),
);
