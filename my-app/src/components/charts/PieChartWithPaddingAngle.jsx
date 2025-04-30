import { PieChart, Pie, Cell, } from 'recharts';



export default function PieChartWithPaddingAngle({ priorityData = [] }) {

  const data = Array.isArray(priorityData)
  ? priorityData.map(item => ({
      name: item.priority,
      value: item.count,
    }))
  : [];


  const COLORS = ['#0088FE', '#FFBB28' ,'#fd2a36'];
  
  if (data.length === 0) {
    return <p className="text-center text-gray-500">No priority data available</p>;
  }

  return (
        <div className='PieChart flex justify-center items-center h-[200px]  '>
        <PieChart width={800} height={400} >
          <Pie
            data={data}
            cx={390}
            cy={200}
            innerRadius={50}
            outerRadius={70}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
            label={({name, percent}) => 
                `${name} ${(percent * 100).toFixed(0)}%`
              }
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>

        </div>
         
       
    );
}
