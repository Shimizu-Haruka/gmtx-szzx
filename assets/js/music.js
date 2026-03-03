
// 音乐下载模态框功能
document.addEventListener('DOMContentLoaded', function() {
    const musicDownloadBtn = document.getElementById('musicDownloadBtn');
    const musicModal = document.getElementById('musicModal');
    const closeMusicModal = document.querySelector('.close-music-modal');
    const downloadButtons = document.querySelectorAll('.download-button');

    // 打开音乐下载模态框
    if (musicDownloadBtn) {
        musicDownloadBtn.addEventListener('click', function() {
            musicModal.classList.add('show');
            document.body.style.overflow = 'hidden'; // 防止背景滚动
        });
    }

    // 关闭音乐下载模态框
    if (closeMusicModal) {
        closeMusicModal.addEventListener('click', function() {
            musicModal.classList.remove('show');
            document.body.style.overflow = ''; // 恢复背景滚动
        });
    }

    // 点击模态框外部关闭
    if (musicModal) {
        musicModal.addEventListener('click', function(e) {
            if (e.target === musicModal) {
                musicModal.classList.remove('show');
                document.body.style.overflow = ''; // 恢复背景滚动
            }
        });
    }

    // ESC键关闭模态框
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && musicModal.classList.contains('show')) {
            musicModal.classList.remove('show');
            document.body.style.overflow = ''; // 恢复背景滚动
        }
    });

    // 下载按钮点击动画
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 添加下载状态类
            this.classList.add('downloading');
            
            // 模拟下载过程
            setTimeout(() => {
                this.classList.remove('downloading');
                
                // 这里可以添加实际的下载逻辑
                // window.location.href = this.parentElement.href;
            }, 3000);
        });
    });
});
