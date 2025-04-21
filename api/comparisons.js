import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { savedComparisons, sharedComparisons } from '../drizzle/schema.js';
import { eq } from 'drizzle-orm';
import { randomUUID } from 'crypto';
import * as Sentry from '@sentry/node';

// Initialize Sentry
Sentry.init({
  dsn: process.env.VITE_PUBLIC_SENTRY_DSN,
  environment: process.env.VITE_PUBLIC_APP_ENV,
  initialScope: {
    tags: {
      type: 'backend',
      projectId: process.env.VITE_PUBLIC_APP_ID
    }
  }
});

export default async function handler(req, res) {
  console.log('API: /api/comparisons called with method:', req.method);
  
  try {
    // Connect to database
    const client = postgres(process.env.COCKROACH_DB_URL);
    const db = drizzle(client);
    
    // Save a comparison
    if (req.method === 'POST' && req.url.includes('/save')) {
      console.log('Saving comparison');
      
      const { userId, name, shoes, customColumns } = req.body;
      
      if (!userId || !shoes || !Array.isArray(shoes) || shoes.length === 0) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
      
      const result = await db.insert(savedComparisons)
        .values({
          userId,
          name: name || `Comparison ${new Date().toLocaleDateString()}`,
          shoes: shoes,
          customColumns: customColumns || {}
        })
        .returning();
        
      return res.status(201).json(result[0]);
    }
    
    // Create a shareable link
    if (req.method === 'POST' && req.url.includes('/share')) {
      console.log('Creating shareable comparison');
      
      const { comparisonId, userId, shoes, customColumns, expirationDays } = req.body;
      
      // Need either a saved comparison ID or direct shoe list
      if ((!comparisonId && (!shoes || !Array.isArray(shoes) || shoes.length === 0))) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
      
      // Generate a unique ID for the share URL
      const shareId = randomUUID();
      
      // Calculate expiration date if provided
      let expiresAt = null;
      if (expirationDays) {
        expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + expirationDays);
      }
      
      const result = await db.insert(sharedComparisons)
        .values({
          id: shareId,
          comparisonId: comparisonId || null,
          userId: userId || null,
          shoes: shoes || null,
          customColumns: customColumns || {},
          expiresAt
        })
        .returning();
        
      // Generate the shareable URL
      const shareUrl = `${process.env.BASE_URL || 'https://running-comparison.zapt.ai'}/compare/${shareId}`;
      
      return res.status(201).json({
        id: result[0].id,
        url: shareUrl,
        expiresAt: result[0].expiresAt
      });
    }
    
    // Get a comparison by ID
    if (req.method === 'GET' && req.query.id) {
      const { id } = req.query;
      console.log(`Fetching comparison with ID: ${id}`);
      
      // First check if it's a shared comparison
      let result = await db.select()
        .from(sharedComparisons)
        .where(eq(sharedComparisons.id, id))
        .limit(1);
        
      if (result.length > 0) {
        // Check if expired
        if (result[0].expiresAt && new Date(result[0].expiresAt) < new Date()) {
          return res.status(404).json({ error: 'This shared comparison has expired' });
        }
        
        // If it references a saved comparison, fetch that
        if (result[0].comparisonId) {
          const savedResult = await db.select()
            .from(savedComparisons)
            .where(eq(savedComparisons.id, result[0].comparisonId))
            .limit(1);
            
          if (savedResult.length > 0) {
            return res.status(200).json({
              ...savedResult[0],
              isShared: true,
              shareId: id
            });
          }
        }
        
        // Just return the shared data directly
        return res.status(200).json({
          ...result[0],
          isShared: true
        });
      }
      
      // If not found in shared, check saved comparisons
      result = await db.select()
        .from(savedComparisons)
        .where(eq(savedComparisons.id, parseInt(id)))
        .limit(1);
        
      if (result.length > 0) {
        return res.status(200).json(result[0]);
      }
      
      return res.status(404).json({ error: 'Comparison not found' });
    }
    
    // Get all comparisons for a user
    if (req.method === 'GET' && req.query.userId) {
      const { userId } = req.query;
      console.log(`Fetching comparisons for user: ${userId}`);
      
      const result = await db.select()
        .from(savedComparisons)
        .where(eq(savedComparisons.userId, userId))
        .orderBy(savedComparisons.createdAt);
        
      return res.status(200).json(result);
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Error in comparisons API:', error);
    Sentry.captureException(error, {
      extra: {
        route: '/api/comparisons',
        method: req.method,
        query: req.query,
        body: req.body
      }
    });
    return res.status(500).json({ error: 'Internal server error' });
  }
}