import { prisma } from "./prisma"

export async function testDatabaseConnection() {
  try {
    await prisma.$connect()
    console.log("✅ Database connected successfully")

    // Test a simple query
    const userCount = await prisma.user.count()
    console.log(`📊 Current user count: ${userCount}`)

    return { success: true, message: "Database connection successful" }
  } catch (error) {
    console.error("❌ Database connection failed:", error)
    return { success: false, error: error.message }
  } finally {
    await prisma.$disconnect()
  }
}
