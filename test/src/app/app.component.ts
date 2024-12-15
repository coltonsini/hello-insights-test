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
  openTooltips: { [key: string]: boolean } = {};

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
    }).catch(err => {
      console.error('Error al copiar el enlace: ', err);
    });
  }
  
  // Función para determinar si el enlace ha sido copiado y resetar el estilo
  resetCopied(group: Group): void {
    group.copied = false;
  }

  // Métodos para abrir y cerrar tooltips
  openTooltip(groupId: number, tooltipType: string): void {
    const key = `${groupId}-${tooltipType}`;
    this.openTooltips[key] = true;
  }

  closeTooltip(groupId: number, tooltipType: string): void {
    const key = `${groupId}-${tooltipType}`;
    this.openTooltips[key] = false;
  }

  // Método para verificar si un tooltip está abierto
  isTooltipOpen(groupId: number, tooltipType: string): boolean {
    const key = `${groupId}-${tooltipType}`;
    return this.openTooltips[key] || false;
  }

  // Método para enviar eventos
  sendEvent(buttonType: string, groupName: string): void {
    let eventName: string;
  
    switch(buttonType) {
      case 'validResponses':
        eventName = 'Valid Responses Button Clicked';
        break;
      case 'responseTarget':
        eventName = 'Response Target Button Clicked';
        break;
      case 'detailsButton':
        eventName = 'Details Button Clicked';
        break;
      default:
        eventName = 'Unknown Event';
    }
  
    const eventDescription = `The event "${eventName}" was executed for the survey named "${groupName}".`;
  
    const payload = {
      token: "9Mg98",
      event_name: eventName,
      event_description: eventDescription
    };

    console.log('Sending event payload:', payload);
  
    this.http.post('https://hi-api-develop.helloinsight.org/tech-test-track-event/', payload)
      .subscribe(
        response => {
          console.log('Event tracked successfully:', response);
        },
        error => {
          console.error('Error tracking event:', error);
        }
      );
  }
}

