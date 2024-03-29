export const projectList = [
  {
    id: 1,
    title: '리얼리티 바이츠',
    color: '#FE3E83',
    period_start: '2023-02-01',
    period_end: '2025-01-31',
    managerId: 1, 
    artistsId: [1, 2, 3, 4, 5],
    price: 21850000000,
    status: [{ value: [125, 720] }, { value: [946, 1350] }, { value: [7412, 7250] }, { value: [7312, 12372] }],
    prices: [{ value: 158 }, { value: 78 }, { value: 1200500000 }, { value: 35500000 }],
    userLog: [
      {
        time: '30분 전',
        userId: 4,
        contents: 'TASK #30244-1223 3시간 업무내역을 추가했습니다.',
      },
      {
        time: '29분 전',
        userId: 1,
        contents: 'TASK #30211을 완료처리하였습니다.',
      },
      {
        time: '28분 전',
        userId: 4,
        contents: 'TASK #30211-1133을 완료하였습니다.',
      },
    ],     
  },
  {
    id: 2,
    title: '별들에게 물어봐',
    color: '#2256FC',
    period_start: '2021-10-13',
    period_end: '2025-07-04',
    managerId: 2, 
    artistsId: [1, 3, 4],
    price: 1254000000,
    status: [{ value: [625, 915] }, { value: [457, 3163] }, { value: [25034, 14312] }, { value: [5034, 3478] }],
    prices: [{ value: 32 }, { value: 24 }, { value: 15000000000 }, { value: 1900000 }],
    userLog: [
      {
        time: '30분 전',
        userId: 4,
        contents: 'TASK #30244-1223 3시간 업무내역을 추가했습니다.',
      },
      {
        time: '29분 전',
        userId: 1,
        contents: 'TASK #30211을 완료처리하였습니다.',
      },
      {
        time: '28분 전',
        userId: 4,
        contents: 'TASK #30211-1133을 완료하였습니다.',
      },
    ],      
  },
  {
    id: 3,
    title: '기생충',
    color: '#6E757D',
    period_start: '2021-12-24',
    period_end: '2024-02-15',
    managerId: 4, 
    artistsId: [1, 2, 5],
    price: 3512000000,
    status: [{ value: [1372, 1371] }, { value: [679, 3163] }, { value: [3145, 12112] }, { value: [3145, 19374] }],
    prices: [{ value: 63 }, { value: 59 }, { value: 32500000000 }, { value: 73500000 }],
    userLog: [],
  },
  {
    id: 4,
    title: '수사반장',
    color: '#8CD9D8',
    period_start: '2022-08-15',
    period_end: '2026-04-24',
    managerId: 5, 
    artistsId: [2, 3],
    price: 675421000,
    status: [{ value: [4238, 19573] }, { value: [7326, 32163] }, { value: [3145, 5644] }, { value: [3145, 92173] }],
    prices: [{ value: 100 }, { value: 128 }, { value: 24030000000 }, { value: 685000000 }],
    userLog: [],
  }
];

export const projectLogList = [
  {
    id: 1, time: '30분전', projectId: 1, artistId: 4, contents: 'TASK #30244-1223 3시간 업무내역을 추가했습니다.'
  },
  {
    id: 2, time: '29분전', projectId: 1, artistId: 1, contents: 'TASK #30211을 완료처리하였습니다.'
  },
  {
    id: 3, time: '28분전', projectId: 1, artistId: 4, contents: 'TASK #30211-1133을 완료하였습니다.'
  },
];
  
