import { IBranch } from './branch.model';

export interface IRepository {
    id: number;
    name: string;
    ownerLogin: string;
    branches: IBranch[];
}
