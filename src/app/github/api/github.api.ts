import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class GithubApi {

    constructor(private http: HttpClient) { }

    getUserRepoData(userName: string): Observable<any> {
        return this.http.get(`https://api.github.com/users/${userName}/repos`);
    }
}
