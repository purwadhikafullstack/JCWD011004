import React, { useEffect, useRef } from 'react'
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

Chart.register(BarController, BarElement, CategoryScale, LinearScale)

function DashboardReport() {
  const chartRef = useRef(null)
  useEffect(() => {
    if (chartRef && chartRef.current) {
      const labelsBarChart = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June'
      ]
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
      <div className="max-[1024px]:flex  max-[1024px]:justify-center">
        <div className="h-1/2 w-1/2 max-[1024px]:w-2/3  shadow-lg rounded-lg overflow-hidden">
          <div className="py-3 px-5 bg-gray-50">Bar chart</div>
          <canvas className="" ref={chartRef}></canvas>
        </div>
      </div>
    </>
  )
}

export default DashboardReport
