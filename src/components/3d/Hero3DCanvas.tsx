import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Center, PerspectiveCamera, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { CanvasFallback } from './CanvasFallback';

// Component representing an articulated stylized 3D hand
function StylizedHand({ isLeft = false }: { isLeft?: boolean }) {
  const group = useRef<THREE.Group>(null);
  const color = isLeft ? '#7956E8' : '#FF8B70';
  const accentColor = isLeft ? '#9B7BF7' : '#FFA894';

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    // Gentle floating and subtle hand flexion
    group.current.rotation.y = (isLeft ? 0.3 : -0.3) + Math.sin(t * 1.5 + (isLeft ? 0 : Math.PI)) * 0.08;
    group.current.rotation.z = (isLeft ? 0.15 : -0.15) + Math.cos(t * 1.2) * 0.05;
  });

  return (
    <group
      ref={group}
      position={[isLeft ? -1.4 : 1.4, -0.2, 0]}
      rotation={[0.2, isLeft ? 0.4 : -0.4, isLeft ? 0.2 : -0.2]}
      scale={0.85}
    >
      {/* Palm Base */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.9, 1.1, 0.32]} />
        <meshPhysicalMaterial
          color={color}
          roughness={0.2}
          metalness={0.1}
          clearcoat={0.6}
          clearcoatRoughness={0.2}
        />
      </mesh>

      {/* Palm Inner Core / Jewel */}
      <mesh position={[0, 0, 0.18]}>
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshStandardMaterial
          color={isLeft ? '#55C9B5' : '#FFC857'}
          emissive={isLeft ? '#55C9B5' : '#FFC857'}
          emissiveIntensity={0.8}
          roughness={0.1}
        />
      </mesh>

      {/* Wrist band */}
      <mesh position={[0, -0.75, 0]}>
        <cylinderGeometry args={[0.42, 0.45, 0.35, 24]} />
        <meshStandardMaterial
          color="#24212D"
          roughness={0.3}
          metalness={0.8}
        />
      </mesh>

      {/* Thumb */}
      <group position={[isLeft ? 0.55 : -0.55, -0.1, 0.05]} rotation={[0, 0, isLeft ? -0.7 : 0.7]}>
        <mesh position={[0, 0.3, 0]}>
          <capsuleGeometry args={[0.13, 0.4, 8, 16]} />
          <meshStandardMaterial color={accentColor} roughness={0.3} />
        </mesh>
      </group>

      {/* Index Finger */}
      <group position={[isLeft ? 0.32 : -0.32, 0.65, 0]} rotation={[0, 0, isLeft ? -0.1 : 0.1]}>
        <mesh position={[0, 0.4, 0]}>
          <capsuleGeometry args={[0.11, 0.55, 8, 16]} />
          <meshStandardMaterial color={accentColor} roughness={0.3} />
        </mesh>
      </group>

      {/* Middle Finger (longest) */}
      <group position={[isLeft ? 0.1 : -0.1, 0.7, 0]}>
        <mesh position={[0, 0.46, 0]}>
          <capsuleGeometry args={[0.115, 0.65, 8, 16]} />
          <meshStandardMaterial color={accentColor} roughness={0.3} />
        </mesh>
      </group>

      {/* Ring Finger */}
      <group position={[isLeft ? -0.12 : 0.12, 0.66, 0]} rotation={[0, 0, isLeft ? 0.08 : -0.08]}>
        <mesh position={[0, 0.42, 0]}>
          <capsuleGeometry args={[0.11, 0.58, 8, 16]} />
          <meshStandardMaterial color={accentColor} roughness={0.3} />
        </mesh>
      </group>

      {/* Little Finger */}
      <group position={[isLeft ? -0.34 : 0.34, 0.55, 0]} rotation={[0, 0, isLeft ? 0.2 : -0.2]}>
        <mesh position={[0, 0.32, 0]}>
          <capsuleGeometry args={[0.095, 0.45, 8, 16]} />
          <meshStandardMaterial color={accentColor} roughness={0.3} />
        </mesh>
      </group>
    </group>
  );
}

// Glowing Orbital Rings
function OrbitalRings() {
  const ringRef1 = useRef<THREE.Mesh>(null);
  const ringRef2 = useRef<THREE.Mesh>(null);
  const ringRef3 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ringRef1.current) {
      ringRef1.current.rotation.x = t * 0.4;
      ringRef1.current.rotation.y = t * 0.25;
    }
    if (ringRef2.current) {
      ringRef2.current.rotation.y = -t * 0.3;
      ringRef2.current.rotation.z = t * 0.2;
    }
    if (ringRef3.current) {
      ringRef3.current.rotation.x = -t * 0.2;
      ringRef3.current.rotation.z = -t * 0.35;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Outer Violet Ring */}
      <mesh ref={ringRef1}>
        <torusGeometry args={[2.5, 0.035, 16, 100]} />
        <meshStandardMaterial
          color="#7956E8"
          emissive="#7956E8"
          emissiveIntensity={0.6}
          roughness={0.2}
        />
      </mesh>

      {/* Middle Coral Ring */}
      <mesh ref={ringRef2}>
        <torusGeometry args={[2.1, 0.03, 16, 100]} />
        <meshStandardMaterial
          color="#FF8B70"
          emissive="#FF8B70"
          emissiveIntensity={0.6}
          roughness={0.2}
        />
      </mesh>

      {/* Inner Mint Ring */}
      <mesh ref={ringRef3}>
        <torusGeometry args={[1.7, 0.025, 16, 80]} />
        <meshStandardMaterial
          color="#55C9B5"
          emissive="#55C9B5"
          emissiveIntensity={0.7}
          roughness={0.2}
        />
      </mesh>
    </group>
  );
}

