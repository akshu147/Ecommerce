// ChairViewer.jsx
'use client'
import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const Threeviewer = () => {
  const mountRef = useRef(null)

  useEffect(() => {
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xf0f0f0)

    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    )
    camera.position.z = 5

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(
      mountRef.current.clientWidth,
      mountRef.current.clientHeight
    )
    mountRef.current.appendChild(renderer.domElement)

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(5, 10, 7.5)
    scene.add(directionalLight)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.enableZoom = true

    const loader = new GLTFLoader()
    let chair
    loader.load(
      '/models/chair.glb', // Replace with your model path
      function (gltf) {
        chair = gltf.scene
        chair.scale.set(1.5, 1.5, 1.5)
        scene.add(chair)
      },
      undefined,
      function (error) {
        console.error('Error loading model:', error)
      }
    )

    const animate = () => {
      requestAnimationFrame(animate)

      if (chair) {
        chair.rotation.y += 0.01
      }

      controls.update()
      renderer.render(scene, camera)
    }

    animate()

    const handleResize = () => {
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(
        mountRef.current.clientWidth,
        mountRef.current.clientHeight
      )
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      mountRef.current.removeChild(renderer.domElement)
    }
  }, [])

  return <div className='bg-lightblue' ref={mountRef} style={{ width: '100%', height: '100vh' }} />
}

export default Threeviewer
