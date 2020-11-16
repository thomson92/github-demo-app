import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { IBranch } from '@github/models/branch.model';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BranchesComponent implements OnInit {

  @Input() branches: IBranch[];

  constructor() { }

  ngOnInit(): void { }

}
