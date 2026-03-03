// 微信视频号二维码模态框粒子效果 - 2026设计趋势
document.addEventListener('DOMContentLoaded', function() {
    const qrContainer = document.querySelector('.video-qr-container');
    const videoModal = document.getElementById('videoModal');

    // 粒子效果相关变量
    let particles = [];

    // 创建粒子效果
    function createParticles() {
        // 清除之前的粒子
        clearParticles();

        // 创建新粒子
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'qr-particle';

            // 随机位置和大小
            const size = Math.random() * 6 + 2;
            const x = Math.random() * 100;
            const y = Math.random() * 100;

            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${x}%`;
            particle.style.top = `${y}%`;

            // 随机动画延迟
            particle.style.animationDelay = `${Math.random() * 2}s`;

            qrContainer.appendChild(particle);
            particles.push(particle);
        }
    }

    // 清除粒子效果
    function clearParticles() {
        particles.forEach(particle => {
            particle.remove();
        });
        particles = [];
    }

    // 监听模态框显示事件
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.attributeName === 'class' && videoModal.classList.contains('show')) {
                // 模态框显示时创建粒子效果
                setTimeout(createParticles, 500);
            } else if (mutation.attributeName === 'class' && !videoModal.classList.contains('show')) {
                // 模态框隐藏时清除粒子效果
                clearParticles();
            }
        });
    });

    // 开始观察模态框的class属性变化
    observer.observe(videoModal, { attributes: true });
});
