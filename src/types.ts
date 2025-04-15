export interface User {
  _id: string;
  name: string;
  email: string;
  userType: "superAdmin" | "admin" | "employee";
  active?: boolean;
  createdAt?: Date; // Or Date
  updatedAt?: Date; // Or Date
}

export interface DayAttendance {
  status: string;
  clockInTime: string | null;
  clockOutTime: string | null;
  specialCondition: string | null;
  _id: string;
}

export interface MonthData {
  days: {
    [day: string]: DayAttendance;
  };
  _id: string;
}

export interface YearData {
  months: {
    [month: string]: MonthData;
  };
  _id: string;
}

export interface AttendanceRecord {
  _id: string;
  years: {
    [year: string]: YearData;
  };
  user: User;
  createdAt: string;
  updatedAt: string;
}

export interface SubtaskInterface {
  _id?: string;
  title: string;
  completed: boolean;
}

export interface CategoryInterface {
  _id: string;
  name: string;
  color: string;
  //   user?: string; // Added based on schema
  //   tasks?: Task[]; // Added based on controller logic
}

export interface SelectedTaskInterface {
  selectedTask: {
    _id?: string;
    title: string;
    description?: string;
    dueDate: Date;
    completed: boolean;
    subtasks: SubtaskInterface[];
    category: CategoryInterface;
    user?: string;
    createdAt?: Date;
    updatedAt?: Date;
  } | null;
}

export interface Task {
    _id: string;
    title: string;
    description?: string;
    dueDate: string | Date;
    completed: boolean;
    subtasks: {
      _id?: string;
      title: string;
      completed: boolean;
    }[];
    category: {
      _id: string;
      name: string;
      color: string;
    };
    user?: string;
    createdAt?: string | Date;
    updatedAt?: string | Date;
  }

export interface Event {
  id: any;
  summary: any;
  description: any;
  start: {
    date: string | null;
    dateTime: string | null;
  };
  end: {
    date: string | null;
    dateTime: string | null;
  };
  htmlLink: string;
  isTask: boolean;
  category: any;
}

export interface WeekDay {
  date: string;
  dayName: string;
  dayNumber: number;
  isToday: boolean;
  dateString: string;
}

export interface Month {
  name: string;
  days: {
    date: string;
    dayNumber: number;
    isThisMonth: boolean;
    isCurrentMonth: boolean;
    isToday: boolean;
    events: Event[];
  }[];
}

export interface Note {
  _id: string;
  content: string;
}
