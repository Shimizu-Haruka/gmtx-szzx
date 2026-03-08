
/**
 * 思维导图交互功能
 * 采用液态玻璃拟态设计风格
 */

// 思维导图数据结构
const mindmapData = {
    nodes: [
        {
            id: 'root',
            title: '根本遵循',
            subtitle: '"以人民为中心"（人民的文艺）',
            x: 1000,
            y: 400,
            level: 0
        },
        {
            id: 'core',
            title: '核心方针',
            subtitle: '"创造性转化、创新性发展"',
            parentId: 'root',
            x: 1000,
            y: 600,
            level: 1
        },
        {
            id: 'practice',
            title: '实践路径',
            subtitle: '让文物"活起来"',
            parentId: 'core',
            x: 1000,
            y: 800,
            level: 2
        },
        {
            id: 'preserve',
            title: '守正固本',
            subtitle: '确立人民的文化所有权（民间史诗进入国家殿堂）',
            parentId: 'practice',
            x: 700,
            y: 1000,
            level: 3
        },
        {
            id: 'transform',
            title: '转化焕新',
            subtitle: '服务于人民美好生活需求（非遗文创日用化）',
            parentId: 'practice',
            x: 1000,
            y: 1000,
            level: 3
        },
        {
            id: 'develop',
            title: '发展铸魂',
            subtitle: '歌颂人民的奋斗实践（传统技艺刻画时代成就）',
            parentId: 'practice',
            x: 1300,
            y: 1000,
            level: 3
        },
        {
            id: 'activate',
            title: '传播活化',
            subtitle: '人民参与、评判与共享（体验、数字、社交、消费）',
            parentId: ['preserve', 'transform', 'develop'],
            x: 1000,
            y: 1200,
            level: 4
        },
        {
            id: 'result',
            title: '最终实现',
            subtitle: '传统文化在当代的创新表达与有效传播',
            parentId: 'activate',
            x: 1000,
            y: 1400,
            level: 5
        }
    ]
};

// 思维导图类
class MindMap {
    constructor(containerId, data) {
        this.container = document.getElementById(containerId);
        this.data = data;
        // 保存初始数据的深拷贝
        this.initialData = JSON.parse(JSON.stringify(data));
        this.nodes = {};
        this.connections = {};
        this.scale = 1;
        this.translateX = 0;
        this.translateY = 0;
        this.isDragging = false;
        this.draggedNode = null;
        this.draggedCanvas = false;
        this.lastX = 0;
        this.lastY = 0;
        this.highlightedNode = null;
        this.updateRequested = false;

        this.init();
    }

    init() {
        // 创建SVG画布用于绘制连线
        this.createSVGCanvas();

        // 创建节点
        this.createNodes();

        // 绘制连线
        this.drawConnections();

        // 添加事件监听
        this.addEventListeners();

        // 居中显示
        this.centerView();
    }

    createSVGCanvas() {
        // 创建SVG元素
        this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        this.svg.setAttribute('class', 'mindmap-connections');
        this.svg.setAttribute('width', '100%');
        this.svg.setAttribute('height', '100%');
        this.svg.setAttribute('viewBox', '0 0 2000 2000');
        this.container.appendChild(this.svg);
        
        // 设置容器尺寸
        this.container.style.width = '2000px';
        this.container.style.height = '2000px';
    }

    createNodes() {
        this.data.nodes.forEach(nodeData => {
            const node = document.createElement('div');
            node.className = 'mindmap-node';
            node.id = nodeData.id;
            node.style.left = `${nodeData.x}px`;
            node.style.top = `${nodeData.y}px`;

            const title = document.createElement('div');
            title.className = 'mindmap-node-title';
            title.textContent = nodeData.title;

            const subtitle = document.createElement('div');
            subtitle.className = 'mindmap-node-subtitle';
            subtitle.textContent = nodeData.subtitle;

            node.appendChild(title);
            node.appendChild(subtitle);

            this.container.appendChild(node);
            this.nodes[nodeData.id] = {
                element: node,
                data: nodeData
            };
        });
    }

