"use client";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { ShieldCheck, Users, Download, FileSpreadsheet } from "lucide-react";

export default function AdminDashboard() {
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const q = query(collection(db, "registrations"), orderBy("timestamp", "desc"));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setRegistrations(data);
      } catch (error) {
        console.error("Error fetching registrations:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRegistrations();
  }, []);

  const downloadCSV = () => {
    if (registrations.length === 0) return;

    // Create CSV Headers
    const headers = ["Event", "Team Name", "Leader Name", "Email", "Phone", "Timestamp"];
    
    // Map data to rows
    const rows = registrations.map(reg => [
      reg.event,
      reg.teamName,
      reg.leaderName,
      reg.email,
      reg.phone,
      reg.timestamp?.toDate().toLocaleString() || "N/A"
    ]);

    // Combine headers and rows
    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    
    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "Aether2026_Registrations.csv");
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main className="min-h-screen bg-black text-white p-8 md:p-20 font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="flex items-center gap-4">
            <div className="bg-red-600 p-3 rounded-xl rotate-3 shadow-[0_0_20px_rgba(220,38,38,0.4)]">
              <ShieldCheck size={32} color="white" />
            </div>
            <div>
              <h1 className="text-4xl font-[1000] italic uppercase tracking-tighter">Admin Portal</h1>
              <p className="text-gray-500 text-xs font-bold tracking-widest uppercase">Aether '26 Registry</p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <button 
              onClick={downloadCSV}
              className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-red-600 hover:text-white transition-all"
            >
              <FileSpreadsheet size={18} />
              Export CSV
            </button>
            <div className="bg-zinc-950 border border-white/5 px-6 py-3 rounded-xl flex items-center gap-4">
              <Users className="text-red-600" size={18} />
              <span className="text-xl font-black">{registrations.length}</span>
            </div>
          </div>
        </header>

        <div className="bg-zinc-950 border border-white/5 rounded-[2rem] overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 bg-white/5">
                  <th className="p-6 text-[10px] uppercase font-black text-gray-500 tracking-widest">Event</th>
                  <th className="p-6 text-[10px] uppercase font-black text-gray-500 tracking-widest">Team Name</th>
                  <th className="p-6 text-[10px] uppercase font-black text-gray-500 tracking-widest">Leader</th>
                  <th className="p-6 text-[10px] uppercase font-black text-gray-500 tracking-widest">Contact</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={4} className="p-20 text-center animate-pulse text-gray-600">Syncing with Firestore...</td></tr>
                ) : registrations.length === 0 ? (
                  <tr><td colSpan={4} className="p-20 text-center text-gray-600">Waiting for first registration...</td></tr>
                ) : (
                  registrations.map((reg) => (
                    <tr key={reg.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                      <td className="p-6 font-black italic text-red-600 uppercase text-sm">{reg.event}</td>
                      <td className="p-6 font-bold">{reg.teamName}</td>
                      <td className="p-6 text-gray-400">{reg.leaderName}</td>
                      <td className="p-6">
                        <div className="text-sm font-medium">{reg.email}</div>
                        <div className="text-[10px] text-gray-600">{reg.phone}</div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}