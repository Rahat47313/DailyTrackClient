export const convertTaskToEvent = (task) => {
  const dueDate = new Date(task.dueDate);
  const dueDateWithOffset = new Date(dueDate.getTime() - dueDate.getTimezoneOffset() * 60000);
  return {
    id: task._id,
    summary: task.title,
    description: task.description,
    start: {
      dateTime: dueDateWithOffset.toISOString(),
      date: null,
    },
    end: {
      dateTime: dueDateWithOffset.toISOString(),
      date: null,
    },
    htmlLink: "#",
    isTask: true, // flag to differentiate tasks from calendar events
    category: task.category,
  };
};
