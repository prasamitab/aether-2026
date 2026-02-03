import { db } from "@/lib/firebase"; 
import { collection, getDocs } from "firebase/firestore";
import Timeline from "@/components/Timeline";
import RegisterButton from "@/components/RegisterButton";

export default async function Home() {
  const querySnapshot = await getDocs(collection(db, "events"));
  const events = querySnapshot.docs.map(doc => ({
    id: doc.id, 
    ...doc.data()
  }));

  return (
    <main className="min-h-screen bg-black text-white p-6 md:p-10 font-sans selection:bg-red-600 selection:text-white">
      {/* Navbar Branding */}
      <nav className="flex justify-between items-center mb-20 max-w-7xl mx-auto border-b border-white/10 pb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-red-600 flex items-center justify-center font-black text-2xl skew-x-[-12deg]">
            M
          </div>
          <span className="font-black tracking-tighter text-xl hidden md:block">MAHINDRA UNIVERSITY</span>
        </div>
        <div className="flex gap-8 text-xs font-black uppercase tracking-widest text-gray-500">
          <a href="#events" className="hover:text-red-600 transition-colors">Events</a>
          <a href="#schedule" className="hover:text-red-600 transition-colors">Schedule</a>
        </div>
      </nav>

      {/* Hero Section: Big & Bold */}
      <header className="text-center mb-32">
        <h1 className="text-[12vw] md:text-[15vw] font-[1000] leading-[0.8] tracking-tighter text-white uppercase italic drop-shadow-[0_0_30px_rgba(220,38,38,0.2)]">
          AETHER<br/><span className="text-red-600">2026</span>
        </h1>
        <p className="text-gray-400 mt-10 tracking-[0.5em] font-bold uppercase text-sm md:text-base border-y border-white/5 py-4 inline-block">
          Mahindra University's Annual Cultural Fest
        </p>
      </header>

      {/* Event Cards Grid */}
      <div id="events" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {events.map((event: any) => (
          <div 
            key={event.id} 
            className="group relative p-8 bg-zinc-950 border border-white/5 hover:border-red-600 transition-all duration-500 hover:shadow-[0_0_40px_rgba(220,38,38,0.1)]"
          >
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-3xl font-black italic uppercase group-hover:text-red-600 transition-colors">
                {event.title}
              </h2>
              <span className="text-[10px] font-black tracking-widest uppercase bg-red-600 text-white px-3 py-1 skew-x-[-12deg]">
                {event.category}
              </span>
            </div>
            
            <p className="text-gray-500 text-sm mb-8 leading-relaxed font-medium">
              {event.guidelines}
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-end">
                <span className="text-[10px] text-gray-600 uppercase font-black">Registration</span>
                <span className="font-black text-xl text-white">{event.price}</span>
              </div>
              <div className="flex justify-between items-end border-t border-white/5 pt-4">
                <span className="text-[10px] text-gray-600 uppercase font-black">Prize Pool</span>
                <span className="text-red-600 font-black text-xl">{event.prize_pool}</span>
              </div>
            </div>

            {/* Custom Interactive Button */}
            <RegisterButton eventTitle={event.title} />
          </div>
        ))}
      </div>

      {/* Timeline Section */}
      <div id="schedule" className="mt-40 border-t-4 border-red-600 pt-20">
        <Timeline />
      </div>

      <footer className="mt-40 pb-10 text-center">
        <div className="text-red-600 font-black text-4xl mb-4 italic tracking-tighter">AETHER '26</div>
        <p className="text-gray-600 text-[10px] uppercase font-bold tracking-widest">
          © 2026 Mahindra University. All Rights Reserved.
        </p>
      </footer>
    </main>
  );
}