export const artistList = [
  {
    id: 1,
    name: '김세환',
    title: '이사',
    works: '3D',
    join: '2021-04-20',
    email: 'misskiwi@darunson.co.kr',
    lastLogin: '2024-03-01T12:47:00',
    project: ['별들에게 물어봐', '수사반장', '리얼리티 바이츠'],   
  },
  {
    id: 2,
    name: '최영욱',
    title: '부장',
    works: '애셋',
    join: '2021-04-13',
    email: 'bluehaii@darunson.co.kr',
    lastLogin: '2024-02-28T18:33:00',
    project: ['리얼리티 바이츠']
  },
  {
    id: 3,
    name: '김상윤',
    title: '과장',
    works: '3D',
    join: '2022-08-15',
    email: 'cracklove@darunson.co.kr',
    lastLogin: '2024-02-25T13:15:00',
    project: ['리얼리티 바이츠', '기생충']
  },
  {
    id: 4,
    name: '홍석근',
    title: '대리',
    works: '3D, 애셋',
    join: '2023-01-20',
    email: 'hongk3014@darunson.co.kr',
    lastLogin: '2024-03-14T08:27:00',
    project: ['별들에게 물어봐','리얼리티 바이츠']
  },  
  {
    id: 5,
    name: '이훈',
    title: '대리',
    works: '3D, 애셋',
    join: '2023-09-20',
    email: 'hoonlee@darunson.co.kr',
    lastLogin: '2024-02-28T18:33:00',
    project: ['별들에게 물어봐']
  }
];

export const artistLogList = [
  {
    id: 1, 
    artistId: 1,
    time: '30분 전',
    type: '업무관리',
    desc: '2023년 3월 1일 리얼리티 바이츠 3D 업무내역을 추가하였습니다.',
  },
  {
    id: 2, 
    artistId: 2,
    time: '29분 전',
    type: '업무관리',
    desc: '2023년 3월 1일 기생충 3D 업무내역을 추가하였습니다.',
  },
  {
    id: 3, 
    artistId: 3,
    time: '28분 전',
    type: '업무관리',
    desc: '2023년 3월 1일 별들에게 물어봐 ASSET 업무내역을 추가하였습니다.',
  },
  {
    id: 4, 
    artistId: 2,
    time: '26분 전',
    type: '업무관리',
    desc: '2023년 3월 1일 수사반장 COMP 업무내역을 추가하였습니다.',
  },
  {
    id: 5, 
    artistId: 2,
    time: '22분 전',
    type: '접속',
    desc: '218.142.33.17 에서 로그인 하였습니다.',
  }
];  

export const pipeCode = [
  { id: 1, title: '3D', description: '3D 업무' },
  { id: 2, title: 'PUB', description: '퍼블리싱' },
  { id: 3, title: 'LIGHT', description: '조명' },  
  { id: 4, title: 'ANIMATION', description: '애니메이션' },
  { id: 5, title: 'COMP', description: '합성' },  
];

export const statusCode = [
  { id: 1, title: 'ASN', description: '배정' },  
  { id: 2, title: 'WIP', description: '작업중' },
  { id: 3, title: 'SENT', description: '발송' },
  { id: 4, title: 'DIR', description: '감독확인' },  
  { id: 5, title: 'DONE', description: '완료' },  
];

export const taskList = [
  { id: 1, title: '#10140', projectId: 1, statusCode: 5 },
  { id: 2, title: '#10165', projectId: 1, statusCode: 4 },
  { id: 3, title: '#10224', projectId: 1, statusCode: 4 },
  { id: 4, title: '#10227', projectId: 1, statusCode: 3 },
  { id: 5, title: '#20145', projectId: 2, statusCode: 4 },
  { id: 6, title: '#20213', projectId: 2, statusCode: 3 },
  { id: 7, title: '#20248', projectId: 2, statusCode: 3 },
  { id: 8, title: '#20292', projectId: 2, statusCode: 1 },
  { id: 9, title: '#20317', projectId: 2, statusCode: 1 },
  { id: 10, title: '#30124', projectId: 3, statusCode: 5 },
  { id: 11, title: '#30275', projectId: 3, statusCode: 5 },
  { id: 12, title: '#30392', projectId: 3, statusCode: 3 },
  { id: 13, title: '#30416', projectId: 3, statusCode: 3 },
  { id: 14, title: '#40115', projectId: 4, statusCode: 5 },
  { id: 15, title: '#40245', projectId: 4, statusCode: 5 },
  { id: 16, title: '#40312', projectId: 4, statusCode: 5 },
  { id: 17, title: '#50105', projectId: 5, statusCode: 5 },
  { id: 18, title: '#50112', projectId: 5, statusCode: 5 },
  { id: 19, title: '#50124', projectId: 5, statusCode: 4 },
  { id: 20, title: '#50181', projectId: 5, statusCode: 2 },
];

