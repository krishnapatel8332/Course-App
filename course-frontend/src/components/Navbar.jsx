import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, LogOut, User, Sparkles } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed w-full top-0 z-50 glass-panel border-b-0"
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-extrabold flex items-center gap-2 group">
          <motion.div 
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.3 }}
            className="bg-gradient-to-tr from-blue-600 to-emerald-400 w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20"
          >
            <Sparkles className="w-6 h-6" />
          </motion.div>
          <span className="text-gradient">CourseApp</span>
        </Link>
        <div className="flex items-center gap-8 font-medium">
          <Link to="/" className="text-gray-300 hover:text-white transition-colors relative group">
            Home
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span>
          </Link>
          
          {token && role === "user" && (
            <Link to="/my-courses" className="text-gray-300 hover:text-white transition-colors relative group">
              My Courses
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-500 transition-all group-hover:w-full"></span>
            </Link>
          )}

          {token && role === "admin" && (
            <>
              <Link to="/admin" className="text-gray-300 hover:text-white transition-colors relative group">
                Dashboard
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 transition-all group-hover:w-full"></span>
              </Link>
              <Link to="/admin/create-course" className="text-gray-300 hover:text-white transition-colors relative group">
                Create Course
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pink-500 transition-all group-hover:w-full"></span>
              </Link>
            </>
          )}

          {!token ? (
            <div className="flex gap-4 items-center ml-4">
              <Link to="/login" className="text-sm font-semibold text-gray-300 hover:text-white transition-colors">
                Sign in
              </Link>
              <Link to="/signup">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-500 rounded-full shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all flex items-center gap-2"
                >
                  <User className="w-4 h-4" />
                  Get Started
                </motion.button>
              </Link>
            </div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="ml-4 px-5 py-2.5 text-sm font-semibold text-red-400 bg-red-500/10 border border-red-500/20 rounded-full hover:bg-red-500 hover:text-white transition-all flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </motion.button>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
