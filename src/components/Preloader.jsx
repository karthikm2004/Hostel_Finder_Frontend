import React from 'react';

function Preloader() {
    return (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-900 transition-opacity duration-500">
            {/* Pulsing Logo Container */}
            <div className="relative flex items-center justify-center mb-8">
                {/* Outer Ripple */}
                <div className="absolute w-24 h-24 bg-indigo-500/20 rounded-full animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
                {/* Inner Ripple */}
                <div className="absolute w-16 h-16 bg-indigo-500/40 rounded-full animate-[ping_1.5s_cubic-bezier(0,0,0.2,1)_infinite_0.5s]"></div>
                
                {/* Actual Icon */}
                <div className="relative z-10 bg-indigo-600 text-white p-4 rounded-2xl shadow-lg shadow-indigo-600/50 flex items-center justify-center">
                    <svg className="w-8 h-8 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                    </svg>
                </div>
            </div>
            
            {/* Text */}
            <div className="flex flex-col items-center">
                <h2 className="text-xl font-bold tracking-widest text-white uppercase mb-2">Hostel<span className="text-indigo-400">Finder</span></h2>
                
                {/* Loading Bar */}
                <div className="w-48 h-1.5 bg-slate-800 rounded-full overflow-hidden mt-4">
                    <div className="h-full bg-indigo-500 rounded-full animate-[progress_1.5s_ease-in-out_infinite]"></div>
                </div>
            </div>

            <style>{`
                @keyframes progress {
                    0% { width: 0%; transform: translateX(-100%); }
                    50% { width: 100%; transform: translateX(0); }
                    100% { width: 0%; transform: translateX(200%); }
                }
            `}</style>
        </div>
    );
}

export default Preloader;