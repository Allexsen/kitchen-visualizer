import React, { useState } from 'react';
import { Scene } from './components/Scene';
import { Interface } from './components/Interface';
import { CatalogView } from './components/CatalogView';
import { PriceView } from './components/PriceView';
import { Box, Grid, DollarSign } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('visualizer');

  return (
    <div className="w-full h-screen relative overflow-hidden bg-[#202020] flex flex-col">

      {/* Main Content Area */}
      <div className="flex-1 relative overflow-hidden">
        {/* Visualizer Tab */}
        <div className={`absolute inset-0 transition-opacity duration-300 ${activeTab === 'visualizer' ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
          <Scene />
          <Interface />
        </div>

        {/* Catalog Tab */}
        {activeTab === 'catalog' && (
          <div className="absolute inset-0 z-20 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <CatalogView />
          </div>
        )}

        {/* Price Tab */}
        {activeTab === 'price' && (
          <div className="absolute inset-0 z-20 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <PriceView />
          </div>
        )}
      </div>

      {/* Bottom Navigation Bar */}
      <div className="h-20 bg-[#1a1a1a] border-t border-white/10 flex justify-around items-center px-4 z-50 shrink-0">
        <button
          onClick={() => setActiveTab('visualizer')}
          className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${activeTab === 'visualizer' ? 'text-blue-500 bg-blue-500/10' : 'text-gray-500 hover:text-gray-300'}`}
        >
          <Box size={24} />
          <span className="text-xs font-medium">Visualizer</span>
        </button>

        <button
          onClick={() => setActiveTab('catalog')}
          className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${activeTab === 'catalog' ? 'text-blue-500 bg-blue-500/10' : 'text-gray-500 hover:text-gray-300'}`}
        >
          <Grid size={24} />
          <span className="text-xs font-medium">Catalog</span>
        </button>

        <button
          onClick={() => setActiveTab('price')}
          className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${activeTab === 'price' ? 'text-blue-500 bg-blue-500/10' : 'text-gray-500 hover:text-gray-300'}`}
        >
          <DollarSign size={24} />
          <span className="text-xs font-medium">Price</span>
        </button>
      </div>
    </div>
  );
}

export default App;
