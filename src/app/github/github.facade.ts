import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GithubApi } from './api/github.api';
import { IRepository } from './models/repository.model';
import { GithubState } from './state/github.state';
import { filter, finalize, flatMap, map } from 'rxjs/operators';
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
                map(repositories => repositories
                    .filter(repo => repo.fork === false)
                    .map(repository => {
                        return {
                            id: repository.id,
                            name: repository.name,
                            ownerLogin: repository.owner.login
                        } as IRepository;
                    })),
                finalize(() => this.githubState.setFetching(false))
            )
            .subscribe(
                (userRepos: any[]) => {
                    this.githubState.setUserRepositories(userRepos);
                    this.githubState.setUserNameValidity(true);
                },
                (error: any) => {
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
                    return {
                        name: branch.name,
                        lastCommitSha: branch?.commit.sha
                    } as IBranch;
                })),
                finalize(() => this.githubState.setFetching(false))
            )
            .subscribe(
                (branches: any[]) => {

                    const repoToReplace = {
                        id: repo.id,
                        name: repo.name,
                        ownerLogin: repo.ownerLogin,
                        branches
                    } as IRepository;

                    this.githubState.updateFetchedRepositories(repoToReplace);
                },
                (error: any) => {
                    console.error(`error occurred while fetching ${repo.name} branches`);
                    console.error(error);
                }
            );
    }
}
