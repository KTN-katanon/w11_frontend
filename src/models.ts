export interface Type {
  id?: number
  name: string
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}
export interface Product {
  id?: number
  name: string
  typeId: number
  price: number
  type?: Type
  imageUrl?: string
}

export interface User {
  id: number
  login: string
  password: string
  roles: ('admin' | 'user')[]
  gender: 'male' | 'female'
  age: number
}
