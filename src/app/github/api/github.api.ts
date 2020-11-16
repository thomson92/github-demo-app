import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class GithubApi {

    private static GITHUB_BASE_URL = 'https://api.github.com';

    constructor(private http: HttpClient) { }

    public getUserRepositories(userName: string): Observable<any[]> {
        return this.http.get<any[]>(`${GithubApi.GITHUB_BASE_URL}/users/${userName}/repos`);
    }

    public getRepoBranches(userName: string, repoName: string): Observable<any[]> {
        return this.http.get<any[]>(`${GithubApi.GITHUB_BASE_URL}/repos/${userName}/${repoName}/branches`);
    }
}
