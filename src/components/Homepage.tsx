import React, { useEffect, useState } from "react";
import { PALETTES } from "../utils";

const Homepage: React.FC = () => {
  const [version, setVersion] = useState("2026-06-15");
  const manifestUrl = `${window.location.origin}/manifest.json`;
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch("/manifest.json")
      .then((b) => b.json())
      .then((j) => j.version)
      .then(setVersion)
      .catch(() => {});
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(manifestUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-[#F5F5F4] font-sans antialiased py-12 px-4 selection:bg-purple-500/30">
      <div className="max-w-3xl mx-auto space-y-12">
        
        {/* Hero Banner / Title */}
        <header className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 border border-purple-500/30 shadow-lg shadow-purple-500/10 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 fill-white" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" stroke-width="2" opacity="0.2" />
              <path d="M 15 50 A 35 35 0 0 1 85 50" fill="none" stroke="currentColor" stroke-width="4" opacity="0.4" />
              <path d="M 25 50 A 25 25 0 0 1 75 50" fill="none" stroke="currentColor" stroke-width="6" opacity="0.7" />
              <path d="M 40 50 A 10 10 0 0 1 60 50" fill="none" stroke="currentColor" stroke-width="8" />
            </svg>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 via-indigo-400 to-amber-300 bg-clip-text text-transparent">
            Distance in the Shadows
          </h1>
          <p className="text-lg text-stone-400 max-w-xl mx-auto">
            A premium Owlbear Rodeo extension for measuring Close, Near, and Far distances in the Shadowdark RPG system.
          </p>
          <div className="text-stone-500 text-xs">
            By <a href="http://memorablenaton.es" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors">Alvaro Cavalcanti</a> &bull; Version {version}
          </div>

          <div className="mt-6 rounded-2xl overflow-hidden border border-stone-800 shadow-2xl shadow-purple-900/20">
            <img
              src="/img/hero.png"
              alt="Distance in the Shadows — extension preview"
              className="w-full object-cover"
            />
          </div>
        </header>

        {/* Installation Section */}
        <section className="bg-[#1E1E1E] border border-stone-800 rounded-2xl p-6 md:p-8 space-y-6 shadow-xl shadow-black/30">
          <div>
            <h2 className="text-2xl font-bold text-stone-100 mb-2">Installation</h2>
            <p className="text-stone-400 text-sm">
              Add this extension to your Owlbear Rodeo profile by copying the manifest URL below and pasting it into the extensions installation screen.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex-1 bg-stone-900 border border-stone-850 rounded-xl px-4 py-3 font-mono text-xs text-purple-400 select-all overflow-x-auto whitespace-nowrap flex items-center justify-between">
              <span>{manifestUrl}</span>
            </div>
            <button
              onClick={handleCopy}
              className={`px-5 py-3 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer shadow-md ${
                copied 
                  ? "bg-emerald-600 text-white shadow-emerald-500/10" 
                  : "bg-purple-600 hover:bg-purple-500 text-white shadow-purple-500/10"
              }`}
            >
              {copied ? "Copied!" : "Copy Manifest URL"}
            </button>
          </div>

          <div className="text-xs text-stone-500 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 fill-current text-stone-600" viewBox="0 0 24 24">
              <path d="M11 9h2V7h-2v2m1 11c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8m0-18C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2m-1 13h2v-4h-2v4Z"/>
            </svg>
            <span>Need help? Visit <a href="https://extensions.owlbear.rodeo/guide" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">Owlbear Rodeo Extension Guide</a>.</span>
          </div>
        </section>

        {/* How it Works / Design Section */}
        <section className="grid md:grid-cols-2 gap-6">
          <div className="bg-[#1E1E1E] border border-stone-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h2 className="text-xl font-bold text-stone-100">Distance Bands</h2>
            <p className="text-stone-400 text-sm">
              The template is drawn as a semi-circle centered on the token. It is split into three concentric bands reflecting the Shadowdark distance categories:
            </p>
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500 mt-1.5 shrink-0" />
                <div>
                  <h4 className="text-stone-200 text-sm font-semibold">Close (5 ft)</h4>
                  <p className="text-stone-400 text-xs">Directly adjacent. Drawn as an inner 5ft radius semi-circle.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-400 mt-1.5 shrink-0" />
                <div>
                  <h4 className="text-stone-200 text-sm font-semibold">Near (up to 30 ft)</h4>
                  <p className="text-stone-400 text-xs">Up to 6 grid cells. Occupies 25ft of space outward from the Close boundary.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-stone-500 mt-1.5 shrink-0" />
                <div>
                  <h4 className="text-stone-200 text-sm font-semibold">Far (30+ ft Boundary)</h4>
                  <p className="text-stone-400 text-xs">The beginning of the Far distance. Rendered as a thin 5ft boundary layer from 30ft to 35ft.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#1E1E1E] border border-stone-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h2 className="text-xl font-bold text-stone-100">Features</h2>
            <ul className="space-y-3 pt-2 text-stone-400 text-sm">
              <li className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 fill-emerald-500 shrink-0" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9Z"/>
                </svg>
                <span><strong>Context Menu Toggle:</strong> Right-click character tokens and click "SD Distances" to show/hide the template.</span>
              </li>
              <li className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 fill-emerald-500 shrink-0" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9Z"/>
                </svg>
                <span><strong>Independent Rotation:</strong> Drag the standard rotate arrow icon to aim the semi-circle template.</span>
              </li>
              <li className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 fill-emerald-500 shrink-0" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9Z"/>
                </svg>
                <span><strong>CORS SVG Generator:</strong> Fast, vectorized, transparent shapes that scale cleanly without blurring.</span>
              </li>
              <li className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 fill-emerald-500 shrink-0" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9Z"/>
                </svg>
                <span><strong>5 Custom Color Palettes:</strong> Choose grey, emerald green, violet purple, ocean blue, or amber orange.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Color Palettes Section */}
        <section className="bg-[#1E1E1E] border border-stone-800 rounded-2xl p-6 md:p-8 shadow-xl space-y-6">
          <h2 className="text-2xl font-bold text-stone-100">Color Palettes</h2>
          <p className="text-stone-400 text-sm">
            Select your preferred color profile from the popover tab in the Owlbear Rodeo top bar. All active templates on the current scene will update immediately.
          </p>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
            {Object.entries(PALETTES).map(([id, palette]) => (
              <div 
                key={id}
                className="bg-stone-900 border border-stone-850 p-4 rounded-xl flex items-center justify-between"
              >
                <span className="text-sm font-semibold text-stone-200">{palette.name}</span>
                <div className="flex gap-1.5">
                  <span className="w-4 h-4 rounded-full border border-black/20" style={{ backgroundColor: palette.colors.close }} />
                  <span className="w-4 h-4 rounded-full border border-black/20" style={{ backgroundColor: palette.colors.near }} />
                  <span className="w-4 h-4 rounded-full border border-black/20" style={{ backgroundColor: palette.colors.far }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-stone-600 text-xs pt-4 border-t border-stone-900 flex flex-col sm:flex-row justify-between gap-4">
          <span>&copy; {new Date().getFullYear()} Alvaro Cavalcanti. All rights reserved.</span>
          <div className="flex justify-center gap-4">
            <a href="https://github.com/alvarocavalcanti/distanceintheshadows" target="_blank" rel="noopener noreferrer" className="hover:text-stone-400 transition-colors">GitHub Repository</a>
            <a href="https://owlbear.rodeo" target="_blank" rel="noopener noreferrer" className="hover:text-stone-400 transition-colors">Owlbear Rodeo</a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Homepage;
