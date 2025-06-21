import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Firestore, collection, collectionData, Timestamp, DocumentData, CollectionReference } from '@angular/fire/firestore';
import { NgChartsModule, BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartOptions, ChartType } from 'chart.js';
import { map } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import 'chartjs-adapter-date-fns';

@Component({
  selector: 'app-admin-graficas',
  standalone: true,
  imports: [CommonModule, NgChartsModule, MatCardModule],
  templateUrl: './admin-graficas.component.html',
  styleUrls: ['./admin-graficas.component.css'],
})
export class AdminGraficasComponent implements OnInit {
  @ViewChildren(BaseChartDirective) charts!: QueryList<BaseChartDirective>;

  public chartType: ChartType = 'bar';

  public chartDataFechas: ChartData = {
    labels: [],
    datasets: [{
      label: 'Cotizaciones por Fecha',
      data: [],
      backgroundColor: 'rgba(201, 90, 100, 0.7)'
    }]
  };

  public chartOptionsFechas: ChartOptions = {
    responsive: true,
    scales: {
      x: { type: 'category', title: { display: true, text: 'Fecha' }},
      y: { beginAtZero: true, title: { display: true, text: 'Cantidad' }}
    },
    plugins: {
      legend: { display: true, position: 'top' },
      title: { display: true, text: 'Resumen de Cotizaciones por Fecha' }
    }
  };

  public chartDataFinanciamiento: ChartData = {
    labels: [],
    datasets: [{
      label: 'Tipo de Financiamiento',
      data: [],
      backgroundColor: 'rgba(90, 201, 150, 0.7)'
    }]
  };

  public chartOptionsFinanciamiento: ChartOptions = {
    responsive: true,
    scales: {
      x: { type: 'category', title: { display: true, text: 'Financiamiento' }},
      y: { beginAtZero: true, title: { display: true, text: 'Cantidad' }}
    },
    plugins: {
      legend: { display: true, position: 'top' },
      title: { display: true, text: 'Resumen por Tipo de Financiamiento' }
    }
  };

  public chartDataVehiculos: ChartData = {
    labels: [],
    datasets: [{
      label: 'ID del Vehículo',
      data: [],
      backgroundColor: 'rgba(90, 150, 201, 0.7)'
    }]
  };

  public chartOptionsVehiculos: ChartOptions = {
    responsive: true,
    scales: {
      x: { type: 'category', title: { display: true, text: 'ID de Vehículo' }},
      y: { beginAtZero: true, title: { display: true, text: 'Cantidad' }}
    },
    plugins: {
      legend: { display: true, position: 'top' },
      title: { display: true, text: 'Resumen por Vehículo' }
    }
  };

  constructor(private firestore: Firestore) {}

  ngOnInit(): void {
    const cotizacionesRef = collection(this.firestore, 'cotizaciones') as CollectionReference<DocumentData>;

    collectionData(cotizacionesRef, { idField: 'id' }).pipe(
      map(items => items.map(item => ({ ...item })))
    ).subscribe(data => {
      const fechaMap = new Map<number, number>();
      data.forEach(item => {
        if (item['contactDate']?.seconds) {
          const fecha = new Date(item['contactDate'].seconds * 1000);
          fecha.setHours(0, 0, 0, 0);
          const ts = fecha.getTime();
          fechaMap.set(ts, (fechaMap.get(ts) || 0) + 1);
        }
      });
      const fechas = Array.from(fechaMap.entries()).sort((a, b) => a[0] - b[0]);
      this.chartDataFechas.labels = fechas.map(([ts]) =>
        new Date(ts).toLocaleDateString('es-MX', { day: '2-digit', month: '2-digit', year: 'numeric' }));
      this.chartDataFechas.datasets[0].data = fechas.map(([, count]) => count);

      const financiamientoMap = new Map<string, number>();
      data.forEach(item => {
        const tipo = item['financingType']?.toString() || 'Desconocido';
        financiamientoMap.set(tipo, (financiamientoMap.get(tipo) || 0) + 1);
      });
      const tipos = Array.from(financiamientoMap.entries()).sort((a, b) => a[0].localeCompare(b[0]));
      this.chartDataFinanciamiento.labels = tipos.map(([tipo]) => tipo);
      this.chartDataFinanciamiento.datasets[0].data = tipos.map(([, count]) => count);

      const vehiculoMap = new Map<string, number>();
      data.forEach(item => {
        const idVehiculo = item['vehicleId']?.toString() || 'Desconocido';
        vehiculoMap.set(idVehiculo, (vehiculoMap.get(idVehiculo) || 0) + 1);
      });
      const vehiculos = Array.from(vehiculoMap.entries()).sort((a, b) => a[0].localeCompare(b[0]));
      this.chartDataVehiculos.labels = vehiculos.map(([id]) => id);
      this.chartDataVehiculos.datasets[0].data = vehiculos.map(([, count]) => count);

      setTimeout(() => {
        this.charts.forEach(chart => chart.update());
      });
    });
  }
}
