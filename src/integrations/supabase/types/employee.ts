export interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  specialties: string[] | null;
  is_placeholder: boolean | null;
  created_at: string;
}

export interface EmployeeSchedule {
  id: string;
  employee_id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  is_available: boolean | null;
  created_at: string;
}

export interface EmployeeService {
  id: string;
  employee_id: string;
  service_id: string;
  created_at: string;
}