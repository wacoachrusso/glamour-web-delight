export interface Booking {
  id: string;
  service_id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string | null;
  booking_date: string;
  booking_time: string;
  status: string;
  notes: string | null;
  created_at: string;
  employee_id: string | null;
  reminder_sent: boolean | null;
}