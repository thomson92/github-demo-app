import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchComponent } from './branch.component';
import { IBranch } from '../../models/branch.model';

describe('BranchComponent', () => {
  let component: BranchComponent;
  let fixture: ComponentFixture<BranchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchComponent);
    component = fixture.componentInstance;

    component.branch = {
      name : 'testName',
      lastCommitSha: '123'
    } as IBranch;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
