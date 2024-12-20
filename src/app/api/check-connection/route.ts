import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Tes koneksi dengan mengambil semua data dari tabel User
    const test = await prisma.user.findMany();
    return NextResponse.json({ success: true, message: "Database connected", data: test });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json({ success: false, message: "Database connection failed", error: error.message });
  } finally {
    await prisma.$disconnect();
  }
}
