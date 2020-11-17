import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { GithubFacade } from '@github/github.facade';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search-wrapper',
  templateUrl: './search-wrapper.component.html',
  styleUrls: ['./search-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchWrapperComponent {

  public readonly placeholderText = 'Provide github user name';
  public readonly buttonText = 'Show user repos';
  public searchControl = new FormControl(null, Validators.required);
  public isDisabled = false;
  public isFetching: Observable<boolean>;

  constructor(private githubFacade: GithubFacade) {
    this.isFetching = githubFacade.isFetching();
  }

  public fetchUserRepositories(): void {
    this.searchControl.markAsTouched({onlySelf: true});
    if (!this.isRequiredError) {
      this.githubFacade.fetchUserRepositories(this.searchControl.value);
    }
  }

  public get isRequiredError(): boolean {
    return this.searchControl.hasError('required') && (this.searchControl.dirty || this.searchControl.touched);
  }
}
