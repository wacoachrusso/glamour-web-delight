export * from './service';
export * from './employee';

export interface Database {
  public: {
    Tables: {
      bookings: {
        Row: {
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
        };
        Insert: {
          id?: string;
          service_id: string;
          customer_name: string;
          customer_email: string;
          customer_phone?: string | null;
          booking_date: string;
          booking_time: string;
          status?: string;
          notes?: string | null;
          created_at?: string;
          employee_id?: string | null;
          reminder_sent?: boolean | null;
        };
        Update: {
          id?: string;
          service_id?: string;
          customer_name?: string;
          customer_email?: string;
          customer_phone?: string | null;
          booking_date?: string;
          booking_time?: string;
          status?: string;
          notes?: string | null;
          created_at?: string;
          employee_id?: string | null;
          reminder_sent?: boolean | null;
        };
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
        Row: {
          created_at: string;
          id: string;
          order_id: string | null;
          price_at_time: number;
          product_id: string | null;
          quantity: number;
        };
        Insert: {
          created_at?: string;
          id?: string;
          order_id?: string | null;
          price_at_time: number;
          product_id?: string | null;
          quantity: number;
        };
        Update: {
          created_at?: string;
          id?: string;
          order_id?: string | null;
          price_at_time?: number;
          product_id?: string | null;
          quantity?: number;
        };
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey";
            columns: ["order_id"];
            isOneToOne: false;
            referencedRelation: "orders";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "order_items_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          }
        ];
      };
      orders: {
        Row: {
          created_at: string;
          id: string;
          status: string;
          subtotal: number;
          tax: number;
          total: number;
        };
        Insert: {
          created_at?: string;
          id?: string;
          status?: string;
          subtotal: number;
          tax: number;
          total: number;
        };
        Update: {
          created_at?: string;
          id?: string;
          status?: string;
          subtotal?: number;
          tax?: number;
          total?: number;
        };
        Relationships: [];
      };
      products: {
        Row: {
          category: string;
          created_at: string;
          description: string | null;
          featured: boolean | null;
          id: string;
          image_url: string | null;
          name: string;
          price: number;
          stock_quantity: number;
        };
        Insert: {
          category: string;
          created_at?: string;
          description?: string | null;
          featured?: boolean | null;
          id?: string;
          image_url?: string | null;
          name: string;
          price: number;
          stock_quantity?: number;
        };
        Update: {
          category?: string;
          created_at?: string;
          description?: string | null;
          featured?: boolean | null;
          id?: string;
          image_url?: string | null;
          name?: string;
          price?: number;
          stock_quantity?: number;
        };
        Relationships: [];
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