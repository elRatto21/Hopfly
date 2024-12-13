import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { BrandService } from 'src/app/services/brand.service';
import { EntryService } from 'src/app/services/entry.service';
import { Entry } from 'src/app/models/entry.model';
import { Brand } from 'src/app/models/brand.model';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-stats',
  templateUrl: './stats.page.html',
  styleUrls: ['./stats.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class StatsPage implements OnInit {
  @ViewChild('weekdayChart') weekdayChart!: ElementRef;
  @ViewChild('brandChart') brandChart!: ElementRef;

  entries: Entry[] = []
  brands: Brand[] = []

  private weekdays = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  constructor(private entryService: EntryService, private brandService: BrandService) { }

  async ngOnInit() {
    this.entries = await this.entryService.getAllEntries();
    this.brands = await this.brandService.getBrands();
    this.createWeekdayChart();
    this.createBrandChart();
  }

  private createWeekdayChart() {
    const entriesPerWeekday = new Array(7).fill(0);
    
    this.entries.forEach(entry => {
      const date = new Date(entry.created_at);
      const weekday = date.getDay();
      entriesPerWeekday[weekday]++;
    });

    const ctx = this.weekdayChart.nativeElement.getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.weekdays,
        datasets: [{
          label: 'Entries per Weekday',
          data: entriesPerWeekday,
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1
            }
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'Entries per Weekday',
            font: {
              size: 18
            }
          }
        }
      }
    });
  }

  private getBrandName(brandId: number): string {
    const brand = this.brands.find(b => b.id === brandId);
    return brand?.name || `Unknown Brand (${brandId})`;
  }

  private createBrandChart() {
    const brandCounts = this.entries.reduce((acc, entry) => {
      acc[entry.brand_id] = (acc[entry.brand_id] || 0) + 1;
      return acc;
    }, {} as { [key: number]: number });
  
    const total = this.entries.length;
    const brandIds = Object.keys(brandCounts).map(Number);
    const percentages = brandIds.map(id => (brandCounts[id] / total) * 100);
    const brandNames = brandIds.map(id => this.getBrandName(id));
  
    const colors = this.generateColors(brandIds.length);
  
    const ctx = this.brandChart.nativeElement.getContext('2d');
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: brandNames,
        datasets: [{
          data: percentages,
          backgroundColor: colors,
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Entries by Brand',
            padding: {
              top: 75,
              bottom: 0
            },
            font: {
              size: 18
            }
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const brandName = brandNames[context.dataIndex];
                const percentage = context.parsed.toFixed(1);
                const count = brandCounts[brandIds[context.dataIndex]];
                return `${brandName}: ${percentage}% (${count} entries)`;
              }
            }
          },
          legend: {
            position: 'right'
          }
        }
      }
    });
  }

  private generateColors(count: number): string[] {
    const colors = [
      '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
      '#FF9F40', '#FF6384', '#C9CBCF', '#7BC225', '#E8C3B9'
    ];
    
    while (colors.length < count) {
      colors.push(this.getRandomColor());
    }

    return colors.slice(0, count);
  }

  private getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

}
