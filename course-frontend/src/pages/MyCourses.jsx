import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PlayCircle, Award, Compass } from "lucide-react";
import API from "../api/axios";
import CourseCard from "../components/CourseCard";

export default function MyCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyCourses();
  }, []);

  const fetchMyCourses = async () => {
    try {
      const res = await API.get("/user/purchases");
      const purchased = res.data.courses || [];
      
      const allCoursesRes = await API.get("/course/preview");
      const allCourses = allCoursesRes.data.courses || [];

      const myCourseIds = purchased.map(p => p.courseId);
      const myFullCourses = allCourses.filter(c => myCourseIds.includes(c._id));

      setCourses(myFullCourses);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center text-white">
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full mb-4" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white pt-24 pb-12">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6 border-b border-gray-800 pb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-emerald-500/20 rounded-lg">
                <Award className="w-6 h-6 text-emerald-400" />
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold">My Learning</h1>
            </div>
            <p className="text-gray-400">Track your progress and continue learning.</p>
          </div>
          <Link 
            to="/"
            className="group bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-xl font-bold transition flex items-center gap-2 border border-gray-700"
          >
            <Compass className="w-5 h-5 text-emerald-400" />
            <span>Discover More</span>
          </Link>
        </div>

        {courses.length === 0 ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center glass-panel p-16 rounded-3xl border border-dashed border-gray-700">
            <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <PlayCircle className="w-10 h-10 text-gray-500" />
            </div>
            <h2 className="text-2xl font-bold mb-3">You haven't enrolled yet</h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">Browse our catalog, find the perfect course, and start your learning journey today.</p>
            <Link to="/" className="bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white px-8 py-4 rounded-xl font-bold transition shadow-lg shadow-emerald-500/25">
              Explore Courses
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {courses.map((course) => (
              <CourseCard 
                key={course._id} 
                course={course} 
                onAction={() => alert("Redirect to course player...")} 
                actionLabel="Resume Course"
                actionColor="emerald"
              >
                <div className="mt-2 mb-4">
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>Progress</span>
                    <span>15%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-1.5">
                    <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '15%' }}></div>
                  </div>
                </div>
              </CourseCard>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
