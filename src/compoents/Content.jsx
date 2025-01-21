import React, { useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { fetchAmountTransactionAPI, fetchTransactionAPI } from '../services/transactionServices';
import { fetchCategoryAPI } from '../services/categoryServices';
import {
  Chart,
  DoughnutController,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';


Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

const Content = () => {
  const navigate = useNavigate();
  const [chartSize, setChartSize] = useState({ width: 0, height: 0 });
  const chartRef = useRef(null);
  const chartInstance = useRef(null); 

  const { data: summarydata, isSuccess: summaryDataLoaded } = useQuery({
    queryFn: fetchAmountTransactionAPI,
    queryKey: ["fetchAmount"],
    refetchOnWindowFocus: true,
    staleTime: 300,
  });

  const { data } = useQuery({
    queryFn: fetchTransactionAPI,
    queryKey: ["recentransaction"],
    refetchOnWindowFocus: true,
    staleTime: 300,
  });

  const { data: categorydata } = useQuery({
    queryFn: fetchCategoryAPI,
    queryKey: ["categorylist"],
    refetchOnWindowFocus: true,
    staleTime: 300,
  });

  const limitedData = data?.slice(0, 2);

  useEffect(() => {
    const updateChartSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      
      setChartSize({
        width: width / 1.25,
        height: height / 1.25, 
      });
    };

    updateChartSize();
    window.addEventListener('resize', updateChartSize);

    return () => {
      window.removeEventListener('resize', updateChartSize);
    };
  }, []);

  useEffect(() => {
    if (summaryDataLoaded && chartRef.current && summarydata) {
     
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      chartInstance.current = new Chart(chartRef.current.getContext('2d'), {
        type: 'doughnut',
        data: {
          labels: ['Balance', 'Income', 'Expense'],
          datasets: [
            {
              label: 'Amount in Units',
              data: [
                summarydata.balance,
                summarydata.totalIncome,
                summarydata.totalExpense,
              ],
              backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
              hoverOffset: 4,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              callbacks: {
                label: function (tooltipItem) {
                  return (
                    tooltipItem.dataset.label +
                    ': ' +
                    tooltipItem.raw +
                    ' units'
                  );
                },
              },
            },
          },
        },
      });
    }

   
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [summaryDataLoaded, summarydata]);

  return (
    <>
      <div className=" bg-red-300 border-white border-2 pb-7 ">
        <div className="mt-2 ml-1 mr-2 justify-between">
          <div className="font-semibold border-white border-2 w-full text-center h-6 text-sm text-center rounded md:text-base md:mb-2 md:pb-6  bg-red-300    pb-2">
            Dashboard
          </div>
        </div>

        <div className="w-full flex justify-end ">
          <div
            className="text-end text-xs mr-2 pl-2 pr-2 border border-black mt-2 w-18 rounded cursor-pointer   md:text-base md:pl-3 md:pb-1  hover:bg-red-100 hover:font-semibold"
            onClick={() => navigate('/transaction')}
          >
            + Add Transaction
          </div>
        </div>

        <div className="flex pt-5 pl-2 text-sm pl-9 pb-2">
          <div className="border border-black border-1 h-14 pr-5 pl-2 text-xs xl:text-xl 2xl:text-xl   md:text-sm  font-semibold">
            Current Balance
            <div className="text-center pt-1 xl:text-xl 2xl:text-xl">
              {summarydata?.balance}
            </div>
          </div>
          <div className="border border-black h-13 pl-8 pr-8 text-xs xl:text-xl 2xl:text-xl   md:text-sm   font-semibold">
            Total Income
            <div className="text-center pt-1 xl:text-xl 2xl:text-xl">
              {summarydata?.totalIncome}
            </div>
          </div>
          <div className="border border-black h-13 pl-8 pr-8 text-xs xl:text-xl 2xl:text-xl   md:text-sm   font-semibold">
            Total Expense
            <div className="text-center pt-1 xl:text-xl 2xl:text-xl">
              {summarydata?.totalExpense}
            </div>
          </div>
        </div>
      </div>

      <div className="  flex justify-center items-center h-6 text-dark   md:text-base mb-2 mt-2">
        <div className="text-sm px-9 text-center  xl:text-xl 2xl:text-xl font-semibold md:text-base  ">
          Recent Transactions
        </div>
      </div>

      <div className="flex justify-center pt-3  bg-red-300 md:pb-3">
        <div className="w-full max-w-6xl">
          <table className="table-auto border-collapse border-2 border-red-200 text-left mx-auto text-lg">
            <thead>
              <tr>
                <th className="border-2 border-black px-4 py-3 text-center md:text-base">Category</th>
                <th className="border-2 border-black px-4 py-3 text-center hidden sm:table-cell  md:md:text-base">Amount</th>
                <th className="border-2 border-black px-4 py-3 text-center hidden sm:table-cell   md:md:text-base">Description</th>
                <th className="border-2 border-black px-4 py-3 text-center   md:md:text-base">Type</th>
              </tr>
            </thead>
            <tbody>
              {limitedData?.map((transaction) => (
                <tr key={transaction._id}>
                  <td className="border-2 border-black px-4 py-3 text-center   md:md:text-base">
                    {categorydata?.find(category => category._id === transaction.category)?.category}
                  </td>
                  <td className="border-2 border-black px-4 py-3 text-center hidden sm:table-cell   md:md:text-base">{transaction.amount}</td>
                  <td className="border-2 border-black px-4 py-3 text-center hidden sm:table-cell   md:md:text-base">{transaction.description}</td>
                  <td className="border-2 border-black px-4 py-3 text-center   md:md:text-base">{transaction.transactionType}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="  flex justify-center items-center h-6 text-white mt-3 text-black ml-3 mb-2 mt-2">
        <div className="text-sm px-9 text-center md:text-base xl:text-xl 2xl:text-xl  font-semibold pb-2">
          Representation
        </div>
      </div>

      <div className="pt-3 pb-5 flex justify-center bg-sky-800   pt-2">
        <canvas ref={chartRef} width={chartSize.width} height={chartSize.height}></canvas>
      </div>
    </>
  );
};

export default Content;
