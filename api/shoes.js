import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { shoes, shoeScores, reviews } from '../drizzle/schema.js';
import { eq } from 'drizzle-orm';
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
  console.log('API: /api/shoes called with method:', req.method);
  
  try {
    // Connect to database
    const client = postgres(process.env.COCKROACH_DB_URL);
    const db = drizzle(client);
    
    if (req.method === 'GET') {
      const shoeId = req.query.id;
      
      // Get a single shoe
      if (shoeId) {
        console.log(`Fetching shoe with ID: ${shoeId}`);
        
        const shoeData = await db.select()
          .from(shoes)
          .where(eq(shoes.id, parseInt(shoeId)))
          .limit(1);
          
        if (shoeData.length === 0) {
          return res.status(404).json({ error: 'Shoe not found' });
        }
        
        // Get shoe scores
        const scoreData = await db.select()
          .from(shoeScores)
          .where(eq(shoeScores.shoeId, parseInt(shoeId)))
          .limit(1);
          
        // Get shoe reviews
        const reviewData = await db.select()
          .from(reviews)
          .where(eq(reviews.shoeId, parseInt(shoeId)))
          .limit(50);
          
        // Combine data
        const combinedData = {
          ...shoeData[0],
          scores: scoreData[0] || {},
          reviews: reviewData || []
        };
        
        return res.status(200).json(combinedData);
      }
      
      // Get all shoes (with pagination)
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 20;
      const offset = (page - 1) * limit;
      
      console.log(`Fetching shoes, page: ${page}, limit: ${limit}`);
      
      const shoeData = await db.select()
        .from(shoes)
        .limit(limit)
        .offset(offset);
        
      const totalCount = await db.select({ count: shoes.id })
        .from(shoes);
        
      return res.status(200).json({
        shoes: shoeData,
        pagination: {
          page,
          limit,
          total: totalCount.length,
          totalPages: Math.ceil(totalCount.length / limit)
        }
      });
    }
    
    // Handle comparison endpoint
    if (req.method === 'POST' && req.url.includes('/compare')) {
      console.log('Processing shoe comparison request');
      
      const { shoeIds } = req.body;
      
      if (!shoeIds || !Array.isArray(shoeIds) || shoeIds.length === 0) {
        return res.status(400).json({ error: 'Invalid or missing shoe IDs' });
      }
      
      const shoeData = await Promise.all(
        shoeIds.map(async (id) => {
          const shoe = await db.select()
            .from(shoes)
            .where(eq(shoes.id, parseInt(id)))
            .limit(1);
            
          const score = await db.select()
            .from(shoeScores)
            .where(eq(shoeScores.shoeId, parseInt(id)))
            .limit(1);
            
          return {
            ...shoe[0],
            scores: score[0] || {}
          };
        })
      );
      
      return res.status(200).json(shoeData);
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Error in shoes API:', error);
    Sentry.captureException(error, {
      extra: {
        route: '/api/shoes',
        method: req.method,
        query: req.query,
        body: req.body
      }
    });
    return res.status(500).json({ error: 'Internal server error' });
  }
}