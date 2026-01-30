export interface ResultType {
  type: string;
  name: string;
  emoji: string;
  description: string;
  strengths: string[];
  quote: string;
  color: string;
}

export const results: Record<string, ResultType> = {
  'introvert-planner': {
    type: 'introvert-planner',
    name: '사색하는 전략가',
    emoji: '🦉',
    description: '당신은 깊은 내면의 세계를 가진 사람입니다. 조용히 생각을 정리하고 체계적으로 계획을 세우는 것을 좋아하죠. 혼자만의 시간이 에너지를 충전하는 원천이 됩니다.',
    strengths: ['분석적 사고', '계획 수립', '깊은 집중력'],
    quote: '고요함 속에서 가장 큰 힘이 자란다.',
    color: '#667eea',
  },
  'introvert-spontaneous': {
    type: 'introvert-spontaneous',
    name: '몽상하는 예술가',
    emoji: '🌙',
    description: '당신은 풍부한 상상력과 감성을 지닌 사람입니다. 직관을 따라 흐르듯 살아가며, 혼자만의 시간 속에서 영감을 얻습니다. 예상치 못한 아름다움을 발견하는 눈을 가졌네요.',
    strengths: ['창의력', '감수성', '직관력'],
    quote: '상상력은 현실보다 더 넓은 세계를 품는다.',
    color: '#f093fb',
  },
  'extrovert-planner': {
    type: 'extrovert-planner',
    name: '열정적인 리더',
    emoji: '🦁',
    description: '당신은 사람들과 함께할 때 빛나는 에너지를 가졌습니다. 목표를 세우고 체계적으로 이뤄나가며, 주변을 이끄는 카리스마가 있죠. 당신의 계획은 늘 성취로 이어집니다.',
    strengths: ['리더십', '목표 달성', '소통 능력'],
    quote: '함께하면 더 멀리 갈 수 있다.',
    color: '#f5576c',
  },
  'extrovert-spontaneous': {
    type: 'extrovert-spontaneous',
    name: '자유로운 탐험가',
    emoji: '🦋',
    description: '당신은 새로운 경험과 만남을 사랑하는 모험가입니다. 순간의 즐거움을 놓치지 않고, 어디서든 즐거움을 찾아내는 재주가 있어요. 삶 자체가 하나의 여행이죠.',
    strengths: ['적응력', '사교성', '모험 정신'],
    quote: '인생은 예측할 수 없기에 아름답다.',
    color: '#4facfe',
  },
};

export function calculateResult(answers: Array<'A' | 'B' | 'C' | 'D'>): ResultType {
  const counts = { A: 0, B: 0, C: 0, D: 0 };

  answers.forEach((answer) => {
    counts[answer]++;
  });

  const isIntrovert = counts['A'] >= counts['B'];
  const isPlanner = counts['C'] >= counts['D'];

  if (isIntrovert && isPlanner) return results['introvert-planner'];
  if (isIntrovert && !isPlanner) return results['introvert-spontaneous'];
  if (!isIntrovert && isPlanner) return results['extrovert-planner'];
  return results['extrovert-spontaneous'];
}
