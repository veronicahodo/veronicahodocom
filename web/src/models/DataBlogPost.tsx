export interface DataBlogPost {
    id: string;
    author_id: string;
    created: string;
    last_modified: string;
    title: string;
    payload: string;
    tags: string[];
    slug: string;
    views: number;
}

export const DefaultDataBlogPost: DataBlogPost = {
    id: "",
    author_id: "",
    created: "",
    last_modified: "",
    title: "",
    payload: "",
    tags: [],
    slug: "",
    views: 0,
};
