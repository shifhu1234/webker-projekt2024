import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpErrorRegistrationComponent } from './pop-up-error-registration.component';

describe('PopUpErrorRegistrationComponent', () => {
  let component: PopUpErrorRegistrationComponent;
  let fixture: ComponentFixture<PopUpErrorRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopUpErrorRegistrationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopUpErrorRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
