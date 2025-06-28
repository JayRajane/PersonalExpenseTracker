// expense-summary.component.ts
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpenseService } from '../../services/expense.service';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-expense-summary',
  templateUrl: './expense-summary.component.html',
  styleUrls: ['./expense-summary.component.css'],
  imports: [CommonModule],
  standalone: true
})
export class ExpenseSummaryComponent implements OnInit, AfterViewInit {
  @ViewChild('categoryChart') categoryChartRef!: ElementRef<HTMLCanvasElement>;
  totalExpenses = 0;
  chart: Chart | undefined;

  constructor(private expenseService: ExpenseService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.updateSummary();
  }

  ngAfterViewInit(): void {
    this.createChart(this.expenseService.getExpenses());
  }

  updateSummary(): void {
    const expenses = this.expenseService.getExpenses();
    this.totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  }

  createChart(expenses: any[]): void {
    if (!this.categoryChartRef?.nativeElement) {
      console.error('Canvas element is not available');
      return;
    }

    const categories = this.expenseService.getCategories();
    const categoryTotals: { [key: string]: number } = {};

    categories.forEach(category => {
      categoryTotals[category] = 0;
    });

    expenses.forEach(expense => {
      categoryTotals[expense.category] += expense.amount;
    });

    const labels = categories.filter(cat => categoryTotals[cat] > 0);
    const data = labels.map(cat => categoryTotals[cat]);

    if (this.chart) {
      this.chart.destroy();
    }

    const ctx = this.categoryChartRef.nativeElement.getContext('2d');
    if (!ctx) {
      console.error('Failed to get 2D context for canvas');
      return;
    }

    this.chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: [
            '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
            '#9966FF', '#FF9F40', '#8AC24A', '#F06292'
          ],
          hoverBackgroundColor: [
            '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
            '#9966FF', '#FF9F40', '#8AC24A', '#F06292'
          ]
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'right',
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = context.label || '';
                const value = Number(context.raw) || 0;
                const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
                const percentage = Math.round((value / total) * 100);
                return `${label}: ${value} (${percentage}%)`;
              }
            }
          }
        }
      }
    });
  }
}