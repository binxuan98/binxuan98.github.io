export const profile = {
  name: '张斌轩',
  englishName: 'Binxuan Zhang',
  title: 'AI 研究与教育实践者',
  role: '智研社创始人 · 指导老师',
  affiliation: '庆阳职业技术学院 · 人工智能与计算机技术方向',
  email: 'zhangbinxuan98@foxmail.com',
  github: 'https://github.com/binxuan98',
  scholar: 'https://scholar.google.com.hk/citations?user=SO_IDk4AAAAJ&hl=zh-CN&oi=sra',
  orcid: 'https://orcid.org/0000-0002-2958-7488',
  headline: '连接人工智能研究、职业教育课堂与东数西算人才培养。',
  summary:
    '聚焦计算机视觉、大语言模型、RAG 与 AI 教育实践，将高校科研项目、真实工程任务和学生成长路径组织成可展示、可训练、可复用的实践体系。'
};

export const navItems = [
  { label: '研究方向', href: '/#work' },
  { label: '实践项目', href: '/#projects' },
  { label: '智研社', href: '/society/' },
  { label: '联系', href: '/#contact' }
];

export const metrics = [
  { value: '44', label: '专业 AI 通识课程覆盖' },
  { value: '2024', label: '秋季学期启动课程与社团联动' },
  { value: '3', label: '大模型、AI4S、算力调度方向' },
  { value: '2', label: '重点实验室项目牵引' }
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
