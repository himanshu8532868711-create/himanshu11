import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { services, serviceItems } from '@/db/schema';
import { eq, asc } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    // Validate ID
    if (!id) {
      return NextResponse.json(
        {
          error: 'Valid ID is required',
          code: 'INVALID_ID',
        },
        { status: 400 }
      );
    }

    // Fetch service by ID
    const service = await db.select().from(services).where(eq(services.id, parseInt(id))).limit(1);

    if (service.length === 0) {
      return NextResponse.json(
        {
          error: 'Service not found',
          code: 'SERVICE_NOT_FOUND',
        },
        { status: 404 }
      );
    }

    // Fetch all related service items ordered by displayOrder
    const items = await db.select().from(serviceItems)
      .where(eq(serviceItems.serviceId, parseInt(id)))
      .orderBy(asc(serviceItems.displayOrder));

    // Return service with items array
    return NextResponse.json({
      ...service[0],
      items
    });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error: ' + (error as Error).message,
      },
      { status: 500 }
    );
  }
}