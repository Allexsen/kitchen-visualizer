import React from 'react';
import { useStore } from '../store/useStore';
import { materials } from '../data/materials';

export const PriceView = () => {
    const { dimensions, selections, getPrice } = useStore();
    const { width, height, depth } = dimensions;
    const totalPrice = getPrice();

    // Re-calculate breakdown (logic duplicated from store for display purposes, ideally refactor store to return breakdown)
    const w = width / 100;
    const d = depth / 100;
    const scaleY = (height / 100) / 2.4;

    const parts = {
        bottomCabinet: { label: 'Bottom Cabinet', area: w * 0.9 * scaleY, factor: d / 0.6 },
        worktop: { label: 'Worktop', area: w * d, factor: 1 },
        wallPanel: { label: 'Wall Panel', area: w * 0.6 * scaleY, factor: 1 },
        topCabinet: { label: 'Top Cabinet', area: w * 0.7 * scaleY, factor: d / 0.35 },
        floor: { label: 'Floor Area', area: w * (d + 1), factor: 1 },
    };

    return (
        <div className="w-full h-full bg-[#202020] text-white p-6 overflow-y-auto pb-24">
            <h2 className="text-3xl font-bold mb-8 text-center tracking-tight">Cost Estimate</h2>

            <div className="max-w-2xl mx-auto space-y-6">
                {/* Dimensions Summary */}
                <div className="bg-[#2a2a2a] rounded-xl p-5 border border-white/5 flex justify-between text-sm">
                    <div className="text-center">
                        <span className="block text-gray-400 uppercase text-xs font-bold">Width</span>
                        <span className="text-xl font-mono">{width}cm</span>
                    </div>
                    <div className="text-center">
                        <span className="block text-gray-400 uppercase text-xs font-bold">Height</span>
                        <span className="text-xl font-mono">{height}cm</span>
                    </div>
                    <div className="text-center">
                        <span className="block text-gray-400 uppercase text-xs font-bold">Depth</span>
                        <span className="text-xl font-mono">{depth}cm</span>
                    </div>
                </div>

                {/* Breakdown */}
                <div className="bg-[#2a2a2a] rounded-xl overflow-hidden border border-white/5">
                    <div className="p-4 bg-white/5 border-b border-white/5">
                        <h3 className="font-semibold text-gray-200">Material Breakdown</h3>
                    </div>
                    <div className="divide-y divide-white/5">
                        {Object.entries(selections).map(([partKey, sel]) => {
                            const partInfo = parts[partKey];
                            if (!partInfo) return null;

                            const material = materials.find(m => m.id === sel.materialId);
                            const option = material?.options.find(o => o.id === sel.optionId);
                            const cost = Math.round(partInfo.area * partInfo.factor * (material?.price || 0));

                            return (
                                <div key={partKey} className="p-4 flex justify-between items-center hover:bg-white/5 transition-colors">
                                    <div>
                                        <div className="font-medium text-gray-200">{partInfo.label}</div>
                                        <div className="text-xs text-gray-400 mt-0.5">
                                            {material?.name} - {option?.name}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-mono font-bold text-blue-400">${cost}</div>
                                        <div className="text-[10px] text-gray-500">
                                            {partInfo.area.toFixed(2)}m² × ${material?.price}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Total */}
                <div className="bg-blue-600 rounded-xl p-6 shadow-lg text-center transform scale-105">
                    <span className="block text-blue-100 text-sm font-medium mb-1">Total Estimated Price</span>
                    <span className="block text-5xl font-bold text-white tracking-tight">${totalPrice}</span>
                    <p className="text-[10px] text-blue-200 mt-4 opacity-80">
                        *Disclaimer: This price is an approximate. Exact total cost calculated after in-person contact with the worker.
                    </p>
                </div>
            </div>
        </div>
    );
};
