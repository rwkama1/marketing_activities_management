const { VarChar,Int ,Date} = require("mssql");
const { DTOMarketingCampaigns } = require("../entity/DTOMarketingCampaigns");

const { Conection } = require("./Connection");


class DataMarketingCampaigns
{
      //SET

      static  registerMarketingCampaign=async(dtoMarketingCampaigns)=>
      {
          let {CampaignName ,StartDate 
            ,EndDate ,Budget}=dtoMarketingCampaigns;
          let resultquery;
          let queryinsert = `
          
          DECLARE @CampaignName VARCHAR(100) = '${CampaignName}';
          DECLARE @StartDate DATE = '${StartDate}';
          DECLARE @EndDate DATE = '${EndDate}';
          DECLARE @Budget DECIMAL(10, 2) = ${Budget};
         
          IF @EndDate <= @StartDate
            BEGIN
                    SELECT -1 AS DateError
                    RETURN;
          END
          IF @Budget <= 0
            BEGIN
                    SELECT -2 AS BudgetError
                    RETURN;
          END
             
        INSERT INTO MarketingCampaigns 
        (CampaignName, StartDate, EndDate, Budget)
        VALUES (@CampaignName, @StartDate, @EndDate, @Budget);
                  
        SELECT 1 AS insertsuccess;
        
          
            `;
            let pool = await Conection.conection();
              const result = await pool.request()
              .query(queryinsert)
              resultquery = result.recordset[0].DateError;
              if(resultquery===undefined)
              {
              resultquery = result.recordset[0].BudgetError;
                   if(resultquery===undefined)
                   {
                   resultquery = result.recordset[0].insertsuccess;
                
                   }
              }
          pool.close();
          return resultquery;
          
      }
      static updateMarketingCampaignNameBudget=async(idcampaign,CampaignName,Budget)=>
      {
         
          let resultquery;
          let queryinsert = `
          
          declare @CampaignID int = ${idcampaign};
          DECLARE @CampaignName VARCHAR(100) = '${CampaignName}';
          DECLARE @Budget DECIMAL(10, 2) = ${Budget} ;

          IF NOT EXISTS (SELECT CampaignID 
            FROM MarketingCampaigns WHERE CampaignID = @CampaignID)
         BEGIN
                    SELECT -1 AS notexistmarketingcampaign
                    return;
         END
         IF @Budget <= 0
            BEGIN
                    SELECT -2 AS BudgetError
                    RETURN;
          END

          UPDATE MarketingCampaigns SET
          CampaignName = @CampaignName,
          Budget=@Budget
          WHERE CampaignID = @CampaignID;
 
          select 1 as updatesucess
      
        
          
            `;
            let pool = await Conection.conection();
              const result = await pool.request()
              .query(queryinsert)
              resultquery = result.recordset[0].notexistmarketingcampaign;
              if(resultquery===undefined)
              {
                 resultquery = result.recordset[0].updatesucess;
                 if(resultquery===undefined)
                {
                    resultquery = result.recordset[0].BudgetError;
                }
              }
          pool.close();
          return resultquery;
          
      }
    

      //GET
      static  getMarketingCampaignById=async(idcampaign)=>
      {
 
 
          let resultquery;
  
          let queryinsert = `
  
          DECLARE @CampaignID INT = ${idcampaign};
          
          IF NOT EXISTS (SELECT CampaignID 
             FROM MarketingCampaigns WHERE CampaignID = @CampaignID)
          BEGIN
              SELECT -1 AS notexistmarketingcampaign
              RETURN;
          END

              SELECT 
                  MC.CampaignID, 
                  MC.CampaignName, 
                  MC.StartDate,
                  MC.EndDate,
                  MC.Budget
                
              FROM MarketingCampaigns MC
              WHERE CampaignID = @CampaignID;
         
  
          `
          let pool = await Conection.conection();
          const result = await pool.request()
           .query(queryinsert)
           resultquery = result.recordset[0].notexistmarketingcampaign;
           if(resultquery===undefined)
           {
                  let dtoMarketingCampaigns = new DTOMarketingCampaigns();   
                  this.getInformation(dtoMarketingCampaigns,result.recordset[0]);
                  resultquery=dtoMarketingCampaigns;
  
          }
       return resultquery;
          
      }
      static  getMarketingCampaigns=async()=>
      {
 
 
          let arrayn=[];
  
          let queryinsert = `
  
  
              SELECT 
                  MC.CampaignID, 
                  MC.CampaignName, 
                  MC.StartDate,
                  MC.EndDate,
                  MC.Budget
                
              FROM MarketingCampaigns MC
     
          `
          let pool = await Conection.conection();
          const result = await pool.request()
           .query(queryinsert)
           for (let re of result.recordset) {
             let dtoMarketingCampaigns = new DTOMarketingCampaigns();   
             this.getInformation(dtoMarketingCampaigns,re);
             arrayn.push(dtoMarketingCampaigns);
          }
           return arrayn;
          
      }
      static  getMarketingCampaignsInProgress=async()=>
      {
 
 
          let arrayn=[];
  
          let queryinsert = `
  
  
              SELECT 
                  MC.CampaignID, 
                  MC.CampaignName, 
                  MC.StartDate,
                  MC.EndDate,
                  MC.Budget
              FROM MarketingCampaigns MC
              WHERE MC.StartDate <= GETDATE() AND MC.EndDate >= GETDATE();
     
          `
          let pool = await Conection.conection();
          const result = await pool.request()
           .query(queryinsert)
           for (let re of result.recordset) {
             let dtoMarketingCampaigns = new DTOMarketingCampaigns();   
             this.getInformation(dtoMarketingCampaigns,re);
             arrayn.push(dtoMarketingCampaigns);
          }
           return arrayn;
          
      }
      static  getMarketingCampaignDuration=async(idcampaign)=>
      {

        let resultquery;
  
          let queryinsert = `
  
          DECLARE @CampaignID INT = ${idcampaign};
          DECLARE @Duration INT;

          SELECT @Duration = DATEDIFF(DAY, StartDate, EndDate)
          FROM MarketingCampaigns
          WHERE CampaignID = @CampaignID;
      
          SELECT @Duration AS DurationInDays;
     
          `
          let pool = await Conection.conection();
          const result = await pool.request()
           .query(queryinsert)
           resultquery = result.recordset[0].DurationInDays;
           return resultquery;
      }

