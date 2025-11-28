import React from 'react';
import { useStore } from '../store/useStore';
import { materials } from '../data/materials';
import { X } from 'lucide-react';

const MaterialSelector = () => {
    const { activePart, setActivePart, setSelection, selections } = useStore();

    if (!activePart) return null;

    const currentSelection = selections[activePart];

    return (
        <div className="absolute inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4">
            <div className="bg-white w-full max-w-md rounded-xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">
                <div className="p-4 border-b flex justify-between items-center bg-gray-50">
                    <h3 className="font-bold text-lg capitalize text-gray-800">
                        Select Material: <span className="text-blue-600">{activePart.replace(/([A-Z])/g, ' $1').trim()}</span>
                    </h3>
                    <button onClick={() => setActivePart(null)} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                        <X size={20} className="text-gray-600" />
                    </button>
                </div>

                <div className="p-4 max-h-[60vh] overflow-y-auto space-y-6">
                    {materials.map((tier) => (
                        <div key={tier.id}>
                            <div className="flex justify-between items-center mb-3">
                                <h4 className="font-semibold text-gray-700">{tier.name}</h4>
                                <span className="text-xs font-medium bg-gray-100 text-gray-600 px-2 py-1 rounded-full">${tier.price}/unit</span>
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                                {tier.options.map((option) => (
                                    <button
                                        key={option.id}
                                        onClick={() => setSelection(activePart, tier.id, option.id)}
                                        className={`group relative aspect-square rounded-lg border-2 overflow-hidden transition-all duration-200 ${currentSelection?.materialId === tier.id && currentSelection?.optionId === option.id
                                                ? 'border-blue-600 ring-2 ring-blue-100 scale-105 shadow-md'
                                                : 'border-transparent hover:border-gray-300 hover:shadow-sm'
                                            }`}
                                    >
                                        <div
                                            className="w-full h-full transition-transform duration-500 group-hover:scale-110"
                                            style={{ backgroundColor: option.color }}
                                        />
                                        {/* Watermark effect */}
                                        <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center rotate-45">
                                            <span className="text-[8px] font-bold text-white">JHANDWORK</span>
                                        </div>

                                        <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm text-white text-[10px] p-1.5 truncate text-center">
                                            {option.name}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export const Interface = () => {
    const { dimensions, setDimensions, getPrice } = useStore();
    const price = getPrice();

    return (
        <>
            <div className="absolute top-0 left-0 w-full p-4 z-10 pointer-events-none">
                <div className="bg-white/90 backdrop-blur-md p-5 rounded-2xl shadow-xl pointer-events-auto max-w-xs mx-auto sm:mx-0 sm:ml-4 border border-white/50">
                    <h1 className="text-xl font-bold mb-5 text-gray-800 tracking-tight">Kitchen Planner</h1>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-400 mb-1.5 uppercase tracking-wider">Width (cm)</label>
                            <input
                                type="number"
                                value={dimensions.width}
                                onChange={(e) => setDimensions({ width: Number(e.target.value) })}
                                className="w-full p-2.5 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all font-medium text-gray-700"
                            />
                        </div>

                        <div className="flex gap-3">
                            <div className="flex-1">
                                <label className="block text-xs font-bold text-gray-400 mb-1.5 uppercase tracking-wider">Height (cm)</label>
                                <input
                                    type="number"
                                    value={dimensions.height}
                                    onChange={(e) => setDimensions({ height: Number(e.target.value) })}
                                    className="w-full p-2.5 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all font-medium text-gray-700"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="block text-xs font-bold text-gray-400 mb-1.5 uppercase tracking-wider">Depth (cm)</label>
                                <input
                                    type="number"
                                    value={dimensions.depth}
                                    onChange={(e) => setDimensions({ depth: Number(e.target.value) })}
                                    className="w-full p-2.5 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all font-medium text-gray-700"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-200">
                        <div className="flex justify-between items-end mb-2">
                            <span className="text-gray-500 text-sm font-medium">Estimated Cost</span>
                            <span className="text-3xl font-bold text-blue-600 tracking-tight">${price}</span>
                        </div>
                        <p className="text-[10px] text-gray-400 leading-tight">
                            *Disclaimer: This price is an approximate. Exact total cost calculated after in-person contact with the worker.
                        </p>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-8 left-0 w-full text-center pointer-events-none px-4">
                <span className="bg-black/70 text-white px-6 py-3 rounded-full text-sm backdrop-blur-md shadow-lg font-medium animate-pulse">
                    Tap any part to change material
                </span>
            </div>

            <MaterialSelector />
        </>
    );
};
