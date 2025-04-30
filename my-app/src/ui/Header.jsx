import { useLocation } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllUsers } from "../rtk/slices/user-slice";
import { unwrapResult } from "@reduxjs/toolkit";
import { addTask, updateTask } from "../rtk/slices/task-slice";
import toast from "react-hot-toast";
import TaskForm from "../components/Tasks/TaskForm";
import { MdFormatListBulletedAdd, MdLogout, MdMenu } from "react-icons/md";
import Logout from "../auth/Logout";

export default function Header({ onMenuClick }) {
  const location = useLocation();
  const dispatch = useDispatch();
  const path = location.pathname;
  const { data: users, loading: usersLoading } = useSelector(
    (state) => state.user
  );
  const [selectedTask, setSelectedTask] = useState(null);
  const [showForm, setShowForm] = useState(false);

  let currentView;
  if (path === "/" || path === "/dashboard") {
    currentView = "Dashboard";
  } else if (path === "/tasks") {
    currentView = "Manage Tasks";
  }

  useEffect(() => {
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
      } else {
        const action = await dispatch(addTask(taskData));
        unwrapResult(action);
        toast.success("Task created successfully!");
      }
      setShowForm(false);
      setSelectedTask(null);
    } catch (err) {
      toast.error(err || "Failed to save task");
    }
  };

  if (usersLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    
      <div className="border-b bg-[var(--color-bg)] text-[var(--color-text)] h-13 border-[var(--color-border)] p-5 transition-colors duration-300">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between">
      <div className="flex items-center gap-4">
          {/* Mobile button */}
          <button
            onClick={onMenuClick}
            className="rounded-lg p-2 hover:bg-[var(--color-border)] md:hidden"
          >
            <MdMenu className="h-6 w-6 text-[var(--color-text)]" />
          </button>
          <h4 className="font-semibold text-[var(--color-text)]">{currentView}</h4>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-500 text-xs md:text-l text-[var(--text-color)] p-1 rounded-md  cursor-pointer flex items-center justify-center gap-1">
            <span> Add Task</span>
            <MdFormatListBulletedAdd />
          </button>

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

          <DarkModeToggle />
          <Logout/>
        </div>
      </div>
    </div>
  );
}
