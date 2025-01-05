import { useTranslation } from "react-i18next";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import CustomerInfoFields from "./CustomerInfoFields";
import BookingTimeFields from "./BookingTimeFields";
import { type BookingFormData } from "./types";
import type { Employee } from "@/integrations/supabase/types";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface BookingFormProps {
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
  formData: BookingFormData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onClose: () => void;
  employees: Employee[];
}

const BookingForm = ({ 
  isSubmitting, 
  onSubmit, 
  formData, 
  onInputChange, 
  onClose,
  employees
}: BookingFormProps) => {
  const { t } = useTranslation();

  return (
    <form onSubmit={onSubmit} className="space-y-4 mt-4">
      <CustomerInfoFields formData={formData} onInputChange={onInputChange} />
      
      <div className="space-y-2">
        <Label htmlFor="employeeId">{t('bookings.selectEmployee')}</Label>
        <Select
          name="employeeId"
          value={formData.employeeId || "any"}
          onValueChange={(value) => 
            onInputChange({ 
              target: { name: 'employeeId', value: value === "any" ? "" : value } 
            } as React.ChangeEvent<HTMLSelectElement>)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder={t('bookings.anyAvailable')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">{t('bookings.anyAvailable')}</SelectItem>
            {employees.map((employee) => (
              <SelectItem key={employee.id} value={employee.id}>
                {employee.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

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