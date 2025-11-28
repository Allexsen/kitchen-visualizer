import { create } from 'zustand';
import { materials } from '../data/materials';

export const useStore = create((set, get) => ({
    dimensions: { width: 240, height: 240, depth: 60 }, // cm
    setDimensions: (dims) => set((state) => ({ dimensions: { ...state.dimensions, ...dims } })),

    // Selections for each part
    selections: {
        bottomCabinet: { materialId: 'tier1', optionId: 'white' },
        worktop: { materialId: 'tier2', optionId: 'oak' },
        wallPanel: { materialId: 'tier1', optionId: 'white' },
        topCabinet: { materialId: 'tier1', optionId: 'white' },
        floor: { materialId: 'tier2', optionId: 'ash' }, // Added floor as requested
    },

    setSelection: (part, materialId, optionId) => set((state) => ({
        selections: { ...state.selections, [part]: { materialId, optionId } }
    })),

    // UI State
    activePart: null, // Which part is currently being edited
    setActivePart: (part) => set({ activePart: part }),

    // Price Calculation
    getPrice: () => {
        const { dimensions, selections } = get();
        const { width, height, depth } = dimensions;

        let totalPrice = 0;

        // Approximate area calculations (m2)
        // Width is in cm, convert to m
        const w = width / 100;
        const d = depth / 100;

        const parts = {
            bottomCabinet: { area: w * 0.9, factor: d / 0.6 }, // Base height ~90cm
            worktop: { area: w * d, factor: 1 },
            wallPanel: { area: w * 0.6, factor: 1 }, // Backsplash height ~60cm
            topCabinet: { area: w * 0.7, factor: d / 0.35 }, // Top cabinet depth usually less, but scaling with depth input
            floor: { area: w * (d + 1), factor: 1 }, // Floor patch
        };

        Object.entries(selections).forEach(([part, sel]) => {
            const material = materials.find(m => m.id === sel.materialId);
            if (material && parts[part]) {
                const partInfo = parts[part];
                totalPrice += partInfo.area * partInfo.factor * material.price;
            }
        });

        return Math.round(totalPrice);
    }
}));
