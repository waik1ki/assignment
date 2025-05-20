// AUTH
db = db.getSiblingDB('auth');
db.users.insertMany([
  {
    _id: ObjectId('68299826b452143c10e177f2'),
    email: 'user@tmail.ws',
    password: '$2b$10$SmMo5BRueXKl2l.KJbIkrOIBgO5vY5QIhqaXYhQW8V2tluDq7Z4Em',
    role: 'USER',
    createdAt: ISODate('2025-05-18T08:19:50.552Z'),
    updatedAt: ISODate('2025-05-18T11:10:54.659Z'),
    __v: 0,
  },
  {
    _id: ObjectId('6829982fb452143c10e177f5'),
    email: 'admin@tmail.ws',
    password: '$2b$10$wZH79T6KXXy8E1W8edc7.OXqP2NicWS/gH0kaXx.NVW4qYB28PQMa',
    role: 'ADMIN',
    createdAt: ISODate('2025-05-18T08:19:59.684Z'),
    updatedAt: ISODate('2025-05-18T08:28:06.811Z'),
    __v: 0,
  },
  {
    _id: ObjectId('682bd0551d1a3ce224e337b0'),
    email: 'operator@tmail.ws',
    password: '$2b$10$SmMo5BRueXKl2l.KJbIkrOIBgO5vY5QIhqaXYhQW8V2tluDq7Z4Em',
    role: 'OPERATOR',
    createdAt: ISODate('2025-05-18T08:19:50.552Z'),
    updatedAt: ISODate('2025-05-18T11:10:54.659Z'),
    __v: 0,
  },
  {
    _id: ObjectId('682bd08b1d1a3ce224e337b1'),
    email: 'auditor@tmail.ws',
    password: '$2b$10$SmMo5BRueXKl2l.KJbIkrOIBgO5vY5QIhqaXYhQW8V2tluDq7Z4Em',
    role: 'AUDITOR',
    createdAt: ISODate('2025-05-18T08:19:50.552Z'),
    updatedAt: ISODate('2025-05-18T11:10:54.659Z'),
    __v: 0,
  },
]);

// EVENT
db = db.getSiblingDB('event');
db.events.insertMany([
  {
    _id: ObjectId('6829c446a50df3fea2f80d0b'),
    code: 'FL01',
    title: '첫 로그인 이벤트',
    startAt: ISODate('2025-05-18T00:00:00.000Z'),
    endAt: ISODate('2025-12-31T00:00:00.000Z'),
    isActive: true,
    conditions: [
      {
        type: 'LOGIN',
        count: '1',
        calculation: 'COUNT',
      },
    ],
    rewards: [ObjectId('682ab0437a0b041f25a757a2')],
    createdAt: ISODate('2025-05-18T11:28:06.268Z'),
    updatedAt: ISODate('2025-05-18T12:51:15.895Z'),
    __v: 0,
  },
]);

db.rewards.insertMany([
  {
    _id: ObjectId('682ab0437a0b041f25a757a2'),
    code: 'POINT1000',
    label: '포인트 지급',
    params: {
      id: '포인트-id',
      count: 1000,
    },
    createdBy: ObjectId('6829e4de477dec2bf766b939'),
    createdAt: ISODate('2025-05-19T04:14:59.523Z'),
    updatedAt: ISODate('2025-05-19T04:14:59.523Z'),
    __v: 0,
    description: '1000포인트를 지급합니다.',
  },
  {
    _id: ObjectId('6829e4de477dec2bf766b93d'),
    code: 'ITEM0001',
    label: '아이템 지급',
    description: '인게임 아이템을 지급합니다.',
    __v: 0,
    createdAt: ISODate('2025-05-18T13:47:10.075Z'),
    updatedAt: ISODate('2025-05-18T13:47:10.075Z'),
    params: {
      id: '아이템-id',
      count: 1,
    },
    createdBy: ObjectId('6829e4de477dec2bf766b939'),
  },
]);
