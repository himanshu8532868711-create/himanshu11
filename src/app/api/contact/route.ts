import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { contactSubmissions } from '@/db/schema';
import { eq, like, and, or, desc, SQL } from 'drizzle-orm';
import {
  createSEOHeaders,
  createSEOResponse,
  generateMetaTags,
  BASE_URL,
} from '@/lib/seo';

const VALID_STATUSES = ['new', 'contacted', 'resolved'];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (id) {
      if (!id || isNaN(parseInt(id))) {
        return NextResponse.json(
          { error: 'Valid ID is required', code: 'INVALID_ID' },
          { status: 400 }
        );
      }

      const submission = await db
        .select()
        .from(contactSubmissions)
        .where(eq(contactSubmissions.id, parseInt(id)))
        .limit(1);

      if (submission.length === 0) {
        return NextResponse.json(
          { error: 'Contact submission not found', code: 'NOT_FOUND' },
          { status: 404 }
        );
      }

      return NextResponse.json(submission[0], { status: 200 });
    }

    const limit = Math.min(parseInt(searchParams.get('limit') ?? '10'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');
    const search = searchParams.get('search');
    const status = searchParams.get('status');

    const conditions: any[] = [];

    if (search) {
      conditions.push(
        or(
          like(contactSubmissions.name, `%${search}%`),
          like(contactSubmissions.email, `%${search}%`),
          like(contactSubmissions.message, `%${search}%`)
        )
      );
    }

    if (status) {
      conditions.push(eq(contactSubmissions.status, status));
    }

    let query = conditions.length > 0
      ? db.select().from(contactSubmissions).where(and(...conditions))
      : db.select().from(contactSubmissions);

    const results = await query
      .orderBy(desc(contactSubmissions.createdAt))
      .limit(limit)
      .offset(offset);

    const metaTags = generateMetaTags({
      title: 'Contact Submissions - Admin',
      description: 'Internal contact form submissions management',
      url: `${BASE_URL}/api/contact`,
    });

    const response = createSEOResponse(results, metaTags, {
      cacheControl: 'private, no-cache, no-store, must-revalidate',
    });

    return response;
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message, status } = body;

    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json(
        { error: 'Name is required and must be a non-empty string', code: 'MISSING_NAME' },
        { status: 400 }
      );
    }

    if (!email || typeof email !== 'string' || email.trim().length === 0) {
      return NextResponse.json(
        { error: 'Email is required and must be a non-empty string', code: 'MISSING_EMAIL' },
        { status: 400 }
      );
    }

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json(
        { error: 'Message is required and must be a non-empty string', code: 'MISSING_MESSAGE' },
        { status: 400 }
      );
    }

    const submissionStatus = status || 'new';

    if (!VALID_STATUSES.includes(submissionStatus)) {
      return NextResponse.json(
        {
          error: `Status must be one of: ${VALID_STATUSES.join(', ')}`,
          code: 'INVALID_STATUS'
        },
        { status: 400 }
      );
    }

    const now = new Date().toISOString();

    const newSubmission = await db
      .insert(contactSubmissions)
      .values({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone ? phone.trim() : null,
        message: message.trim(),
        status: submissionStatus,
        createdAt: now,
        updatedAt: now
      })
      .returning();

    const metaTags = generateMetaTags({
      title: 'Contact Submission Created - Admin',
      description: 'New contact form submission recorded',
      url: `${BASE_URL}/api/contact`,
    });
    const response = createSEOResponse(newSubmission[0], metaTags, {
      cacheControl: 'private, no-cache, no-store, must-revalidate',
    });

    return response;
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: 'Valid ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    const existing = await db
      .select()
      .from(contactSubmissions)
      .where(eq(contactSubmissions.id, parseInt(id)))
      .limit(1);

    if (existing.length === 0) {
      return NextResponse.json(
        { error: 'Contact submission not found', code: 'NOT_FOUND' },
        { status: 404 }
      );
    }

    const body = await request.json();
    const { name, email, phone, message, status } = body;

    const updates: any = {
      updatedAt: new Date().toISOString()
    };

    if (name !== undefined) {
      if (typeof name !== 'string' || name.trim().length === 0) {
        return NextResponse.json(
          { error: 'Name must be a non-empty string', code: 'INVALID_NAME' },
          { status: 400 }
        );
      }
      updates.name = name.trim();
    }

    if (email !== undefined) {
      if (typeof email !== 'string' || email.trim().length === 0) {
        return NextResponse.json(
          { error: 'Email must be a non-empty string', code: 'INVALID_EMAIL' },
          { status: 400 }
        );
      }
      updates.email = email.trim().toLowerCase();
    }

    if (phone !== undefined) {
      updates.phone = phone ? phone.trim() : null;
    }

    if (message !== undefined) {
      if (typeof message !== 'string' || message.trim().length === 0) {
        return NextResponse.json(
          { error: 'Message must be a non-empty string', code: 'INVALID_MESSAGE' },
          { status: 400 }
        );
      }
      updates.message = message.trim();
    }

    if (status !== undefined) {
      if (!VALID_STATUSES.includes(status)) {
        return NextResponse.json(
          {
            error: `Status must be one of: ${VALID_STATUSES.join(', ')}`,
            code: 'INVALID_STATUS'
          },
          { status: 400 }
        );
      }
      updates.status = status;
    }

    const updated = await db
      .update(contactSubmissions)
      .set(updates)
      .where(eq(contactSubmissions.id, parseInt(id)))
      .returning();

    const metaTags = generateMetaTags({
      title: 'Contact Submission Updated - Admin',
      description: 'Contact form submission updated',
      url: `${BASE_URL}/api/contact`,
    });
    const response = createSEOResponse(updated[0], metaTags, {
      cacheControl: 'private, no-cache, no-store, must-revalidate',
    });

    return response;
  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: 'Valid ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    const existing = await db
      .select()
      .from(contactSubmissions)
      .where(eq(contactSubmissions.id, parseInt(id)))
      .limit(1);

    if (existing.length === 0) {
      return NextResponse.json(
        { error: 'Contact submission not found', code: 'NOT_FOUND' },
        { status: 404 }
      );
    }

    const deleted = await db
      .delete(contactSubmissions)
      .where(eq(contactSubmissions.id, parseInt(id)))
      .returning();

    const metaTags = generateMetaTags({
      title: 'Contact Submission Deleted - Admin',
      description: 'Contact form submission deleted',
      url: `${BASE_URL}/api/contact`,
    });
    const response = createSEOResponse(
      {
        message: 'Contact submission deleted successfully',
        deleted: deleted[0]
      },
      metaTags,
      {
        cacheControl: 'private, no-cache, no-store, must-revalidate',
      }
    );

    return response;
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}