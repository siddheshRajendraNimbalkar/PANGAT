"use client"
import React, { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { Button } from '@/components/ui/button'
import { useEffect } from 'react'
import router from 'next/router'
import { useRouter } from 'next/navigation'

const DesignerHomePage = () => {
  const sunRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  useGSAP(() => {
    // Create twinkling stars effect
    const stars = Array.from({ length: 50 }).map(() => {
      const star = document.createElement('div');
      star.className = 'absolute w-1 h-1 bg-white rounded-full hover:brightness-150 transition-all duration-300';
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.animation = `twinkle ${2 + Math.random() * 3}s infinite`;
      return star;
    });

    const starsContainer = document.querySelector('.stars-container');
    stars.forEach(star => starsContainer?.appendChild(star));

    // Create shooting stars periodically
    const createShootingStar = () => {
      const shootingStar = document.createElement('div');
      shootingStar.className = 'shooting-star hover:brightness-150 transition-all duration-300';
      shootingStar.style.left = `${Math.random() * 100}%`;
      shootingStar.style.top = '0';
      starsContainer?.appendChild(shootingStar);

      // Remove shooting star after animation
      setTimeout(() => {
        shootingStar.remove();
      }, 1000);
    };

    // Create star shower every 8 seconds
    setInterval(() => {
      const count = Math.floor(Math.random() * 5) + 3; // 3-7 shooting stars
      for(let i = 0; i < count; i++) {
        setTimeout(createShootingStar, i * 200);
      }
    }, 8000);

    // Create shouting star effect
    const createShoutingStar = () => {
      const shoutingStar = document.createElement('div');
      shoutingStar.className = 'shouting-star hover:brightness-150 transition-all duration-300';
      shoutingStar.style.left = `${Math.random() * 100}%`;
      shoutingStar.style.top = '0';
      starsContainer?.appendChild(shoutingStar);

      // Remove shouting star after animation
      setTimeout(() => {
        shoutingStar.remove();
      }, 2000);
    };

    // Create star break effect
    const createStarBreak = () => {
      const starBreak = document.createElement('div');
      starBreak.className = 'star-break hover:brightness-150 transition-all duration-300';
      starBreak.style.left = `${Math.random() * 100}%`;
      starBreak.style.top = `${Math.random() * 100}%`;
      starsContainer?.appendChild(starBreak);

      // Create fragments
      for (let i = 0; i < 8; i++) {
        const fragment = document.createElement('div');
        fragment.className = 'star-fragment hover:brightness-150 transition-all duration-300';
        fragment.style.transform = `rotate(${i * 45}deg)`;
        starBreak.appendChild(fragment);
      }

      // Remove star break after animation
      setTimeout(() => {
        starBreak.remove();
      }, 2000);
    };

    // Create star breaks every 10-15 seconds
    setInterval(() => {
      createStarBreak();
    }, 10000 + Math.random() * 5000);

    // Create shouting stars every 8-20 seconds
    setInterval(() => {
      createShoutingStar();
    }, 8000 + Math.random() * 12000);

    // Animate sun and earth
    gsap.to('.sun', {
      rotation: 360,
      duration: 20,
      repeat: -1,
      ease: 'none'
    });

    gsap.to('.earth', {
      rotation: 360,
      duration: 30,
      repeat: -1,
      ease: 'none',
      transformOrigin: '50% 50%'
    });

    gsap.to('.moon', {
      rotation: 360,
      duration: 15,
      repeat: -1,
      ease: 'none',
      transformOrigin: '50% 50%'
    });

    gsap.to('.earth-orbit', {
      rotation: 360,
      duration: 60,
      repeat: -1,
      ease: 'none',
      transformOrigin: '50% 50%'
    });

    gsap.to('.moon-orbit', {
      rotation: 360,
      duration: 30,
      repeat: -1,
      ease: 'none',
      transformOrigin: '50% 50%'
    });
  });

  return (
    <div className="z-10 h-[100vh] w-[100vw]">
      {/* Custom Milky Way Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black">
          {/* Galaxy core */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(74, 20, 140, 0.5) 0%, rgba(5, 0, 20, 0.8) 50%, rgba(0, 0, 0, 1) 100%)',
            }}
          />
          
          {/* Dust lanes */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(45deg, transparent 0%, rgba(138, 43, 226, 0.2) 50%, transparent 100%)',
              filter: 'blur(50px)',
            }}
          />
          
          {/* Nebula clouds */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(circle at 30% 50%, rgba(147, 197, 253, 0.15) 0%, transparent 50%), radial-gradient(circle at 70% 50%, rgba(251, 146, 60, 0.15) 0%, transparent 50%)',
              filter: 'blur(30px)',
            }}
          />
          
          {/* Star field base */}
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(1px 1px at 50% 50%, white 100%, transparent), radial-gradient(1px 1px at 40% 40%, white 100%, transparent), radial-gradient(2px 2px at 30% 30%, white 100%, transparent), radial-gradient(2px 2px at 20% 20%, white 100%, transparent)',
              backgroundSize: '550px 550px, 350px 350px, 250px 250px, 150px 150px',
              opacity: 0.3,
            }}
          />
        </div>
        
        {/* Star field overlay */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at center, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 60%)',
            mixBlendMode: 'screen',
          }}
        />
        {/* Animated stars container */}
        <div className="stars-container absolute inset-0" />

        {/* Sun and Earth Animation */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div 
            ref={sunRef}
            className="sun w-32 h-32 bg-yellow-500 rounded-full shadow-[0_0_60px_#fbbf24] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
            onMouseEnter={() => {
              if (sunRef.current) {
                (sunRef.current as HTMLDivElement).style.backgroundColor = '#f97316';
                (sunRef.current as HTMLDivElement).style.boxShadow = '0 0 100px #f97316';
                (sunRef.current as HTMLDivElement).style.filter = 'brightness(1.5)';
              }
            }}
            onMouseLeave={() => {
              if (sunRef.current) {
                sunRef.current.style.backgroundColor = '#eab308';
                sunRef.current.style.boxShadow = '0 0 60px #fbbf24';
                sunRef.current.style.filter = 'brightness(1)';
              }
            }}
          ></div>
          <div className="earth-orbit w-[400px] h-[400px] border border-white/10 rounded-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="earth w-8 h-8 bg-blue-500 rounded-full shadow-[0_0_20px_#3b82f6] absolute left-full top-1/2 -translate-x-1/2 -translate-y-1/2 hover:brightness-150 transition-all duration-300">
              {/* Moon orbit around Earth */}
              <div className="moon-orbit w-16 h-16 border border-white/10 rounded-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="moon w-2 h-2 bg-gray-200 rounded-full shadow-[0_0_10px_#e5e7eb] absolute left-full top-1/2 -translate-x-1/2 -translate-y-1/2 hover:brightness-150 transition-all duration-300"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }

        .shooting-star {
          position: absolute;
          width: 2px;
          height: 2px;
          background: white;
          animation: shooting-star 1s linear;
        }

        .shouting-star {
          position: absolute;
          color: yellow;
          font-size: 24px;
          font-weight: bold;
          text-shadow: 0 0 10px white;
          animation: shouting-star 2s linear;
          white-space: nowrap;
        }

        .star-break {
          position: absolute;
          width: 4px;
          height: 4px;
          background: white;
          border-radius: 50%;
          box-shadow: 0 0 20px #fbbf24, 0 0 40px #f97316;
        }

        .star-fragment {
          position: absolute;
          width: 2px;
          height: 15px;
          background: linear-gradient(to bottom, #fbbf24, #f97316);
          transform-origin: center bottom;
          animation: fragment-spread 2s ease-out;
        }

        @keyframes fragment-spread {
          0% {
            transform: rotate(inherit) translateY(0);
            opacity: 1;
          }
          100% {
            transform: rotate(inherit) translateY(50px);
            opacity: 0;
          }
        }

        @keyframes shooting-star {
          from {
            transform: translateY(0) translateX(0) rotate(45deg);
            opacity: 1;
          }
          to {
            transform: translateY(100vh) translateX(100vw) rotate(45deg);
            opacity: 0;
          }
        }

        @keyframes shouting-star {
          0% {
            transform: translateY(0) translateX(0) scale(0.5);
            opacity: 0;
          }
          20% {
            opacity: 1;
            transform: translateY(20vh) translateX(20vw) scale(1);
          }
          80% {
            opacity: 1;
            transform: translateY(80vh) translateX(80vw) scale(1);
          }
          100% {
            transform: translateY(100vh) translateX(100vw) scale(0.5);
            opacity: 0;
          }
        }
      `}</style>

      <main className="container mx-auto px-4 py-16 relative z-10">
        {/* Hero Section */}
        <section className="flex flex-col items-center text-center space-y-8 mb-20">
          <h1 className="text-6xl font-bold tracking-tighter text-white relative group">
            <span className="text-blue-200 hover:text-orange-300 transition-colors duration-300">Modern.</span>
            <span className="hover:text-blue-200 transition-colors duration-300"> Way To. </span>
            <span className="text-blue-200 hover:text-orange-300 transition-colors duration-300">Socialise.</span>
            <div className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-200 via-white to-orange-300 group-hover:w-full transition-all duration-500"></div>
          </h1>
          <Button className="h-10 w-40 bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={() => {
              router.push('/channels');
            }}
          >
            Get Started
          </Button>
        </section>
      </main>
    </div>
  )
}

const TechStack = () => {
  return (
    <div className="h-[100vh] bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-3 md:grid-cols-9 gap-8 justify-items-center">
          {/* Next.js */}
          <div className="bg-white p-3 rounded-lg w-16 h-16 flex items-center justify-center shadow-md">
            <svg viewBox="0 0 24 24" className="w-10 h-10">
              <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.049-.106.005-4.703.007-4.705.073-.091a.637.637 0 0 1 .174-.143c.096-.047.134-.052.54-.052.479 0 .558.019.683.155a466.83 466.83 0 0 1 2.895 4.361c1.558 2.362 3.687 5.587 4.734 7.171l1.9 2.878.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.573 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.5-.054z"/>
            </svg>
          </div>

          {/* React */}
          <div className="bg-white p-3 rounded-lg w-16 h-16 flex items-center justify-center shadow-md">
            <svg viewBox="0 0 24 24" className="w-10 h-10 text-[#61DAFB]" fill="currentColor">
              <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z"/>
            </svg>
          </div>

          {/* Tailwind */}
          <div className="bg-white p-3 rounded-lg w-16 h-16 flex items-center justify-center shadow-md">
            <svg viewBox="0 0 24 24" className="w-10 h-10 text-[#06B6D4]" fill="currentColor">
              <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"/>
            </svg>
          </div>

          {/* Docker */}
          <div className="bg-white p-3 rounded-lg w-16 h-16 flex items-center justify-center shadow-md">
            <svg viewBox="0 0 24 24" className="w-10 h-10 text-[#2496ED]" fill="currentColor">
              <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288z"/>
            </svg>
          </div>

          {/* VS Code */}
          <div className="bg-white p-3 rounded-lg w-16 h-16 flex items-center justify-center shadow-md">
            <svg viewBox="0 0 24 24" className="w-10 h-10 text-[#007ACC]" fill="currentColor">
              <path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z"/>
            </svg>
          </div>

          {/* Postman */}
          <div className="bg-white p-3 rounded-lg w-16 h-16 flex items-center justify-center shadow-md">
            <svg viewBox="0 0 24 24" className="w-10 h-10 text-[#FF6C37]" fill="currentColor">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-.939 14.265h1.878v1.879H11.06v-1.879zm6.589-4.98L15.768 11.3a2.515 2.515 0 0 1-2.358.897 2.52 2.52 0 0 1-2.167-3.175 2.517 2.517 0 0 1 3.174-2.166 2.52 2.52 0 0 1 1.271 3.91l1.882-2.016 1.069 1.034zm-5.649.146a1.26 1.26 0 1 0 0-2.52 1.26 1.26 0 0 0 0 2.52z"/>
            </svg>
          </div>

          {/* Clerk */}
          <div className="bg-white p-3 rounded-lg w-16 h-16 flex items-center justify-center shadow-md">
            <svg viewBox="0 0 24 24" className="w-10 h-10" fill="#6C47FF">
              <path d="M22.91 6.953a.848.848 0 0 0-1.204-.062l-9.642 8.8-4.655-5.617a.85.85 0 0 0-1.198-.085.85.85 0 0 0-.085 1.198l5.23 6.31a.848.848 0 0 0 .64.29.848.848 0 0 0 .577-.223l10.275-9.382a.85.85 0 0 0 .062-1.23zM12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22.285C6.314 22.285 1.715 17.686 1.715 12S6.314 1.715 12 1.715 22.285 6.314 22.285 12 17.686 22.285 12 22.285z"/>
            </svg>
          </div>

          {/* Go */}
          <div className="bg-white p-3 rounded-lg w-16 h-16 flex items-center justify-center shadow-md">
            <svg viewBox="0 0 24 24" className="w-10 h-10 text-[#00ADD8]" fill="currentColor">
              <path d="M1.811 10.231c-.047 0-.058-.023-.035-.059l.246-.315c.023-.035.081-.058.128-.058h4.172c.046 0 .058.035.035.07l-.199.303c-.023.036-.082.07-.117.07zM.047 11.306c-.047 0-.059-.023-.035-.058l.245-.316c.023-.035.082-.058.129-.058h5.328c.047 0 .07.035.058.07l-.093.28c-.012.047-.058.07-.105.07zm2.828 1.075c-.047 0-.059-.035-.035-.07l.163-.292c.023-.035.07-.07.117-.07h2.337c.047 0 .07.035.07.082l-.023.28c0 .047-.047.082-.082.082zm12.129-2.36c-.736.187-1.239.327-1.963.514-.176.046-.187.058-.34-.117-.174-.199-.303-.327-.548-.444-.737-.362-1.45-.257-2.115.175-.795.514-1.204 1.274-1.192 2.22.011.935.654 1.706 1.577 1.835.795.105 1.46-.175 1.987-.77.105-.13.198-.27.315-.434H10.47c-.245 0-.304-.152-.222-.35.152-.362.432-.97.596-1.274a.315.315 0 0 1 .292-.187h4.253c-.023.316-.023.631-.07.947a4.983 4.983 0 0 1-.958 2.29c-.841 1.11-1.94 1.8-3.33 1.986-1.145.152-2.209-.07-3.143-.77-.865-.655-1.356-1.52-1.484-2.595-.152-1.274.222-2.419.993-3.424.83-1.086 1.928-1.776 3.272-2.02 1.098-.2 2.15-.07 3.096.571.62.41 1.063.97 1.356 1.648.07.105.023.164-.117.2m3.868 6.461c-1.064-.024-2.034-.328-2.852-1.029a3.665 3.665 0 0 1-1.262-2.255c-.21-1.32.152-2.489.947-3.529.853-1.122 1.881-1.706 3.272-1.95 1.192-.21 2.314-.095 3.33.595.923.63 1.496 1.484 1.648 2.605.198 1.578-.257 2.863-1.344 3.962-.771.783-1.718 1.273-2.805 1.495-.315.06-.63.07-.934.106zm2.78-4.72c-.011-.153-.011-.27-.034-.387-.21-1.157-1.274-1.81-2.384-1.554-1.087.245-1.788.935-2.045 2.033-.21.912.234 1.835 1.075 2.21.643.28 1.285.244 1.905-.07.923-.48 1.425-1.228 1.484-2.233z"/>
            </svg>
          </div>

          {/* Socket.io */}
          <div className="bg-white p-3 rounded-lg w-16 h-16 flex items-center justify-center shadow-md">
            <svg viewBox="0 0 24 24" className="w-10 h-10" fill="#010101">
              <path d="M11.936.016C5.357.016.012 5.361.012 11.94c0 6.579 5.345 11.924 11.924 11.924 6.579 0 11.924-5.345 11.924-11.924C23.86 5.361 18.515.016 11.936.016zm0 1.524c5.741 0 10.4 4.659 10.4 10.4 0 5.741-4.659 10.4-10.4 10.4-5.741 0-10.4-4.659-10.4-10.4 0-5.741 4.659-10.4 10.4-10.4zm5.264 5.63c-.161-.151-.338-.289-.526-.411-.188-.122-.387-.231-.595-.324-.208-.093-.425-.17-.647-.231-.223-.061-.451-.106-.682-.134-.231-.028-.466-.042-.701-.042-.235 0-.47.014-.701.042-.231.028-.459.073-.682.134-.222.061-.439.138-.647.231-.208.093-.407.202-.595.324-.188.122-.365.26-.526.411-.161.151-.307.316-.435.492-.128.176-.239.363-.331.559-.092.196-.166.401-.22.613-.054.212-.09.431-.106.653-.016.222-.008.447.024.668.032.221.088.438.167.647.079.209.181.41.304.598.123.188.267.363.429.522.162.159.342.301.536.424.194.123.401.227.617.31.216.083.44.146.668.188.228.042.461.063.694.063.233 0 .466-.021.694-.063.228-.042.452-.105.668-.188.216-.083.423-.187.617-.31.194-.123.374-.265.536-.424.162-.159.306-.334.429-.522.123-.188.225-.389.304-.598.079-.209.135-.426.167-.647.032-.221.04-.446.024-.668-.016-.222-.052-.441-.106-.653-.054-.212-.128-.417-.22-.613-.092-.196-.203-.383-.331-.559-.128-.176-.274-.341-.435-.492zm-5.264 2.831c-.235 0-.47.014-.701.042-.231.028-.459.073-.682.134-.222.061-.439.138-.647.231-.208.093-.407.202-.595.324-.188.122-.365.26-.526.411-.161.151-.307.316-.435.492-.128.176-.239.363-.331.559-.092.196-.166.401-.22.613-.054.212-.09.431-.106.653-.016.222-.008.447.024.668.032.221.088.438.167.647.079.209.181.41.304.598.123.188.267.363.429.522.162.159.342.301.536.424.194.123.401.227.617.31.216.083.44.146.668.188.228.042.461.063.694.063.233 0 .466-.021.694-.063.228-.042.452-.105.668-.188.216-.083.423-.187.617-.31.194-.123.374-.265.536-.424.162-.159.306-.334.429-.522.123-.188.225-.389.304-.598.079-.209.135-.426.167-.647.032-.221.04-.446.024-.668-.016-.222-.052-.441-.106-.653-.054-.212-.128-.417-.22-.613-.092-.196-.203-.383-.331-.559-.128-.176-.274-.341-.435-.492-.161-.151-.338-.289-.526-.411-.188-.122-.387-.231-.595-.324-.208-.093-.425-.17-.647-.231-.223-.061-.451-.106-.682-.134-.231-.028-.466-.042-.701-.042z"/>
            </svg>
          </div>

          <div className="bg-white p-3 rounded-lg w-16 h-16 flex items-center justify-center shadow-md">
  <svg 
    viewBox="0 0 24 24" 
    className="w-10 h-10" 
    fill="#336791" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.128 0a10.134 10.134 0 0 0-2.755.403l-.063.02A10.922 10.922 0 0 0 12.6.258C11.422.238 10.41.524 9.594 1 8.79.721 7.122.24 5.364.336 4.14.403 2.804.775 1.814 1.82.827 2.865.305 4.482.415 6.682c.03.607.203 1.597.49 2.879s.69 2.783 1.193 4.152c.503 1.37 1.054 2.6 1.915 3.436.43.419 1.022.771 1.72.742.49-.02.933-.235 1.315-.552.186.245.385.352.566.451.228.125.45.21.68.266.413.103 1.12.241 1.948.1.282-.047.579-.139.875-.27.011.33.024.653.037.98.041 1.036.067 1.993.378 2.832.05.137.187.843.727 1.466.54.624 1.598 1.013 2.803.755.85-.182 1.931-.51 2.649-1.532.71-1.01 1.03-2.459 1.093-4.809.016-.127.035-.235.055-.336l.169.015h.02c.907.041 1.891-.088 2.713-.47.728-.337 1.279-.678 1.68-1.283.1-.15.21-.331.24-.643s-.149-.8-.446-1.025c-.595-.452-.969-.28-1.37-.197a6.27 6.27 0 0 1-1.202.146c1.156-1.947 1.985-4.015 2.458-5.845.28-1.08.437-2.076.45-2.947.013-.871-.058-1.642-.58-2.309C21.36.6 19.067.024 17.293.004c-.055-.001-.11-.002-.165-.001zm-.047.64c1.678-.016 3.822.455 5.361 2.422.346.442.449 1.088.437 1.884-.013.795-.16 1.747-.429 2.79-.522 2.02-1.508 4.375-2.897 6.488a.756.756 0 0 0 .158.086c.29.12.951.223 2.27-.048.332-.07.575-.117.827.075a.52.52 0 0 1 .183.425.704.704 0 0 1-.13.336c-.255.383-.758.746-1.403 1.045-.571.266-1.39.405-2.116.413-.364.004-.7-.024-.985-.113l-.018-.007c-.11 1.06-.363 3.153-.528 4.108-.132.77-.363 1.382-.804 1.84-.44.458-1.063.734-1.901.914-1.038.223-1.795-.017-2.283-.428-.487-.41-.71-.954-.844-1.287-.092-.23-.14-.528-.186-.926-.046-.398-.08-.885-.103-1.434a51.426 51.426 0 0 1-.03-2.523 3.061 3.061 0 0 1-1.552.76c-.689.117-1.304.002-1.671-.09a2.276 2.276 0 0 1-.52-.201c-.17-.091-.332-.194-.44-.397a.56.56 0 0 1-.057-.381.61.61 0 0 1 .218-.331c.198-.161.46-.251.855-.333.719-.148.97-.249 1.123-.37.13-.104.277-.314.537-.622a1.16 1.16 0 0 1-.003-.041 2.96 2.96 0 0 1-1.33-.358c-.15.158-.916.968-1.85 2.092-.393.47-.827.74-1.285.759-.458.02-.872-.211-1.224-.552-.703-.683-1.264-1.858-1.753-3.186-.488-1.328-.885-2.807-1.167-4.067-.283-1.26-.45-2.276-.474-2.766-.105-2.082.382-3.485 1.217-4.37.836-.885 1.982-1.22 3.099-1.284 2.005-.115 3.909.584 4.294.734.742-.504 1.698-.818 2.892-.798a7.39 7.39 0 0 1 1.681.218l.02-.009a6.854 6.854 0 0 1 .739-.214A9.626 9.626 0 0 1 17.08.642z" />
  </svg>
</div>

        </div>
      </div>
    </div>
  )
}


const MaymyPage = () => {
  const treeRef = useRef<HTMLDivElement>(null)
  const cloudsRef = useRef<HTMLDivElement>(null)
  const birdRef = useRef<HTMLDivElement>(null)
  const rocketRef = useRef<HTMLDivElement>(null)
  const starsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Animate tree growing
    if (treeRef.current) {
      gsap.from(treeRef.current, {
        scaleY: 0,
        duration: 2,
        ease: "power2.out",
        transformOrigin: "bottom"
      })
    }

    // Animate clouds moving
    if (cloudsRef.current) {
      gsap.to(cloudsRef.current, {
        x: "100vw",
        duration: 20,
        repeat: -1,
        ease: "none"
      })
    }

    // Animate bird flying
    if (birdRef.current) {
      gsap.to(birdRef.current, {
        y: "-20px",
        duration: 1,
        yoyo: true,
        repeat: -1,
        ease: "power1.inOut"
      })
    }

    // Animate rocket
    if (rocketRef.current) {
      gsap.to(rocketRef.current, {
        y: "-100vh",
        rotation: 10,
        duration: 4,
        repeat: -1,
        ease: "power1.inOut"
      })
    }

    // Animate stars twinkling
    if (starsRef.current) {
      gsap.to(starsRef.current.children, {
        opacity: 0.2,
        duration: 1,
        stagger: 0.1,
        repeat: -1,
        yoyo: true
      })
    }
  }, [])

  return (
    <div className="">
     
      {/* Second Page - Space Animation */}
      <div className="h-screen w-full bg-gradient-to-b from-purple-900 to-black relative overflow-hidden">
        {/* Stars */}
        <div ref={starsRef} className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div 
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
            />
          ))}
        </div>

        <div ref={starsRef} className="absolute inset-0">
          {[...Array(150)].map((_, i) => (
            <div 
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
            />
          ))}
        </div>

        {/* Images */}
        
        {[
          "discord-icon-256x256-w6icqf4y.webp",
          "https://www.citusdata.com/assets/images/icons/postgres-elephant-71e67784.svg",
          "https://styles.redditmedia.com/t5_3h7yi/styles/communityIcon_nsrozhr9igl91.png",
          "https://cdn-icons-png.freepik.com/256/919/919853.png?semt=ais_hybrid",
          "https://go.dev/images/go-logo-blue.svg",
          "https://avatars.githubusercontent.com/u/139895814?v=4",
          "https://github.com/gorilla/.github/assets/53367916/d92caabf-98e0-473e-bfbf-ab554ba435e5",
          "https://static-00.iconduck.com/assets.00/postman-icon-497x512-beb7sy75.png",
          "https://static-00.iconduck.com/assets.00/preferences-system-linux-icon-207x256-97bmc90d.png",
          "https://static-00.iconduck.com/assets.00/tailwind-css-icon-1024x615-fdeis5r1.png",
          "https://static-production.npmjs.com/255a118f56f5346b97e56325a1217a16.svg",
          "https://static-00.iconduck.com/assets.00/react-icon-256x228-97ltgbl1.png",
          "https://preview.redd.it/3dto8z3ma7671.png?width=640&crop=smart&auto=webp&s=fc3c989dd0f86fa2bd93b7f4cf9a857607ed08f2",
          "https://upload.wikimedia.org/wikipedia/commons/9/9a/Visual_Studio_Code_1.35_icon.svg",
          "https://static-00.iconduck.com/assets.00/github-icon-512x497-oppthre2.png",].map((image, i) => (
          <img
            key={i}
            src={`${image}`}
            className="absolute w-20 h-20"
            style={{
              left: `${Math.random() * 90}%`,
              top: `${Math.random() * 90}%`
            }}
          />
        ))}


        {/* Moon */}
        <div className="absolute top-10 left-10 w-24 h-24 bg-gray-200 rounded-full shadow-inner" />

        {/* Rocket */}
        <div ref={rocketRef} className="absolute bottom-0 left-1/2 -translate-x-1/2">
          <div className="w-20 h-40 bg-red-500 rounded-t-full relative">
            <div className="absolute bottom-0 left-0 w-0 h-0 border-l-[40px] border-l-transparent border-b-[30px] border-b-orange-500" />
            <div className="absolute -left-8 bottom-10 w-8 h-16 bg-gray-400 rounded-l-lg" />
            <div className="absolute -right-8 bottom-10 w-8 h-16 bg-gray-400 rounded-r-lg" />
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-blue-400 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  )
}



const page = () => {
  return (
    <>
      <div className='overflow-x-hidden'>
        <DesignerHomePage />
        <MaymyPage />
      </div>
    </>
  )
}

export default page
