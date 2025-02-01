// 主题切换功能
const themeSwitch = document.querySelector('.theme-switch');
themeSwitch.addEventListener('click', () => {
    const body = document.body;
    body.classList.toggle('dark-theme');
    themeSwitch.innerHTML = body.classList.contains('dark-theme') ? 
        '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
});

// 3D卡片悬停效果
document.querySelectorAll('.news-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.transform = `
            perspective(1000px)
            rotateX(${(y - rect.height/2) / 15}deg)
            rotateY(${(x - rect.width/2) / -15}deg)
        `;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'none';
    });
});

// 动态粒子背景（particles.js）
class ParticleSystem {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.init();
    }
    
    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());
        
        // 初始化粒子
        for(let i = 0; i < 100; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 2 + 1,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5
            });
        }
        
        this.animate();
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            // 更新位置
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // 边界反弹
            if(particle.x < 0 || particle.x > this.canvas.width) particle.speedX *= -1;
            if(particle.y < 0 || particle.y > this.canvas.height) particle.speedY *= -1;
            
            // 绘制粒子
            this.ctx.beginPath();
            this.ctx.fillStyle = `rgba(255,255,255,${particle.size/3})`;
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI*2);
            this.ctx.fill();
        });
        
        requestAnimationFrame(() => this.animate());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
}

// 初始化粒子系统
const canvas = document.getElementById('particleCanvas');
new ParticleSystem(canvas);
