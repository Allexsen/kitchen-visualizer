import React from 'react';
import { materials } from '../data/materials';

export const CatalogView = () => {
    return (
        <div className="w-full h-full bg-[#202020] text-white p-6 overflow-y-auto pb-24">
            <h2 className="text-3xl font-bold mb-8 text-center tracking-tight">Material Catalog</h2>

            <div className="space-y-10 max-w-4xl mx-auto">
                {materials.map((tier) => (
                    <div key={tier.id} className="bg-[#2a2a2a] rounded-2xl p-6 shadow-lg border border-white/5">
                        <div className="flex justify-between items-end mb-6 border-b border-white/10 pb-4">
                            <div>
                                <h3 className="text-2xl font-semibold text-gray-100">{tier.name}</h3>
                                <p className="text-gray-400 text-sm mt-1">Premium quality finishes</p>
                            </div>
                            <span className="text-xl font-bold text-blue-400">${tier.price}<span className="text-sm text-gray-500 font-normal">/unit</span></span>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                            {tier.options.map((option) => (
                                <div key={option.id} className="group flex flex-col items-center">
                                    <div className="relative w-full aspect-square rounded-xl overflow-hidden shadow-md mb-3 ring-1 ring-white/10 group-hover:ring-blue-500 transition-all">
                                        <div
                                            className="w-full h-full transition-transform duration-500 group-hover:scale-110"
                                            style={{ backgroundColor: option.color }}
                                        />
                                        {/* Watermark */}
                                        <div className="absolute inset-0 opacity-20 flex items-center justify-center rotate-45 pointer-events-none">
                                            <span className="text-xs font-bold text-white drop-shadow-md">JHANDWORK</span>
                                        </div>
                                    </div>
                                    <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">{option.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
