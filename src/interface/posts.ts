import { IUser } from './users';

export interface IPosts {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    user: IUser,
    title: string;
    content: string;
}