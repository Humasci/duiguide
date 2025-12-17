'use client';

interface HeroProps {
  h1: string;
  deadlineAlert: string;
  intro: string;
  county: {
    name: string;
    state: {
      name: string;
      abbreviation: string;
    };
  };
}

export default function Hero({ h1, deadlineAlert, intro, county }: HeroProps) {
  return (
    <section className="bg-gradient-to-br from-blue-900 to-blue-800 text-white py-20">
      <div className="max-w-4xl mx-auto px-4">
        {/* Location Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" />
          </svg>
          <span className="font-medium">{county.name}, {county.state.abbreviation}</span>
        </div>
        
        {/* H1 */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
          {h1}
        </h1>
        
        {/* Deadline Alert */}
        <div className="bg-red-500/20 border-l-4 border-red-500 p-6 mb-6 rounded-r-lg">
          <div className="flex items-start gap-3">
            <svg className="w-6 h-6 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" />
            </svg>
            <div>
              <p className="font-bold text-lg mb-1">Time-Sensitive Deadline</p>
              <p className="text-red-100">{deadlineAlert}</p>
            </div>
          </div>
        </div>
        
        {/* Intro */}
        <p className="text-xl text-blue-100 leading-relaxed">
          {intro}
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4 mt-8">
          <a 
            href="#checklist" 
            className="bg-white text-blue-900 px-8 py-4 rounded-lg font-bold hover:bg-blue-50 transition-colors"
          >
            View Checklist
          </a>
          <a 
            href="#get-help" 
            className="bg-blue-700 text-white px-8 py-4 rounded-lg font-bold hover:bg-blue-600 transition-colors border-2 border-blue-400"
          >
            Talk to Attorney
          </a>
        </div>
      </div>
    </section>
  );
}