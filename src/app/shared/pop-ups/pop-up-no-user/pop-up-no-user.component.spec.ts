import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpNoUserComponent } from './pop-up-no-user.component';

describe('PopUpNoUserComponent', () => {
  let component: PopUpNoUserComponent;
  let fixture: ComponentFixture<PopUpNoUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopUpNoUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopUpNoUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
