import { Component } from '@angular/core';
import { GithubFacade } from '@github/github.facade';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  public searchValue: string;

  constructor(private githubFacade: GithubFacade) { }

  public setUserRepoData(): void {
    this.githubFacade.setUserRepoData(this.searchValue);
  }
}
