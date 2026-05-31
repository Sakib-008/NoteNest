import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();

    const { fullName, email, password, department, semester } = body;

    const existingUser = await prisma.student.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          message: "Email already exists",
        },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const student = await prisma.student.create({
      data: {
        fullName,
        email,
        password: hashedPassword,
        department,
        semester,
      },
    });

    return NextResponse.json(
      {
        message: "Registration Successful",
        student,
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Server Error",
      },
      { status: 500 },
    );
  }
}
