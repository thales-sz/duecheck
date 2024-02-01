export const baseURL = 'https://api.duecheck.com.br/api/v1'

export async function fetchApi<T = unknown>(
  input: RequestInfo | URL,
  init?: RequestInit | undefined,
) {
  const data = await fetch(`${baseURL}${input}`, init)

  const result = await data.json()

  return result as T
}
