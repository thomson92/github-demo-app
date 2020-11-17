import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { GithubFacade } from '@github/github.facade';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-search-wrapper',
  templateUrl: './search-wrapper.component.html',
  styleUrls: ['./search-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchWrapperComponent implements OnInit, OnDestroy {

  public readonly placeholderText = 'Provide github user name';
  public readonly buttonText = 'Show user repos';
  public searchControl = new FormControl(null, Validators.required);
  public isDisabled = true;
  public isFetching: Observable<boolean>;

  private subscriptions = new Subscription();

  constructor(private githubFacade: GithubFacade) {
    this.isFetching = githubFacade.isFetching();
  }

  public ngOnInit(): void {
    this.setValueChangesSubscription();
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public fetchUserRepositories(): void {
    this.githubFacade.fetchUserRepositories(this.searchControl.value);
  }

  public get isRequiredError(): boolean {
    return this.searchControl.hasError('required') && (this.searchControl.dirty || this.searchControl.touched);
  }

  private setValueChangesSubscription(): void {
    const subscriptionToValueChanges = this.searchControl.valueChanges
      .subscribe(value => {
        this.isDisabled = value ? false : true;
      });

    this.subscriptions.add(subscriptionToValueChanges);
  }
}
