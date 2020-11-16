import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GithubApi } from './api/github.api';
import { IRepository } from './models/repository.model';
import { GithubState } from './state/github.state';
import { map } from 'rxjs/operators';
import { IBranch } from './models/branch.model';

@Injectable({
    providedIn: 'root'
})
export class GithubFacade {

    constructor(private githubApi: GithubApi, private githubState: GithubState) { }

    public getRepositories(): Observable<IRepository[]> {
        return this.githubState.getRepositories();
    }

    public fetchUserRepositories(userName: string): void {
        this.githubState.setUpdating(true);
        this.githubApi.getUserRepositories(userName)
            .pipe(
                map(repositories => repositories.map(repository => {
                    return {
                        id: repository.id,
                        name: repository.name,
                        ownerLogin: repository.owner.login
                    } as IRepository;
                }))
            )
            .subscribe(
                (userRepos: any[]) => {
                    this.githubState.setUserRepositories(userRepos);
                    this.githubState.setUserNameValidity(true);
                },
                (error: any) => this.githubState.setUserNameValidity(false),
                () => this.githubState.setUpdating(false)
            );
    }

    public fetchRepositoryBranches(userName: string, repo: IRepository): void {
        this.githubState.setUpdating(true);
        this.githubApi.getRepoBranches(userName, repo.name)
            .pipe(
                map(branches => branches.map(branch => {
                    return {
                        name: branch.name,
                        lastCommitSha: branch?.commit.sha
                    } as IBranch;
                }))
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
                },
                () => this.githubState.setUpdating(false)
            );
    }
}
