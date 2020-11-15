import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { GithubFacade } from '@github/github.facade';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarComponent implements OnInit, OnDestroy {

  public searchControl = new FormControl(null, Validators.required);
  public isDisabled = true;
  private subscriptions = new Subscription();

  constructor(private githubFacade: GithubFacade) { }

  public ngOnInit(): void {
    this.setValueChangesSubscription();
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public setUserRepoData(): void {
    this.githubFacade.setUserRepoData(this.searchControl.value);
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
