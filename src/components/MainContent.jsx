import React, { useEffect, useRef } from 'react';
import Matter from 'matter-js';
import { allSkills, config } from '../data';

const MainContent = () => {
  const containerRef = useRef(null);
  const engineRef = useRef(null);
  const runnerRef = useRef(null);
  const renderRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Wait a bit for layout to settle
    const initTimer = setTimeout(() => {
      // Cleanup previous engine if any
      if (engineRef.current) {
        Matter.Engine.clear(engineRef.current);
        if (runnerRef.current) Matter.Runner.stop(runnerRef.current);
      }

      // Module aliases
      const Engine = Matter.Engine,
            Runner = Matter.Runner,
            Bodies = Matter.Bodies,
            Composite = Matter.Composite,
            MouseConstraint = Matter.MouseConstraint,
            Mouse = Matter.Mouse,
            Events = Matter.Events,
            Body = Matter.Body;

      // Create engine
      const engine = Engine.create();
      engineRef.current = engine;
      engine.gravity.y = 1; // Standard gravity

      const width = container.clientWidth;
      const height = container.clientHeight;

      // Create static bodies (walls and ground)
      // Make them super large to prevent falling out during resize
      const wallThickness = 120;
      const giantSize = 50000; // Large enough to cover any reasonable screen size

      // Ground - placed slightly higher to leave space for footer
      // Note: Position is center of body. 
      // We want the top edge to be at (height - footerSpace)
      // Body height is wallThickness. Center y = (height - footerSpace) + wallThickness/2
      const footerSpace = 100; // Increased to ensure no overlap with footer text
      // Legacy code used y = height. 
      // If we use giant width, we must ensure it's centered horizontally relative to view
      
      const ground = Bodies.rectangle(width / 2, height - footerSpace + wallThickness/2, giantSize, wallThickness, { 
        isStatic: true,
        render: { visible: false },
        label: 'ground'
      });

      // Walls
      const leftWall = Bodies.rectangle(0 - wallThickness/2, height / 2, wallThickness, giantSize, { 
        isStatic: true,
        render: { visible: false },
        label: 'leftWall'
      });
      const rightWall = Bodies.rectangle(width + wallThickness/2, height / 2, wallThickness, giantSize, { 
        isStatic: true,
        render: { visible: false },
        label: 'rightWall'
      });

      Composite.add(engine.world, [ground, leftWall, rightWall]);

      // Identify DOM elements to animate
      const innerDiv = container.firstElementChild;
      if (!innerDiv) return;

      const domItems = Array.from(innerDiv.children).filter(child => 
        child.classList.contains('anim-item') || 
        child.classList.contains('avatar-wrapper') ||
        child.tagName === 'H1' || 
        child.classList.contains('tagline-container') ||
        child.tagName === 'P' ||
        child.id === 'buttonContainer'
      );

      const bodies = [];
      const isMobile = window.innerWidth < 768;

      domItems.forEach((item, index) => {
        // Force layout read
        const rect = item.getBoundingClientRect();
        const w = rect.width || (isMobile ? 100 : 200); // Fallback
        const h = rect.height || 50;
        
        // Random initial position (above screen)
        // Spread x across width
        const x = Math.random() * (width - 100) + 50;
        const y = -Math.random() * 800 - 100; // Staggered drop height

        let body;
        if (item.classList.contains('avatar-wrapper')) {
           const radius = w / 2;
           body = Bodies.circle(x, y, radius, {
               restitution: 0.4, 
               friction: 0.5,
               frictionAir: 0.005,
               density: 0.004,
               angle: Math.random() * Math.PI * 2
           });
        } else {
           body = Bodies.rectangle(x, y, w, h, {
             restitution: 0.2, 
             friction: 0.6,    
             frictionAir: 0.01, 
             density: 0.002,    
             angle: (Math.random() - 0.5) * 0.2 
           });
        }

        body.domElement = item;
        bodies.push(body);

        // Prepare element for physics control
        item.style.position = 'absolute';
        item.style.left = '0';
        item.style.top = '0';
        item.style.transformOrigin = '50% 50%';
        // Critical: Disable transition for transform to prevent fighting with physics engine
        // Only transition opacity for the fade-in effect
        item.style.transition = 'opacity 1s ease'; 
        item.style.willChange = 'transform';
        item.style.userSelect = 'none'; // Prevent text selection while dragging
        item.style.touchAction = 'none'; // Prevent scrolling while dragging

        // Reset legacy transforms
        item.style.transform = `translate(${x}px, ${y}px)`;
      });

      Composite.add(engine.world, bodies);

      // Add mouse control
      const mouse = Mouse.create(container);
      // Fix scrolling issue by removing wheel events from Matter.js mouse
      mouse.element.removeEventListener("mousewheel", mouse.mousewheel);
      mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);

      const mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          stiffness: 0.2,
          render: { visible: false }
        }
      });

      Composite.add(engine.world, mouseConstraint);

      // Animation loop to sync DOM with Physics
      const updateDOM = () => {
        bodies.forEach(body => {
          if (body.domElement) {
            const { x, y } = body.position;
            const angle = body.angle;
            // Translate to body center, then center the element on that point
            body.domElement.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) rotate(${angle}rad)`;
          }
        });
      };

      Events.on(engine, 'afterUpdate', updateDOM);

      // Run engine
      const runner = Runner.create();
      Runner.run(runner, engine);
      runnerRef.current = runner;

      // Trigger visibility
      container.classList.add('loaded');

      // Window resize handler
      let resizeTimeout;
      let prevW = width;
      let prevH = height;

      const handleResize = () => {
         clearTimeout(resizeTimeout);
         resizeTimeout = setTimeout(() => {
             const newW = container.clientWidth;
             const newH = container.clientHeight;
             const isMobile = window.innerWidth < 768;

             // Ignore small vertical changes on mobile (likely URL bar toggle)
             // Only resize if width changes or height changes significantly (>150px)
             if (isMobile && newW === prevW && Math.abs(newH - prevH) < 150) {
                 return;
             }

             prevW = newW;
             prevH = newH;
             
             const wallThickness = 120;
             const footerSpace = 100; // Keep consistent with init

             // Reposition walls
             // Ground: Center X to newW/2, Y to newH - footerSpace + half thickness
             Body.setPosition(ground, { x: newW / 2, y: newH - footerSpace + wallThickness/2 });
             
             // Left Wall: Fixed at left edge
             Body.setPosition(leftWall, { x: 0 - wallThickness/2, y: newH / 2 });
             
             // Right Wall: Fixed at right edge
             Body.setPosition(rightWall, { x: newW + wallThickness/2, y: newH / 2 });

             // Ensure bodies are within bounds
             bodies.forEach(b => {
                // If body is way out of bounds, bring it back
                // Using slightly larger bounds to avoid aggressive teleporting
                // Adjust bottom bound to respect new floor
                if (b.position.x > newW + 100) Body.setPosition(b, { x: newW - 50, y: b.position.y });
                if (b.position.x < -100) Body.setPosition(b, { x: 50, y: b.position.y });
                if (b.position.y > newH - footerSpace + 100) Body.setPosition(b, { x: b.position.x, y: newH - footerSpace - 50 });
             });
         }, 100);
      };
      
      window.addEventListener('resize', handleResize);
      
      // Store resize cleanup
      engine.resizeHandler = handleResize;

    }, 100);

    return () => {
      clearTimeout(initTimer);
      if (engineRef.current) {
        if (engineRef.current.resizeHandler) window.removeEventListener('resize', engineRef.current.resizeHandler);
        Matter.Engine.clear(engineRef.current);
      }
      if (runnerRef.current) {
        Matter.Runner.stop(runnerRef.current);
      }
      // Cleanup loaded class? Maybe not needed if unmounting
    };
  }, []);

  // --- Button Hover Effect ---
  const handleBtnMouseMove = (e) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    btn.style.setProperty('--x', `${x}px`);
    btn.style.setProperty('--y', `${y}px`);
  };

  // --- Mobile Touch/Click Handling ---
  // Fix for Matter.js interfering with clicks on mobile
  const handlePointerDown = (e) => {
     // Store start position and time
     e.currentTarget.dataset.startX = e.clientX || e.touches?.[0]?.clientX;
     e.currentTarget.dataset.startY = e.clientY || e.touches?.[0]?.clientY;
     e.currentTarget.dataset.startTime = Date.now();
  };

  const handlePointerUp = (e) => {
     const el = e.currentTarget;
     const startX = parseFloat(el.dataset.startX || 0);
     const startY = parseFloat(el.dataset.startY || 0);
     const startTime = parseInt(el.dataset.startTime || 0);
     
     const endX = e.clientX || e.changedTouches?.[0]?.clientX;
     const endY = e.clientY || e.changedTouches?.[0]?.clientY;
     
     const dist = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
     const timeDiff = Date.now() - startTime;

     // If tap is short and movement is small, treat as click
     if (dist < 10 && timeDiff < 500) {
        // Force navigation
        const url = el.getAttribute('href');
        if (url) {
           window.open(url, '_blank', 'noopener,noreferrer');
        }
     }
  };

  return (
    <div className="container" id="mainContainer" ref={containerRef}>
      <div>
        <div className="avatar-wrapper anim-item" style={{ transitionDelay: '0ms' }}>
          <img 
            src="/avatar_50KB.png" 
            alt="Avatar" 
            className="avatar" 
            width="120"
            height="120"
            fetchPriority="high"
          />
        </div>

        <h1 className="name anim-item" style={{ transitionDelay: '100ms' }}>CxinLiu</h1>

        {/* Split tagline into individual falling items */}
        <span className="role-tag anim-item" style={{ transitionDelay: '200ms' }}>业余开发者</span>
        <span className="role-tag anim-item" style={{ transitionDelay: '220ms' }}>安卓搞机玩家</span>
        <span className="role-tag anim-item" style={{ transitionDelay: '240ms' }}>平面设计师</span>

        <p className="description anim-item" style={{ transitionDelay: '300ms' }}>
          热爱编程与设计，专注用技术提高效率。
        </p>

        {/* Flattened Tech Stack Items */}
        {Object.values(allSkills).map((skill, i) => (
           <a 
             key={skill.name} 
             href={skill.url}
             target="_blank"
             rel="noopener noreferrer"
             className="tech-tag anim-item" 
             style={{ 
               transitionDelay: `${300 + i * 30}ms`,
               borderColor: skill.color ? `${skill.color}40` : undefined,
               textDecoration: 'none'
             }}
             onTouchStart={handlePointerDown}
             onTouchEnd={handlePointerUp}
           >
              <svg viewBox="0 0 24 24" style={{ color: skill.color || 'currentColor' }}>
                 <path d={skill.path} />
              </svg>
              <span>{skill.fullName}</span>
           </a>
        ))}

        {config.flatMap(group => {
           if (group.id === 'skills') return [];
           return group.items.map((item, i) => (
              <a 
                key={`${group.id}-${i}`}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`btn anim-item btn-${group.id}`}
                style={{ transitionDelay: `${400 + i * 50}ms` }}
                onMouseMove={handleBtnMouseMove}
                onTouchStart={handlePointerDown}
                onTouchEnd={handlePointerUp}
              >
                  <svg className="icon-svg" viewBox="0 0 24 24">
                      <path d={item.iconPath} />
                  </svg>
                  <span>{item.name}</span>
              </a>
           ));
        })}
      </div>
    </div>
  );
};

export default MainContent;