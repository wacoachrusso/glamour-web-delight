import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Instagram, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeader from "@/components/shared/SectionHeader";
import { useTranslation } from "react-i18next";

const Team = () => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <SectionHeader
            titleKey="team.title"
            highlightKey="team.highlight"
            subtitleKey="team.subtitle"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {/* Placeholder Team Member Cards */}
            {[1, 2, 3].map((index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <Card className="overflow-hidden bg-white/80 backdrop-blur-sm border-secondary/10 transition-all duration-300 hover:shadow-lg">
                  <div className="relative h-80 overflow-hidden">
                    <img
                      src={`https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=800&q=80`}
                      alt={t('team.memberPlaceholder')}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>
                  
                  <div className="p-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <h3 className="text-2xl font-cormorant font-semibold gradient-text">
                          {t('team.comingSoon')}
                        </h3>
                        <p className="text-primary-foreground/60 text-sm">
                          {t('team.expertTitle')}
                        </p>
                      </div>
                      
                      <p className="text-primary-foreground/80">
                        {t('team.profileDescription')}
                      </p>
                      
                      <div className="pt-4 flex gap-4">
                        <Button
                          variant="outline"
                          size="icon"
                          className="rounded-full hover:bg-secondary hover:text-secondary-foreground"
                        >
                          <Instagram className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="rounded-full hover:bg-secondary hover:text-secondary-foreground"
                        >
                          <Linkedin className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="rounded-full hover:bg-secondary hover:text-secondary-foreground"
                        >
                          <Mail className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-center mt-16"
          >
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
              {t('team.description')}
            </p>
          </motion.div>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Team;