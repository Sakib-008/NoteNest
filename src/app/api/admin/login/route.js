import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    const admin = await prisma.admin.findUnique({
      where: {
        email,
      },
    });

    if (!admin) {
      return NextResponse.json(
        {
          message: "Invalid Email or Password",
        },
        {
          status: 401,
        },
      );
    }

    const validPassword = password == admin.password ? 1 : 0;

    if (!validPassword) {
      return NextResponse.json(
        {
          message: "Invalid Email or Password",
        },
        {
          status: 401,
        },
      );
    }

    return NextResponse.json({
      message: "Login Successful",
      role: "admin",
    });
  } catch {
    return NextResponse.json(
      {
        message: "Server Error",
      },
      {
        status: 500,
      },
    );
  }
}
