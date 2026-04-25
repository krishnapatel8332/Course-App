import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Plus, LayoutDashboard, BarChart3, Settings } from "lucide-react";
import API from "../api/axios";
import CourseCard from "../components/CourseCard";

export default function AdminDashboard() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAdminCourses();
  }, []);

  const fetchAdminCourses = async () => {
    try {
      const res = await API.get("/admin/all");
      setCourses(res.data.courses || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (course) => {
    navigate("/admin/create-course", { state: { course } });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center text-white">
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full mb-4" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white pt-24 pb-12">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6 border-b border-gray-800 pb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <LayoutDashboard className="w-6 h-6 text-purple-400" />
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold">Admin Dashboard</h1>
            </div>
            <p className="text-gray-400">Manage and monitor your published courses.</p>
          </div>
          <Link 
            to="/admin/create-course"
            className="group bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-purple-500/25 flex items-center gap-2"
          >
            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
            <span>Create Course</span>
          </Link>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="glass-panel p-6 rounded-2xl flex items-center gap-4">
            <div className="bg-blue-500/20 p-4 rounded-xl text-blue-400"><BookOpen className="w-8 h-8"/></div>
            <div>
              <p className="text-gray-400 font-medium">Total Courses</p>
              <h3 className="text-3xl font-bold">{courses.length}</h3>
            </div>
          </div>
          <div className="glass-panel p-6 rounded-2xl flex items-center gap-4">
            <div className="bg-emerald-500/20 p-4 rounded-xl text-emerald-400"><BarChart3 className="w-8 h-8"/></div>
            <div>
              <p className="text-gray-400 font-medium">Total Revenue</p>
              <h3 className="text-3xl font-bold">---</h3>
            </div>
          </div>
          <div className="glass-panel p-6 rounded-2xl flex items-center gap-4">
            <div className="bg-gray-700/50 p-4 rounded-xl text-gray-400"><Settings className="w-8 h-8"/></div>
            <div>
              <p className="text-gray-400 font-medium">Settings</p>
              <h3 className="text-lg font-bold text-gray-500 mt-1 cursor-pointer hover:text-white transition">Configure</h3>
            </div>
          </div>
        </div>

        {courses.length === 0 ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center glass-panel p-16 rounded-3xl border border-dashed border-gray-700">
            <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <Plus className="w-10 h-10 text-gray-500" />
            </div>
            <h2 className="text-2xl font-bold mb-3">No courses created yet</h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">You haven't published any courses. Start sharing your knowledge with the world today!</p>
            <Link to="/admin/create-course" className="bg-purple-600 hover:bg-purple-500 text-white px-8 py-4 rounded-xl font-bold transition shadow-lg shadow-purple-500/25">
              Create Your First Course
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {courses.map((course) => (
              <CourseCard 
                key={course._id} 
                course={course} 
                onAction={handleEdit} 
                actionLabel="Edit Details"
                actionColor="gray"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Quick fallback for BookOpen if not imported
function BookOpen(props) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>;
}
