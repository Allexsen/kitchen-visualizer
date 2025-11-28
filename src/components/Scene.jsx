import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import { KitchenUnit } from './KitchenUnit';

export const Scene = () => {
    return (
        <div className="w-full h-full absolute inset-0 bg-[#202020]">
            <Canvas shadows camera={{ position: [3, 2, 4], fov: 50 }}>
                <ambientLight intensity={0.5} />
                <spotLight
                    position={[10, 10, 10]}
                    angle={0.15}
                    penumbra={1}
                    intensity={1}
                    castShadow
                />
                <Environment preset="city" />

                <gridHelper args={[20, 20, 0x444444, 0x333333]} position={[0, -1.01, 0]} />

                <group position={[0, -1, 0]}>
                    <KitchenUnit />
                    <ContactShadows position={[0, 0, 0]} opacity={0.4} scale={10} blur={2} far={4} color="#000000" />
                </group>

                <OrbitControls minPolarAngle={0} maxPolarAngle={Math.PI / 2} />
            </Canvas>
        </div>
    );
};
