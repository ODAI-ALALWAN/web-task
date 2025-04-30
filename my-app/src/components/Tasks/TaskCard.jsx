import React, { useEffect, useRef, useState } from "react";
import { format } from "date-fns";
import { 
  Calendar,
  Check,
  ClockAlert,
  MoreVertical
} from "lucide-react";
import toast from "react-hot-toast"


// Utility function to merge class names
function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function TaskCard({ task, onEdit, onDelete, onStatusChange }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const hasShownOverdueToast = useRef(false);

  // Normalize keys for styling
  const statusKey = task.status.toLowerCase().replace(/\s+/g, ''); // e.g. "inprogress"
  const priorityKey = task.priority; // e.g. "low"

  // Determine if overdue (skip if already done)
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== "Done";

  const priorityStyles = {
    Low: "bg-blue-100 text-blue-800",
    Medium: "bg-yellow-100 text-yellow-800",
    High: "bg-red-100 text-red-800",
  };

  const statusColorMap = {
    todo: "bg-blue-100 text-blue-800",
    inprogress: "bg-yellow-100 text-yellow-800",
    done: "bg-green-100 text-green-800"
  };

  useEffect(() => {
    if (task.dueDate && !task.completedAt && !hasShownOverdueToast.current) {
      const dueDate = new Date(task.dueDate);
      if (dueDate.getTime() < Date.now()) {
        toast(`Task "${task.title}" is overdue!`, { id: task.id });
        hasShownOverdueToast.current = true; 
      }
    }
  }, [task]);

  return (
    <div className={cn(
      "border-l-4 animate-slide-in transition-all hover:shadow-[var(--color-shadow)] rounded-lg border  ",
      isOverdue ? "border-red-500" :
      task.status === "To Do" ? "border-l-[#107add]" : 
      task.status === "In Progress" ? "border-l-[#debe0b]" : 
      task.status === "Done" && "border-l-[#12d66d]"
    )}>
      <div className="p-4 pb-2 flex justify-between items-start ">
        <div>
          <h3 className="font-medium text-[var(--text-color)] line-clamp-1 flex items-center ">
            {task.title}
            {isOverdue && <ClockAlert className="ml-2 text-red-500" />}
          </h3>
          <div className="flex items-center mt-1 gap-2 ">
            <span className={`px-2 py-1 text-xs rounded-full ${statusColorMap[statusKey]}`}>{task.status}</span>
            <span className={`px-2 py-1 text-xs rounded-full ${priorityStyles[priorityKey]}`}>{task.priority}</span>
            {task.recurring && task.recurring !== 'none' && (
              <span className="ml-2 px-2 py-1 text-xs rounded-full border border-[var(--color-border)]">
                {task.recurring.charAt(0).toUpperCase() + task.recurring.slice(1)}
              </span>
            )}
          </div>
        </div>

        <div className="relative">
          <button
            onClick={() => setIsMenuOpen(open => !open)}
            className="h-8 w-8 flex items-center justify-center rounded-md hover:bg-[var(--color-bg)]"
          >
            <MoreVertical size={16} />
          </button>
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-40 rounded-md shadow-[var(--color-shadow)] bg-[var(--color-bg)] ring-1 ring-black ring-opacity-5 z-10">
              <button
                onClick={() => { onEdit(task); setIsMenuOpen(false); }}
                className="block w-full text-left px-4 py-2 text-sm hover:bg-[var(--color-bg)]"
              >Edit</button>
              <button
                onClick={() => { onDelete(task.id); setIsMenuOpen(false); }}
                className="block w-full text-left px-4 py-2 text-sm hover:bg-[var(--color-bg)]"
              >Delete</button>
            </div>
          )}
        </div>
      </div>

      <div className="p-4 pt-0 flex justify-between items-center">
        <p className="text-sm text-[var(--color-text)] line-clamp-2">{task.description}</p>
      </div>

      <div className="p-4 pt-0 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          {task.assignedTo && (
            <div className="flex items-center space-x-1">
              <div className="h-6 w-6 rounded-full bg-[var(--color-border)] flex items-center justify-center overflow-hidden">
                <span className="text-xs font-medium text-[var(--color-text)]">
                  {task.assignedTo.username.charAt(0).toUpperCase()}
                </span>
              </div>
              <span className="text-xs text-[var(--color-text)]">{task.assignedTo.username}</span>
            </div>
          )}
        </div>
        <div className="flex items-center">
          {task.dueDate && (
            <div className={cn("flex items-center text-xs", isOverdue ? "text-red-500" : "text-[var(--color-text)]")}>  
              <Calendar size={14} className="mr-1" />
              {format(new Date(task.dueDate), "MMM d")}
            </div>
          )}
        </div>
      </div>

      {task.status !== "Done" && (
        <div className="px-4 pb-4 flex gap-2">
          {task.status === "To Do" && (
            <button
              onClick={() => onStatusChange(task.id, "In Progress")}
              className="w-full px-3 py-1.5 text-sm rounded-md border border-blue-300 text-blue-600 hover:bg-blue-50"
            >Start</button>
          )}
          {task.status === "In Progress" && (
            <button
              onClick={() => onStatusChange(task.id, "Done")}
              className="w-full px-3 py-1.5 text-sm rounded-md border border-green-300 text-green-600 hover:bg-green-50 flex items-center justify-center"
            >
              <Check size={14} className="mr-1" /> Complete
            </button>
          )}
        </div>
      )}
    </div>
  );
}