    drawConnections() {
        // 清除现有连线
        while (this.svg.firstChild) {
            this.svg.removeChild(this.svg.firstChild);
        }

        // 绘制新连线
        this.data.nodes.forEach(nodeData => {
            if (nodeData.parentId) {
                const parentIds = Array.isArray(nodeData.parentId) ? nodeData.parentId : [nodeData.parentId];

                parentIds.forEach(parentId => {
                    if (this.nodes[parentId]) {
                        const connection = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                        connection.setAttribute('class', 'mindmap-connection');
                        connection.setAttribute('id', `connection-${parentId}-${nodeData.id}`);

                        this.svg.appendChild(connection);
                        this.connections[`${parentId}-${nodeData.id}`] = {
                            element: connection,
                            from: parentId,
                            to: nodeData.id
                        };

                        this.updateConnection(connection, this.nodes[parentId].element, this.nodes[nodeData.id].element);
                    }
                });
            }
        });
    }

    updateConnection(connection, fromNode, toNode) {
        // 直接使用节点数据中的位置
        const fromData = this.nodes[fromNode.id].data;
        const toData = this.nodes[toNode.id].data;
        
        // 获取节点元素尺寸
        const fromRect = fromNode.getBoundingClientRect();
        const toRect = toNode.getBoundingClientRect();
        
        // 计算节点中心点位置
        const fromX = fromData.x + fromRect.width / 2;
        const fromY = fromData.y + fromRect.height / 2;
        const toX = toData.x + toRect.width / 2;
        const toY = toData.y + toRect.height / 2;
        
        // 创建平滑贝塞尔曲线
        const midY = (fromY + toY) / 2;
        const d = `M ${fromX} ${fromY} C ${fromX} ${midY}, ${toX} ${midY}, ${toX} ${toY}`;
        
        connection.setAttribute('d', d);
    }

    updateAllConnections() {
        Object.values(this.connections).forEach(connection => {
            this.updateConnection(connection.element, this.nodes[connection.from].element, this.nodes[connection.to].element);
        });
    }

