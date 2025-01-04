import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";

const Team = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-16">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-6 text-gray-800">
            Meet Our Team
          </h1>
          
          <Card className="p-8 md:p-12 bg-white/80 backdrop-blur-sm shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=800"
              alt="Team placeholder"
              className="rounded-lg mb-8 w-full h-64 object-cover"
            />
            
            <h2 className="text-3xl font-playfair font-semibold mb-4 text-gray-800">
              Coming Soon
            </h2>
            
            <p className="text-lg text-gray-600 mb-6">
              We're excited to introduce you to our amazing team of beauty professionals.
              Check back soon to meet the talented individuals who make Glamour's Beauty
              Salon the premier destination for beauty and wellness.
            </p>
            
            <Button
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
              onClick={() => window.location.href = '/'}
            >
              Return Home
            </Button>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Team;