import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordverificationComponent } from './passwordverification.component';

describe('PasswordverificationComponent', () => {
  let component: PasswordverificationComponent;
  let fixture: ComponentFixture<PasswordverificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswordverificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordverificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
