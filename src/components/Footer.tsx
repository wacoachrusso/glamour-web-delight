import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-white/80 backdrop-blur-sm border-t border-secondary/20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-playfair font-semibold gradient-text">Contact Us</h3>
            <div className="space-y-3">
              <a href="tel:+1234567890" className="flex items-center text-primary-foreground/80 hover:text-secondary transition-colors">
                <Phone className="w-5 h-5 mr-2" />
                (123) 456-7890
              </a>
              <a href="mailto:info@glamoursalon.com" className="flex items-center text-primary-foreground/80 hover:text-secondary transition-colors">
                <Mail className="w-5 h-5 mr-2" />
                info@glamoursalon.com
              </a>
              <div className="flex items-center text-primary-foreground/80">
                <MapPin className="w-5 h-5 mr-2 flex-shrink-0" />
                <span>123 Beauty Street, Fashion District, Style City, SC 12345</span>
              </div>
            </div>
          </motion.div>

          {/* Opening Hours */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-playfair font-semibold gradient-text">Opening Hours</h3>
            <div className="space-y-2 text-primary-foreground/80">
              <p>Monday - Friday: 9:00 AM - 8:00 PM</p>
              <p>Saturday: 9:00 AM - 6:00 PM</p>
              <p>Sunday: 10:00 AM - 4:00 PM</p>
            </div>
          </motion.div>

          {/* Social Media */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-playfair font-semibold gradient-text">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-secondary/10 text-secondary hover:bg-secondary hover:text-secondary-foreground transition-colors"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-secondary/10 text-secondary hover:bg-secondary hover:text-secondary-foreground transition-colors"
              >
                <Facebook className="w-6 h-6" />
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 pt-8 border-t border-secondary/20 text-center text-primary-foreground/60"
        >
          <p>&copy; {new Date().getFullYear()} Glamour's Beauty Salon. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;