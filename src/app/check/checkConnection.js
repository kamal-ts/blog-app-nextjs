import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    // Tes koneksi ke database dengan query sederhana
    const test = await prisma.user.findMany();
    res.status(200).json({ success: true, message: "Database connected", data: test });
  } catch (error) {
    res.status(500).json({ success: false, message: "Database connection failed", error: error.message });
  } finally {
    await prisma.$disconnect();
  }
}
