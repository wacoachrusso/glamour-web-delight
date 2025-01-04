import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";

const MeetTheOwner = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-primary/10">
      <Navbar />
      <main className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="absolute inset-0 bg-secondary/10 rounded-2xl transform rotate-3"></div>
            <img
              src="/lovable-uploads/2d83d154-d2c7-4d46-b712-8a6b5d698c37.png"
              alt="Angie Padilla - Owner of Glamour's Beauty Salon"
              className="relative z-10 rounded-2xl shadow-xl w-full object-cover"
            />
          </div>
          <div className="space-y-6">
            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-gray-900 gradient-text">
              Meet Angie Padilla
            </h1>
            <div className="prose prose-lg max-w-none space-y-4 text-gray-600">
              <p>
                With over 22 years of professional experience, Angelica "Angie" Padilla has dedicated her life to the art of hairstyling. A graduate of New Horizon in West New York, she further enhanced her expertise through specialized courses in hair coloring at Alfapart and Salerm.
              </p>
              <p>
                Angie's passion for hair styling began in childhood, where she found joy in styling her family members' and dolls' hair. This early enthusiasm blossomed into a successful career spanning over two decades. Her dedication to education led her to earn a degree in teaching total image from Thomas Edison State University, complementing her extensive styling experience.
              </p>
              <p>
                Today, Glamour's Beauty Salon stands as a testament to Angie's commitment to excellence, having served the Newark community for over 20 years. Her expertise in updos and comprehensive styling services ensures that every client receives exceptional care and leaves feeling their absolute best.
              </p>
            </div>
            <div className="flex gap-4 pt-6">
              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-md border border-secondary/20">
                <p className="font-playfair text-2xl font-bold text-secondary">22+</p>
                <p className="text-gray-600">Years Experience</p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-md border border-secondary/20">
                <p className="font-playfair text-2xl font-bold text-secondary">1000+</p>
                <p className="text-gray-600">Happy Clients</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MeetTheOwner;