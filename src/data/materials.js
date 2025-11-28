export const materials = [
    {
        id: 'tier1',
        name: 'Basic (Solid)',
        price: 50, // per unit area
        options: [
            { id: 'white', name: 'Matte White', color: '#f0f0f0', type: 'color' },
            { id: 'grey', name: 'Matte Grey', color: '#808080', type: 'color' },
            { id: 'blue', name: 'Navy Blue', color: '#1a237e', type: 'color' },
            { id: 'sage', name: 'Sage Green', color: '#8da399', type: 'color' },
        ]
    },
    {
        id: 'tier2',
        name: 'Standard (Wood/Texture)',
        price: 120,
        options: [
            { id: 'oak', name: 'Natural Oak', color: '#d4c2a8', type: 'color' }, // Using color as placeholder for texture
            { id: 'walnut', name: 'Dark Walnut', color: '#5d4037', type: 'color' },
            { id: 'ash', name: 'Ash Wood', color: '#C2B280', type: 'color' },
        ]
    },
    {
        id: 'tier3',
        name: 'Premium (High-End)',
        price: 200,
        options: [
            { id: 'marble', name: 'White Marble', color: '#e0e0e0', type: 'color' },
            { id: 'black_gloss', name: 'Black Gloss', color: '#111111', type: 'color', roughness: 0.1, metalness: 0.8 },
            { id: 'gold', name: 'Brushed Gold', color: '#CFB53B', type: 'color', roughness: 0.3, metalness: 1.0 },
        ]
    }
];
