import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpTransactionComponent } from './pop-up-transaction.component';

describe('PopUpTransactionComponent', () => {
  let component: PopUpTransactionComponent;
  let fixture: ComponentFixture<PopUpTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopUpTransactionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopUpTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
