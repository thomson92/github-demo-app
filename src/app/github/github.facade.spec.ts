import { TestBed, getTestBed, waitForAsync } from '@angular/core/testing';
import { GithubApi } from './api/github.api';
import { GithubFacade } from './github.facade';
import { GithubState } from './state/github.state';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { IRepository } from './models/repository.model';
import { pipe } from 'rxjs';
import { skip } from 'rxjs/operators';

describe('Github facade', () => {

    let injector: TestBed;
    let gitHubFacade: GithubFacade;
    let gitHubState: GithubState;
    let httpMock: HttpTestingController;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [GithubFacade, GithubApi, GithubState]
        });
    }));

    beforeEach(() => {
        injector = getTestBed();
        gitHubFacade = injector.inject(GithubFacade);
        gitHubState = injector.inject(GithubState);
        httpMock = injector.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    const reposMock = [
        {
            id: 123,
            name: 'test',
            ownerLogin: 'string',
            branches: null
        },
        {
            id: 1234,
            name: 'test2',
            ownerLogin: 'string',
            branches: null
        }
    ] as IRepository[];

    it('should fetch repos', () => {
        const repos$ = gitHubFacade.getRepositories();
        let newRepos;

        repos$
            .pipe(
                skip(1)
            )
            .subscribe(e => {
                newRepos = e;
                expect(e).toEqual(reposMock);
            });

        gitHubState.setUserRepositories(reposMock);
    });
});
