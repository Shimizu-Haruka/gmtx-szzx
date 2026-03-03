// 微信视频号二维码模态框增强版
document.addEventListener('DOMContentLoaded', function() {
    const videoCard = document.getElementById('mediaCardVideo');
    const videoModal = document.getElementById('videoModal');
    const closeVideoModal = document.querySelector('.close-video-modal');
    const videoQrCode = document.getElementById('videoQrCode');
    const qrLoading = document.querySelector('.qr-loading');

    // 点击微信视频号按钮显示模态框
    videoCard.addEventListener('click', function(e) {
        e.preventDefault();

        // 添加按钮点击动画效果
        videoCard.style.transform = 'scale(0.95)';
        setTimeout(() => {
            videoCard.style.transform = '';
        }, 150);

        // 显示模态框
        videoModal.classList.add('show');
        document.body.style.overflow = 'hidden';

        // 延迟显示二维码图片，创造更流畅的动画效果
        setTimeout(() => {
            videoQrCode.src = 'images/video-qr-code.jpg'; // 替换为实际的二维码图片路径
            videoQrCode.onload = function() {
                videoQrCode.classList.add('loaded');
                qrLoading.classList.add('hidden');
            };
        }, 300);
    });

    // 关闭模态框
    closeVideoModal.addEventListener('click', function() {
        closeVideoModal.style.transform = 'rotate(90deg) scale(0.8)';
        setTimeout(() => {
            videoModal.classList.remove('show');
            document.body.style.overflow = '';
            closeVideoModal.style.transform = '';

            // 重置状态
            setTimeout(() => {
                qrLoading.classList.remove('hidden');
                videoQrCode.classList.remove('loaded');
                videoQrCode.src = '';
            }, 300);
        }, 150);
    });

    // 点击模态框外部关闭
    videoModal.addEventListener('click', function(e) {
        if (e.target === videoModal) {
            videoModal.classList.remove('show');
            document.body.style.overflow = '';

            // 重置状态
            setTimeout(() => {
                qrLoading.classList.remove('hidden');
                videoQrCode.classList.remove('loaded');
                videoQrCode.src = '';
            }, 300);
        }
    });

    // 按ESC键关闭模态框
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && videoModal.classList.contains('show')) {
            videoModal.classList.remove('show');
            document.body.style.overflow = '';

            // 重置状态
            setTimeout(() => {
                qrLoading.classList.remove('hidden');
                videoQrCode.classList.remove('loaded');
                videoQrCode.src = '';
            }, 300);
        }
    });
});
