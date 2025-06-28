// expense-summary.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExpenseSummaryComponent } from './expense-summary.component';
import { ExpenseService } from '../../services/expense.service';
import { CommonModule } from '@angular/common';

describe('ExpenseSummaryComponent', () => {
  let component: ExpenseSummaryComponent;
  let fixture: ComponentFixture<ExpenseSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, ExpenseSummaryComponent],
      providers: [ExpenseService]
    }).compileComponents();

    fixture = TestBed.createComponent(ExpenseSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});