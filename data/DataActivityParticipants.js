const { VarChar,Int ,Date} = require("mssql");
const { DTOMarketingActivities } = require("../entity/DTOMarketingActivities");

const { Conection } = require("./Connection");

class DataActivityParticipant
{
  //SET
    static  registerActivityParticipant=async(ActivityID,CustomerID)=>
    {
        let resultquery;
        let queryinsert =  `
        
        DECLARE @ActivityID INT = ${ActivityID};
        DECLARE @CustomerID int = ${CustomerID};

       
        IF NOT EXISTS (SELECT 1 FROM MarketingActivities WHERE ActivityID = @ActivityID)
        BEGIN
            SELECT -1 AS ActivityNotExist; 
            RETURN;
        END
    
        IF NOT EXISTS (SELECT 1 FROM Customers WHERE CustomerID = @CustomerID)
        BEGIN
            SELECT -2 AS CustomerNotExist; 
            RETURN;
        END
    
     
        INSERT INTO ActivityParticipants (ActivityID, CustomerID)
        VALUES (@ActivityID, @CustomerID);
                
      SELECT 1 AS insertsuccess;
      
        
          `;
          let pool = await Conection.conection();
            const result = await pool.request()
            .query(queryinsert)
            resultquery = result.recordset[0].ActivityNotExist;
            if(resultquery===undefined)
            {
            resultquery = result.recordset[0].CustomerNotExist;
                 if(resultquery===undefined)
                 {
                    resultquery = result.recordset[0].insertsuccess;
                 }
            }
        pool.close();
        return resultquery;
        
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

module.exports = { DataActivityParticipant };