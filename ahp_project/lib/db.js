import mysql from 'mysql2/promise';
export async function getConnection() {
return await mysql.createConnection({
    host: '103.163.138.21',
    user: 'tempakod_domgans',
    password: 'parlilitanjaya',
    database: 'tempakod_bankbumn',
});
}
