import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class GithubApi {

    constructor(private http: HttpClient) { }

    public getUserRepoData(userName: string): Observable<any[]> {
        return this.http.get<any[]>(`https://api.github.com/users/${userName}/repos`);
    }
}
