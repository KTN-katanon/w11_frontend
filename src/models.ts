export interface Type {
  id: number;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
export interface Product {
  id: number
  name: string
  category: 'drink' | 'bakery'
  price: number
}

export interface User {
  id: number
  login: string
  password: string
  roles: ('admin' | 'user')[]
  gender: 'male' | 'female'
  age: number
}
