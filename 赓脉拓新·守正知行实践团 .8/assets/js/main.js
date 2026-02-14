        // 导航栏滚动样式
        const navbar = document.getElementById('navbar');
        // const petalContainer = document.getElementById('petalContainer');
        
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }       
            setActiveLink();
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
        
        // 主题切换功能
        const themeToggle = document.getElementById('themeToggle');
        const themeIcon = document.getElementById('themeIcon');
        const body = document.body;
        
        // 检查本地存储的主题
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            body.classList.add('light-theme');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
        
        themeToggle.addEventListener('click', function() {
            body.classList.toggle('light-theme');
            if (body.classList.contains('light-theme')) {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
                localStorage.setItem('theme', 'light');
            } else {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
                localStorage.setItem('theme', 'dark');
            }
        });
        
        // 花瓣飘落效果
        function createPetals() {
        const container = document.getElementById('petalContainer');
        setInterval(() => {
            const petal = document.createElement('div');
            petal.className = 'petal';
            // 随机动画时长和水平移动
            const duration = 15 + Math.random() * 10;
            const horizontalMovement = 100 + Math.random() * 100;
            petal.style.animationDuration = `${duration}s`;
            petal.style.left = `${Math.random() * 100}%`;
            petal.style.animation = `fall ${duration}s linear infinite`;
            container.appendChild(petal);
            
            setTimeout(() => {
                petal.remove();
            }, duration * 1000);
        }, 800);
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

        // 水墨肌理背景随鼠标移动
        document.addEventListener('mousemove', function(e) {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            // 轻微偏移背景位置
            const moveX = x * 20 - 10; // -10px 到 10px
            const moveY = y * 20 - 10; // -10px 到 10px
            
            document.body.style.setProperty('--bg-x', `${moveX}px`);
            document.body.style.setProperty('--bg-y', `${moveY}px`);
        });

        // 添加鼠标跟随效果到卡片
        const cards = document.querySelectorAll('.team-card, .media-card');

        cards.forEach(card => {
            card.addEventListener('mousemove', function(e) {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
            });
        });

        // 毛笔拖尾效果
        const brushCanvas = document.getElementById('brushCanvas');
        const brushCtx = brushCanvas.getContext('2d');
        let brushPoints = [];
        let lastX = 0;
        let lastY = 0;
        let mouseX = 0;
        let mouseY = 0;

        // 设置Canvas尺寸
        function resizeBrushCanvas() {
            brushCanvas.width = window.innerWidth;
            brushCanvas.height = window.innerHeight;
        }

        // 初始化Canvas
        window.addEventListener('resize', resizeBrushCanvas);
        resizeBrushCanvas();

        // 鼠标移动事件
        document.addEventListener('mousemove', function(e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // 计算鼠标移动速度
            const dx = mouseX - lastX;
            const dy = mouseY - lastY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // 根据移动速度调整笔触大小，使效果更加自然
            const brushSize = Math.max(3, Math.min(15, distance / 3));
            
            // 添加新的笔触点
            brushPoints.push({
                x: mouseX,
                y: mouseY,
                size: brushSize,
                opacity: 0.6, // 初始不透明度降低
                life: 1
            });
            
            lastX = mouseX;
            lastY = mouseY;
        });

        // 动画循环
        function animateBrush() {
            // 使用半透明清除画布，而不是完全清除，创造拖尾效果
            brushCtx.fillStyle = 'rgba(0, 0, 0, 0.1)';
            brushCtx.fillRect(0, 0, brushCanvas.width, brushCanvas.height);
            
            // 更新和绘制笔触点
            for (let i = 0; i < brushPoints.length; i++) {
                const point = brushPoints[i];
                
                // 减少笔触点的生命值，使消失更加平滑
                point.life -= 0.015;
                point.opacity = point.life * 0.6; // 保持整体透明度较低
                
                // 如果笔触点仍然存活，则绘制它
                if (point.life > 0) {
                    brushCtx.beginPath();
                    brushCtx.arc(point.x, point.y, point.size, 0, Math.PI * 2);
                    brushCtx.fillStyle = `rgba(196, 30, 58, ${point.opacity})`;
                    brushCtx.fill();
                } else {
                    // 移除已死亡的笔触点
                    brushPoints.splice(i, 1);
                    i--;
                }
            }
            
            // 继续动画循环
            requestAnimationFrame(animateBrush);
        }

        // 启动动画循环
        animateBrush();