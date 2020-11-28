import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GithubApi } from './api/github.api';
import { IRepository } from './models/repository.model';
import { GithubState } from './state/github.state';
import { finalize, map } from 'rxjs/operators';
import { IBranch } from './models/branch.model';

@Injectable({
    providedIn: 'root'
})
export class GithubFacade {

    constructor(private githubApi: GithubApi, private githubState: GithubState) { }

    public getRepositories(): Observable<IRepository[]> {
        return this.githubState.getRepositories();
    }

    public isUserNameValid(): Observable<boolean> {
        return this.githubState.isUserNameValid();
    }

    public isFetching(): Observable<boolean> {
        return this.githubState.isFetching();
    }

    public fetchUserRepositories(userName: string): void {
        this.githubState.setFetching(true);
        this.githubApi.getUserRepositories(userName)
            .pipe(
                map(repos => repos
                    .filter(repo => repo.fork === false)
                    .map(repo => {

                        const { id, name, owner: { login } } = repo;

                        return {
                            id,
                            name,
                            ownerLogin: login
                        } as IRepository;
                    })),
                finalize(() => this.githubState.setFetching(false))
            )
            .subscribe(
                (userRepos: any[]) => {
                    this.githubState.setUserRepositories(userRepos);
                    this.githubState.setUserNameValidity(true);
                },
                () => {
                    this.githubState.setUserRepositories(null);
                    this.githubState.setUserNameValidity(false);
                }
            );
    }

    public fetchRepositoryBranches(userName: string, repo: IRepository): void {
        this.githubState.setFetching(true);
        this.githubApi.getRepoBranches(userName, repo.name)
            .pipe(
                map(branches => branches.map(branch => {

                    const { name, commit: { sha } = null } = branch;

                    return {
                        name,
                        lastCommitSha: sha
                    } as IBranch;
                })),
                finalize(() => this.githubState.setFetching(false))
            )
            .subscribe(
                (branches: IBranch[]) => {
                    const repoToReplace = GithubFacade.createRepoWithBranches(repo, branches);
                    this.githubState.updateFetchedRepositories(repoToReplace);
                },
                (error: any) => {
                    console.error(`error occurred while fetching ${repo.name} branches`);
                    console.error(error);
                }
            );
    }

    private static createRepoWithBranches(repo: IRepository, branches: IBranch[]): IRepository {
        const { id, name, ownerLogin } = repo;

        return {
            id,
            name,
            ownerLogin,
            branches
        } as IRepository;
    }
}
