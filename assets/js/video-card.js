// 视频卡片自动播放和暂停控制
document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('researchVideo');
    const videoCard = document.getElementById('researchCard17');
    const videoContainer = video.closest('.video-container');
    const videoOverlay = videoContainer.querySelector('.video-overlay');
    const pauseBtn = videoContainer.querySelector('.pause-btn');
    const progressContainer = videoContainer.querySelector('.video-progress-container');
    const progressFilled = videoContainer.querySelector('.video-progress-filled');
    const muteBtn = document.createElement('button');
    muteBtn.className = 'video-control-btn mute-btn';
    muteBtn.title = '静音/取消静音';
    muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    
    // 添加静音按钮到视频控制栏
    const videoControls = videoContainer.querySelector('.video-controls');
    videoControls.insertBefore(muteBtn, pauseBtn.nextSibling);

    if (!video || !videoCard || !videoContainer || !videoOverlay || !pauseBtn || !progressContainer || !progressFilled) return;

    // 更新视频播放状态样式
    function updateVideoState() {
        if (video.paused) {
            videoContainer.classList.remove('playing');
            videoContainer.classList.add('paused');
            pauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        } else {
            videoContainer.classList.remove('paused');
            videoContainer.classList.add('playing');
            pauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        }
    }

    // 更新进度条
    function updateProgress() {
        const progress = (video.currentTime / video.duration) * 100;
        progressFilled.style.width = progress + '%';
    }

    // 点击视频切换播放/暂停
    function toggleVideo() {
        if (video.paused) {
            video.play().catch(err => {
                console.log('视频播放失败:', err);
            });
        } else {
            video.pause();
        }
    }

    // 为视频容器添加点击事件
    videoContainer.addEventListener('click', function(e) {
        e.preventDefault();
        toggleVideo();
    });

    // 为视频元素本身添加点击事件
    video.addEventListener('click', function(e) {
        e.preventDefault();
        toggleVideo();
    });

    // 监听视频播放状态变化
    video.addEventListener('play', updateVideoState);
    video.addEventListener('pause', updateVideoState);
    video.addEventListener('ended', function() {
        videoContainer.classList.remove('playing');
        videoContainer.classList.add('paused');
    });

    // 初始化视频状态
    updateVideoState();

    // 暂停按钮点击事件
    pauseBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleVideo();
    });
    
    // 静音按钮点击事件
    muteBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        video.muted = !video.muted;
        updateMuteState();
    });
    
    // 更新静音状态样式
    function updateMuteState() {
        if (video.muted) {
            muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        } else {
            muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        }
    }

    // 视频时间更新时更新进度条
    video.addEventListener('timeupdate', updateProgress);

    // 点击进度条跳转
    progressContainer.addEventListener('click', function(e) {
        const rect = progressContainer.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;
        video.currentTime = pos * video.duration;
    });

    // 视频加载完成后更新进度条
    video.addEventListener('loadedmetadata', updateProgress);

    // 视频结束后重置进度条
    video.addEventListener('ended', function() {
        progressFilled.style.width = '0%';
    });

    // 检查视频是否在视口中的可见比例
    function getVideoVisibility() {
        const rect = video.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        const windowWidth = window.innerWidth || document.documentElement.clientWidth;

        const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
        const visibleWidth = Math.min(rect.right, windowWidth) - Math.max(rect.left, 0);

        const totalHeight = rect.height;
        const totalWidth = rect.width;

        const visibleArea = visibleHeight * visibleWidth;
        const totalArea = totalHeight * totalWidth;

        return visibleArea / totalArea;
    }

    // 检查视频是否完全露出（可见比例 >= 0.9）
    function isVideoFullyVisible() {
        return getVideoVisibility() >= 0.9;
    }

    // 检查视频是否有一半不在屏幕内（可见比例 <= 0.5）
    function isVideoHalfHidden() {
        return getVideoVisibility() <= 0.5;
    }

    // 控制视频播放
    function controlVideoPlay() {
        if (isVideoFullyVisible()) {
            video.play().catch(err => {
                console.log('视频自动播放失败:', err);
            });
        } else if (isVideoHalfHidden()) {
            video.pause();
        }
    }

    // 使用Intersection Observer API优化性能
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: [0.3, 0.5, 0.7, 0.9]
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.intersectionRatio >= 0.9) {
                    video.play().catch(err => {
                        console.log('视频自动播放失败:', err);
                    });
                } else if (entry.intersectionRatio <= 0.5) {
                    video.pause();
                }
            } else {
                video.pause();
            }
        });
    }, observerOptions);

    observer.observe(video);

    // 添加滚动事件监听作为备用方案
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                controlVideoPlay();
                ticking = false;
            });
            ticking = true;
        }
    });

    // 页面加载时检查一次
    controlVideoPlay();
});
