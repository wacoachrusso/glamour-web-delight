import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Calendar } from "lucide-react";
import { format } from "date-fns";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Service = Database['public']['Tables']['services']['Row'];

interface BookingModalProps {
  service: Service;
  isOpen: boolean;
  onClose: () => void;
}

const BookingModal = ({ service, isOpen, onClose }: BookingModalProps) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    bookingDate: "",
    bookingTime: "",
    notes: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      console.log("Submitting booking for service:", service.name);
      const { error } = await supabase
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
          },
        ]);

      if (error) throw error;

      toast({
        title: t('bookings.success'),
        description: t('bookings.confirmationSent'),
        duration: 5000,
      });
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-playfair">
            {t('bookings.bookService', { service: service.name })}
          </DialogTitle>
          <DialogDescription>
            {t('bookings.duration', { duration: service.duration })}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="customerName">{t('bookings.name')}</Label>
            <Input
              id="customerName"
              name="customerName"
              required
              value={formData.customerName}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="customerEmail">{t('bookings.email')}</Label>
            <Input
              id="customerEmail"
              name="customerEmail"
              type="email"
              required
              value={formData.customerEmail}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="customerPhone">{t('bookings.phone')}</Label>
            <Input
              id="customerPhone"
              name="customerPhone"
              type="tel"
              value={formData.customerPhone}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bookingDate">{t('bookings.date')}</Label>
            <Input
              id="bookingDate"
              name="bookingDate"
              type="date"
              required
              min={format(new Date(), 'yyyy-MM-dd')}
              value={formData.bookingDate}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bookingTime">{t('bookings.time')}</Label>
            <Input
              id="bookingTime"
              name="bookingTime"
              type="time"
              required
              value={formData.bookingTime}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">{t('bookings.notes')}</Label>
            <Input
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              placeholder={t('bookings.notesPlaceholder')}
            />
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              {t('common.cancel')}
            </Button>
            <Button
              type="submit"
              className="bg-secondary hover:bg-secondary-light text-secondary-foreground"
              disabled={isSubmitting}
            >
              <Calendar className="w-4 h-4 mr-2" />
              {isSubmitting ? t('common.submitting') : t('bookings.confirm')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;