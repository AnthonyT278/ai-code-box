

import { client } from '@/config/openai';
import { Course_config_prompt } from '@/data/Prompt';
import { json } from 'drizzle-orm/singlestore-core/columns/json';
import { NextResponse } from 'next/server';
import { db } from '@/config/db';
import { coursesTable } from '@/config/schema';
import { currentUser } from '@clerk/nextjs/server';

export async function POST(req: Request) {
    const {userInput, courseId, type} = await req.json();
    const user = await currentUser();

    const response = await client.chat.completions.create({
        model: "gpt-5-mini",
        messages: [
            {role: 'system', content: Course_config_prompt},
            {role: 'user', content: 'Course Topic is '+userInput},
        ],
    });

    const rawResult = response.choices[0]?.message?.content || "";
    const JSONResult = JSON.parse(rawResult);

    const courseResult = await db.insert(coursesTable).values({
        userId: user?.primaryEmailAddress?.emailAddress || '', 
        courseId: courseId,
        courseName: userInput,
        userInput: userInput,
        type: type,
        courseLayout: JSONResult
    }).returning();

    return NextResponse.json(courseResult[0]);
}