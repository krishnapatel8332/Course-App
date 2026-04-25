import { motion } from "framer-motion";
import { BookOpen, Star, Clock } from "lucide-react";
import { useCurrency } from "../hooks/useCurrency";

export default function CourseCard({ course, onAction, actionLabel, actionColor = "blue", children }) {
  const { formatPrice } = useCurrency();

  const colorVariants = {
    blue: "bg-blue-600 hover:bg-blue-500 shadow-blue-500/25",
    emerald: "bg-emerald-600 hover:bg-emerald-500 shadow-emerald-500/25",
    gray: "bg-gray-600 hover:bg-gray-500 shadow-gray-500/25",
    red: "bg-red-600 hover:bg-red-500 shadow-red-500/25"
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="glass-card rounded-2xl overflow-hidden flex flex-col h-full group"
    >
      <div className="h-56 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent z-10"></div>
        <motion.img 
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
          src={course.imageURL || "https://placehold.co/600x400/1e293b/fff?text=Course"} 
          alt={course.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = "https://placehold.co/600x400/1e293b/fff?text=No+Image"
          }}
        />
        <div className="absolute top-4 right-4 z-20">
          <span className="bg-gray-900/80 backdrop-blur-md text-blue-400 px-4 py-1.5 rounded-full text-sm font-bold shadow-lg border border-white/10">
            {formatPrice(course.price)}
          </span>
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow relative z-20 -mt-6 bg-gray-900/60 backdrop-blur-xl rounded-t-3xl border-t border-white/5">
        <div className="flex items-center gap-4 text-xs text-gray-400 mb-3 font-medium">
          <div className="flex items-center gap-1">
            <BookOpen className="w-4 h-4 text-blue-400" />
            <span>12 Lessons</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400" />
            <span>4.9</span>
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
          {course.title}
        </h3>
        
        <p className="text-gray-400 text-sm mb-6 line-clamp-3 flex-grow leading-relaxed">
          {course.description}
        </p>
        
        {children}
        
        {actionLabel && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onAction(course)}
            className={`w-full py-3 rounded-xl text-white font-bold transition shadow-lg mt-auto flex items-center justify-center gap-2 ${colorVariants[actionColor]}`}
          >
            {actionLabel}
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
