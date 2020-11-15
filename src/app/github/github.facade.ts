import { Injectable } from '@angular/core';
import { GithubApi } from './api/github.api';
import { GithubState } from './state/github.state';

@Injectable({
    providedIn: 'root'
})
export class GithubFacade {

    constructor(private githubApi: GithubApi, private githubState: GithubState) { }

    public setUserRepoData(userName: string): void {
        this.githubState.setUpdating(true);
        this.githubApi.getUserRepoData(userName)
            .subscribe(
                (userRepos: any[]) => {

                },
                (error: any) => {

                },
                () => {
                    this.githubState.setUpdating(false);
                });
    }
}
