import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GithubFacade } from '@github/github.facade';
import { IRepository } from '@github/models/repository.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RepositoriesComponent {

  public repositories: Observable<IRepository[]>;
  public isUserNameValid: Observable<boolean>;

  constructor(private githubFacade: GithubFacade) {
    this.repositories = githubFacade.getRepositories();
    this.isUserNameValid = githubFacade.isUserNameValid();
  }

  public fetchBranches(repo: IRepository): void {
    this.githubFacade.fetchRepositoryBranches(repo.ownerLogin, repo);
  }
}
