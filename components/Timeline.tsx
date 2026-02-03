"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, MapPin } from 'lucide-react';

const schedule = {
  "Day 1": [
    { time: "02:00 PM", title: "Battle of the Bands Auditions", loc: "Main Auditorium", type: "Music" },
    { time: "04:00 PM", title: "Battle of Voices '26", loc: "Music Hall", type: "Music" },
    { time: "06:00 PM", title: "Battle of the Bands Finals", loc: "Open Air Theatre", type: "Music" },
  ],
  "Day 2": [
    { time: "09:00 AM", title: "Frame & Fame: Slot 1", loc: "Media Lab", type: "Photography" },
    { time: "10:00 AM", title: "Battle of Beats '26", loc: "Main Stage", type: "Dance" },
    { time: "01:00 PM", title: "Frame & Fame: Slot 2", loc: "Media Lab", type: "Photography" },
    { time: "04:00 PM", title: "Short Film Fest Screenings", loc: "Seminar Hall", type: "Film" },
    { time: "07:00 PM", title: "Crown & Culture Fashion Show", loc: "Grand Arena", type: "Fashion" },
  ]
};

export default function Timeline() {
  const [activeTab, setActiveTab] = useState<"Day 1" | "Day 2">("Day 1");

  return (
    <section className="py-20 bg-black text-white px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          Event Schedule
        </h2>

        {/* Tab Switcher */}
        <div className="flex justify-center gap-4 mb-16">
          {Object.keys(schedule).map((day) => (
            <button
              key={day}
              onClick={() => setActiveTab(day as any)}
              className={`px-8 py-3 rounded-full font-bold transition-all ${
                activeTab === day ? "bg-purple-600 shadow-[0_0_20px_rgba(147,51,234,0.5)]" : "bg-white/5 hover:bg-white/10"
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Timeline Rail */}
        <div className="relative border-l-2 border-white/10 ml-4 md:ml-32 space-y-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {schedule[activeTab].map((item, index) => (
                <div key={index} className="relative pl-10">
                  {/* Dot on the rail */}
                  <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-purple-500 border-4 border-black" />
                  
                  {/* Content Card */}
                  <div className="flex flex-col md:flex-row md:items-center gap-4 group">
                    <time className="md:absolute md:-left-32 md:w-24 text-sm font-mono text-purple-400 font-bold">
                      {item.time}
                    </time>
                    <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl group-hover:border-purple-500/50 transition-all flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold">{item.title}</h3>
                        <span className="text-[10px] uppercase tracking-widest bg-white/10 px-2 py-1 rounded">
                          {item.type}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400 text-sm">
                        <MapPin size={14} />
                        {item.loc}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}