export interface Result<T> {
  statusCode: number
  data?: T
  message?: string
  error?: any
}

export interface PagingResult<T> {
  statusCode: number
  data?: T
  metadata: Metadata
  message?: string
  error?: any
}

export interface Links {
  first: string
  previous: string
  current: string
  next: string
  last: string
}

export interface Metadata {
  count: number
  last: number
  page: number
  limit: number
  sort: Object
  links: Links
}
