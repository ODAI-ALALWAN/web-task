import { BarChart, Bar, ResponsiveContainer, Legend, Tooltip, CartesianGrid, XAxis, YAxis, Cell } from 'recharts';



export default function TinyBarChart({ statusData = [] }) {



  const COLORS = ['#0088FE', '#FFBB28', '#4ade80'];

  const data = Array.isArray(statusData)
    ? statusData.map((item, index) => ({
        name: item.status,
        value: item.count,
        color: COLORS[index % COLORS.length],
      }))
    : [];

  if (data.length === 0) {
    return <p className="text-center text-gray-500">No status data available</p>;
  }




  return (
    <div className='card h-[200px]'>
    <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend/>
                <Bar dataKey="value" name="Tasks">
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
            </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
