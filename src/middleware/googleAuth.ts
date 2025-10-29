import { Request, Response, NextFunction } from 'express';
import { OAuth2Client } from 'google-auth-library';
import config from '../config';

const client = new OAuth2Client(config.googleClientId);

export interface AuthenticatedRequest extends Request {
  user?: {
    email: string;
    name?: string;
    sub: string;
  };
}

/**
 * Middleware to verify Google ID token from Authorization header
 */
export async function verifyGoogleToken(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ error: 'Missing or invalid Authorization header' });
      return;
    }

    const idToken = authHeader.substring(7); // Remove 'Bearer ' prefix

    // Verify the ID token
    const ticket = await client.verifyIdToken({
      idToken,
      audience: config.googleClientId,
    });

    const payload = ticket.getPayload();
    
    if (!payload || !payload.email) {
      res.status(401).json({ error: 'Invalid token payload' });
      return;
    }

    // Attach user info to request
    req.user = {
      email: payload.email,
      name: payload.name,
      sub: payload.sub,
    };

    next();
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(401).json({ error: 'Invalid or expired token' });
  }
}

/**
 * Middleware to check if user is in the Seedbringer allowlist
 */
export function requireSeedbringer(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void {
  if (!req.user) {
    res.status(401).json({ error: 'Authentication required' });
    return;
  }

  const isAllowed = config.seedbringerAllowlist.includes(req.user.email);
  
  if (!isAllowed) {
    res.status(403).json({ 
      error: 'Forbidden: Seedbringer role required',
      requiredRole: 'seedbringer'
    });
    return;
  }

  next();
}

/**
 * Middleware to check if user is in the Council allowlist
 */
export function requireCouncil(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void {
  if (!req.user) {
    res.status(401).json({ error: 'Authentication required' });
    return;
  }

  const isAllowed = config.councilAllowlist.includes(req.user.email);
  
  if (!isAllowed) {
    res.status(403).json({ 
      error: 'Forbidden: Council role required',
      requiredRole: 'council'
    });
    return;
  }

  next();
}
