import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShotestJobComponent } from './shotest-job.component';

describe('ShotestJobComponent', () => {
  let component: ShotestJobComponent;
  let fixture: ComponentFixture<ShotestJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShotestJobComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShotestJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
