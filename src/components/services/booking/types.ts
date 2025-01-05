export interface BookingFormData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  bookingDate: string;
  bookingTime: string;
  notes: string;
  employeeId?: string;
}