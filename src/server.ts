import express, { Request, Response } from 'express';
import cors from 'cors';
import config from './config';
import { 
  verifyGoogleToken, 
  requireSeedbringer, 
  requireCouncil,
  AuthenticatedRequest 
} from './middleware/googleAuth';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Health check endpoint (no auth required)
app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// GET /sfi - Requires Council role
app.get('/sfi', verifyGoogleToken, requireCouncil, (req: AuthenticatedRequest, res: Response) => {
  res.json({
    message: 'SFI access granted',
    user: req.user,
    endpoint: '/sfi',
    role: 'council'
  });
});

// GET /mcl/live - Requires Council role
app.get('/mcl/live', verifyGoogleToken, requireCouncil, (req: AuthenticatedRequest, res: Response) => {
  res.json({
    message: 'MCL Live access granted',
    user: req.user,
    endpoint: '/mcl/live',
    role: 'council',
    data: {
      status: 'live',
      timestamp: new Date().toISOString()
    }
  });
});

// POST /allocations - Requires Seedbringer role
app.post('/allocations', verifyGoogleToken, requireSeedbringer, (req: AuthenticatedRequest, res: Response) => {
  res.json({
    message: 'Allocation request received',
    user: req.user,
    endpoint: '/allocations',
    role: 'seedbringer',
    payload: req.body,
    timestamp: new Date().toISOString()
  });
});

// Error handling
app.use((err: Error, _req: Request, res: Response, _next: express.NextFunction) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
const PORT = config.port;
app.listen(PORT, () => {
  console.log(`🚀 Rhythmind backend server running on port ${PORT}`);
  console.log(`📋 Environment: ${config.nodeEnv}`);
  console.log(`🔐 Google Client ID configured: ${!!config.googleClientId}`);
  console.log(`👥 Seedbringer allowlist: ${config.seedbringerAllowlist.length} emails`);
  console.log(`🏛️  Council allowlist: ${config.councilAllowlist.length} emails`);
});

export default app;
