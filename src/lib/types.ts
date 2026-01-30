export type APIMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export interface Parameter {
  id: string
  key: string
  value: string
}

export interface APIConfig {
  url: string
  method: APIMethod
  headers: Parameter[]
  query: Parameter[]
  path: Parameter[]
  body: Parameter[]
  rawResponse?: Record<string, unknown>
}

export interface CleanAPIConfig {
  url: string
  method: APIMethod
  headers?: { key: string; value: string }[]
  query?: { key: string; value: string }[]
  path?: { key: string; value: string }[]
  body?: { key: string; value: string }[]
}

export interface APITestResponse {
  status_code?: number
  status?: number
  statusCode?: number
  response?: unknown
  responseBody?: unknown
  data?: unknown
  body?: unknown
  error?: string
}

export interface APITool {
  tool_type: string
  name: string
  config: APIConfig
}
