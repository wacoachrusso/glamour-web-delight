import { Clock } from "lucide-react";
import { useTranslation } from "react-i18next";
import { CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Service } from "@/integrations/supabase/types/service";

interface ServiceDetailsProps {
  service: Service;
}

export const ServiceDetails = ({ service }: ServiceDetailsProps) => {
  const { t } = useTranslation();

  return (
    <>
      <CardHeader>
        <CardTitle className="text-xl font-cormorant">
          {t(`services.names.${service.name.toLowerCase().replace(/\s+/g, '_')}`, { defaultValue: service.name })}
        </CardTitle>
        <CardDescription className="line-clamp-2">
          {t(`services.descriptions.${service.name.toLowerCase().replace(/\s+/g, '_')}`, { defaultValue: service.description })}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="flex items-center text-sm text-muted-foreground">
          <Clock className="mr-1 h-4 w-4" />
          <span>{t('services.duration', { duration: service.duration })}</span>
        </div>
      </CardContent>
    </>
  );
};