    addEventListeners() {
        // 节点拖拽事件
        Object.values(this.nodes).forEach(node => {
            node.element.addEventListener('mousedown', (e) => {
                e.stopPropagation();
                this.isDragging = true;
                this.draggedNode = node;
                this.lastX = e.clientX;
                this.lastY = e.clientY;

                // 高亮节点及其相关节点
                this.highlightNodePath(node.data.id);
            });

            node.element.addEventListener('touchstart', (e) => {
                e.stopPropagation();
                this.isDragging = true;
                this.draggedNode = node;
                const touch = e.touches[0];
                this.lastX = touch.clientX;
                this.lastY = touch.clientY;

                // 高亮节点及其相关节点
                this.highlightNodePath(node.data.id);
            });
        });

        // 画布拖拽事件
        this.container.addEventListener('mousedown', (e) => {
            if (e.target === this.container || e.target === this.svg) {
                this.isDragging = true;
                this.draggedCanvas = true;
                this.lastX = e.clientX;
                this.lastY = e.clientY;
                this.container.style.cursor = 'grabbing';
            }
        });

        this.container.addEventListener('touchstart', (e) => {
            if (e.target === this.container || e.target === this.svg) {
                this.isDragging = true;
                this.draggedCanvas = true;
                const touch = e.touches[0];
                this.lastX = touch.clientX;
                this.lastY = touch.clientY;
                this.container.style.cursor = 'grabbing';
            }
        });

        // 鼠标移动事件
        document.addEventListener('mousemove', (e) => {
            if (!this.isDragging) return;

            const deltaX = e.clientX - this.lastX;
            const deltaY = e.clientY - this.lastY;

            if (this.draggedNode) {
                // 拖拽节点
                const nodeData = this.draggedNode.data;
                nodeData.x += deltaX / this.scale;
                nodeData.y += deltaY / this.scale;

                this.draggedNode.element.style.left = `${nodeData.x}px`;
                this.draggedNode.element.style.top = `${nodeData.y}px`;

                // 直接更新连线，不使用requestAnimationFrame
                this.updateNodeConnections(nodeData.id);
            } else if (this.draggedCanvas) {
                // 拖拽画布
                this.translateX += deltaX;
                this.translateY += deltaY;
                this.updateCanvasTransform();
            }

            this.lastX = e.clientX;
            this.lastY = e.clientY;
        });

        document.addEventListener('touchmove', (e) => {
            if (!this.isDragging) return;

            const touch = e.touches[0];
            const deltaX = touch.clientX - this.lastX;
            const deltaY = touch.clientY - this.lastY;

            if (this.draggedNode) {
                // 拖拽节点
                const nodeData = this.draggedNode.data;
                nodeData.x += deltaX / this.scale;
                nodeData.y += deltaY / this.scale;

                this.draggedNode.element.style.left = `${nodeData.x}px`;
                this.draggedNode.element.style.top = `${nodeData.y}px`;

                // 直接更新连线，不使用requestAnimationFrame
                this.updateNodeConnections(nodeData.id);
            } else if (this.draggedCanvas) {
                // 拖拽画布
                this.translateX += deltaX;
                this.translateY += deltaY;
                this.updateCanvasTransform();
            }

            this.lastX = touch.clientX;
            this.lastY = touch.clientY;
        });

        // 鼠标释放事件
        document.addEventListener('mouseup', () => {
            this.isDragging = false;
            this.draggedNode = null;
            this.draggedCanvas = false;
            this.container.style.cursor = 'default';
        });

        document.addEventListener('touchend', () => {
            this.isDragging = false;
            this.draggedNode = null;
            this.draggedCanvas = false;
            this.container.style.cursor = 'default';
        });

        // 滚轮缩放事件
        this.container.addEventListener('wheel', (e) => {
            e.preventDefault();

            const scaleAmount = 0.1;
            const direction = e.deltaY > 0 ? -1 : 1;
            const newScale = Math.max(0.5, Math.min(2, this.scale + direction * scaleAmount));

            // 以鼠标位置为中心进行缩放
            const rect = this.container.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            // 计算缩放前的鼠标在画布上的位置
            const canvasX = (mouseX - this.translateX) / this.scale;
            const canvasY = (mouseY - this.translateY) / this.scale;

            // 更新缩放比例
            this.scale = newScale;

            // 计算新的平移量，使鼠标位置在画布上的位置保持不变
            this.translateX = mouseX - canvasX * this.scale;
            this.translateY = mouseY - canvasY * this.scale;

            this.updateCanvasTransform();
        });

        // 双击重置视图
        this.container.addEventListener('dblclick', () => {
            this.centerView();
        });
    }

    updateNodeConnections(nodeId) {
        // 更新从该节点出发的连线
        Object.values(this.connections).forEach(connection => {
            if (connection.from === nodeId || connection.to === nodeId) {
                this.updateConnection(connection.element, this.nodes[connection.from].element, this.nodes[connection.to].element);
            }
        });
    }

    updateCanvasTransform() {
        // 应用变换到容器
        this.container.style.transform = `translate(${this.translateX}px, ${this.translateY}px) scale(${this.scale})`;
        this.container.style.transformOrigin = '0 0';
    }

    centerView() {
        // 获取容器尺寸
        const containerRect = this.container.parentElement.getBoundingClientRect();
        
        // 计算缩放比例，使思维导图适应容器
        const scaleX = containerRect.width / 2000;
        const scaleY = containerRect.height / 2000;
        this.scale = Math.min(scaleX, scaleY, 1) * 1.2; // 增大初始缩放比例
        
        // 计算居中位置
        this.translateX = (containerRect.width - 2000 * this.scale) / 2;
        this.translateY = (containerRect.height - 2000 * this.scale) / 2;
        
        this.updateCanvasTransform();
    }
    
    // 还原思维导图到初始状态
    reset() {
        // 重置所有节点位置
        this.initialData.nodes.forEach(node => {
            if (this.nodes[node.id]) {
                this.nodes[node.id].data.x = node.x;
                this.nodes[node.id].data.y = node.y;
                this.nodes[node.id].element.style.left = `${node.x}px`;
                this.nodes[node.id].element.style.top = `${node.y}px`;
            }
        });
        
        // 更新所有连线
        Object.keys(this.connections).forEach(key => {
            const connection = this.connections[key];
            const fromNode = this.nodes[connection.from].element;
            const toNode = this.nodes[connection.to].element;
            this.updateConnection(connection.element, fromNode, toNode);
        });
        
        // 重置视图
        this.centerView();
    }

