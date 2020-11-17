import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IBranch } from '@github/models/branch.model';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BranchesComponent {

  @Input() branches: IBranch[];
}
