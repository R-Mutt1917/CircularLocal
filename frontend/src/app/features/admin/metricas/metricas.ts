import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal, computed} from '@angular/core';
import { adminService } from '../../../core/services/adminService/admin';
import { Grafico } from '../components/grafico/grafico';

interface StatCard {
  label: string;
  value: number;
  change: string;
  positive: boolean;
  icon: string;
  subtitle: string;
}

interface CategoryItem {
  name: string;
  percentage: number;
  color: string;
}

@Component({
  selector: 'app-metricas',
  imports: [CommonModule, Grafico],
  templateUrl: './metricas.html',
  styleUrl: './metricas.scss',
})
export class Metricas implements OnInit {

  private adminService = inject(adminService)

  totalMaterialesReutilizados = signal<number>(0);
  totalIntercambios = signal<number>(0);
  cantidadUsuarios = signal<number>(0);
  anioSeleccionado = signal<string>(new Date().toISOString().slice(0, 4));
  years = signal<string[]>([]);
  materiales = signal<number[]>([]);
  intercambios = signal<number[]>([]);
  datasets = signal<any[]>([]);
  chartLabels = signal<string[]>([]);

  ngOnInit(): void {
    this.obtenerMetricas();
    this.obtenerCantidadUsuarios();
    this.inicializarAnios();
    this.mostrarGraficos();
  }

  inicializarAnios() {
    const metricasGrafico = this.metrias_mock.filter(m => m.periodo !== 'global');
    const yearsObtenidos = [...new Set(metricasGrafico.map(m => m.periodo.split('-')[0]))];
    this.years.set(yearsObtenidos.sort().reverse());
  }

  onYearChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.anioSeleccionado.set(value);
    this.mostrarGraficos();
  }

  obtenerMetricas() {
    this.adminService.obtenerMetricas().subscribe({
      next: (metricas) => {
        console.log("Metricas:", metricas);
        const global = metricas.find((m: any) => m.periodo === 'global');
        
        if (global) {
          this.totalMaterialesReutilizados.set(global.totalMaterialesReutilizados || 0);
          this.totalIntercambios.set(global.totalIntercambios || 0);
        }
      },
      error: (err) => console.error("Error al obtener métricas:", err)
    });
  }

  private metrias_mock = [
  // --- EXISTENTES ---
  {
    id: 1,
    totalIntercambios: 34,
    totalMaterialesReutilizados: 42,
    periodo: "global",
    fechaUltimaActualizacion: "2026-04-12T23:10:26.000Z"
  },
  {
    id: 2,
    totalIntercambios: 3,
    totalMaterialesReutilizados: 4,
    periodo: "2026-04",
    fechaUltimaActualizacion: "2026-04-12T23:10:26.000Z"
  },
  {
    id: 3,
    totalIntercambios: 5,
    totalMaterialesReutilizados: 6,
    periodo: "2026-03",
    fechaUltimaActualizacion: "2026-03-31T22:15:10.000Z"
  },

  // --- 2025 (faltan 2 meses: 06 y 07) ---
  {
    id: 11,
    totalIntercambios: 7,
    totalMaterialesReutilizados: 9,
    periodo: "2025-05",
    fechaUltimaActualizacion: "2025-05-30T20:10:00.000Z"
  },
  {
    id: 12,
    totalIntercambios: 6,
    totalMaterialesReutilizados: 8,
    periodo: "2025-04",
    fechaUltimaActualizacion: "2025-04-29T19:00:00.000Z"
  },
  {
    id: 13,
    totalIntercambios: 8,
    totalMaterialesReutilizados: 10,
    periodo: "2025-03",
    fechaUltimaActualizacion: "2025-03-30T18:00:00.000Z"
  },
  {
    id: 14,
    totalIntercambios: 5,
    totalMaterialesReutilizados: 6,
    periodo: "2025-02",
    fechaUltimaActualizacion: "2025-02-28T17:00:00.000Z"
  },
  {
    id: 15,
    totalIntercambios: 4,
    totalMaterialesReutilizados: 5,
    periodo: "2025-01",
    fechaUltimaActualizacion: "2025-01-30T16:00:00.000Z"
  },

  // --- 2024 (faltan 2 meses: 02 y 08) ---
  {
    id: 16,
    totalIntercambios: 9,
    totalMaterialesReutilizados: 11,
    periodo: "2024-12",
    fechaUltimaActualizacion: "2024-12-29T21:00:00.000Z"
  },
  {
    id: 17,
    totalIntercambios: 7,
    totalMaterialesReutilizados: 9,
    periodo: "2024-11",
    fechaUltimaActualizacion: "2024-11-28T20:00:00.000Z"
  },
  {
    id: 18,
    totalIntercambios: 6,
    totalMaterialesReutilizados: 7,
    periodo: "2024-10",
    fechaUltimaActualizacion: "2024-10-30T19:00:00.000Z"
  },
  {
    id: 19,
    totalIntercambios: 5,
    totalMaterialesReutilizados: 6,
    periodo: "2024-09",
    fechaUltimaActualizacion: "2024-09-29T18:00:00.000Z"
  },
  {
    id: 20,
    totalIntercambios: 8,
    totalMaterialesReutilizados: 10,
    periodo: "2024-07",
    fechaUltimaActualizacion: "2024-07-28T17:00:00.000Z"
  },
  {
    id: 21,
    totalIntercambios: 4,
    totalMaterialesReutilizados: 5,
    periodo: "2024-06",
    fechaUltimaActualizacion: "2024-06-27T16:00:00.000Z"
  },
  {
    id: 22,
    totalIntercambios: 6,
    totalMaterialesReutilizados: 8,
    periodo: "2024-05",
    fechaUltimaActualizacion: "2024-05-30T15:00:00.000Z"
  },
  {
    id: 23,
    totalIntercambios: 5,
    totalMaterialesReutilizados: 7,
    periodo: "2024-04",
    fechaUltimaActualizacion: "2024-04-29T14:00:00.000Z"
  },
  {
    id: 24,
    totalIntercambios: 3,
    totalMaterialesReutilizados: 4,
    periodo: "2024-03",
    fechaUltimaActualizacion: "2024-03-28T13:00:00.000Z"
  },
  {
    id: 25,
    totalIntercambios: 2,
    totalMaterialesReutilizados: 3,
    periodo: "2024-01",
    fechaUltimaActualizacion: "2024-01-30T12:00:00.000Z"
  },

  // --- 2023 (faltan 2 meses: 03 y 09) ---
  {
    id: 26,
    totalIntercambios: 10,
    totalMaterialesReutilizados: 12,
    periodo: "2023-12",
    fechaUltimaActualizacion: "2023-12-29T21:00:00.000Z"
  },
  {
    id: 27,
    totalIntercambios: 8,
    totalMaterialesReutilizados: 10,
    periodo: "2023-11",
    fechaUltimaActualizacion: "2023-11-28T20:00:00.000Z"
  },
  {
    id: 28,
    totalIntercambios: 7,
    totalMaterialesReutilizados: 9,
    periodo: "2023-10",
    fechaUltimaActualizacion: "2023-10-27T19:00:00.000Z"
  },
  {
    id: 29,
    totalIntercambios: 6,
    totalMaterialesReutilizados: 8,
    periodo: "2023-08",
    fechaUltimaActualizacion: "2023-08-26T18:00:00.000Z"
  },
  {
    id: 30,
    totalIntercambios: 5,
    totalMaterialesReutilizados: 7,
    periodo: "2023-07",
    fechaUltimaActualizacion: "2023-07-25T17:00:00.000Z"
  },
  {
    id: 31,
    totalIntercambios: 4,
    totalMaterialesReutilizados: 6,
    periodo: "2023-06",
    fechaUltimaActualizacion: "2023-06-24T16:00:00.000Z"
  },
  {
    id: 32,
    totalIntercambios: 3,
    totalMaterialesReutilizados: 5,
    periodo: "2023-05",
    fechaUltimaActualizacion: "2023-05-23T15:00:00.000Z"
  },
  {
    id: 33,
    totalIntercambios: 2,
    totalMaterialesReutilizados: 3,
    periodo: "2023-04",
    fechaUltimaActualizacion: "2023-04-22T14:00:00.000Z"
  },
  {
    id: 34,
    totalIntercambios: 1,
    totalMaterialesReutilizados: 2,
    periodo: "2023-02",
    fechaUltimaActualizacion: "2023-02-20T13:00:00.000Z"
  },
  {
    id: 35,
    totalIntercambios: 2,
    totalMaterialesReutilizados: 3,
    periodo: "2023-01",
    fechaUltimaActualizacion: "2023-01-18T12:00:00.000Z"
  }
];

  mostrarGraficos() {
    const metricasGrafico = this.metrias_mock.filter(m => m.periodo !== 'global');
    const yearSeleccionado = this.anioSeleccionado();
    const delAño = metricasGrafico.filter(m => m.periodo.startsWith(yearSeleccionado));

    const MESES_CONFIG = [
      { num: '01', label: 'Ene' }, { num: '02', label: 'Feb' }, { num: '03', label: 'Mar' },
      { num: '04', label: 'Abr' }, { num: '05', label: 'May' }, { num: '06', label: 'Jun' },
      { num: '07', label: 'Jul' }, { num: '08', label: 'Ago' }, { num: '09', label: 'Sep' },
      { num: '10', label: 'Oct' }, { num: '11', label: 'Nov' }, { num: '12', label: 'Dic' }
    ];

    const metricasPorMes = new Map(delAño.map(m => [m.periodo.split('-')[1], m]));

    const dataMateriales = MESES_CONFIG.map(m => metricasPorMes.get(m.num)?.totalMaterialesReutilizados ?? 0);
    const dataIntercambios = MESES_CONFIG.map(m => metricasPorMes.get(m.num)?.totalIntercambios ?? 0);

    this.chartLabels.set(MESES_CONFIG.map(m => m.label));
    
    this.datasets.set([
      {
        type: 'bar',
        label: 'Materiales Reutilizados',
        data: dataMateriales,
        backgroundColor: 'rgb(74, 94, 47)',
        borderRadius: 4
      },
      {
        type: 'bar',
        label: 'Intercambios',
        data: dataIntercambios,
        backgroundColor: '#A14009',
        borderRadius: 4
      }
    ]);
  }

    

  obtenerCantidadUsuarios() {
    this.adminService.obtenerUsuarios().subscribe({
      next: (usuarios) => {
        const count = usuarios.total !== undefined ? usuarios.total : (usuarios.users?.length || 0);
        this.cantidadUsuarios.set(count);
      },
      error: (err) => console.error("Error al obtener usuarios:", err)
    });
  }

  statCards = computed<StatCard[]>(() => [
    {
      label: 'Total Intercambios',
      value: this.totalIntercambios(),
      change: '+12.4%',
      positive: true,
      icon: '⇄',
      subtitle: 'vs. mes anterior',
    },
    {
      label: 'Materiales Recuperados',
      value: this.totalMaterialesReutilizados(),
      change: '+8.2%',
      positive: true,
      icon: '♻',
      subtitle: 'equivalente a 12.4 ton CO₂',
    },
    {
      label: 'Usuarios Activos',
      value: this.cantidadUsuarios(),
      change: '+2.1%',
      positive: true,
      icon: '✦',
      subtitle: 'Retención: 68%',
    },
  ]);

  categories: CategoryItem[] = [
    { name: 'Textiles', percentage: 42, color: '#2c3a1e' },
    { name: 'Plásticos', percentage: 28, color: '#A14009' },
    { name: 'Orgánicos', percentage: 15, color: '#8a9e6b' },
    { name: 'Papel y Cartón', percentage: 10, color: '#b8b0a0' },
    { name: 'Otros', percentage: 5, color: '#4a5e2f' },
  ];

  totalMateriales = '4,812';

  activeTab: 'semanal' | 'mensual' = 'semanal';

  setTab(tab: 'semanal' | 'mensual') {
    this.activeTab = tab;
  }
}

  