import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent implements OnInit {
  title = 'Survey responses';
  data: any;
  groups: Group[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.http.get<ApiResponse>('https://hi-api-develop.helloinsight.org/tech-test-groups-list/')
      .subscribe(response => {
        this.data = response;
        this.groups = response.data.groups;
        // console.log(this.groups);
      });
  }

  // Función para calcular el porcentaje de progreso
  calcularPorcentaje(valid: number, target: number): number {
    if (target === 0) return 0;
    return Math.min((valid / target) * 100, 100);
  }

  // Función para determinar el color basado en el progreso
  determinarColor(valid: number, target: number): string {
    return valid >= target ? '#B15DCB' : '#FF246D';
  }
}

interface ApiResponse {
  data: {
    groups: Group[];
  };
}

interface Group {
  backup_surveys: string;
  end_date: string;
  id: number;
  name: string;
  participants: number;
  response_target: number;
  site: string;
  start_date: string;
  survey_admin_kit: string;
  survey_date: string;
  survey_link: string;
  valid_responses: number;
}

