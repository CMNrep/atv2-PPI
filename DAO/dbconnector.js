import mysql from 'mysql/promise';

export default async function dbconnect(){
    if(global.poolConnections){
        return await global.poolConnections.getConnection()
    }
    else{
        const pool = mysql.createPool({
            host: 'localhost',
            user: 'root',
            password: '', //senha confia
            database: 'atv2PPI',
            waitForConnections: true,
            connectionLimit: 10,
            maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
            idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
            queueLimit: 0,
            enableKeepAlive: true,
            keepAliveInitialDelay: 0,
        });
        
        global.poolConnections = pool;

        return await global.poolConnections.getConnection();
    }	
}