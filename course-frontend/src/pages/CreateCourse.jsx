import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Save, Upload, Link as LinkIcon, DollarSign, Type, AlignLeft } from "lucide-react";
import API from "../api/axios";

export default function CreateCourse() {
  const navigate = useNavigate();
  const location = useLocation();
  const editingCourse = location.state?.course;

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    imageURL: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingCourse) {
      setForm({
        title: editingCourse.title,
        description: editingCourse.description,
        price: editingCourse.price,
        imageURL: editingCourse.imageURL || "",
      });
    }
  }, [editingCourse]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (editingCourse) {
        await API.put("/admin/course", { ...form, courseId: editingCourse._id });
      } else {
        await API.post("/admin/course", form);
      }
      navigate("/admin");
    } catch (err) {
      console.error("Course creation/update error:", err);
      setError(err.response?.data?.message || err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 pt-24">
      <div className="container mx-auto max-w-3xl">
        <button 
          onClick={() => navigate("/admin")}
          className="text-gray-400 hover:text-white mb-8 flex items-center gap-2 transition group font-medium"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to Dashboard
        </button>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel p-8 md:p-10 rounded-3xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500"></div>
          
          <h1 className="text-3xl font-extrabold mb-2">
            {editingCourse ? "Edit Course" : "Create New Course"}
          </h1>
          <p className="text-gray-400 mb-8">Fill in the details below to publish your course to the platform.</p>

          {error && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-xl mb-6 flex items-center gap-3">
              <div className="bg-red-500/20 p-1.5 rounded-lg"><Upload className="w-4 h-4" /></div>
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-gray-300">Course Title</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500">
                  <Type className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  placeholder="e.g. Advanced React & Tailwind"
                  className="w-full pl-12 p-3.5 rounded-xl bg-gray-900/50 border border-gray-700 text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-gray-600"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-gray-300">Description</label>
              <div className="relative">
                <div className="absolute top-3.5 left-4 pointer-events-none text-gray-500">
                  <AlignLeft className="w-5 h-5" />
                </div>
                <textarea
                  placeholder="Describe what students will learn..."
                  rows="4"
                  className="w-full pl-12 p-3.5 rounded-xl bg-gray-900/50 border border-gray-700 text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-gray-600 resize-none"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 space-y-1.5">
                <label className="block text-sm font-semibold text-gray-300">Base Price (USD)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500">
                    <DollarSign className="w-5 h-5" />
                  </div>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="49.99"
                    className="w-full pl-12 p-3.5 rounded-xl bg-gray-900/50 border border-gray-700 text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-gray-600"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                    required
                  />
                </div>
              </div>
              <div className="flex-1 space-y-1.5">
                <label className="block text-sm font-semibold text-gray-300">Thumbnail URL</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500">
                    <LinkIcon className="w-5 h-5" />
                  </div>
                  <input
                    type="url"
                    placeholder="https://..."
                    className="w-full pl-12 p-3.5 rounded-xl bg-gray-900/50 border border-gray-700 text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-gray-600"
                    value={form.imageURL}
                    onChange={(e) => setForm({ ...form, imageURL: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div className="pt-6">
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/25 flex justify-center items-center gap-2 transition-all disabled:opacity-50"
              >
                {loading ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    {editingCourse ? "Update Course" : "Publish Course"}
                  </>
                )}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