// Floating Communication Packets / Bubbles
function FloatingBubbles() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.position.y = Math.sin(t * 1.8) * 0.12;
  });

  return (
    <group ref={groupRef}>
      {/* Central communication sphere */}
      <mesh position={[0, 0.3, 0.2]}>
        <sphereGeometry args={[0.38, 32, 32]} />
        <meshPhysicalMaterial
          color="#FAF9F6"
          roughness={0.1}
          metalness={0.2}
          transmission={0.6}
          ior={1.4}
          clearcoat={1}
        />
      </mesh>

      {/* Speech token left */}
      <mesh position={[-0.6, 0.8, -0.3]}>
        <sphereGeometry args={[0.22, 24, 24]} />
        <meshStandardMaterial
          color="#FFC857"
          emissive="#FFC857"
          emissiveIntensity={0.5}
          roughness={0.2}
        />
      </mesh>

      {/* Sign token right */}
      <mesh position={[0.6, 0.9, -0.2]}>
        <sphereGeometry args={[0.24, 24, 24]} />
        <meshStandardMaterial
          color="#55C9B5"
          emissive="#55C9B5"
          emissiveIntensity={0.5}
          roughness={0.2}
        />
      </mesh>
    </group>
  );
}

// Particle Bridge connecting hands
function ParticleBridge() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const count = isMobile ? 50 : 180;
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const t = (i / count) * 2 - 1; // -1 to 1
      p[i * 3] = t * 1.8;
      p[i * 3 + 1] = Math.sin(t * Math.PI) * 0.4 + (Math.random() - 0.5) * 0.3;
      p[i * 3 + 2] = (Math.random() - 0.5) * 0.6;
    }
    return p;
  }, [count]);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.getElapsedTime();
    pointsRef.current.rotation.z = Math.sin(t * 0.5) * 0.1;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[points, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#7956E8"
        transparent
        opacity={0.75}
        sizeAttenuation
      />
    </points>
  );
}

// Main 3D Scene Wrapper
function Scene() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5.2]} fov={45} />
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} color="#FFF8F0" castShadow />
      <pointLight position={[-4, 3, 2]} intensity={1.5} color="#7956E8" />
      <pointLight position={[4, -2, 2]} intensity={1.5} color="#FF8B70" />
      <pointLight position={[0, 4, -2]} intensity={1.0} color="#55C9B5" />

      <Float speed={2} rotationIntensity={0.4} floatIntensity={0.6}>
        <Center>
          <group>
            <StylizedHand isLeft={true} />
            <StylizedHand isLeft={false} />
            <OrbitalRings />
            <FloatingBubbles />
            <ParticleBridge />
          </group>
        </Center>
      </Float>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        maxPolarAngle={Math.PI / 1.7}
        minPolarAngle={Math.PI / 2.5}
        maxAzimuthAngle={Math.PI / 4}
        minAzimuthAngle={-Math.PI / 4}
        rotateSpeed={0.5}
      />
    </>
  );
}

// WebGL Capability Check
function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

export const Hero3DCanvas: React.FC = () => {
  const [hasError, setHasError] = useState(false);
  const webGLSupported = useMemo(() => isWebGLAvailable(), []);

  if (!webGLSupported || hasError) {
    return <CanvasFallback />;
  }

  return (
    <div
      className="relative w-full h-[450px] sm:h-[520px] lg:h-[560px] rounded-3xl overflow-hidden glass-panel shadow-card-hover border border-white/60 select-none group"
      aria-label="Interactive 3D SignBridge Communication Visual"
    >
      {/* 3D Canvas */}
      <Canvas
        shadows
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
        onError={() => setHasError(true)}
      >
        <Scene />
      </Canvas>

      {/* Floating Interactive Badge */}
      <div className="absolute bottom-4 left-4 right-4 sm:right-auto px-3.5 py-2 rounded-2xl bg-white/80 backdrop-blur-md border border-brand-violet/20 shadow-sm flex items-center justify-between sm:justify-start gap-2.5 text-xs font-medium text-brand-charcoal pointer-events-none">
        <span className="flex h-2.5 w-2.5 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-mint opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-mint-dark"></span>
        </span>
        <span>Interactive 3D Canvas • Drag to Tilt</span>
      </div>

      {/* Gradient Ambient Orbs in Background */}
      <div className="absolute -top-16 -left-16 w-48 h-48 rounded-full bg-brand-violet/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full bg-brand-coral/25 blur-3xl pointer-events-none" />
    </div>
  );
};
