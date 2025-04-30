function Stat({ title, value , color }) {


  
  return (
    <div className="flex items-center gap-4" >
     <div className={`w-2 md:w-2 h-4 md:h-5 ${color} rounded-full`}></div>
      <p className="text-xs md:text-[14px] text-gray-500">
        <span className="text-sm md:text-[15px] text-[var(--color-text)] font-semibold mx-2">{value}</span> 
        {title}
      </p>
     
    </div>
  );
}

export default Stat;