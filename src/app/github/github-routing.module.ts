import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GithubDashboardComponent } from './containers/github-dashboard/github-dashboard.component';

const routes: Routes = [{
    path: '',
    component: GithubDashboardComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GitHubRoutingModule { }
