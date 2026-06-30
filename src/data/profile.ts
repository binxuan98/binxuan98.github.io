export const profile = {
  name: '张斌轩',
  englishName: 'Binxuan Zhang',
  title: 'AI 研究与教育实践者',
  role: '智研社创始人 · 指导老师',
  affiliation: '庆阳职业技术学院数字信息系 · 甘肃省人工智能与算力技术重点实验室',
  email: 'zhangbinxuan98@foxmail.com',
  github: 'https://github.com/binxuan98',
  scholar: 'https://scholar.google.com.hk/citations?user=SO_IDk4AAAAJ&hl=zh-CN&oi=sra',
  orcid: 'https://orcid.org/0000-0002-2958-7488',
  headline: '连接人工智能研究、职业教育课堂与东数西算庆阳枢纽。',
  summary:
    '聚焦计算机视觉、大语言模型、RAG 与 AI 教育实践，将重点实验室任务、地方产业需求和学生成长路径组织成可展示、可训练、可复用的实践体系。'
};

export const navItems = [
  { label: '首页', href: '/#top' },
  { label: '项目星球', href: '/#project-globe' },
  {
    label: '高天厚土·福地庆阳',
    href: '/qingyang-compute/',
    children: [
      { label: '中国算谷·智慧庆阳', href: '/qingyang-compute/' },
      { label: '智研社', href: '/society/' },
      { label: '产学研协同', href: '/qingyang-screen3/' }
    ]
  },
  { label: '联系', href: '/#contact' }
];

export const metrics = [
  { value: '重点实验室', label: '甘肃省人工智能与算力技术重点实验室' },
  { value: '数字信息系', label: '庆阳职业技术学院教学与实践场景' },
  { value: '东数西算', label: '服务庆阳国家算力枢纽产业背景' },
  { value: '产教融合', label: 'AI 人才培养与地方产业服务' }
];

export const globeProjects = [
  {
    number: '01',
    title: '庆阳职业技术学院智研社',
    shortTitle: '智研社',
    region: '中国 · 庆阳职教节点',
    years: '2024 至今',
    meta: 'AI 通识课程 · 社团训练 · 项目展示',
    summary:
      '从人工智能通识课程中发现学生，通过社团组织项目训练、讲座、竞赛和前沿方向学习，形成职业教育里的 AI 实践入口。',
    tags: ['Society', 'AI Education', 'Practice'],
    href: '/society/#zhiyanshe-qr',
    actionLabel: '关注公众号',
    qrImage: '/images/zhiyanshe-wechat-qr.png',
    qrTitle: 'AIGC智研社公众号',
    qrText: '微信扫码或搜一搜，关注社团动态、AI 热点与学生实践作品。',
    lat: 35.73,
    lon: 107.64,
    color: '#f1d08a'
  },
  {
    number: '02',
    title: '中国山水画数据集与扩散生成',
    shortTitle: '山水画数据集',
    region: '中国 · 文化视觉节点',
    years: '2026',
    meta: 'ChineseLandscapeBench-12 · 9,600 images',
    summary:
      '整理 12 个平衡风格/语义类别的 512 x 512 PNG 图像数据，服务可控山水画生成、风格分析、生成图像评价与文化视觉研究。',
    tags: ['Diffusion', 'ControlNet', 'Dataset'],
    href: 'https://github.com/binxuan98/Chinese-landscape-painting-dataset',
    lat: 35.86,
    lon: 104.2,
    color: '#d08a51'
  },
  {
    number: '03',
    title: '省级自然科学基金研究方向',
    shortTitle: '自然科学基金',
    region: '法国 · 学术展示节点',
    years: '进行中',
    meta: '生成式视觉 · 风格迁移 · 文化计算',
    summary:
      '围绕扩散模型、传统山水画视觉特征建模和文化图像生成展开研究，把数据集、模型方法和评价任务连成可复用的研究链条。',
    tags: ['Research', 'Style Transfer', 'Evaluation'],
    href: 'https://github.com/binxuan98/Chinese-landscape-painting-dataset',
    lat: 46.23,
    lon: 2.21,
    color: '#5fb8c6'
  },
  {
    number: '04',
    title: '甘肃省人工智能与算力重点实验室实践',
    shortTitle: 'AI 与算力',
    region: '中国 · 庆阳',
    years: '2024-2026',
    meta: '重点实验室 · AI4S · 算力调度',
    summary:
      '把真实项目中的 AI4S、异构算力调度、平台展示和基础工程任务转化为教学训练内容，让学生在项目语境中理解算力和模型应用。',
    tags: ['AI4S', 'Compute', 'Platform'],
    href: '/qingyang-compute/',
    lat: 35.73,
    lon: 107.64,
    color: '#e3b15f'
  },
  {
    number: '05',
    title: '启思·智教大模型平台',
    shortTitle: '智教平台',
    region: '北美 · 开源生态节点',
    years: '2025',
    meta: 'Next.js · DeepSeek · 教学数据',
    summary:
      '集成关键词可视化、AI 模拟答辩、课堂热度分析、思政推荐、教学数据汇总和智能对话，探索大模型辅助教学的工作流。',
    tags: ['LLM', 'Teaching', 'Dashboard'],
    href: 'https://github.com/binxuan98/IntelliLearn-AI-Teaching-Platform',
    lat: 37.77,
    lon: -122.42,
    color: '#63c5a8'
  },
  {
    number: '06',
    title: '智慧环境监测与异常预警平台',
    shortTitle: 'AI IoT 教学',
    region: '南美 · 应用场景节点',
    years: '2026',
    meta: 'Flask · ECharts · SQLite',
    summary:
      '面向高职 AI+IoT 课程，覆盖传感器数据展示、阈值告警、规则评分、可视化、日志与角色协作，适合分组式项目训练。',
    tags: ['AIoT', 'Flask', 'ECharts'],
    href: 'https://github.com/binxuan98/ai-iot-monitor-system',
    lat: -15.78,
    lon: -47.93,
    color: '#d59b60'
  },
  {
    number: '07',
    title: 'LLM 问答数据制作工具',
    shortTitle: 'LLM 数据',
    region: '北美 · 数据工具节点',
    years: '2025',
    meta: '微调数据 · 自动提问 · JSON 问答',
    summary:
      '通过网页端或 API 自动提问，把领域文本转化为大模型微调所需的问答数据，降低人工标注成本并支持数据可视化。',
    tags: ['LLM', 'Fine-tuning', 'Data'],
    href: 'https://github.com/binxuan98/LLM-data-maker',
    lat: 40.71,
    lon: -74.01,
    color: '#c87d54'
  },
  {
    number: '08',
    title: '书香学时微信小程序',
    shortTitle: '书香学时',
    region: '中国 · 校园服务节点',
    years: '2026',
    meta: '图书馆签到 · 学习积分 · 排行榜',
    summary:
      '面向图书馆学习场景，支持学生扫码签到签退、记录有效学习时长、累计学习积分，并通过统计、排行榜和徽章鼓励持续学习。',
    tags: ['Mini Program', 'Campus Service', 'Learning Hours'],
    href: '/society/',
    actionLabel: '查看智研社',
    qrImage: '/images/shuxiang-xueshi-miniprogram-qr.png',
    qrTitle: '书香学时小程序',
    qrText: '微信扫码进入小程序，开启图书馆学习打卡、积分和排行榜体验。',
    lat: 35.68,
    lon: 139.76,
    color: '#7fbf72'
  }
];

