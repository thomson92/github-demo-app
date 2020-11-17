import { Injectable } from '@angular/core';
import { IRepository } from '@github/models/repository.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class GithubState {

    private fetching = new BehaviorSubject<boolean>(false);
    private userNameValid = new BehaviorSubject<boolean>(null);
    private userRepositories = new BehaviorSubject<IRepository[]>(null);

    public isFetching(): Observable<boolean> {
        return this.fetching.asObservable();
    }

    public isUserNameValid(): Observable<boolean> {
        return this.userNameValid.asObservable();
    }

    public getRepositories(): Observable<IRepository[]> {
        return this.userRepositories.asObservable();
    }

    public setFetching(isUpdating: boolean): void {
        this.fetching.next(isUpdating);
    }

    public setUserNameValidity(isValid: boolean): void {
        this.userNameValid.next(isValid);
    }

    public setUserRepositories(userRepos: IRepository[]): void {
        this.userRepositories.next(userRepos);
    }

    public updateFetchedRepositories(repositoryToReplace: IRepository): void {
        const currentRepositories = this.userRepositories.getValue();
        const indexOfUpdated = currentRepositories.findIndex(category => category.id === repositoryToReplace.id);
        currentRepositories[indexOfUpdated] = repositoryToReplace;
        this.userRepositories.next([...currentRepositories]);
    }
}
