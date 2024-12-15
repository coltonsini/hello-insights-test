import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

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
  copied?: boolean;
}

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  title = 'Survey responses';
  data: ApiResponse | null = null;
  groups: Group[] = [];
  openGroupId: number | null = null;

  toggleChevron(id: number): void {
    this.openGroupId = this.openGroupId === id ? null : id;
  }

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
      },
      error => {
        console.error('Error al obtener los datos:', error);
      }
    );
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

  // Función para determinar el color de relleno del SVG
  getSvgFillColor(group: Group): string {
    return group.valid_responses === group.response_target ? '#B15DCB' : '#86909E';
  }

  // Función para copiar el enlace al portapapeles
  copySurveyLink(link: string, groupId: number): void {
    navigator.clipboard.writeText(link).then(() => {
      const group = this.groups.find(g => g.id === groupId);
      if (group) {
        group.copied = true;
      }
      console.log('Enlace copiado al portapapeles');
    }).catch(err => {
      console.error('Error al copiar el enlace: ', err);
    });
  }
  
  resetCopied(group: Group): void {
    group.copied = false;
  }
}

