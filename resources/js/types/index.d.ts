export interface PaginatedResponse<T> {
 current_page: number;
 data: T[];
 first_page_url: string;
 from: number;
 last_page: number;
 last_page_url: string;
 links: {
  url: string | null;
  label: string;
  active: boolean;
 }[];
 next_page_url: string | null;
 path: string;
 per_page: number;
 prev_page_url: string | null;
 to: number;
 total: number;
}

export interface Branch {
 id: number;
 name: string;
 code: string;
 phone: string;
 email: string;
 country: string;
 city: string;
 address: string;
 is_active: boolean;
 created_at: string;
 updated_at: string;
}

export type PaginatedBranches = PaginatedResponse<Branch>;
