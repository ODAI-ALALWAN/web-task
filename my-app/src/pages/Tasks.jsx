import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TaskList from "../components/Tasks/TaskList";
import TaskForm from "../components/Tasks/TaskForm";
import { getAllTasks, updateTask, deleteTask } from "../rtk/slices/task-slice";
import { unwrapResult } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { getAllUsers } from "../rtk/slices/user-slice";

export default function Tasks() {
  const dispatch = useDispatch();
  const { data: tasks, fetchLoading } = useSelector((state) => state.task);
  const { data: users, loading: usersLoading } = useSelector(
    (state) => state.user
  );

  const [selectedTask, setSelectedTask] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    dispatch(getAllTasks());
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleSave = async (taskData) => {
    try {
      if (selectedTask) {
        const action = await dispatch(
          updateTask({ id: selectedTask.id, updatedData: taskData })
        );
        unwrapResult(action);
        toast.success("Task updated successfully!");
      }
      setShowForm(false);
      setSelectedTask(null);
    } catch (err) {
      toast.error(err || "Failed to save task");
    }
  };

  const handleStatusChange = (id, newStatus) => {
    dispatch(updateTask({ id, updatedData: { status: newStatus } }));
  };

  const handleEdit = (task) => {
    setSelectedTask(task);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
    toast.success("Task deleted successfully!");
  };

  if (fetchLoading || usersLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <TaskList
        tasks={tasks}
        onStatusChange={handleStatusChange}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      {showForm && (
        <TaskForm
          open={showForm}
          onClose={() => {
            setShowForm(false);
            setSelectedTask(null);
          }}
          onSave={handleSave}
          users={users}
          existingTask={selectedTask}
        />
      )}
    </div>
  );
}
