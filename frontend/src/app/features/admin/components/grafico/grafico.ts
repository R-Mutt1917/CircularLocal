import { AfterViewInit, Component, ElementRef, Input, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { Chart } from 'chart.js/auto';

interface Dataset {
  type: 'bar';
  label: string;
  data: number[];
  backgroundColor?: string;
  borderColor?: string;
}

@Component({
  selector: 'app-grafico',
  imports: [],
  templateUrl: './grafico.html',
  styleUrl: './grafico.scss',
})
export class Grafico implements AfterViewInit, OnChanges {

  @ViewChild('mixedChart') mixedChart!: ElementRef<HTMLCanvasElement>;
  mixedChartInstance!: Chart;

  @Input() labels: string[] = ['Materiales reutilizados','Intercambios'];
  @Input() datasets: Dataset[] = [];

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.mixedChartInstance) {
      this.mixedChartInstance.destroy();
      this.createChart();
    }
  }

  ngAfterViewInit(): void {
    this.createChart();
  }

  createChart(): void {
    if (!this.datasets || !this.datasets.length || !this.mixedChart) {
      return;
    }

    this.mixedChartInstance = new Chart(this.mixedChart.nativeElement, {
      data: {
        labels: this.labels,
        datasets: this.datasets
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true }
        },
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }
}