    highlightNodePath(nodeId) {
        // 重置所有节点和连线的高亮状态
        Object.values(this.nodes).forEach(node => {
            node.element.classList.remove('highlight', 'dimmed');
        });

        Object.values(this.connections).forEach(connection => {
            connection.element.classList.remove('highlight', 'dimmed');
        });

        // 获取当前节点
        const currentNode = this.nodes[nodeId];
        if (!currentNode) return;

        // 高亮当前节点
        currentNode.element.classList.add('highlight');

        // 获取相关节点ID
        const relatedNodeIds = new Set([nodeId]);

        // 添加父节点
        if (currentNode.data.parentId) {
            const parentIds = Array.isArray(currentNode.data.parentId) ? currentNode.data.parentId : [currentNode.data.parentId];
            parentIds.forEach(id => relatedNodeIds.add(id));
        }

        // 添加子节点
        Object.values(this.nodes).forEach(node => {
            if (node.data.parentId) {
                const parentIds = Array.isArray(node.data.parentId) ? node.data.parentId : [node.data.parentId];
                if (parentIds.includes(nodeId)) {
                    relatedNodeIds.add(node.data.id);
                }
            }
        });

        // 高亮相关节点和连线
        relatedNodeIds.forEach(id => {
            if (this.nodes[id]) {
                this.nodes[id].element.classList.add('highlight');
            }

            Object.values(this.connections).forEach(connection => {
                if (relatedNodeIds.has(connection.from) && relatedNodeIds.has(connection.to)) {
                    connection.element.classList.add('highlight');
                }
            });
        });

        // 降低不相关节点和连线的透明度
        Object.values(this.nodes).forEach(node => {
            if (!relatedNodeIds.has(node.data.id)) {
                node.element.classList.add('dimmed');
            }
        });

        Object.values(this.connections).forEach(connection => {
            if (!(relatedNodeIds.has(connection.from) && relatedNodeIds.has(connection.to))) {
                connection.element.classList.add('dimmed');
            }
        });
    }
}

// 模态框控制
const mindmapModal = document.getElementById('mindmapModal');
const mindmapTriggerBtn = document.getElementById('mindmapTriggerBtn');
const mindmapCloseBtn = document.getElementById('mindmapCloseBtn');

// 打开模态框
if (mindmapTriggerBtn) {
    mindmapTriggerBtn.addEventListener('click', () => {
        mindmapModal.classList.add('show');
        document.body.style.overflow = 'hidden';

        // 初始化思维导图
        if (!window.mindMap) {
            window.mindMap = new MindMap('mindmapContainer', mindmapData);
            
            // 添加控制按钮事件
            const zoomInBtn = document.getElementById('zoomInBtn');
            const zoomOutBtn = document.getElementById('zoomOutBtn');
            const resetViewBtn = document.getElementById('resetViewBtn');
            
            if (zoomInBtn) {
                zoomInBtn.addEventListener('click', () => {
                    window.mindMap.scale = Math.min(2, window.mindMap.scale + 0.1);
                    window.mindMap.updateCanvasTransform();
                });
            }
            
            if (zoomOutBtn) {
                zoomOutBtn.addEventListener('click', () => {
                    window.mindMap.scale = Math.max(0.5, window.mindMap.scale - 0.1);
                    window.mindMap.updateCanvasTransform();
                });
            }
            
            if (resetViewBtn) {
                resetViewBtn.addEventListener('click', () => {
                    window.mindMap.reset();
                });
            }
        }
    });
}

// 关闭模态框
function closeMindmapModal() {
    mindmapModal.classList.remove('show');
    document.body.style.overflow = '';
}

if (mindmapCloseBtn) {
    mindmapCloseBtn.addEventListener('click', closeMindmapModal);
}

// 点击模态框背景关闭
if (mindmapModal) {
    mindmapModal.addEventListener('click', (e) => {
        if (e.target === mindmapModal) {
            closeMindmapModal();
        }
    });
}

// 键盘事件关闭模态框
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mindmapModal.classList.contains('show')) {
        closeMindmapModal();
    }
});