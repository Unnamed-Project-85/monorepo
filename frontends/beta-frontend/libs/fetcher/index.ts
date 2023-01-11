import { API_HOST } from '@/config/config'

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
type RequestConfig<Data> = { headers?: Record<string, string>, method: Method, data?: Data }

export default async function fetcher<JSON = any, Data = undefined>(
  uri: string,
  { data, method = 'GET', headers: customHeaders }: RequestConfig<Data>
): Promise<JSON> {
  const authHeaders = { 'Authorization': 'Bearer foo' }
  const defaultHeaders = { 'Content-Type': 'application/json' }
  const headers = { ...defaultHeaders, ...customHeaders, ...authHeaders }

  const body = JSON.stringify(data)
  const res = await fetch(`${API_HOST}${uri}`, { body, method, headers })
  return await res.json() as JSON
}