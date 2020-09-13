export interface Blog {
  id: number;
  title: string;
  content: string;
  createtime: string;
  author: string;
  status?: number;
}

export interface AddUpdateBlogRequestParams {
  id?: number;
  author?: string;
  title: string;
  content: string;
}

export interface SearchBlogRequestParams {
  author?: string;
  title?: string;
  pageIndex?: number;
  pageSize?: number;
}

export interface DeleteBlogRequestParams {
  id: number;
  author?: string;
}
