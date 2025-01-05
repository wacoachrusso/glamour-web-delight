import { useState } from "react";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Service, Employee } from "@/integrations/supabase/types";
import BookingForm from "./booking/BookingForm";
import type { BookingFormData } from "./booking/types";
import { useQuery } from "@tanstack/react-query";

interface BookingModalProps {
  service: Service;
  isOpen: boolean;
  onClose: () => void;
}

const BookingModal = ({ service, isOpen, onClose }: BookingModalProps) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<BookingFormData>({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    bookingDate: "",
    bookingTime: "",
    notes: "",
    employeeId: "",
  });

  // Fetch employees who can perform this service
  const { data: employees } = useQuery({
    queryKey: ["serviceEmployees", service.id],
    queryFn: async () => {
      console.log("Fetching employees for service:", service.id);
      const { data: employeeServices, error: esError } = await supabase
        .from('employee_services')
        .select('employee_id')
        .eq('service_id', service.id);

      if (esError) throw esError;

      if (!employeeServices.length) return [];

      const employeeIds = employeeServices.map(es => es.employee_id);
      
      const { data: employees, error } = await supabase
        .from('employees')
        .select('*')
        .in('id', employeeIds)
        .order('name');

      if (error) throw error;
      console.log("Fetched employees:", employees);
      return employees;
    },
    enabled: isOpen,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      console.log("Submitting booking for service:", service.name);
      const { error: bookingError } = await supabase
        .from('bookings')
        .insert([
          {
            service_id: service.id,
            customer_name: formData.customerName,
            customer_email: formData.customerEmail,
            customer_phone: formData.customerPhone,
            booking_date: formData.bookingDate,
            booking_time: formData.bookingTime,
            notes: formData.notes,
            employee_id: formData.employeeId || null,
          },
        ]);

      if (bookingError) throw bookingError;

      console.log("Sending booking email notifications");
      const emailResponse = await supabase.functions.invoke('send-booking-email', {
        body: {
          customerName: formData.customerName,
          customerEmail: formData.customerEmail,
          customerPhone: formData.customerPhone,
          serviceName: service.name,
          bookingDate: format(new Date(formData.bookingDate), 'MMMM d, yyyy'),
          bookingTime: formData.bookingTime,
          notes: formData.notes,
          employeeId: formData.employeeId,
        },
      });

      if (emailResponse.error) {
        console.error("Error sending emails:", emailResponse.error);
        toast({
          title: t('bookings.success'),
          description: t('bookings.confirmationDelayed'),
          duration: 5000,
        });
      } else {
        toast({
          title: t('bookings.success'),
          description: t('bookings.confirmationSent'),
          duration: 5000,
        });
      }

      onClose();
    } catch (error) {
      console.error("Error creating booking:", error);
      toast({
        title: t('bookings.error'),
        description: t('bookings.tryAgain'),
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-playfair">
            {t('bookings.bookService', { service: service.name })}
          </DialogTitle>
          <DialogDescription>
            {t('bookings.duration', { duration: service.duration })}
          </DialogDescription>
        </DialogHeader>

        <BookingForm
          isSubmitting={isSubmitting}
          onSubmit={handleSubmit}
          formData={formData}
          onInputChange={handleInputChange}
          onClose={onClose}
          employees={employees || []}
        />
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;