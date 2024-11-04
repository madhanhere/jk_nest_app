import { IPosts } from './posts';

export interface SignUpCredentials {
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  password: string;
}

export interface LoginResponse {
  user: IUser;
  token: AccessTokenResponse;
}

export interface AccessTokenPayload {
  username: string | number;
  userId: string;
}

export interface AccessTokenResponse {
  token: string;
  expiredAt: number;
}

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  provider: string;
  picture: string;
  posts?: IPosts[]
}

