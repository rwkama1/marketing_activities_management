const { VarChar,Int ,Date} = require("mssql");
const { DTOMarketingActivities } = require("../entity/DTOMarketingActivities");

const { Conection } = require("./Connection");

class DataMarketingActivities
{
  //SET
    static  registerMarketingActivities=async(dtoMarketingActivities)=>
    {
        let {ActivityName , ActivityDescription,StartDate 
          ,EndDate ,CampaignID}=dtoMarketingActivities;
        let resultquery;
        let queryinsert = `
        
       

        DECLARE @ActivityName VARCHAR(100) = '${ActivityName}';
        DECLARE @ActivityDescription VARCHAR(500) = '${ActivityDescription}';
        DECLARE @StartDate DATE = '${StartDate}';
        DECLARE @EndDate DATE = '${EndDate}';
        DECLARE @CampaignID INT = ${CampaignID};
      
       
        IF @EndDate <= @StartDate
          BEGIN
                  SELECT -1 AS DateError
                  RETURN;
        END
        IF NOT EXISTS (SELECT CampaignID FROM MarketingCampaigns WHERE CampaignID = @CampaignID)
        BEGIN
            SELECT -2 AS CampaignNotExist; 
            RETURN;
        END
        IF NOT EXISTS (SELECT CampaignID
            FROM MarketingCampaigns
            WHERE CampaignID = @CampaignID
              AND @StartDate >= StartDate
              AND @EndDate <= EndDate)
            BEGIN
                SELECT -3 AS DateRangeError; 
                RETURN;
            END
           
      INSERT INTO MarketingActivities 
      (ActivityName,ActivityDescription, StartDate, EndDate, CampaignID,Statuss)
      VALUES (@ActivityName,@ActivityDescription, @StartDate, @EndDate, @CampaignID,'');
                
      SELECT 1 AS insertsuccess;
      
        
          `;
          let pool = await Conection.conection();
            const result = await pool.request()
            .query(queryinsert)
            resultquery = result.recordset[0].DateError;
            if(resultquery===undefined)
            {
            resultquery = result.recordset[0].DateRangeError;
                 if(resultquery===undefined)
                 {
                 resultquery = result.recordset[0].CampaignNotExist;
                    if(resultquery===undefined)
                    {
                    resultquery = result.recordset[0].insertsuccess;
                  
                    }
                 }
            }
        pool.close();
        return resultquery;
        
    }
    static updateMarketingActivityNameDesc=async(idactivity,name,description)=>
    {
       
        let resultquery;
        let queryinsert = `
        
        declare @ActivityID int = ${idactivity};
        DECLARE @ActivityName VARCHAR(100) = '${name}';
        DECLARE @ActivityDescription  VARCHAR(500) = '${description}' ;

        IF NOT EXISTS (SELECT ActivityID 
          FROM MarketingActivities WHERE ActivityID = @ActivityID)
       BEGIN
                  SELECT -1 AS notexistmarketingactivity
                  return;
       END
      

        UPDATE MarketingActivities SET
        ActivityName = @ActivityName,
        ActivityDescription=@ActivityDescription
        WHERE ActivityID = @ActivityID;

        select 1 as updatesucess
    
          `;
          let pool = await Conection.conection();
            const result = await pool.request()
            .query(queryinsert)
            resultquery = result.recordset[0].notexistmarketingactivity;
            if(resultquery===undefined)
            {
               resultquery = result.recordset[0].updatesucess;
              
            }
        pool.close();
        return resultquery;
        
    }

      //GET
      static  getMarketingActivityById=async(idactivity)=>
      {
 
 
          let resultquery;
  
          let queryinsert = `
  
          DECLARE @ActivityID INT = ${idactivity};
          
          IF NOT EXISTS (SELECT ActivityID 
             FROM MarketingActivities WHERE ActivityID = @ActivityID)
          BEGIN
              SELECT -1 AS notexistmarketingactivity
              RETURN;
          END
          SELECT 
          A.ActivityID, 
          A.ActivityName, 
          A.ActivityDescription,
          A.StartDate,
          A.EndDate,
          A.CampaignID,
          C.CampaignName
      FROM 
          MarketingActivities A
      JOIN 
          MarketingCampaigns C ON A.CampaignID = C.CampaignID
      WHERE 
          A.ActivityID = @ActivityID;
         
  
          `
          let pool = await Conection.conection();
          const result = await pool.request()
           .query(queryinsert)
           resultquery = result.recordset[0].notexistmarketingactivity;
           if(resultquery===undefined)
           {
                  let dtoMarketingActivities = new DTOMarketingActivities();   
                  this.getInformation(dtoMarketingActivities,result.recordset[0]);
                  resultquery=dtoMarketingActivities;
  
          }
       return resultquery;
          
      }

      static  getMarketingActivityByCampaign=async(CampaignID)=>
      {
 
 
          let arrayn=[];
  
          let queryinsert = `
  
          DECLARE @CampaignID INT = ${CampaignID};
          
       
          SELECT 
          A.ActivityID, 
          A.ActivityName, 
          A.ActivityDescription,
          A.StartDate,
          A.EndDate,
          A.CampaignID,
          C.CampaignName
      FROM 
          MarketingActivities A
      JOIN 
          MarketingCampaigns C ON A.CampaignID = C.CampaignID
      WHERE 
          A.CampaignID = @CampaignID;
         
  
          `
          let pool = await Conection.conection();
          const result = await pool.request()
           .query(queryinsert)
           for (let re of result.recordset) {
             let dtoMarketingActivities = new DTOMarketingActivities();   
             this.getInformation(dtoMarketingActivities,re);
             arrayn.push(dtoMarketingActivities);
          }
           return arrayn;
          
      }
  //GET INFORMATION
                
  static getInformation(dtoMarketingActivities, result) {

    dtoMarketingActivities.ActivityID = result.ActivityID;
    dtoMarketingActivities.ActivityName = result.ActivityName;
    dtoMarketingActivities.ActivityDescription = result.ActivityDescription;
    dtoMarketingActivities.StartDate = result.StartDate;
    dtoMarketingActivities.EndDate = result.EndDate;
    dtoMarketingActivities.CampaignID = result.CampaignID;
    dtoMarketingActivities.CampaignName = result.CampaignName;

}

}

module.exports = { DataMarketingActivities };