export interface HttpAdapter {
  get<T>(url: string, config): Promise<T>;
}
