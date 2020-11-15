import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { GitHubRoutingModule } from './github-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GithubDashboardComponent } from './containers/github-dashboard/github-dashboard.component';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [SearchBarComponent, GithubDashboardComponent],
  imports: [
    CommonModule,
    GitHubRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class GithubModule { }
