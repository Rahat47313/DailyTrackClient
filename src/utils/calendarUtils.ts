export const convertTaskToEvent = (task) => ({
    id: task._id,
    summary: task.title,
    description: task.description,
    start: {
      dateTime: new Date(task.dueDate).toISOString(),
      date: null
    },
    end: {
      dateTime: new Date(task.dueDate).toISOString(),
      date: null
    },
    htmlLink: '#',
    isTask: true, // flag to differentiate tasks from calendar events
    category: task.category
  });