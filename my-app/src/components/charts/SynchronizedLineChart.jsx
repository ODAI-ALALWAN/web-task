import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

import { completedOverTime } from '../../rtk/slices/statistics-slice';

export default function SynchronizedLineChart() {
  const dispatch = useDispatch(); 
  const { completedData } = useSelector((state) => state.statistic);

  const chartData = Array.isArray(completedData)
    && completedData.map((item) => ({
        name: item.date,
        count: Number(item.count),
      }))
    

  useEffect(() => {
    if (completedData.length === 0) {
      dispatch(completedOverTime());
    }
  }, [dispatch, completedData]);

  return (
    <div className='card flex justify-center items-center'>
      <div style={{ width: '100%' }}>
        <h4>completed Over Time</h4>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#ff7300"
              dot={true}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
