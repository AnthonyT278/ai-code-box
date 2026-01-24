import { db } from '@/config/db';
import { coursesTable } from '@/config/schema';
import { NextRequest, NextResponse} from 'next/server';
import { eq } from 'drizzle-orm';


export async function POST(req:NextRequest) {
    const courseId = await req.nextUrl.searchParams.get('courseId');

    const courses= await db.select().from(coursesTable).where(eq(coursesTable.courseId, courseId as string));

    return NextResponse.json(courses[0]);

}