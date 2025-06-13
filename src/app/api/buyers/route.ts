import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import { db } from "@/db/client";
import { buyers } from "@/drizzle/schema";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const {
    first_name,
    last_name,
    phone_number,
    student_id_number,
    university_name,
    university_email,
    password,
  } = body;

  if (
    !first_name ||
    !phone_number ||
    !university_name ||
    !university_email ||
    !password
  ) {
    return NextResponse.json(
      { error: "Required field still undefined" },
      { status: 400 }
    );
  }

  try {
    const existing = await db
      .select()
      .from(buyers)
      .where(eq(buyers.universityEmail, university_email));

    if (existing.length > 0) {
      return NextResponse.json(
        { error: "Email already registered." },
        { status: 409 }
      );
    }

    if (password.length < 5 || password.length > 15) {
      return NextResponse.json(
        { error: "Password must be between 5 and 15 characters." },
        { status: 400 }
      );
    }

    if (university_email === "nganteen.binus@gmail.com") {
      return NextResponse.json(
        { error: "This email is reserved." },
        { status: 403 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const inserted = await db
      .insert(buyers)
      .values({
        firstName: first_name,
        lastName: last_name,
        phoneNumber: phone_number,
        studentIdNumber: student_id_number,
        universityName: university_name,
        universityEmail: university_email,
        password: hashedPassword,
      })
      .returning();

    return NextResponse.json({
      message: "Register successful",
      buyer: {
        id: inserted[0].buyerId,
        first_name,
        university_email,
      },
    });
  } catch (err) {
    console.error("Register error:", err);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
