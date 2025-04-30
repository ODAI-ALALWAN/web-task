
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

const TaskForm = ({ open, onClose, onSave, users = [], existingTask }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: {
      title: existingTask?.title || "",
      description: existingTask?.description || "",
      dueDate: existingTask?.dueDate
        ? format(new Date(existingTask.dueDate), "yyyy-MM-dd")
        : "",
      priority: existingTask?.priority || "Low",
      assignedTo: existingTask?.assignedTo?.id || "",
      status: existingTask?.status || "To Do",
      recurring: existingTask?.recurring || "none"
    }
  });

  React.useEffect(() => {
    if (!open) return;
    reset({
      title: existingTask?.title || "",
      description: existingTask?.description || "",
      dueDate: existingTask?.dueDate
        ? format(new Date(existingTask.dueDate), "yyyy-MM-dd")
        : "",
      priority: existingTask?.priority || "Low",
      assignedTo: existingTask?.assignedTo?.id || "",
      status: existingTask?.status || "To Do",
      recurring: existingTask?.recurring || "none"
    });
  }, [open, existingTask, reset]);

  const onSubmit = (data) => {
    const taskData = {
      title: data.title,
      description: data.description || "",
      dueDate: data.dueDate ? new Date(data.dueDate).toISOString() : null,
      priority: data.priority,
      status: data.status,
      assignedTo: data.assignedTo || null,
      isRecurring: data.recurring !== "none",
      recurrencePattern: data.recurring !== "none" ? data.recurring : null,
      recurrenceEndDate: data.recurring !== "none"
        ? existingTask?.recurrenceEndDate || null
        : null
    };

    onSave(taskData);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-xs bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-[var(--color-bg)]  rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto shadow-xl">
        <div className="p-4  sticky top-0 bg-[var(--color-bg)] z-10">
          <h2 className="text-lg font-semibold">
            {existingTask ? "Edit Task" : "Create Task"}
          </h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium">Title *</label>
            <input
              {...register("title", { required: "Required" })}
              className={`w-full p-2 border rounded ${
                errors.title ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.title && <p className="text-red-500 text-xs">{errors.title.message}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea
              {...register("description")}
              className="w-full p-2 border border-gray-300 rounded"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Due Date */}
            <div>
              <label className="block text-sm font-medium">Due Date</label>
              <Controller
                control={control}
                name="dueDate"
                render={({ field }) => (
                  <div className="relative">
                    <input
                      type="date"
                      {...field}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                    <CalendarIcon className="absolute right-2 top-2 text-gray-400" />
                  </div>
                )}
              />
            </div>

            {/* Priority */}
            <div>
              <label className="block text-sm font-medium">Priority</label>
              <select
                {...register("priority")}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Assigned To */}
            <div>
              <label className="block text-sm font-medium">Assigned To</label>
              <select
                {...register("assignedTo")}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Unassigned</option>
                {users.map((u) => (
                  <option key={u._id} value={u._id}>
                    {u.username || u.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium">Status</label>
              <select
                {...register("status")}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option>To Do</option>
                <option>In Progress</option>
                <option>Done</option>
              </select>
            </div>
          </div>

          {/* Recurring */}
          <div>
            <label className="block text-sm font-medium">Recurring</label>
            <select
              {...register("recurring")}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="none">None</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-2 pt-4 ">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
              {existingTask ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;