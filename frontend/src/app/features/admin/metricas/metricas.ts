import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal, computed} from '@angular/core';
import { adminService } from '../../../core/services/adminService/admin';

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
  imports: [CommonModule],
  templateUrl: './metricas.html',
  styleUrl: './metricas.scss',
})
export class Metricas implements OnInit {

  private adminService = inject(adminService)

  totalMaterialesReutilizados = signal<number>(0);
  totalIntercambios = signal<number>(0);
  cantidadUsuarios = signal<number>(0);

  ngOnInit(): void {
    this.obtenerMetricas();
    this.obtenerCantidadUsuarios();
  }

  obtenerMetricas() {
    this.adminService.obtenerMetricas().subscribe({
      next: (metricas) => {
        console.log("Metricas:", metricas);
        if (metricas && metricas.length > 0) {
          this.totalMaterialesReutilizados.set(metricas[0].totalMaterialesReutilizados || 0);
          this.totalIntercambios.set(metricas[0].totalIntercambios || 0);
        }
      },
      error: (err) => console.error("Error al obtener métricas:", err)
    });
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

  