      static  getMarketingCampaignsTotalCost=async()=>
      {

        let resultquery;
  
          let queryinsert = `
  
          SELECT SUM(Budget) AS Totalcost
          FROM MarketingCampaigns;
     
          `
          let pool = await Conection.conection();
          const result = await pool.request()
           .query(queryinsert)
           resultquery = result.recordset[0].Totalcost;
           return resultquery;
      }
      static  getMarketingCampaignsAverageBudgetPerDay=async(idcampaign)=>
      {

        let resultquery;
  
          let queryinsert = `
  
          DECLARE @CampaignID INT = ${idcampaign};
          DECLARE @AverageBudgetPerDay DECIMAL(10, 2);

          SELECT @AverageBudgetPerDay = Budget / NULLIF(DATEDIFF(DAY, StartDate, EndDate), 0)
          FROM MarketingCampaigns
          WHERE CampaignID = @CampaignID;

          SELECT @AverageBudgetPerDay AS AverageBudgetPerDay;
     
          `
          let pool = await Conection.conection();
          const result = await pool.request()
           .query(queryinsert)
           resultquery = result.recordset[0].AverageBudgetPerDay;
           return resultquery;
      }
      static  getMarketingCampaignsWithLargerBudget=async(top)=>
      {

        let arrayn=[];
  
          let queryinsert = `
  
          DECLARE @top INT = ${top};

          SELECT TOP (@top) 
          MC.CampaignID, 
          MC.CampaignName, 
          MC.StartDate,
          MC.EndDate,
          MC.Budget
          FROM MarketingCampaigns MC
          ORDER BY Budget DESC;
     
          `
          let pool = await Conection.conection();
          const result = await pool.request()
           .query(queryinsert)
           for (let re of result.recordset) {
             let dtoMarketingCampaigns = new DTOMarketingCampaigns();   
             this.getInformation(dtoMarketingCampaigns,re);
             arrayn.push(dtoMarketingCampaigns);
          }
           return arrayn;
      }

      static  getMarketingCampaignsByDate=async(StartDate,EndDate)=>
      {

        let arrayn=[];
  
          let queryinsert = `
  
          DECLARE @StartDate DATE = '${StartDate}';
          DECLARE @EndDate DATE = '${EndDate}';

          SELECT 
          MC.CampaignID, 
          MC.CampaignName, 
          MC.StartDate,
          MC.EndDate,
          MC.Budget
          FROM MarketingCampaigns MC
          WHERE StartDate >= @StartDate AND EndDate <= @EndDate;
     
          `
          let pool = await Conection.conection();
          const result = await pool.request()
           .query(queryinsert)
           for (let re of result.recordset) {
             let dtoMarketingCampaigns = new DTOMarketingCampaigns();   
             this.getInformation(dtoMarketingCampaigns,re);
             arrayn.push(dtoMarketingCampaigns);
          }
           return arrayn;
      }

      static  getMarketingCampaignsDurationAverageCampaigns=async()=>
      {

        let resultquery;
  
          let queryinsert = `
  
          DECLARE @AverageDuration INT;

          SELECT @AverageDuration = AVG(DATEDIFF(DAY, StartDate, EndDate))
          FROM MarketingCampaigns;
      
          SELECT @AverageDuration AS AverageDurationInDays;
     
          `
          let pool = await Conection.conection();
          const result = await pool.request()
           .query(queryinsert)
           resultquery = result.recordset[0].AverageDurationInDays;
           return resultquery;
      }

  //GET INFORMATION
                
  static getInformation(dtoMarketingCampaigns, result) {

    dtoMarketingCampaigns.CampaignID = result.CampaignID;
    dtoMarketingCampaigns.CampaignName = result.CampaignName;
    dtoMarketingCampaigns.StartDate = result.StartDate;
    dtoMarketingCampaigns.EndDate = result.EndDate;
    dtoMarketingCampaigns.Budget = result.Budget;
}


}
module.exports = { DataMarketingCampaigns };