import React, { useEffect, useRef } from 'react';

const Starfield = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width, height;
    let stars = [];
    let meteors = [];
    let animationFrameId;

    const colors = ['#ffffff', '#ffe9c4', '#d4fbff']; // White, Warm, Cool

    class Star3D {
      constructor() {
        this.x = (Math.random() - 0.5) * width * 2;
        this.y = (Math.random() - 0.5) * height * 2;
        this.z = Math.random() * width;
        this.pz = this.z;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.sizeBase = Math.random() * 1.5 + 0.5;
        this.twinkleOffset = Math.random() * Math.PI * 2;
        this.twinkleSpeed = Math.random() * 0.05 + 0.01;
      }

      update() {
        this.z -= 0.2; // Slower, more realistic drift
        if (this.z <= 0) {
          this.z = width;
          this.x = (Math.random() - 0.5) * width * 2;
          this.y = (Math.random() - 0.5) * height * 2;
          this.pz = this.z;
        }
      }

      draw(frame) {
        const sx = (this.x / this.z) * width / 2 + width / 2;
        const sy = (this.y / this.z) * height / 2 + height / 2;
        const r = (1 - this.z / width) * this.sizeBase;
        
        // Twinkle effect
        const twinkle = Math.sin(frame * this.twinkleSpeed + this.twinkleOffset);
        const opacity = (1 - this.z / width) * (0.7 + 0.3 * twinkle);

        if (sx > 0 && sx < width && sy > 0 && sy < height) {
          ctx.fillStyle = this.color;
          ctx.globalAlpha = opacity;
          ctx.beginPath();
          ctx.arc(sx, sy, r, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 1.0; // Reset
          
          // Add subtle glow to larger, closer stars
          if (r > 1.2) {
             ctx.shadowBlur = 4;
             ctx.shadowColor = this.color;
             ctx.fill();
             ctx.shadowBlur = 0;
          }
        }
      }
    }

    class Meteor {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * width + 300;
        this.y = Math.random() * height * -0.5; // Start higher up
        this.size = Math.random() * 2 + 1;
        this.speed = Math.random() * 15 + 15; // Faster
        this.angle = Math.PI / 4 + (Math.random() * 0.2 - 0.1); // Slight angle variation
        this.life = 0;
        this.maxLife = 100;
        this.opacity = 0;
      }
      update() {
        this.x -= this.speed * Math.cos(this.angle);
        this.y += this.speed * Math.sin(this.angle);
        this.life++;
        
        // Fade in and out
        if (this.life < 10) this.opacity += 0.1;
        else if (this.life > this.maxLife - 20) this.opacity -= 0.05;
        
        if (this.x < -100 || this.y > height + 100 || this.life > this.maxLife || this.opacity < 0) {
          this.reset();
          // Delay next meteor
          this.life = -Math.random() * 200; 
        }
      }
      draw() {
        if (this.life <= 0) return;
        
        const tail = 200;
        // Create gradient for tail
        const endX = this.x + tail * Math.cos(this.angle);
        const endY = this.y - tail * Math.sin(this.angle);
        
        const grad = ctx.createLinearGradient(this.x, this.y, endX, endY);
        grad.addColorStop(0, `rgba(255, 255, 255, ${this.opacity})`);
        grad.addColorStop(0.1, `rgba(100, 200, 255, ${this.opacity * 0.8})`);
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.strokeStyle = grad;
        ctx.lineWidth = this.size;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(endX, endY);
        ctx.stroke();
        
        // Bright head
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'white';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    const initCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      stars = Array(2000).fill().map(() => new Star3D()); // Increased stars from 1000 to 2000
      meteors = [new Meteor(), new Meteor()];
      meteors[1].life = -100; // Stagger meteors
    };

    let frame = 0;
    const animate = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);
      stars.forEach(s => {
        s.update();
        s.draw(frame);
      });
      meteors.forEach(m => {
        m.update();
        m.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', initCanvas);
    initCanvas();
    animate();

    return () => {
      window.removeEventListener('resize', initCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas id="starfield" ref={canvasRef} />;
};

export default Starfield;