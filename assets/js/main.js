        // 导航栏滚动样式
        const navbar = document.getElementById('navbar');
        
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }       
            setActiveLink();

            // 视差动画效果
            const scrollY = window.scrollY;
            const heroHeight = document.querySelector('.hero').offsetHeight;

            // 只在首屏范围内应用视差效果
            if (scrollY <= heroHeight) {
                const scrollProgress = scrollY / heroHeight;

                // 背景图滚动速度为内容的0.5倍（反向移动）
                const heroBg = document.querySelector('.hero-bg');
                if (heroBg) {
                    heroBg.style.transform = `translateY(${scrollY * 0.5}px)`;
                }
            }
        });

        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        function setActiveLink() {
            let scrollPosition = window.scrollY + 100;
            const documentHeight = Math.max(
                document.body.scrollHeight,
                document.body.offsetHeight,
                document.documentElement.clientHeight,
                document.documentElement.scrollHeight,
                document.documentElement.offsetHeight
            );
            const viewportHeight = window.innerHeight;
            
            if (scrollPosition + viewportHeight >= documentHeight - 50) {
                navLinks.forEach(link => link.classList.remove('active'));
                navLinks[navLinks.length - 1].classList.add('active');
                return;
            }
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }
        // 导航栏液态玻璃效果
        document.addEventListener('DOMContentLoaded', function() {
            const navLinks = document.querySelectorAll('.nav-links a');
            const indicator = document.querySelector('.liquid-indicator');
            const sections = document.querySelectorAll('section');
            
            // 初始化指示器位置
            function moveIndicator(element) {
                const width = element.offsetWidth;
                const navLinksRect = document.querySelector('.nav-links').getBoundingClientRect();
                const elementRect = element.getBoundingClientRect();
                const left = elementRect.left - navLinksRect.left;
                
                indicator.style.width = `${width + 20}px`;
                indicator.style.left = `${left - 10}px`;
            }

            const activeLink = document.querySelector('.nav-links a.active');
            if (activeLink) {
                moveIndicator(activeLink);
            }
            // 滚动时更新活动链接和指示器位置
            window.addEventListener('scroll', function() {
                let current = '';
                
                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.clientHeight;
                    
                    if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                        current = section.getAttribute('id');
                    }
                });
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${current}`) {
                        link.classList.add('active');
                        moveIndicator(link);
                    }
                });
            });
        });

        // 初始化导航激活状态
        setActiveLink();
        
        const researchTabs = document.querySelectorAll('.research-tab');
        const researchContents = document.querySelectorAll('.research-content');
        
        researchTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                researchTabs.forEach(t => t.classList.remove('active'));
                researchContents.forEach(c => {
                    c.classList.remove('active');
                    c.querySelectorAll('.research-card').forEach(card => {
                        card.classList.remove('animate');
                    });
                });
                
                // 添加当前active
                this.classList.add('active');
                const tabId = this.getAttribute('data-tab');
                const activeContent = document.getElementById(tabId);
                activeContent.classList.add('active');
                
                // 触发调研卡片动画
                setTimeout(() => {
                    const cards = activeContent.querySelectorAll('.research-card');
                    if (tabId === 'forbidden-city') {
                        cards.forEach((card, index) => {
                            setTimeout(() => {
                                card.classList.add('animate');
                            }, index * 100);
                        });
                    } else if (tabId === 'art-museum') {
                        const cardCount = cards.length;
                        cards.forEach((card, index) => {
                            setTimeout(() => {
                                card.classList.add('animate');
                            }, (cardCount - 1 - index) * 100);
                        });
                    }
                }, 100);
            });
        });
        
        // 滚动到指定板块
        function scrollToSection(sectionId) {
            const section = document.getElementById(sectionId);
            window.scrollTo({
                top: section.offsetTop - 80,
                behavior: 'smooth'
            });
        }
        
        // 花瓣飘落效果
        function createPetals() {
        const container = document.getElementById('petalContainer');

        // 鼠标位置和风力变量
        let mouseX = 0;
        let mouseY = 0;
        let windX = 0;
        let windY = 0;
        let lastMouseX = 0;
        let lastMouseY = 0;

        // 跟踪鼠标移动
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // 计算鼠标移动速度（风力）
            windX = (mouseX - lastMouseX) * 0.02;
            windY = (mouseY - lastMouseY) * 0.02;

            // 限制最大风力
            windX = Math.max(-1, Math.min(1, windX));
            windY = Math.max(-1, Math.min(1, windY));

            lastMouseX = mouseX;
            lastMouseY = mouseY;
        });

        // 花瓣数组，用于跟踪每个花瓣的状态
        const petals = [];

        // 每0.1秒衰减水平速度
        setInterval(() => {
            petals.forEach(petal => {
                petal.vx *= 0.9;
            });
        }, 100);
        setInterval(() => {
            const petal = document.createElement('div');
            petal.className = 'petal';

            // 随机初始位置和属性
            const duration = 15 + Math.random() * 10;
            const startX = Math.random() * window.innerWidth;
            const startY = -20;
            const size = 20; // 统一大小
            const rotationSpeed = (Math.random() - 0.5) * 2;
            const fallSpeed = 0.2 + Math.random() * 0.1;

            // 花瓣状态
            const petalState = {
                element: petal,
                x: startX,
                y: startY,
                vx: (Math.random() - 0.5) * 0.2, // 水平速度
                vy: fallSpeed, // 垂直速度
                rotation: Math.random() * 360,
                rotationSpeed: rotationSpeed,
                size: size
            };

            petal.style.width = `${size}px`;
            petal.style.height = `${size}px`;
            petal.style.left = `${startX}px`;
            petal.style.top = `${startY}px`;
            petal.style.animationDuration = `${duration}s`;

            container.appendChild(petal);
            petals.push(petalState);
            

        }, 800);

        // 动画循环，更新花瓣位置
        function animatePetals() {
            const containerRect = container.getBoundingClientRect();

            petals.forEach(petal => {
                // 计算花瓣与鼠标的距离
                const dx = petal.x - mouseX;
                const dy = petal.y - mouseY;
                const distance = Math.sqrt(dx * dx + dy * dy);

                const influenceRadius = 300; // 鼠标影响范围半径
                let windInfluence = 0;

                if (distance < influenceRadius) {
                    // 距离越近，风力影响越大
                    windInfluence = (1 - distance / influenceRadius);
                }

                // 应用风力影响，左右移动幅度小于鼠标移动幅度的0.8倍
                petal.vx += windX * windInfluence * 0.8;
                petal.vy += windY * windInfluence * 0.8;

                // 限制速度
                petal.vx = Math.max(-1, Math.min(1, petal.vx));
                petal.vy = Math.max(0.2, Math.min(0.3, petal.vy));

                // 更新位置
                petal.x += petal.vx;
                petal.y += petal.vy;
                petal.rotation += petal.rotationSpeed;

                // 边界处理：超出左右下边界就删除花瓣
                if (petal.x < -50 || petal.x > containerRect.width + 50 || petal.y > containerRect.height + 50) {
                    const index = petals.indexOf(petal);
                    if (index > -1) {
                        petals.splice(index, 1);
                        petal.element.remove();
                    }
                    return; // 跳过后续处理
                }

                // 应用样式
                petal.element.style.left = `${petal.x}px`;
                petal.element.style.top = `${petal.y}px`;
                petal.element.style.transform = `rotate(${petal.rotation}deg)`;
            });

            // 风力逐渐减弱
            windX *= 0.95;
            windY *= 0.95;

            requestAnimationFrame(animatePetals);
        }

        // 启动动画循环
        animatePetals();
    }


        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.25 
        };
        
        // 认识实践团动画
        const aboutObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    document.getElementById('aboutHeader').classList.add('animate');
                    setTimeout(() => document.getElementById('missionItem1').classList.add('animate'), 0);
                    setTimeout(() => document.getElementById('missionItem2').classList.add('animate'), 100);
                    setTimeout(() => document.getElementById('missionItem3').classList.add('animate'), 200);
                    aboutObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // 成员风采动画
        const teamObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    document.getElementById('teamHeader').classList.add('animate');
                    for (let i = 1; i <= 8; i++) {
                        setTimeout(() => {
                            document.getElementById(`teamCard${i}`).classList.add('animate');
                        }, i * 100);
                    }
                    teamObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // 调研标签动画观察器
        const tabsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const tabs = entry.target.querySelectorAll('.research-tab');
                    tabs.forEach((tab, index) => {
                        setTimeout(() => {
                            tab.classList.add('animate');
                        }, index * 100);
                    });
                    tabsObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // 开始观察调研标签
        tabsObserver.observe(document.querySelector('.research-tabs'));


        // 调研成果动画
        const researchObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    document.getElementById('researchHeader').classList.add('animate');
                    const activeCards = document.querySelectorAll('.research-content.active .research-card');
                    activeCards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('animate');
                        }, index * 100);
                    });
                    researchObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // 新媒体矩阵动画
        const mediaObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    document.getElementById('mediaHeader').classList.add('animate');
                    setTimeout(() => document.getElementById('mediaCard1').classList.add('animate'), 0);
                    setTimeout(() => document.getElementById('mediaCard2').classList.add('animate'), 100);
                    setTimeout(() => document.getElementById('mediaCard3').classList.add('animate'), 200);
                    setTimeout(() => document.getElementById('mediaCard4').classList.add('animate'), 300);
                    mediaObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // 开始观察各个板块
        aboutObserver.observe(document.getElementById('about'));
        teamObserver.observe(document.getElementById('team'));
        researchObserver.observe(document.getElementById('research'));
        mediaObserver.observe(document.getElementById('media'));
        
        // 启动花瓣生成
        window.addEventListener('load', () => {
            createPetals();
        });

        // 图片查看器
        const imageViewer = document.getElementById('imageViewer');
        const viewerImage = document.getElementById('viewerImage');
        const closeBtn = document.querySelector('.close-viewer');

        // 点击事件
        document.querySelectorAll('.team-img').forEach(img => {
            img.addEventListener('click', function() {
                openViewer(this.src);
            });
        });

        // 点击事件
        document.querySelectorAll('.research-img').forEach(img => {
            img.addEventListener('click', function() {
                openViewer(this.src);
            });
        });

        // 图片查看器
        function openViewer(src) {
            imageViewer.style.display = 'block';
            viewerImage.src = src;
            document.body.style.overflow = 'hidden';
        }

        // 关闭图片查看器
        function closeViewer() {
            imageViewer.style.display = 'none';
            document.body.style.overflow = 'auto';
        }

        // 点击关闭按钮关闭查看器
        closeBtn.addEventListener('click', closeViewer);

        // 点击图片查看器背景关闭查看器
        imageViewer.addEventListener('click', function(e) {
            if (e.target === imageViewer) {
                closeViewer();
            }
        });

        // 按ESC键关闭查看器
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && imageViewer.style.display === 'block') {
                closeViewer();
            }
        });

        // 调研践行动画
        const practiceObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    document.getElementById('practiceHeader').classList.add('animate');
                    for (let i = 1; i <= 6; i++) {
                        setTimeout(() => {
                            document.getElementById(`practiceItem${i}`).classList.add('animate');
                        }, i * 100);
                    }
                    practiceObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // 青春号召动画
        const ctaObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    document.getElementById('ctaHeader').classList.add('animate');
                    for (let i = 1; i <= 3; i++) {
                        setTimeout(() => {
                            document.getElementById(`ctaItem${i}`).classList.add('animate');
                        }, i * 100);
                    }
                    ctaObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // 开始观察新添加的板块
        practiceObserver.observe(document.getElementById('practice'));
        ctaObserver.observe(document.getElementById('call-to-action'));

// 按钮图标跟随鼠标移动效果
document.addEventListener('DOMContentLoaded', function() {
    const heroBtn = document.querySelector('.hero-btn');
    const icon = heroBtn.querySelector('i');
    
    // 鼠标进入按钮时
    heroBtn.addEventListener('mouseenter', function() {
        // 启动动画循环
        requestAnimationFrame(animateIcon);
    });
    
    // 鼠标在按钮上移动时
    heroBtn.addEventListener('mousemove', function(e) {
        // 获取按钮位置信息
        const rect = heroBtn.getBoundingClientRect();
        
        // 计算鼠标相对于按钮中心的位置
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // 计算鼠标相对于按钮中心的偏移量
        const deltaX = (e.clientX - centerX) / rect.width;
        const deltaY = (e.clientY - centerY) / rect.height;
        
        // 设置最大移动距离
        const maxMove = 8;
        
        // 计算图标应该移动的距离
        const moveX = deltaX * maxMove;
        const moveY = deltaY * maxMove;
        
        // 应用变换
        icon.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
    
    // 鼠标离开按钮时
    heroBtn.addEventListener('mouseleave', function() {
        // 重置图标位置
        icon.style.transform = 'translate(0, 0)';
    });
    
    // 动画循环函数
    let animationId;
    function animateIcon() {
        // 这里可以添加额外的动画效果
        animationId = requestAnimationFrame(animateIcon);
    }
});

// 按钮文字和图标跟随鼠标移动效果
document.addEventListener('DOMContentLoaded', function() {
    const heroBtn = document.querySelector('.hero-btn');
    const icon = heroBtn.querySelector('i');
    const text = heroBtn.querySelector('span');
    
    // 鼠标进入按钮时
    heroBtn.addEventListener('mouseenter', function() {
        // 启动动画循环
        requestAnimationFrame(animateElements);
    });
    
    // 鼠标在按钮上移动时
    heroBtn.addEventListener('mousemove', function(e) {
        // 获取按钮位置信息
        const rect = heroBtn.getBoundingClientRect();
        
        // 计算鼠标相对于按钮中心的位置
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // 计算鼠标相对于按钮中心的偏移量
        const deltaX = (e.clientX - centerX) / rect.width;
        const deltaY = (e.clientY - centerY) / rect.height;
        
        // 设置最大移动距离
        const maxMove = 8;
        
        // 计算元素应该移动的距离
        const moveX = deltaX * maxMove;
        const moveY = deltaY * maxMove;
        
        // 应用变换到文字和图标
        text.style.transform = `translate(${moveX}px, ${moveY}px)`;
        icon.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
    
    // 鼠标离开按钮时
    heroBtn.addEventListener('mouseleave', function() {
        // 重置文字和图标位置
        text.style.transform = 'translate(0, 0)';
        icon.style.transform = 'translate(0, 0)';
    });
    
    // 动画循环函数
    let animationId;
    function animateElements() {
        // 这里可以添加额外的动画效果
        animationId = requestAnimationFrame(animateElements);
    }
});

// 按钮跟随鼠标方向倾斜效果
document.addEventListener('DOMContentLoaded', function() {
    const heroBtn = document.querySelector('.hero-btn');
    const icon = heroBtn.querySelector('i');
    const text = heroBtn.querySelector('span');
    
    // 鼠标在按钮上移动时
    heroBtn.addEventListener('mousemove', function(e) {
        // 获取按钮位置信息
        const rect = heroBtn.getBoundingClientRect();
        
        // 计算鼠标相对于按钮中心的位置
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // 计算鼠标相对于按钮中心的偏移量
        const deltaX = (e.clientX - centerX) / rect.width;
        const deltaY = (e.clientY - centerY) / rect.height;
        
        // 设置最大旋转角度（度）
        const maxRotate = 20;
        
        // 计算旋转角度
        const rotateX = -deltaY * maxRotate;
        const rotateY = deltaX * maxRotate;
        
        // 应用变换到按钮
        heroBtn.style.transform = `perspective(500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        
        // 设置最大移动距离
        const maxMove = 8;
        
        // 计算元素应该移动的距离
        const moveX = deltaX * maxMove;
        const moveY = deltaY * maxMove;
        
        // 应用变换到文字和图标
        text.style.transform = `translate(${moveX}px, ${moveY}px)`;
        icon.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
    
    // 鼠标离开按钮时
    heroBtn.addEventListener('mouseleave', function() {
        // 重置按钮、文字和图标位置
        heroBtn.style.transform = 'perspective(500px) rotateX(0deg) rotateY(0deg)';
        text.style.transform = 'translate(0, 0)';
        icon.style.transform = 'translate(0, 0)';
    });
});


// 为调研成果按钮添加鼠标悬浮倾斜效果

researchTabs.forEach(tab => {
    tab.addEventListener('mousemove', (e) => {
        const rect = tab.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // 计算鼠标相对于按钮中心的位置
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // 计算倾斜角度
        const rotateX = - (y - centerY) / 10;
        const rotateY = - (centerX - x) / 30;
        
        // 应用变换
        tab.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });
    
    tab.addEventListener('mouseleave', () => {
        // 鼠标离开时恢复原状
        tab.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});


// 板块平滑滚动功能
let currentSectionIndex = 0;
let isScrolling = false;
const sections1 = document.querySelectorAll('section1');
const sectionDividers = document.querySelectorAll('.section-divider');

// 初始化当前板块索引
function initCurrentSection() {
    const scrollPosition = window.scrollY + window.innerHeight / 2;
    sections1.forEach((sections1, index) => {
        const sectionTop = section1.offsetTop;
        const sectionBottom = sectionTop + section1.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            currentSectionIndex = index;
        }
    });
}

