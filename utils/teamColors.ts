export interface TeamColor {
  id: string
  name: string
  nameEn: string
  primary: string
  secondary: string
  textColor: string
  bgColor: string
  pastelBg: string
  accentColor: string
  description: string
}

export const TEAM_COLORS: Record<string, TeamColor> = {
  'fc-seoul': {
    id: 'fc-seoul',
    name: 'FC서울',
    nameEn: 'FC Seoul',
    primary: '#000000',
    secondary: '#FF0000',
    textColor: '#FFFFFF',
    bgColor: '#1a1a1a',
    pastelBg: '#FFF5F5',
    accentColor: '#E53E3E',
    description: '검정과 빨강의 조화',
  },
  'ulsan-hd': {
    id: 'ulsan-hd',
    name: '울산HD',
    nameEn: 'Ulsan HD',
    primary: '#0066CC',
    secondary: '#FFFFFF',
    textColor: '#FFFFFF',
    bgColor: '#003399',
    pastelBg: '#EBF8FF',
    accentColor: '#3182CE',
    description: '파란색의 강렬함',
  },
  'jeonbuk-hyundai': {
    id: 'jeonbuk-hyundai',
    name: '전북현대',
    nameEn: 'Jeonbuk Hyundai',
    primary: '#00AA44',
    secondary: '#FFFFFF',
    textColor: '#FFFFFF',
    bgColor: '#006633',
    pastelBg: '#F0FDF4',
    accentColor: '#22C55E',
    description: '초록색의 생명력',
  },
  'gangwon-fc': {
    id: 'gangwon-fc',
    name: '강원FC',
    nameEn: 'Gangwon FC',
    primary: '#FF9900',
    secondary: '#FFFFFF',
    textColor: '#FFFFFF',
    bgColor: '#CC6600',
    pastelBg: '#FEF3C7',
    accentColor: '#F59E0B',
    description: '주황색의 열정',
  },
  'pohang-steelers': {
    id: 'pohang-steelers',
    name: '포항스틸러스',
    nameEn: 'Pohang Steelers',
    primary: '#000000',
    secondary: '#FF0000',
    textColor: '#FFFFFF',
    bgColor: '#1a1a1a',
    pastelBg: '#FFF5F5',
    accentColor: '#E53E3E',
    description: '검정과 빨강의 강철',
  },
  'incheon-united': {
    id: 'incheon-united',
    name: '인천유나이티드',
    nameEn: 'Incheon United',
    primary: '#0066CC',
    secondary: '#000000',
    textColor: '#FFFFFF',
    bgColor: '#003366',
    pastelBg: '#EBF8FF',
    accentColor: '#3182CE',
    description: '파랑과 검정의 조화',
  },
  'fc-anyang': {
    id: 'fc-anyang',
    name: 'FC안양',
    nameEn: 'FC Anyang',
    primary: '#6633CC',
    secondary: '#FFFFFF',
    textColor: '#FFFFFF',
    bgColor: '#4d0099',
    pastelBg: '#FAF5FF',
    accentColor: '#9333EA',
    description: '보라색의 신비로움',
  },
  'jeju-united': {
    id: 'jeju-united',
    name: '제주유나이티드',
    nameEn: 'Jeju United',
    primary: '#FF9900',
    secondary: '#FFFFFF',
    textColor: '#FFFFFF',
    bgColor: '#CC6600',
    pastelBg: '#FEF3C7',
    accentColor: '#F59E0B',
    description: '주황색의 태양',
  },
  'bucheon-fc': {
    id: 'bucheon-fc',
    name: '부천FC1995',
    nameEn: 'Bucheon FC 1995',
    primary: '#FF0000',
    secondary: '#FFFFFF',
    textColor: '#FFFFFF',
    bgColor: '#CC0000',
    pastelBg: '#FFF5F5',
    accentColor: '#E53E3E',
    description: '빨강의 열정',
  },
  'daejeon-hana': {
    id: 'daejeon-hana',
    name: '대전하나시티즌',
    nameEn: 'Daejeon Hana Citizen',
    primary: '#663366',
    secondary: '#00AA44',
    textColor: '#FFFFFF',
    bgColor: '#4d2d4d',
    pastelBg: '#FAF5FF',
    accentColor: '#9333EA',
    description: '자주와 초록의 조화',
  },
  'gimcheon-sangmu': {
    id: 'gimcheon-sangmu',
    name: '김천상무',
    nameEn: 'Gimcheon Sangmu',
    primary: '#FF0000',
    secondary: '#000066',
    textColor: '#FFFFFF',
    bgColor: '#990000',
    pastelBg: '#FFF5F5',
    accentColor: '#E53E3E',
    description: '빨강과 남색의 조화',
  },
  'gwangju-fc': {
    id: 'gwangju-fc',
    name: '광주FC',
    nameEn: 'Gwangju FC',
    primary: '#FFCC00',
    secondary: '#FF0000',
    textColor: '#000000',
    bgColor: '#FFE680',
    pastelBg: '#FFFBEB',
    accentColor: '#FBBF24',
    description: '노랑과 빨강의 조화',
  },
}

export function getTeamColor(teamId: string): TeamColor {
  return TEAM_COLORS[teamId] || TEAM_COLORS['fc-seoul']
}

export function getTeamColorByName(teamName: string): TeamColor {
  const entry = Object.entries(TEAM_COLORS).find(
    ([_, color]) => color.name === teamName || color.nameEn === teamName
  )
  return entry ? entry[1] : TEAM_COLORS['fc-seoul']
}
