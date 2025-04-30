import React, { useState } from "react";
import TaskCard from "./TaskCard";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

// Map droppable keys to status labels
const statusLabels = {
  todo: "To Do",
  inprogress: "In Progress",
  done: "Done"
};

export default function TaskList({ tasks, onStatusChange, onEdit, onDelete }) {
  const [sortBy, setSortBy] = useState("dueDate");

  // Build columns group by statusKey
  const columns = Object.entries(statusLabels).reduce((cols, [key, label]) => {
    cols[key] = tasks.filter(task => task.status === label);
    return cols;
  }, {});

  // Handle drag end to update status
  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const newStatus = statusLabels[destination.droppableId];
    onStatusChange(draggableId, newStatus);
  };

  // Sorting logic
  const sortTasks = (list) => {
    return [...list].sort((a, b) => {
      if (sortBy === "dueDate") {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      } else {
        const priorityOrder = { High: 0, Medium: 1, Low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
    });
  };

  return (
    <div className="space-y-4 animate-fade-in transition-colors duration-300 text-[var(--color-text)]">
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
          {Object.entries(columns).map(([statusKey, list]) => (
            <div key={statusKey} className="rounded-lg bg-[var(--color-bg)] p-4 border-[var(--color-border)]">
              <h3 className="font-semibold mb-4 flex items-center justify-between">
                {statusLabels[statusKey]}
                <span className="text-sm text-[var(--color-text)]">{list.length}</span>
              </h3>

              <Droppable droppableId={statusKey}>
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={`space-y-4 min-h-[200px] transition-colors ${
                      snapshot.isDraggingOver ? "bg-[var(--color-bg)] rounded-lg" : ""
                    }`}
                  >
                    {sortTasks(list).map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                        isDragDisabled={statusKey === "done"}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`transition-shadow duration-200 ${
                              snapshot.isDragging
                                ? "shadow-[var(--color-shadow)] scale-105"
                                : "hover:shadow-[var(--color-shadow)]"
                            }`}
                          >
                            <TaskCard
                              task={task}
                              onStatusChange={onStatusChange}
                              onEdit={onEdit}
                              onDelete={onDelete}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}
