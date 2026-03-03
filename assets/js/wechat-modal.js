// 微信公众号二维码模态框
document.addEventListener('DOMContentLoaded', function() {
    const wechatCard = document.getElementById('mediaCard4');
    const wechatModal = document.getElementById('wechatModal');
    const closeWechatModal = document.querySelector('.close-wechat-modal');
    const wechatQrCode = document.getElementById('wechatQrCode');
    const wechatQrLoading = document.querySelector('#wechatModal .qr-loading');

    // 点击微信公众号按钮显示模态框
    wechatCard.addEventListener('click', function(e) {
        e.preventDefault();
        wechatModal.classList.add('show');
        document.body.style.overflow = 'hidden';

        // 直接显示二维码图片
        wechatQrCode.src = 'images/wechat-qr-code.jpg'; // 替换为实际的二维码图片路径
        wechatQrCode.classList.add('loaded');
        wechatQrLoading.classList.add('hidden');
    });

    // 关闭微信公众号模态框
    closeWechatModal.addEventListener('click', function() {
        wechatModal.classList.remove('show');
        document.body.style.overflow = '';

        // 重置状态
        setTimeout(() => {
            wechatQrLoading.classList.remove('hidden');
            wechatQrCode.classList.remove('loaded');
            wechatQrCode.src = '';
        }, 300);
    });

    // 点击微信公众号模态框外部关闭
    wechatModal.addEventListener('click', function(e) {
        if (e.target === wechatModal) {
            wechatModal.classList.remove('show');
            document.body.style.overflow = '';

            // 重置状态
            setTimeout(() => {
                wechatQrLoading.classList.remove('hidden');
                wechatQrCode.classList.remove('loaded');
                wechatQrCode.src = '';
            }, 300);
        }
    });
});
