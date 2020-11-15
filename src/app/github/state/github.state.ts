import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class GithubState {
    private updating = new BehaviorSubject<boolean>(false);
    private userRepoData = new BehaviorSubject<any[]>(null);

    public isUpdating(): Observable<boolean> {
        return this.updating.asObservable();
    }

    public setUpdating(isUpdating: boolean): void {
        this.updating.next(isUpdating);
    }

    public setUserRepoData(userRepos: any[]): void {
        this.userRepoData.next(userRepos);
    }
}
