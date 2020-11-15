import { Component, Input } from '@angular/core';
import { IRepository } from '@github/models/repository.model';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.scss']
})
export class RepositoryComponent {

  @Input() repositoryData: IRepository;
}
