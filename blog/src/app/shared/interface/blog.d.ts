export interface Blog {
  id: number;
  title: string;
  content: string;
  createtime: string;
  author: string;
  status?: number;
}

export interface SearchBlogRequestParams {
  author?: string;
  title?: string;
}

export interface DeleteBlogRequestParams {
  id: number;
  author?: string;
}
