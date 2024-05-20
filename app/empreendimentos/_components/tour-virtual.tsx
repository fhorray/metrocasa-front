import { Imovel } from '@/types/global';

import * as THREE from 'three';
import { Suspense, useState } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { Html, Preload, OrbitControls } from '@react-three/drei';
import { Popconfirm } from 'antd';

const store = [
  {
    name: 'outside',
    color: 'lightpink',
    position: [10, 0, -15],
    url: '/static/pan1.jpg',
    link: 1,
  },
  {
    name: 'inside',
    color: 'lightblue',
    position: [15, 0, 0],
    url: '/static/pan2.jpg',
    link: 0,
  },
];

function Dome({
  name,
  position,
  texture,
  onClick,
}: {
  name: string;
  color: string;
  position: THREE.Vector3 | [number, number, number];
  texture: THREE.Texture;
  onClick: () => void;
}) {
  return (
    <group>
      <mesh>
        <sphereGeometry args={[500, 60, 40]} />
        <meshBasicMaterial map={texture} side={THREE.BackSide} />
      </mesh>
      <mesh position={position}>
        <sphereGeometry args={[1.25, 32, 32]} />
        <meshBasicMaterial color="white" />
        <Html center>
          <Popconfirm
            title="Are you sure you want to leave?"
            onConfirm={onClick}
            okText="Yes"
            cancelText="No"
          >
            <a onClick={(e) => e.preventDefault()} href="#">
              {name}
            </a>
          </Popconfirm>
        </Html>
      </mesh>
    </group>
  );
}

function Portals() {
  const [which, set] = useState(0);
  const { link, ...props } = store[which];
  const maps = useLoader(THREE.TextureLoader, store.map((entry) => entry.url)) // prettier-ignore
  const position = new THREE.Vector3(...props.position); // convert position tuple to Vector3
  return (
    <Dome
      onClick={() => {
        set(link);
      }}
      {...props}
      position={position}
      texture={maps[which]}
    />
  );
}

export const TourVirtual = ({ imovel }: { imovel: Imovel }) => {
  return (
    <section className="w-full">
      <div className="flex flex-col items-center gap-10">
        <Canvas
          style={{ height: '100vh' }}
          frameloop="demand"
          camera={{ position: [0, 0, 0.1] }}
        >
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableDamping
            dampingFactor={0.2}
            autoRotate={false}
            rotateSpeed={-0.5}
          />
          <Suspense fallback={null}>
            <Preload all />
            <Portals />
          </Suspense>
        </Canvas>
      </div>
    </section>
  );
};
