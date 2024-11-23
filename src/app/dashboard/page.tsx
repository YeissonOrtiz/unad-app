'use client';

import { useState } from 'react';
import { mockTrafficData } from '@/data/red';
import { evaluateSite } from '@/data/evaluateSite';

const TrafficDashboard: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 15;

  const totalRecords = mockTrafficData.length;

  const analyzedData = mockTrafficData.map((data) => ({
    ...data,
    isTrusted: evaluateSite({
      ...data,
      https: data.protocol ? data.protocol === 'HTTPS' : false,
      creationDate: data.domainCreationDate,
      ipBlacklist: data.isIPBlacklisted,
    }),
  }));

  const untrustedData = analyzedData.filter((data) => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  
    const recordDate = new Date(data.timestamp);
    return !data.isTrusted.isTrustworthy && recordDate >= sevenDaysAgo;
  });
  

  const fiabilityPercentage =
    ((totalRecords - untrustedData.length) / totalRecords) * 100;

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = analyzedData.slice(indexOfFirstRecord, indexOfLastRecord);

  const totalPages = Math.ceil(totalRecords / recordsPerPage);

  const handleClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="flex gap-4 my-8">
        <div className="flex-1 bg-white shadow rounded p-4">
          <h3 className="text-xl font-semibold text-slate-900 mb-2">
            Fiability % (Last 7 Days)
          </h3>
          <p className="text-slate-700">{fiabilityPercentage.toFixed(2)}%</p>
        </div>
        <div className="flex-1 bg-white shadow rounded p-4">
          <h3 className="text-xl font-semibold text-slate-900 mb-2">
            Untrusted Sites (Last 7 Days)
          </h3>
          <p className="text-slate-700">{untrustedData.length}</p>
        </div>
        <div className="flex-1 bg-white shadow rounded p-4">
          <h3 className="text-xl font-semibold text-slate-900 mb-2">
            Records Analyzed
          </h3>
          <p className="text-slate-700">{totalRecords}</p>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-slate-900">Timestamp</th>
              <th className="px-4 py-2 text-left text-slate-900">Domain</th>
              <th className="px-4 py-2 text-left text-slate-900">Protocol</th>
              <th className="px-4 py-2 text-left text-slate-900">Method</th>
              <th className="px-4 py-2 text-left text-slate-900">Trusted</th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.map((data, index) => (
              <tr key={index} className={`${!data.isTrusted.isTrustworthy && 'bg-red-400'} border-t`}>
                <td className="px-4 py-2 text-slate-700">{data.timestamp}</td>
                <td className="px-4 py-2 text-slate-700">{data.domain}</td>
                <td className="px-4 py-2 text-slate-700">{data.protocol}</td>
                <td className="px-4 py-2 text-slate-700">{data.requestMethod}</td>
                <td className="px-4 py-2 text-slate-700">
                  {data.isTrusted.isTrustworthy ? 'Yes' : 'No'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={`mx-1 px-3 py-1 rounded ${
              currentPage === index + 1
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-slate-700'
            }`}
            onClick={() => handleClick(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TrafficDashboard;
