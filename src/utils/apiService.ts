export type ApiResponse<T> = {
  data: T | null;
  error: string | null;
  loading: boolean;
};

export async function apiService<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<ApiResponse<T>> {
  let response: ApiResponse<T> = {
    data: null,
    error: null,
    loading: true,
  };

  try {
    const res = await fetch(`https://farm.sthajeevan.com.np/api${endpoint}`, {
      headers: { 'Content-Type': 'application/json', ...options.headers },
      ...options,
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch. Status: ${res.status}`);
    }

    const json = await res.json();
    response = {
      data: json,
      error: null,
      loading: false,
    };
  } catch (error: any) {
    response = {
      data: null,
      error: error.message || 'Unknown error',
      loading: false,
    };
  }

  return response;
}