export const projectIndex = [
  {
    title: '深度学习算法可视化实验平台',
    text: '面向《人工智能应用开发》《深度学习技术应用》课程，提供图像/视频上传、算法推理、可视化输出和日志记录。',
    meta: '课程平台 · 视觉算法',
    href: 'https://github.com/binxuan98/Deep-Learning-Visual-Lab-Platform'
  },
  {
    title: '书香学时微信小程序',
    text: '面向图书馆学习打卡场景，支持扫码签到签退、记录有效学习时长、累计学习积分，并通过排行榜和徽章鼓励持续学习。',
    meta: '微信小程序 · 学习积分 · 图书馆打卡',
    href: '/images/shuxiang-xueshi-miniprogram-qr.png',
    actionLabel: '打开小程序码',
    qrImage: '/images/shuxiang-xueshi-miniprogram-qr.png',
    qrTitle: '书香学时小程序',
    qrText: '微信扫码进入小程序'
  },
  {
    title: '电商订单数据分析项目',
    text: '用 Python、Streamlit 和 Plotly 组织电商订单分析流程，面向学生训练数据处理、可视化和项目交付。',
    meta: '数据分析 · 教学训练',
    href: 'https://github.com/binxuan98/hadoop-coursework'
  }
];

export const focusAreas = [
  {
    title: '计算机视觉与生成式视觉',
    text: '围绕中国山水画风格迁移、扩散模型与文化图像生成开展研究，关注技术方法与本土文化表达的结合。',
    tags: ['Computer Vision', 'Diffusion', 'Style Transfer']
  },
  {
    title: '大语言模型与 RAG 应用',
    text: '构建面向专业知识、教育场景和行业项目的检索增强流程，把大模型能力落到可解释、可复用的应用系统中。',
    tags: ['LLM', 'RAG', 'Knowledge Base']
  },
  {
    title: 'AI 教育与人才培养',
    text: '在庆阳职业技术学院推进人工智能通识课程与智研社建设，面向东数西算背景培养懂 AI、懂项目、懂应用的学生。',
    tags: ['AI Education', 'Society', 'Practice']
  }
];

export const projects = [
  {
    title: '基于扩散模型的中国山水画风格迁移',
    text: '聚焦图像风格迁移、扩散生成和传统山水画视觉特征建模，探索文化计算与生成式 AI 的结合路径。',
    meta: '省级自然科学基金方向',
    href: 'https://github.com/binxuan98'
  },
  {
    title: '重点实验室 AI 与算力项目实践',
    text: '协助推进甘肃省人工智能与算力技术重点实验室相关项目，把真实项目中的基础任务转化为学生训练内容。',
    meta: '甘肃省重大科技专项 · 甘肃移动项目',
    href: '/society/'
  },
  {
    title: '庆阳职业技术学院智研社',
    text: '从通识课程中发现学生，通过社团组织项目训练、竞赛实践、技术讲座和前沿方向学习。',
    meta: '东数西算人才培养基地展示',
    href: '/society/'
  }
];

export const capabilityRows = [
  ['Research', '扩散模型、风格迁移、大语言模型、RAG'],
  ['Teaching', '人工智能通识课程、项目式学习、竞赛指导'],
  ['Practice', '微调大模型、AI4S、异构算力调度、算力项目基础任务']
];
