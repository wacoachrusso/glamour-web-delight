import { type Product } from './product';
import { type Order, type OrderItem } from './order';
import { type Service } from './service';
import { type Employee, type EmployeeSchedule, type EmployeeService } from './employee';
import { type Booking } from './booking';

export interface Database {
  public: {
    Tables: {
      bookings: {
        Row: Booking;
        Insert: Omit<Booking, 'id' | 'created_at'>;
        Update: Partial<Omit<Booking, 'id' | 'created_at'>>;
      };
      employees: {
        Row: Employee;
        Insert: Omit<Employee, 'id' | 'created_at'>;
        Update: Partial<Omit<Employee, 'id' | 'created_at'>>;
      };
      employee_schedules: {
        Row: EmployeeSchedule;
        Insert: Omit<EmployeeSchedule, 'id' | 'created_at'>;
        Update: Partial<Omit<EmployeeSchedule, 'id' | 'created_at'>>;
      };
      employee_services: {
        Row: EmployeeService;
        Insert: Omit<EmployeeService, 'id' | 'created_at'>;
        Update: Partial<Omit<EmployeeService, 'id' | 'created_at'>>;
      };
      services: {
        Row: Service;
        Insert: Omit<Service, 'id' | 'created_at'>;
        Update: Partial<Omit<Service, 'id' | 'created_at'>>;
      };
      order_items: {
        Row: OrderItem;
        Insert: Omit<OrderItem, 'id' | 'created_at'>;
        Update: Partial<Omit<OrderItem, 'id' | 'created_at'>>;
      };
      orders: {
        Row: Order;
        Insert: Omit<Order, 'id' | 'created_at'>;
        Update: Partial<Omit<Order, 'id' | 'created_at'>>;
      };
      products: {
        Row: Product;
        Insert: Omit<Product, 'id' | 'created_at'>;
        Update: Partial<Omit<Product, 'id' | 'created_at'>>;
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