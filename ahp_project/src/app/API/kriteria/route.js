import { NextResponse } from 'next/server';
import { getConnection } from '../../../../lib/db';

export async function GET(request) {
  try {
    const connection = await getConnection();
    const [rows] = await connection.execute('SELECT * FROM kriteria');
    await connection.end();
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ message: 'Terjadi kesalahan saat fetch data' }, { status: 500 });
  }
}