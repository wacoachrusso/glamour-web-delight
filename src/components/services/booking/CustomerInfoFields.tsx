import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type BookingFormData } from "./types";

interface CustomerInfoFieldsProps {
  formData: BookingFormData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const CustomerInfoFields = ({ formData, onInputChange }: CustomerInfoFieldsProps) => {
  const { t } = useTranslation();

  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="customerName">{t('bookings.name')}</Label>
        <Input
          id="customerName"
          name="customerName"
          required
          value={formData.customerName}
          onChange={onInputChange}
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
          onChange={onInputChange}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="customerPhone">{t('bookings.phone')}</Label>
        <Input
          id="customerPhone"
          name="customerPhone"
          type="tel"
          value={formData.customerPhone}
          onChange={onInputChange}
        />
      </div>
    </>
  );
};

export default CustomerInfoFields;