const { VarChar,Int ,Date} = require("mssql");
const { DTOActivityResult } = require("../entity/DTOActivityResult");
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

     //GET

     static  getResultById=async(idresult)=>
      {
 
 
          let resultquery;
  
          let queryinsert = `
  
          DECLARE @ResultID INT = ${idresult};
          
          IF NOT EXISTS (SELECT ResultID 
             FROM ActivityResults WHERE ResultID = @ResultID)
          BEGIN
              SELECT -1 AS notexistresult
              RETURN;
          END

              SELECT 
                  R.ResultID, 
                  A.ActivityID,
                  A.ActivityName ,
                  R.ReportDate,
                  R.ResultDescription,
                  R.Revenue
                
              FROM ActivityResults R
              INNER JOIN 
             MarketingActivities A ON R.ActivityID = A.ActivityID
              WHERE ResultID = @ResultID;
         
  
          `
          let pool = await Conection.conection();
          const result = await pool.request()
           .query(queryinsert)
           resultquery = result.recordset[0].notexistresult;
           if(resultquery===undefined)
           {
                  let dtoResult = new DTOActivityResult();   
                  this.getInformation(dtoResult,result.recordset[0]);
                  resultquery=dtoResult;
  
          }
       return resultquery;
          
      }
      static  getResultByDates=async(StartDate,EndDate)=>
      {
 
 
          let resultquery;
  
          let queryinsert = `

          DECLARE @StartDate DATE = '${StartDate}';
          DECLARE @EndDate DATE = '${EndDate}';
              SELECT 
                  R.ResultID, 
                  A.ActivityID,
                  A.ActivityName ,
                  R.ReportDate,
                  R.ResultDescription,
                  R.Revenue
                
              FROM ActivityResults R
              INNER JOIN 
             MarketingActivities A ON R.ActivityID = A.ActivityID
             WHERE StartDate >= @StartDate AND EndDate <= @EndDate;
         
  
          `
          let pool = await Conection.conection();
          const result = await pool.request()
           .query(queryinsert)
           resultquery = result.recordset[0].notexistresult;
           if(resultquery===undefined)
           {
                  let dtoResult = new DTOActivityResult();   
                  this.getInformation(dtoResult,result.recordset[0]);
                  resultquery=dtoResult;
  
          }
       return resultquery;
          
      }
      static  getResultByCampaign=async(CampaignID)=>
      {
 
 
          let resultquery;
  
          let queryinsert = `
  
          DECLARE @CampaignID INT = ${CampaignID};

              SELECT 
                  R.ResultID, 
                  A.ActivityID,
                  A.ActivityName ,
                  R.ReportDate,
                  R.ResultDescription,
                  R.Revenue
                
              FROM ActivityResults R
              INNER JOIN 
             MarketingActivities A ON R.ActivityID = A.ActivityID
              WHERE A.CampaignID = @CampaignID;
         
  
          `
          let pool = await Conection.conection();
          const result = await pool.request()
           .query(queryinsert)
           resultquery = result.recordset[0].notexistresult;
           if(resultquery===undefined)
           {
                  let dtoResult = new DTOActivityResult();   
                  this.getInformation(dtoResult,result.recordset[0]);
                  resultquery=dtoResult;
  
          }
       return resultquery;
          
      }
      static  getResultByCustomer=async(CustomerID)=>
      {
 
 
          let resultquery;
  
          let queryinsert = `
  
          DECLARE @CustomerID  INT = ${CustomerID};

              SELECT 
                  R.ResultID, 
                  A.ActivityID,
                  A.ActivityName ,
                  R.ReportDate,
                  R.ResultDescription,
                  R.Revenue
                
              FROM ActivityResults R
              INNER JOIN 
              ActivityParticipants  AP ON R.ActivityID = AP.ActivityID
              INNER JOIN 
            MarketingActivities A ON R.ActivityID = A.ActivityID
              WHERE AP.CustomerID = @CustomerID;
          `
          let pool = await Conection.conection();
          const result = await pool.request()
           .query(queryinsert)
           resultquery = result.recordset[0].notexistresult;
           if(resultquery===undefined)
           {
                  let dtoResult = new DTOActivityResult();   
                  this.getInformation(dtoResult,result.recordset[0]);
                  resultquery=dtoResult;
  
          }
       return resultquery;
          
      }

  //GET INFORMATION
                
  static getInformation(dtoResult, result) {

    dtoResult.ActivityID = result.ActivityID;
    dtoResult.ActivityName = result.ActivityName;
    dtoResult.ResultID = result.ResultID;
    dtoResult.ReportDate = result.ReportDate;
    dtoResult.ResultDescription = result.ResultDescription;
    dtoResult.Revenue = result.Revenue;


}

}
module.exports = { DataActivityResult };