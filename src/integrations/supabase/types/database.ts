export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      bookings: {
        Row: Booking;
        Insert: Partial<Booking>;
        Update: Partial<Booking>;
      };
      employee_schedules: {
        Row: EmployeeSchedule;
        Insert: Partial<EmployeeSchedule>;
        Update: Partial<EmployeeSchedule>;
      };
      employee_services: {
        Row: EmployeeService;
        Insert: Partial<EmployeeService>;
        Update: Partial<EmployeeService>;
      };
      employees: {
        Row: Employee;
        Insert: Partial<Employee>;
        Update: Partial<Employee>;
      };
      order_items: {
        Row: OrderItem;
        Insert: Partial<OrderItem>;
        Update: Partial<OrderItem>;
      };
      orders: {
        Row: Order;
        Insert: Partial<Order>;
        Update: Partial<Order>;
      };
      products: {
        Row: Product;
        Insert: Partial<Product>;
        Update: Partial<Product>;
      };
      services: {
        Row: Service;
        Insert: Partial<Service>;
        Update: Partial<Service>;
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}