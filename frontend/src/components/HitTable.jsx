import React from 'react';

const HitTable = ({ hits }) => {
return (
    <table className="min-w-full bg-white">
        <thead className="bg-gray-800 text-white">
            <tr>
                <th className="w-1/12 py-2">ID</th>
                <th className="w-2/12 py-2">Request ID</th>
                <th className="w-1/12 py-2">Type</th>
                <th className="w-2/12 py-2">Time</th>
                <th className="w-3/12 py-2">Payload</th>
                <th className="w-1/12 py-2">Content-Type</th>
                <th className="w-1/12 py-2">IP</th>
                <th className="w-1/12 py-2">OS</th>
                <th className="w-2/12 py-2">User Agent</th>
            </tr>
        </thead>
        <tbody className='text-black'>
            {hits.map(hit => (
                <tr key={hit.id}>
                    <td className="border px-4 py-2">R{hit.id.toString().padStart(3, '0')}</td>
                    <td className="border px-4 py-2">{hit.request_id}</td>
                    <td className="border px-4 py-2">{hit.request_type}</td>
                    <td className="border px-4 py-2">{hit.request_time}</td>
                    <td className="border px-4 py-2">{hit.payload}</td>
                    <td className='border px-4 py-2'>{hit.content_type}</td>
                    <td className="border px-4 py-2">{hit.ip_address}</td>
                    <td className="border px-4 py-2">{hit.os}</td>
                    <td className="border px-4 py-2">{hit.user_agent}</td>
                </tr>
            ))}
        </tbody>
    </table>
);
}

export default HitTable;
