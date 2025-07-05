// components/ParticlesBackground.jsx
import React from 'react';
import Particles from 'react-particles';
import { loadSlim } from "tsparticles-slim";

const ParticlesBackground = () => {
  const particlesInit = async (main) => {
    await loadSlim(main);
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: {
          enable: false,
        },
        background: {
          color: {
            value: 'transparent',
          },
        },
        particles: {
          number: {
            value: 120,
            density: {
              enable: true,
              value_area: 800,
            },
          },
          color: {
            value: '#ffffff', // Soft white
          },
          shape: {
            type: 'circle',
          },
          opacity: {
            value: 0.5, // Subtle
          },
          size: {
            value: 2.5, // Smaller
          },
          move: {
            enable: true,
            speed: 1.2,
            direction: 'none',
            out_mode: 'out',
          },
          links: {
            enable: true,
            color: "#ffffff",
            opacity: 0.2,
            width: 1,
            distance: 150,
          },
        },
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: 'repulse',
            },
          },
          modes: {
            repulse: {
              distance: 100,
              duration: 0.4,
            },
          },
        },
        detectRetina: true,
      }}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        // border removed
      }}
    />
  );
};

export default ParticlesBackground;
