import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-github-dashboard',
  templateUrl: './github-dashboard.component.html',
  styleUrls: ['./github-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GithubDashboardComponent { }
