const { VarChar,Int ,Date} = require("mssql");
const { Conection } = require("./Connection");

class DataActivityResult
{
     //SET
     static  registerResult=async(ActivityID,ReportDate,ResultDescription,Revenue)=>
     {
         let resultquery;
         let queryinsert =  `
         
         DECLARE @ActivityID INT = ${ActivityID};
         DECLARE @ReportDate date = '${ReportDate}';
         DECLARE @ResultDescription varchar(500) = '${ResultDescription}';
         DECLARE @Revenue decimal(10,2) = ${Revenue};
        
         IF NOT EXISTS (SELECT 1 FROM MarketingActivities WHERE ActivityID = @ActivityID)
         BEGIN
             SELECT -1 AS ActivityNotExist; 
             RETURN;
         END

         INSERT INTO ActivityResults (ActivityID, ReportDate, ResultDescription, Revenue)
         VALUES (@ActivityID, @ReportDate, @ResultDescription, @Revenue);
                 
       SELECT 1 AS insertsuccess;
       
         
           `;
           let pool = await Conection.conection();
             const result = await pool.request()
             .query(queryinsert)
             resultquery = result.recordset[0].ActivityNotExist;
             if(resultquery===undefined)
             {
              resultquery = result.recordset[0].insertsuccess;
             }
         pool.close();
         return resultquery;
         
     }
}
module.exports = { DataActivityResult };