import { Component, OnInit } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { StatisticsService } from '../../services/statistics.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [NavComponent, CommonModule],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.css'
})

export class StatsComponent implements OnInit {
  statistics: any[] = [];
  isLoading = true;
  error: string | null = null;

  constructor(private statisticsService: StatisticsService) {}

  ngOnInit(): void {
    this.loadStatistics();
  }

  loadStatistics(): void {
    this.statisticsService.getLatestStatistics().subscribe(
      data => {
        this.statistics = [data];
        this.isLoading = false;
      },
      error => {
        console.error('Erreur lors du chargement des statistiques :', error);
        this.error = 'Erreur lors du chargement des statistiques.';
        this.isLoading = false;
      }
    );
  }
}
