export interface Question {
  id: number;
  text: string;
  optionA: {
    text: string;
    type: 'A' | 'B' | 'C' | 'D';
  };
  optionB: {
    text: string;
    type: 'A' | 'B' | 'C' | 'D';
  };
}

export const questions: Question[] = [
  {
    id: 1,
    text: "주말 아침, 당신은 어떻게 시간을 보내고 싶나요?",
    optionA: { text: "조용히 혼자만의 시간을 즐긴다", type: 'A' },
    optionB: { text: "친구들과 브런치 약속을 잡는다", type: 'B' },
  },
  {
    id: 2,
    text: "새로운 일을 시작할 때 당신은?",
    optionA: { text: "계획을 꼼꼼히 세운 후 시작한다", type: 'C' },
    optionB: { text: "일단 시작하고 진행하며 수정한다", type: 'D' },
  },
  {
    id: 3,
    text: "스트레스를 받을 때 당신의 해소 방법은?",
    optionA: { text: "책을 읽거나 음악을 듣는다", type: 'A' },
    optionB: { text: "운동을 하거나 사람들을 만난다", type: 'B' },
  },
  {
    id: 4,
    text: "중요한 결정을 내릴 때 당신은?",
    optionA: { text: "논리적으로 장단점을 분석한다", type: 'C' },
    optionB: { text: "직감과 느낌을 따른다", type: 'D' },
  },
  {
    id: 5,
    text: "책을 고를 때 당신은?",
    optionA: { text: "베스트셀러나 추천 목록을 참고한다", type: 'C' },
    optionB: { text: "표지나 첫 문장의 느낌으로 고른다", type: 'D' },
  },
];
