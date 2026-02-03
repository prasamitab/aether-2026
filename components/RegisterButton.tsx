"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Loader2, X, Users } from 'lucide-react';

export default function RegisterButton({ eventTitle }: { eventTitle: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<'form' | 'processing' | 'success'>('form');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('processing');
    
    // Simulate API call/Payment
    setTimeout(() => {
      setStep('success');
      setTimeout(() => {
        setIsOpen(false);
        setStep('form');
      }, 3000);
    }, 2000);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="w-full bg-white text-black py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-red-600 hover:text-white active:scale-95 transition-all mt-4"
      >
        Register Now
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
              onClick={() => step !== 'processing' && setIsOpen(false)}
            />
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-zinc-950 border border-red-600/30 p-8 md:p-12 rounded-[2rem] max-w-lg w-full shadow-[0_0_50px_rgba(220,38,38,0.2)]"
            >
              <button onClick={() => setIsOpen(false)} className="absolute top-6 right-6 text-gray-500 hover:text-white">
                <X size={24} />
              </button>

              {step === 'form' && (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="text-center mb-8">
                    <h3 className="text-3xl font-black italic uppercase text-white">Team Registration</h3>
                    <p className="text-red-600 font-bold text-xs tracking-widest uppercase mt-2">{eventTitle}</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-[10px] uppercase font-black text-gray-500 mb-2 block">Team Name</label>
                      <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-red-600 outline-none transition-all text-white" placeholder="e.g. The Mavericks" />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-black text-gray-500 mb-2 block">Team Leader Name</label>
                      <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-red-600 outline-none transition-all text-white" placeholder="Your Full Name" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] uppercase font-black text-gray-500 mb-2 block">Email</label>
                        <input required type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-red-600 outline-none transition-all text-white" placeholder="leader@email.com" />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase font-black text-gray-500 mb-2 block">Phone</label>
                        <input required type="tel" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-red-600 outline-none transition-all text-white" placeholder="+91" />
                      </div>
                    </div>
                  </div>

                  <button type="submit" className="w-full bg-red-600 text-white py-4 rounded-xl font-black uppercase tracking-widest hover:bg-red-700 transition-all flex items-center justify-center gap-2">
                    Proceed to Payment
                  </button>
                </form>
              )}

              {step === 'processing' && (
                <div className="py-20 text-center">
                  <Loader2 className="w-16 h-16 text-red-600 animate-spin mx-auto mb-6" />
                  <h3 className="text-2xl font-black uppercase italic">Processing...</h3>
                  <p className="text-gray-500 text-sm mt-2 font-medium">Securing your spot in {eventTitle}</p>
                </div>
              )}

              {step === 'success' && (
                <div className="py-20 text-center">
                  <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-6" />
                  <h3 className="text-2xl font-black uppercase italic">Registration Successful!</h3>
                  <p className="text-gray-500 text-sm mt-2 font-medium">Check your email for the Aether 2026 entry pass.</p>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}