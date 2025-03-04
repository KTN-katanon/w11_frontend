export interface Type {
  id?: number
  name: string
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}
export interface Role {
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
  id: number;
  login: string;
  password: string;
  roleIds: number[];
  role?: Role;
  gender: 'male' | 'female';
  age: number;
  imageUrl? : string;
}

export interface Order{
  id: number
  total: number
  qty: number
  user: 1;
}

