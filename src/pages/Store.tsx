import { Navbar } from "../components/Navbar";
import { TestimonialCarousel } from "../components/testimonials/TestimonialCarousel";
import Footer from "../components/Footer";

const Store = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-muted to-white">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">What Our Clients Say</h2>
          <TestimonialCarousel />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Store;