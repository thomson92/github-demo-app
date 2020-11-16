import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IBranch } from '../../models/branch.model';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BranchComponent {

  @Input() branch: IBranch;

}
