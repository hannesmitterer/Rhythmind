import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  googleClientId: process.env.GOOGLE_CLIENT_ID || '',
  
  // Role allowlists from environment variables (comma-separated emails)
  seedbringerAllowlist: (process.env.SEEDBRINGER_ALLOWLIST || '').split(',').map(e => e.trim()).filter(Boolean),
  councilAllowlist: (process.env.COUNCIL_ALLOWLIST || '').split(',').map(e => e.trim()).filter(Boolean),
  
  nodeEnv: process.env.NODE_ENV || 'development',
};

// Validation
if (!config.googleClientId && config.nodeEnv === 'production') {
  console.warn('WARNING: GOOGLE_CLIENT_ID is not set. Google authentication will not work.');
}

export default config;
