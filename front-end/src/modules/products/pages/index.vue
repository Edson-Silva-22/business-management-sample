<template>
  <v-container>
    <v-card color="foreground">
      <div class="d-flex justify-space-between flex-wrap pa-2">
        <v-card-title primary-title class="pa-0">
          Minhas Vendas
        </v-card-title>
  
        <v-menu class="">
          <template v-slot:activator="{ props }">
            <v-btn 
              color="primary" 
              variant="outlined"
              append-icon="mdi-arrow-down-drop-circle-outline"
              v-bind="props"
            >Exportar Relatório</v-btn>
          </template>

          <v-list class="bg-background">
            <v-list-item
              v-for="item in exportOptios"
              :key="item.value"
              :value="item.value"
              :prepend-icon="item.icon"
              @click="item.action"
            >{{ item.title }}</v-list-item>
          </v-list>
        </v-menu>
      </div>

      <VueApexCharts
        type="bar"
        height="350"
        :options="chartOptions"
        :series="series"
      />
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import VueApexCharts from 'vue3-apexcharts'
  import type { ApexOptions } from 'apexcharts'
  import { unparse } from 'papaparse'
  import * as XLSX from 'xlsx'
  import { saveAs } from 'file-saver'

  const salesData = ref([
    { value: 5, unitsSold: 100, total: 500, month: 'Jan' },
    { value: 10, unitsSold: 100, total: 1000, month: 'Fev' },
    { value: 8, unitsSold: 120, total: 960, month: 'Mar' },
    { value: 12, unitsSold: 150, total: 1800, month: 'Abr' },
    { value: 15, unitsSold: 180, total: 2700, month: 'Mai' },
    { value: 9, unitsSold: 110, total: 990, month: 'Jun' },
    { value: 14, unitsSold: 170, total: 2380, month: 'Jul' },
    { value: 11, unitsSold: 140, total: 1540, month: 'Ago' },
    { value: 13, unitsSold: 160, total: 2080, month: 'Set' },
    { value: 16, unitsSold: 200, total: 3200, month: 'Out' },
    { value: 18, unitsSold: 220, total: 3960, month: 'Nov' },
    { value: 20, unitsSold: 250, total: 5000, month: 'Dez' }
  ])
  // ✅ apenas os valores que serão exibidos
  const series = ref([
    { 
      name: 'Vendas', 
      data: salesData.value.map(item => item.total) 
    }
  ])
  const chartOptions = ref<ApexOptions>({
    chart: {
      type: 'bar',
      toolbar: { show: false }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 6,
        dataLabels: {
          position: 'top'
        }
      }
    },
    dataLabels: { 
      enabled: false,
      // formatter: function (val) {
      //   return "R$ " + val
      // }
    },
    xaxis: {
      categories: salesData.value.map(item => item.month),
      crosshairs: {
        fill: {
          type: 'gradient',
          gradient: {
            colorFrom: '#0369a1',
            colorTo: '#BED1E6',
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          }
        }
      },
      labels: {
        style: {
          colors: '#fff'
        }
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: '#fff'
        }
      }
    },
    tooltip: {
      theme: 'dark',
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        return `
          <div class="tooltipCotainer">
            <div class="tooltipHeader">
              <p>${w.globals.labels[dataPointIndex]}</p>
            </div>

            <div class="tooltipContent">
              <p>R$ ${series[seriesIndex][dataPointIndex]}</p>
            </div>
          </div>
        `
      }
    },
  })
  const exportOptios = ref([
    {
      title: "Baixar em CSV",
      icon: 'mdi-table-large',
      value: 'csv',
      action: exportToCSV
    },
    {
      title: "Baixar em Excel",
      icon: 'mdi-file-table',
      value: 'excel',
      action: exportToExcel
    }
  ])

  function exportToCSV() {
    const data = salesData.value.map(item => ({
      Mês: item.month,
      "Unidades Vendidas": item.unitsSold,
      "Total (R$)": item.total,
    }))
    const csv = unparse(data) // converte JSON → CSV

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'vendas.csv')
    link.click()
    URL.revokeObjectURL(url)
  }

  function exportToExcel() {
    const data = salesData.value.map(item => ({
      Mês: item.month,
      Vendas: item.total,
      Unidades: item.unitsSold
    }))

    const worksheet = XLSX.utils.json_to_sheet(data)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Vendas')

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' })
    saveAs(blob, 'vendas.xlsx')
  }
</script>

<style>
  .tooltipCotainer {
    width: 100px;
    max-width: 200px;
    font-size: 12px;
  }

  .tooltipHeader {
    background-color: #0f172a;
    padding: 5px;
    border-radius: 5px 5px 0px 0px;
  }

  .tooltipContent{
    background-color: #020617;
    padding: 5px;
    border-radius: 0px 0px 5px 5px;
  }
</style>