export interface CommonResponse<T> {
  code: number;
  message: string;
  data: { results: T; total?: number };
}
