import { IBranch } from './branch.model';

export interface IRepository {
    name: string;
    ownerLogin: string;
    branches: IBranch[];
}
