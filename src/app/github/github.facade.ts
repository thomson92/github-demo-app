import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GithubApi } from './api/github.api';
import { IRepository } from './models/repository.model';
import { GithubState } from './state/github.state';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class GithubFacade {

    constructor(private githubApi: GithubApi, private githubState: GithubState) { }

    public getRepositories(): Observable<IRepository[]> {
        return this.githubState.getRepositories();
    }

    public setUserRepoData(userName: string): void {
        this.githubState.setUpdating(true);
        this.githubApi.getUserRepoData(userName)
            .pipe(
                map(repositories => repositories.map(repository => {
                    return {
                        name: repository.name,
                        ownerLogin: repository.owner.login
                    } as IRepository;
                }))
            )
            .subscribe(
                (userRepos: any[]) => {
                    this.githubState.setUserRepoData(userRepos);
                    this.githubState.setUserNameValidity(true);
                },
                (error: any) => this.githubState.setUserNameValidity(false),
                () => this.githubState.setUpdating(false)
            );
    }
}
