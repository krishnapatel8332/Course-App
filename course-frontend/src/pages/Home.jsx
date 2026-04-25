import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Zap } from "lucide-react";
import API from "../api/axios";
import CourseCard from "../components/CourseCard";

export default function Home() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await API.get("/course/preview");
      setCourses(res.data.courses || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = async (course) => {
    if (!token) {
      navigate("/login");
      return;
    }
    if (role === "admin") {
      alert("Admins cannot purchase courses.");
      return;
    }

    try {
      await API.post("/course/purchase", { courseId: course._id });
      alert("Course purchased successfully!");
      navigate("/my-courses");
    } catch (err) {
      alert(err.response?.data?.message || "Purchase failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center text-white">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mb-4"
        />
        <p className="text-gray-400 font-medium">Loading amazing courses...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white pb-20 pt-24 overflow-hidden relative">
      {/* Background gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-[20%] right-[-10%] w-[30%] h-[50%] bg-emerald-600/10 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* Hero Section */}
        <div className="text-center mb-24 mt-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-semibold text-sm mb-6"
          >
            <Sparkles className="w-4 h-4" />
            <span>Master Your Craft Today</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight"
          >
            Unlock Your <br className="hidden md:block" />
            <span className="text-gradient">True Potential</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto text-lg md:text-xl mb-10 leading-relaxed"
          >
            Join thousands of learners expanding their knowledge with our premium, expertly curated selection of courses.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button 
              onClick={() => document.getElementById('courses').scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all w-full sm:w-auto justify-center"
            >
              Explore Courses <ArrowRight className="w-5 h-5" />
            </button>
            <button className="px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white rounded-xl font-bold flex items-center gap-2 transition-all w-full sm:w-auto justify-center border border-gray-700">
              <Zap className="w-5 h-5 text-yellow-400" /> View Features
            </button>
          </motion.div>
        </div>

        {/* Courses Grid */}
        <div id="courses" className="pt-10 scroll-mt-24">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Courses</h2>
              <p className="text-gray-400">Hand-picked for your growth</p>
            </div>
          </div>

          {courses.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="glass-panel rounded-2xl p-16 text-center text-gray-400 border border-dashed border-gray-700"
            >
              <div className="bg-gray-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-gray-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No courses available</h3>
              <p>Check back later for new premium content.</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {courses.map((course, i) => (
                <CourseCard 
                  key={course._id} 
                  course={course} 
                  onAction={handlePurchase} 
                  actionLabel="Enroll Now"
                  actionColor="blue"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
