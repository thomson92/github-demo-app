import { Component } from '@angular/core';
import { GithubFacade } from '@github/github.facade';
import { IRepository } from '@github/models/repository.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.scss']
})
export class RepositoriesComponent {

  public repositories: Observable<IRepository[]>;

  constructor(private githubFacade: GithubFacade) {
    this.repositories = githubFacade.getRepositories();
  }
}
