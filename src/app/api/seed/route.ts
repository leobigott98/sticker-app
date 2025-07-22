import postgres from 'postgres';

const sql = postgres(process.env.SUPABASE_POSTGRES_URL!, { ssl: 'require' });

async function createStickersTable(){
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await sql`
        CREATE TABLE IF NOT EXISTS stickers (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        url VARCHAR(255) NOT NULL
        );
    `;
}

export async function GET() {
  try {
    const result = await sql.begin((sql) => [
      createStickersTable(),
    ]);

    return Response.json({ message: 'Database table created successfully' });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
