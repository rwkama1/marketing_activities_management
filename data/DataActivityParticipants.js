const { VarChar,Int ,Date} = require("mssql");
const { DTOActivityParticipant } = require("../entity/DTOActivityParticipant");
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
    static deleteActivityParticipant=async(ParticipantID)=>
    {
        let resultquery;
        let queryinsert =  `
        
        DECLARE @ParticipantID INT = ${ParticipantID};
        
        IF NOT EXISTS (SELECT 1 FROM ActivityParticipants WHERE ParticipantID = @ParticipantID)
        BEGIN
            SELECT -1 AS ParticipantNotExist; 
            RETURN;
        END

        DELETE FROM ActivityParticipants WHERE ParticipantID = @ParticipantID;
                
       SELECT 1 AS deletesuccess;
        
        
            `;
            let pool = await Conection.conection();
            const result = await pool.request()
            .query(queryinsert)
            resultquery = result.recordset[0].ParticipantNotExist;
            if(resultquery===undefined)
            {
                    resultquery = result.recordset[0].deletesuccess;
            }
        pool.close();
        return resultquery;
        
    }


    //GET

    static  getActivityParticipantByActivity=async(ActivityID)=>
    {

        let arrayn=[];

        let queryinsert = `

        DECLARE @ActivityID INT = ${ActivityID};

        SELECT 
        C.CustomerID, 
        C.CustomerName, 
        C.EmailCustomer,
        C.PhoneCustomer,

        A.ActivityID,
        A.ActivityName,
        A.ActivityDescription,
        A.Budget
    FROM 
        ActivityParticipants AP
    JOIN 
        MarketingActivities A ON AP.ActivityID = A.ActivityID
    JOIN 
        Customers C ON AP.CustomerID = C.CustomerID
    WHERE 
        AP.ActivityID = @ActivityID;

        
        `
        let pool = await Conection.conection();
          const result = await pool.request()
           .query(queryinsert)
           for (let re of result.recordset) {
             let dtoActivityParticipant= new DTOActivityParticipant();   
             this.getInformation(dtoActivityParticipant,re);
             arrayn.push(dtoActivityParticipant);
          }
           return arrayn;
        
    }
    static  getActivityParticipantByCustomer=async(CustomerID)=>
    {

        let arrayn=[];

        let queryinsert = `

        DECLARE @CustomerID INT = ${CustomerID};

        SELECT 
        C.CustomerID, 
        C.CustomerName, 
        C.EmailCustomer,
        C.PhoneCustomer,

        A.ActivityID,
        A.ActivityName,
        A.ActivityDescription,
        A.Budget
    FROM 
        ActivityParticipants AP
    JOIN 
        MarketingActivities A ON AP.ActivityID = A.ActivityID
    JOIN 
        Customers C ON AP.CustomerID = C.CustomerID
    WHERE 
        AP.CustomerID = @CustomerID;

        `
        let pool = await Conection.conection();
          const result = await pool.request()
           .query(queryinsert)
           for (let re of result.recordset) {
             let dtoActivityParticipant= new DTOActivityParticipant();   
             this.getInformation(dtoActivityParticipant,re);
             arrayn.push(dtoActivityParticipant);
          }
           return arrayn;
        
    }
    static  getActivityParticipantByCountParticipants=async(ActivityID)=>
    {

        let resultquery;

        let queryinsert = `

        DECLARE @ActivityID INT = ${ActivityID};

            SELECT COUNT(*) AS CountParticipants
        FROM ActivityParticipants
        WHERE ActivityID = @ActivityID;

        `
        let pool = await Conection.conection();
          const result = await pool.request()
           .query(queryinsert)
           resultquery = result.recordset[0].CountParticipants;
           return resultquery;
         
        
    }
  //GET INFORMATION
                
  static getInformation(dtoActivityParticipant, result) {

    dtoActivityParticipant.ActivityID = result.ActivityID;
    dtoActivityParticipant.ActivityName = result.ActivityName;
    dtoActivityParticipant.ActivityDescription = result.ActivityDescription;
    dtoActivityParticipant.Budget = result.Budget;

    dtoActivityParticipant.CustomerID = result.CustomerID;
    dtoActivityParticipant.CustomerName = result.CustomerName;
    dtoActivityParticipant.EmailCustomer = result.EmailCustomer;
    dtoActivityParticipant.PhoneCustomer = result.PhoneCustomer;

}

}

module.exports = { DataActivityParticipant };