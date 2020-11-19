import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepositoryComponent } from './repository.component';
import { IRepository } from '../../models/repository.model';

describe('RepositoryComponent', () => {
  let component: RepositoryComponent;
  let fixture: ComponentFixture<RepositoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RepositoryComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepositoryComponent);
    component = fixture.componentInstance;

    component.repositoryData = {
      name: 'testRepo',
      ownerLogin: 'testLogin'
    } as IRepository;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
