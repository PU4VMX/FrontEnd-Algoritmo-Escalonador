import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShotestRemaningComponent } from './shotest-remaning.component';

describe('ShotestRemaningComponent', () => {
  let component: ShotestRemaningComponent;
  let fixture: ComponentFixture<ShotestRemaningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShotestRemaningComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShotestRemaningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
