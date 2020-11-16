import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { IRepository } from '@github/models/repository.model';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RepositoryComponent {

  @Input() repositoryData: IRepository;
  @Output() showDetailsEvent: EventEmitter<IRepository> = new EventEmitter<IRepository>();
  public isVisible = true;

  public toggleDetailsVisbility(): void {
    if (!this.repositoryData.branches) {
      this.showDetailsEvent.emit(this.repositoryData);
    }
    this.isVisible = !this.isVisible;
  }
}
