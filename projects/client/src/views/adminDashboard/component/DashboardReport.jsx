import React, { useEffect, useRef } from 'react'
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import Agetable from './components/Agetable'
import CategoriesReport from './components/CategoriesReport'

Chart.register(BarController, BarElement, CategoryScale, LinearScale)

function DashboardReport() {
  const chartRef = useRef(null)
  useEffect(() => {
    if (chartRef && chartRef.current) {
      const labelsBarChart = ['24', '25', '26', '27', '28', '29']
      const dataBarChart = {
        labels: labelsBarChart,
        datasets: [
          {
            label: 'My First dataset',
            backgroundColor: 'hsl(252, 82.9%, 67.8%)',
            borderColor: 'hsl(252, 82.9%, 67.8%)',
            data: [0, 10, 5, 2, 20, 30, 45]
          }
        ]
      }

      const configBarChart = {
        type: 'bar',
        data: dataBarChart,
        options: {}
      }

      new Chart(chartRef.current.getContext('2d'), configBarChart)
    }
  }, [])
  return (
    <>
      {' '}
      <div className="max-[1024px]:flex-col flex justify-evenly max-[1024px]:justify-center gap-20">
        <div className="h-1/2 w-1/2 max-[1024px]:w-2/3  shadow-lg rounded-lg overflow-hidden self-center">
          <div className="py-3 px-5 flex justify-between bg-gray-50">
            <h2 className="text-xl font-semibold">Bar chart</h2>{' '}
            <CategoriesReport />
          </div>
          <canvas className="" ref={chartRef}></canvas>
        </div>
        <Agetable />
      </div>
    </>
  )
}

export default DashboardReport
