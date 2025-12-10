import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { serviceItems } from '@/db/schema';
import { eq, like, or, and, asc } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');
    const serviceId = searchParams.get('serviceId');
    const search = searchParams.get('search');
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '50'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');

    // Single record fetch by ID
    if (id) {
      const item = await db.select().from(serviceItems).where(eq(serviceItems.id, parseInt(id))).limit(1);

      if (item.length === 0) {
        return NextResponse.json({ 
          error: 'Service item not found',
          code: "ITEM_NOT_FOUND" 
        }, { status: 404 });
      }

      return NextResponse.json(item[0]);
    }

    // Build filter conditions
    const conditions: any[] = [];

    // Filter by serviceId
    if (serviceId) {
      conditions.push(eq(serviceItems.serviceId, parseInt(serviceId)));
    }

    // Search condition
    if (search) {
      conditions.push(
        or(
          like(serviceItems.title, `%${search}%`),
          like(serviceItems.icon, `%${search}%`)
        )
      );
    }

    // Execute query
    let query = db.select().from(serviceItems);

    if (conditions.length > 0) {
      query = query.where(conditions.length === 1 ? conditions[0] : and(...conditions)) as typeof query;
    }

    const results = await query
      .orderBy(asc(serviceItems.displayOrder))
      .limit(limit)
      .offset(offset);

    return NextResponse.json(results);

  } catch (error) {
    console.error('GET service items error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error'),
      code: 'INTERNAL_ERROR'
    }, { status: 500 });
  }
}