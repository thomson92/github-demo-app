import { Injectable } from '@angular/core';
import { IRepository } from '@github/models/repository.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class GithubState {

    private updating = new BehaviorSubject<boolean>(false);
    private userNameValid = new BehaviorSubject<boolean>(null);
    private userRepositories = new BehaviorSubject<IRepository[]>(null);

    public isUpdating(): Observable<boolean> {
        return this.updating.asObservable();
    }

    public isUserNameValid(): Observable<boolean> {
        return this.userNameValid.asObservable();
    }

    public getRepositories(): Observable<IRepository[]> {
        return this.userRepositories.asObservable();
    }

    public setUpdating(isUpdating: boolean): void {
        this.updating.next(isUpdating);
    }

    public setUserNameValidity(isValid: boolean): void {
        this.updating.next(isValid);
    }

    public setUserRepositories(userRepos: IRepository[]): void {
        this.userRepositories.next(userRepos);
    }

    public updateFetchedRepositories(repositoryToReplace: IRepository): void {
        const currentRepositories = this.userRepositories.getValue();
        const indexOfUpdated = currentRepositories.findIndex(category => category.name === repositoryToReplace.name);
        currentRepositories[indexOfUpdated] = repositoryToReplace;
        this.userRepositories.next([...currentRepositories]);
    }
}
