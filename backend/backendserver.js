// backend/backendserver.js

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Sample odds data
app.get('/api/odds/live', (req, res) => {
  res.json([
    {
      eventId: 'abc123',
      sport: 'Football',
      league: 'NFL',
      timestamp: new Date().toISOString(),
      teams: [
        {
          teamId: 't1',
          name: 'Chiefs',
          odds: -150,
          lineType: 'moneyline',
          updated: new Date().toISOString()
        },
        {
          teamId: 't2',
          name: 'Eagles',
          odds: +130,
          lineType: 'moneyline',
          updated: new Date().toISOString()
        }
      ],
      markets: [
        {
          marketId: 'm1',
          marketType: 'total',
          line: 48.5,
          odds: {
            home: -110,
            away: -110
          }
        },
        {
          marketId: 'm2',
          marketType: 'spread',
          line: -3.5,
          odds: {
            home: -115,
            away: -105
          }
        }
      ]
    }
  ]);
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Backend server running at http://localhost:${PORT}`);
});
