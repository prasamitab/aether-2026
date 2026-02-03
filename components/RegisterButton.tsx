"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Loader2 } from 'lucide-react';

export default function RegisterButton({ eventTitle }: { eventTitle: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleRegister = () => {
    setIsOpen(true);
    setIsProcessing(true);
    
    // Simulate processing time
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      
      // Auto-close after success
      setTimeout(() => {
        setIsOpen(false);
        setIsSuccess(false);
      }, 3000);
    }, 2000);
  };

  return (
    <>
      <button 
        onClick={handleRegister}
        className="w-full bg-white text-black py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-gray-200 active:scale-95 transition-all mt-4"
      >
        Register Now
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => !isProcessing && setIsOpen(false)}
            />
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-zinc-900 border border-white/10 p-10 rounded-3xl max-w-sm w-full text-center shadow-2xl"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-16 h-16 text-purple-500 animate-spin mx-auto mb-6" />
                  <h3 className="text-2xl font-bold mb-2 text-white">Processing...</h3>
                  <p className="text-gray-400">Verifying details for {eventTitle}</p>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold mb-2 text-white">Registered!</h3>
                  <p className="text-gray-400">You're all set for {eventTitle}. See you at Aether 2026!</p>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}