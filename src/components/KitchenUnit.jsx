import React from 'react';
import { useStore } from '../store/useStore';
import { materials } from '../data/materials';

const Part = ({ position, args, partId, label }) => {
    const { selections, setSelection, activePart, setActivePart } = useStore();
    const selection = selections[partId];
    const materialTier = materials.find(m => m.id === selection?.materialId);
    const option = materialTier?.options.find(o => o.id === selection?.optionId);

    const pointerDownPos = React.useRef({ x: 0, y: 0 });

    const handlePointerDown = (e) => {
        // Store the initial pointer position
        pointerDownPos.current = { x: e.clientX, y: e.clientY };
    };

    const handlePointerUp = (e) => {
        e.stopPropagation();

        // Calculate how far the pointer moved
        const deltaX = Math.abs(e.clientX - pointerDownPos.current.x);
        const deltaY = Math.abs(e.clientY - pointerDownPos.current.y);
        const dragDistance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        // Only treat as a click if the pointer didn't move much (less than 15 pixels)
        // This helps distinguish between clicks and drags (15px threshold for 3D rotation)
        if (dragDistance < 15) {
            setActivePart(partId);
        }
    };

    const color = option?.color || '#ffffff';
    const isSelected = activePart === partId;

    return (
        <mesh
            position={position}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            castShadow
            receiveShadow
        >
            <boxGeometry args={args} />
            <meshStandardMaterial
                color={color}
                roughness={option?.roughness || 0.5}
                metalness={option?.metalness || 0.0}
                emissive={isSelected ? '#444444' : '#000000'} // Highlight selection
            />
        </mesh>
    );
};

export const KitchenUnit = () => {
    const { dimensions } = useStore();
    const { width, height, depth } = dimensions;

    // Convert cm to 3D units (1 unit = 1 meter for simplicity, or just scale down)
    // Let's use 1 unit = 1 meter.
    const w = width / 100;
    const h = height / 100; // Total height? Or just a scale factor? 
    // User asked for Height input. Usually kitchen height is standard ~2.4m total or 90cm base.
    // Let's assume Height input scales the whole verticality or just the top cabinets?
    // "typing in dimensions should PREFERABLY change how the furniture looks like, ie it should be stretched/shrunk"
    // So we scale everything.

    const d = depth / 100;

    // Standard proportions relative to input height
    // Base cabinet: 36% of height (approx 90cm of 250cm)
    // Backsplash gap: 24% of height (approx 60cm)
    // Top cabinet: Remaining or fixed?
    // Let's keep it simple:
    // Base height = 0.9m (fixed standard usually, but we scale if user wants)
    // Let's scale relative to a "standard" 2.4m height.
    const scaleY = h / 2.4;

    const baseHeight = 0.9 * scaleY;
    const gapHeight = 0.6 * scaleY;
    const topHeight = 0.7 * scaleY; // Approx

    // Positions (centered on X, sitting on Y=0)

    return (
        <group position={[0, 0, 0]}>
            {/* Floor Panel */}
            <Part
                partId="floor"
                position={[0, -0.05, d / 2 + 0.5]}
                args={[w + 1, 0.1, d + 2]} // Floor is wider/deeper
            />

            {/* Bottom Cabinet */}
            <Part
                partId="bottomCabinet"
                position={[0, baseHeight / 2, 0]}
                args={[w, baseHeight, d]}
            />

            {/* Worktop (slightly wider/deeper) */}
            <Part
                partId="worktop"
                position={[0, baseHeight + 0.02, 0]}
                args={[w + 0.05, 0.04, d + 0.05]}
            />

            {/* Wall Panel (Backsplash) - pushed back */}
            <Part
                partId="wallPanel"
                position={[0, baseHeight + gapHeight / 2, -d / 2 + 0.02]}
                args={[w, gapHeight, 0.04]}
            />

            {/* Top Cabinet - shallower */}
            <Part
                partId="topCabinet"
                position={[0, baseHeight + gapHeight + topHeight / 2, -d / 2 + (d * 0.5) / 2]}
                args={[w, topHeight, d * 0.5]}
            />
        </group>
    );
};
