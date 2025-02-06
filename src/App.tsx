import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Services from "./pages/Services";
import Team from "./pages/Team";
import Store from "./pages/Store";
import MeetTheOwner from "./pages/MeetTheOwner";
import { ScrollToTop } from "./components/ScrollToTop";
import "./App.css";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/meet-the-owner" element={<MeetTheOwner />} />
        <Route path="/services" element={<Services />} />
        <Route path="/team" element={<Team />} />
        <Route path="/store" element={<Store />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
      </Routes>
    </Router>
  );
}

export default App;