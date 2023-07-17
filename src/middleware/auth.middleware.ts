import { Request, Response, NextFunction } from 'express';

interface SessionData {
  user: string; // Update the type based on your actual user object
  // Add other properties if needed
}

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const sessionData = req.session as Partial<SessionData>;
  if (sessionData.user) {
    // User is logged in, proceed to the next middleware or route handler
    next();
  } else {
    // User is not logged in, return unauthorized response
    res.status(401).json({ message: 'Unauthorized' });
  }
};
