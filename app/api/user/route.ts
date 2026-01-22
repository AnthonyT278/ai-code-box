import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/config/db";
import { usersTable } from "@/config/schema";
import { eq } from "drizzle-orm";

export async function POST() {
    try {
        const user = await currentUser();

        // Early authentication check - return 401 if not authenticated
        if (!user) {
            return NextResponse.json(
                { error: "User not authenticated" },
                { status: 401 }
            );
        }

        // Extract and validate email
        const email = user.emailAddresses?.[0]?.emailAddress;
        if (!email) {
            return NextResponse.json(
                { error: "User email not found" },
                { status: 400 }
            );
        }

        // Extract and validate name with fallback
        const name = user.fullName || `${user.firstName || ""} ${user.lastName || ""}`.trim() || "User";

        // Atomic upsert: insert or do nothing if email already exists
        const upsertResult = await db
            .insert(usersTable)
            .values({
                email: email,
                name: name,
            })
            .onConflictDoNothing()
            .returning();

        // If insert succeeded, return the new user
        if (upsertResult.length > 0) {
            return NextResponse.json(upsertResult[0]);
        }

        // If insert returned no rows (user already exists), fetch and return existing user
        const existingUser = await db
            .select()
            .from(usersTable)
            .where(eq(usersTable.email, email));

        if (existingUser.length > 0) {
            return NextResponse.json(existingUser[0]);
        }

        // Fallback (should not reach here if constraint is properly set)
        return NextResponse.json(
            { error: "Failed to upsert user" },
            { status: 500 }
        );
    } catch (error) {
        console.error("Error in POST /api/user:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}