export const pipeList = [
  { id: 1, taskId: 1, pipeCode: 1, statusCode: 5 },
  { id: 2, taskId: 1, pipeCode: 3, statusCode: 5 },
  { id: 3, taskId: 1, pipeCode: 5, statusCode: 2 },
  { id: 4, taskId: 2, pipeCode: 1, statusCode: 2 },
  { id: 5, taskId: 2, pipeCode: 5, statusCode: 2 },
  { id: 6, taskId: 3, pipeCode: 5, statusCode: 1 },
  { id: 7, taskId: 3, pipeCode: 1, statusCode: 1 },
  { id: 8, taskId: 3, pipeCode: 2, statusCode: 1 },
  { id: 9, taskId: 3, pipeCode: 3, statusCode: 1 },
  { id: 10, taskId: 4, pipeCode: 1, statusCode: 1 },
  { id: 11, taskId: 4, pipeCode: 2, statusCode: 1 },
  { id: 12, taskId: 4, pipeCode: 4, statusCode: 1 },
  { id: 13, taskId: 4, pipeCode: 3, statusCode: 1 },
  { id: 14, taskId: 5, pipeCode: 1, statusCode: 2 },
  { id: 15, taskId: 5, pipeCode: 4, statusCode: 2 },
  { id: 16, taskId: 5, pipeCode: 2, statusCode: 1 },
  { id: 17, taskId: 6, pipeCode: 5, statusCode: 2 },
  { id: 18, taskId: 6, pipeCode: 3, statusCode: 2 },
  { id: 19, taskId: 6, pipeCode: 2, statusCode: 1 },
  { id: 20, taskId: 7, pipeCode: 1, statusCode: 1 },
  { id: 21, taskId: 7, pipeCode: 2, statusCode: 1 },
  { id: 22, taskId: 8, pipeCode: 1, statusCode: 3 },
  { id: 23, taskId: 9, pipeCode: 1, statusCode: 3 },
  { id: 24, taskId: 9, pipeCode: 3, statusCode: 1 },
  { id: 25, taskId: 9, pipeCode: 2, statusCode: 1 },
  { id: 26, taskId: 10, pipeCode: 1, statusCode: 1 },
  { id: 27, taskId: 10, pipeCode: 3, statusCode: 1 },
  { id: 28, taskId: 11, pipeCode: 2, statusCode: 1 },
  { id: 29, taskId: 11, pipeCode: 2, statusCode: 1 },
  { id: 30, taskId: 12, pipeCode: 4, statusCode: 1 },
  { id: 31, taskId: 13, pipeCode: 3, statusCode: 1 },
];

export const workList = [
  { id: 1, pipeId: 1, artistId: 5, hours: 6, date: '2024-03-01' },
  { id: 2, pipeId: 1, artistId: 5, hours: 2, date: '2024-03-03' },
  { id: 3, pipeId: 6, artistId: 5, hours: 3, date: '2024-03-01' },
  { id: 4, pipeId: 2, artistId: 5, hours: 2, date: '2024-03-05' },
  { id: 5, pipeId: 3, artistId: 3, hours: 4, date: '2024-03-06' },
  { id: 6, pipeId: 4, artistId: 4, hours: 2, date: '2024-03-06' },
  { id: 7, pipeId: 5, artistId: 3, hours: 12, date: '2024-03-07' },
  { id: 8, pipeId: 5, artistId: 3, hours: 2, date: '2024-03-08' },
  { id: 9, pipeId: 7, artistId: 2, hours: 0, date: '' },
]