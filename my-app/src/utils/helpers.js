
  

// style BarLoader  in page Login
export const OverrideStyle = {
  display: 'flex',
  justifycontent: 'center',
  alignitems: 'center',
  width: '80px',
  
}

export function normalizeTask(raw) {
  return {
    // We use the _id field as the id to match the draggableId
    id: raw._id,
    title: raw.title,
    description: raw.description,
    status: raw.status,       
    priority: raw.priority,     
    dueDate: raw.dueDate,         
    // Convert isRecurring + recurrencePattern to recurring string
    recurring: raw.isRecurring
      ? raw.recurrencePattern || "none"
      : "none",
    
    completedAt: raw.status === "Done" ? raw.updatedAt : null,

    assignedTo: raw.assignedTo
      ? { id: raw.assignedTo._id, username: raw.assignedTo.username }
      : null,
    createdBy: raw.createdBy
      ? { id: raw.createdBy._id, username: raw.createdBy.username }
      : null,

    parentTaskId: raw.parentTaskId,
    createdAt: raw.createdAt,
    updatedAt: raw.updatedAt
  };
}
