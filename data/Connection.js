const sql  = require("mssql");

 class Conection
{
     static conection=async () => {
        let sqlconfig = {
         
            user: 'rwkama73_SQLLogin_1',
            password:'mopug2wc4u',
            database: 'marketing_activities_managemen',
           server: 'marketing_activities_managemen.mssql.somee.com',
            options: {
                    trustedConnection: false,
                    enableArithAbort: true,
                    encrypt: false
                }
            
        }
        const pool = await  sql.connect(sqlconfig);
        return pool
  
       }
}
module.exports = { Conection };