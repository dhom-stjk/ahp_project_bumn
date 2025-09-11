import { NextResponse } from 'next/server';
import { getConnection } from '../../../lib/db';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const tahun = searchParams.get('tahun');
    const connection = await getConnection();
    let query = 'SELECT * FROM data_keuangan';
    let params = [];
    if (tahun) {
      query += ' WHERE Tahun = ?';
      params.push(tahun);
    }
    const [rows] = await connection.execute(query, params);
    await connection.end();
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ message: 'Terjadi kesalahan saat fetch data' }, { status: 500 });
  }
}
