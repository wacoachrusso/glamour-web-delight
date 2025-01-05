import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type BookingFormData } from "./types";

interface BookingTimeFieldsProps {
  formData: BookingFormData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const BookingTimeFields = ({ formData, onInputChange }: BookingTimeFieldsProps) => {
  const { t } = useTranslation();

  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="bookingDate">{t('bookings.date')}</Label>
        <Input
          id="bookingDate"
          name="bookingDate"
          type="date"
          required
          min={format(new Date(), 'yyyy-MM-dd')}
          value={formData.bookingDate}
          onChange={onInputChange}
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
          onChange={onInputChange}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">{t('bookings.notes')}</Label>
        <Input
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={onInputChange}
          placeholder={t('bookings.notesPlaceholder')}
        />
      </div>
    </>
  );
};

export default BookingTimeFields;