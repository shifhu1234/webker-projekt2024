import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpErrorTransactionComponent } from './pop-up-error-transaction.component';

describe('PopUpErrorTransactionComponent', () => {
  let component: PopUpErrorTransactionComponent;
  let fixture: ComponentFixture<PopUpErrorTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopUpErrorTransactionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopUpErrorTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
