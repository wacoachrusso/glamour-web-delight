export interface BookingFormData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  bookingDate: string;
  bookingTime: string;
  notes: string;
  employeeId?: string;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  specialties: string[];
  is_placeholder: boolean;
  created_at: string;
}

export interface EmployeeSchedule {
  id: string;
  employee_id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  is_available: boolean;
  created_at: string;
}

export interface EmployeeService {
  id: string;
  employee_id: string;
  service_id: string;
  created_at: string;
}