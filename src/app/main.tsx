"use client";
import * as THREE from "three";
import { useRef } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

function MeshComponent() {
    const fileUrl = "/Rowan.glb";
    const mesh = useRef<THREE.Mesh>(null!);
    const gltf = useLoader(GLTFLoader, fileUrl);
    const group = useRef<THREE.Group>(null!);

    useFrame((state, delta) => {
        group.current.rotation.x += delta;
        group.current.rotation.y += delta;
    });



    return (
        <group ref={group}>
            <mesh ref={mesh} position={[0, 0.5, 0]}>
                <primitive object={gltf.scene} />
            </mesh>
            <Square />
        </group>
    );
}

function SkyBox() {
    const { scene } = useThree();
    const loader = new THREE.CubeTextureLoader();

    const texture = loader.load([
        "/capSquare.png",
        "/capSquare.png",
        "/capSquare.png",
        "/capSquare.png",
        "/capSquare.png",
        "/capSquare.png"
    ]);

    scene.background = texture;
    return null;
}

function Square() {
    const meshRef = useRef<THREE.Mesh>(null!);

    const loader = new THREE.TextureLoader();

    const texture = loader.load("/smallSquare.png");

    return (
        <mesh ref={meshRef}>
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial map={texture} />
        </mesh>
    );
}

export function Rowan() {
    return (
        <div>
            <Canvas style={{ width: "100vw", height: "100vh" }}>
                <ambientLight intensity={Math.PI / 2} />
                <MeshComponent />
                <OrbitControls position0={[0, 0, 0]} />
                <SkyBox />
            </Canvas>
        </div>
    );
}