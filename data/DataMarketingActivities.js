const { VarChar,Int ,Date} = require("mssql");
const { DTOMarketingActivities } = require("../entity/DTOMarketingActivities");

const { Conection } = require("./Connection");

class DataMarketingActivities
{
  //SET
    static  registerMarketingActivities=async(dtoMarketingActivities)=>
    {
        let {ActivityName , ActivityDescription,StartDate 
          ,EndDate ,CampaignID,Budget}=dtoMarketingActivities;
        let resultquery;
        let queryinsert = `
        
       

        DECLARE @ActivityName VARCHAR(100) = '${ActivityName}';
        DECLARE @ActivityDescription VARCHAR(500) = '${ActivityDescription}';
        DECLARE @StartDate DATE = '${StartDate}';
        DECLARE @EndDate DATE = '${EndDate}';
        DECLARE @CampaignID INT = ${CampaignID};
        DECLARE @Budget decimal(10,2) = ${Budget};
       
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
         IF @Budget <= 0
            BEGIN
                    SELECT -4 AS BudgetError
                    RETURN;
          END
           
      INSERT INTO MarketingActivities 
      (ActivityName,ActivityDescription, StartDate, EndDate, CampaignID,Budget )
      VALUES (@ActivityName,@ActivityDescription, @StartDate, @EndDate, @CampaignID,@Budget );
                
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
    static updateMarketingActivityBudget=async(idactivity,budget)=>
    {
       
        let resultquery;
        let queryinsert = `
        
        declare @ActivityID int = ${idactivity};
        DECLARE @Budget decimal(10,2) = ${budget};
      
        IF NOT EXISTS (SELECT ActivityID 
          FROM MarketingActivities WHERE ActivityID = @ActivityID)
       BEGIN
                  SELECT -1 AS notexistmarketingactivity
                  return;
       END
       IF @Budget <= 0
            BEGIN
                    SELECT -2 AS BudgetError
                    RETURN;
          END

        UPDATE MarketingActivities SET
        Budget = @Budget
        WHERE ActivityID = @ActivityID;

        select 1 as updatesucess
    
          `;
          let pool = await Conection.conection();
            const result = await pool.request()
            .query(queryinsert)
            resultquery = result.recordset[0].notexistmarketingactivity;
            if(resultquery===undefined)
            {
               resultquery = result.recordset[0].BudgetError;
                    if(resultquery===undefined)
                    {
                    resultquery = result.recordset[0].updatesucess;
                    
                    }
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
          A.Budget,
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
          A.Budget,
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

      static  getMarketingActivityInCourseOfCampaign=async(CampaignID)=>
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
          A.Budget,
          C.CampaignName
      FROM 
          MarketingActivities A
      JOIN 
          MarketingCampaigns C ON A.CampaignID = C.CampaignID
   
      WHERE A.CampaignID = @CampaignID AND GETDATE() BETWEEN A.StartDate AND A.EndDate;
         
  
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
      static  getMarketingActivityDuration=async(idactivity)=>
      {

        let resultquery;
  
          let queryinsert = `
  
          DECLARE @ActivityID INT = ${idactivity};
          DECLARE @Duration INT;

          SELECT @Duration = DATEDIFF(DAY, StartDate, EndDate)
          FROM MarketingActivities
          WHERE ActivityID = @ActivityID;
      
          SELECT @Duration AS DurationInDays;
     
          `
          let pool = await Conection.conection();
          const result = await pool.request()
           .query(queryinsert)
           resultquery = result.recordset[0].DurationInDays;
           return resultquery;
      }
      static  getMarketingActivityByDate=async(StartDate,EndDate)=>
      {

        let arrayn=[];
  
          let queryinsert = `
  
          DECLARE @StartDate DATE = '${StartDate}';
          DECLARE @EndDate DATE = '${EndDate}';

          SELECT 
          A.ActivityID, 
          A.ActivityName, 
          A.ActivityDescription,
          A.StartDate,
          A.EndDate,
          A.CampaignID,
          A.Budget,
          C.CampaignName
      FROM 
          MarketingActivities A
      JOIN 
          MarketingCampaigns C ON A.CampaignID = C.CampaignID
          WHERE A.StartDate >= @StartDate AND A.EndDate <= @EndDate;
     
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

      static  getMarketingActivityTotalCost=async()=>
      {

        let resultquery;
  
          let queryinsert = `
  
          SELECT SUM(Budget) AS Totalcost
          FROM MarketingActivities;
     
          `
          let pool = await Conection.conection();
          const result = await pool.request()
           .query(queryinsert)
           resultquery = result.recordset[0].Totalcost;
           return resultquery;
      }
      static  getMarketingActivityWithLargerBudget=async(top)=>
      {

        let arrayn=[];
  
          let queryinsert = `
  
          DECLARE @top INT = ${top};

          SELECT TOP (@top) 
          A.ActivityID, 
          A.ActivityName, 
          A.ActivityDescription,
          A.StartDate,
          A.EndDate,
          A.CampaignID,
          A.Budget,
          C.CampaignName
          FROM 
          MarketingActivities A
              JOIN 
          MarketingCampaigns C ON A.CampaignID = C.CampaignID
          ORDER BY Budget DESC;
     
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
    dtoMarketingActivities.Budget = result.Budget;
    dtoMarketingActivities.CampaignID = result.CampaignID;
    dtoMarketingActivities.CampaignName = result.CampaignName;

}

}

module.exports = { DataMarketingActivities };