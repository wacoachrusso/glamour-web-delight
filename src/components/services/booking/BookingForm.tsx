import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Calendar } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import CustomerInfoFields from "./CustomerInfoFields";
import BookingTimeFields from "./BookingTimeFields";
import { type BookingFormData } from "./types";

interface BookingFormProps {
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
  formData: BookingFormData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onClose: () => void;
}

const BookingForm = ({ 
  isSubmitting, 
  onSubmit, 
  formData, 
  onInputChange, 
  onClose 
}: BookingFormProps) => {
  const { t } = useTranslation();

  return (
    <form onSubmit={onSubmit} className="space-y-4 mt-4">
      <CustomerInfoFields formData={formData} onInputChange={onInputChange} />
      <BookingTimeFields formData={formData} onInputChange={onInputChange} />

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
  );
};

export default BookingForm;