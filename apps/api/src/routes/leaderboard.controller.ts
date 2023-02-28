import { LeaderboardService } from '@couragames/api/services';
import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
  const baseTemplate = {
    title: 'Tic Tac Toe',
    period: 'Weekly',
    global: [
      { username: 'bob', points: 2034 },
      { username: 'dan', points: 2000 },
      { username: 'Diectasis', points: 1964 },
      { username: 'Parentalia', points: 1823 },
      { username: 'bob', points: 1520 },
      { username: 'francis', points: 1204 },
      { username: 'Expiate', points: 985 },
      { username: 'Expiate', points: 765 },
      { username: 'Expiate', points: 655 },
      { username: 'Expiate', points: 598 },
    ],
    weekly: [
      { username: 'dan', points: 350 },
      { username: 'bob', points: 231 },
      { username: 'jim', points: 189 },
      { username: 'francis', points: 150 },
      { username: 'Diectasis', points: 145 },
      { username: 'Parentalia', points: 144 },
      { username: 'CwaterRumpa', points: 116 },
      { username: 'Radicolous', points: 103 },
      { username: 'GyrfalconKo', points: 95 },
      { username: 'Expiate', points: 55 },
    ],
    daily: [
      { username: 'dan', points: 50 },
      { username: 'bob', points: 33 },
      { username: 'jim', points: 22 },
      { username: 'francis', points: 20 },
      { username: 'Diectasis', points: 20 },
      { username: 'Parentalia', points: 19 },
      { username: 'CwaterRumpa', points: 15 },
      { username: 'Radicolous', points: 14 },
      { username: 'GyrfalconKo', points: 13 },
      { username: 'Expiate', points: 5 },
    ],
  };
  const templateLeaderboard = [
    { ...baseTemplate },
    { ...baseTemplate, title: 'Memory Game' },
  ];
  res.send(templateLeaderboard);
});

router.get('/test', async (req, res) => {
  const data = await LeaderboardService.fetchLeaderboards();
  console.log(data);
  res.send({ data: Object.fromEntries(data) });
});

export { router };
