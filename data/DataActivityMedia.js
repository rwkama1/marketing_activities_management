const { VarChar,Int ,Date} = require("mssql");


const { Conection } = require("./Connection");

class DataActivityMedia
{
       //SET
       static  registerActivityMedia
       =async(ActivityID,MediaID)=>
       {
           let resultquery;
           let queryinsert =  `
           
          
           DECLARE @ActivityID int = ${ActivityID};
           DECLARE @MediaID int = ${MediaID};


           IF NOT EXISTS (SELECT MediaID 
            FROM MarketingMedia WHERE MediaID = @MediaID)
         BEGIN
             SELECT -1 AS notexistmediaid
             RETURN;
         END

         IF NOT EXISTS (SELECT ActivityID 
            FROM MarketingActivities WHERE ActivityID = @ActivityID)
         BEGIN
                    SELECT -2 AS notexistmarketingactivity
                    return;
         END
         IF  EXISTS (SELECT 1 
            FROM ActivityMedia WHERE ActivityID = @ActivityID AND 
            MediaID=@MediaID )
         BEGIN
                    SELECT -3 AS existactivitymedia
                    return;
         END

           INSERT INTO ActivityMedia (ActivityID, MediaID)
            VALUES (@ActivityID, @MediaID);
                   
         SELECT 1 AS insertsuccess;
         
             `;
             let pool = await Conection.conection();
               const result = await pool.request()
               .query(queryinsert)
               resultquery = result.recordset[0].notexistmediaid;
               if(resultquery===undefined)
               {
                  resultquery = result.recordset[0].notexistmarketingactivity;
                        if(resultquery===undefined)
                    {
                        resultquery = result.recordset[0].existactivitymedia;
                        if(resultquery===undefined)
                        {
                            resultquery = result.recordset[0].insertsuccess;
                            
                        }
                    }
               }
             
               
           pool.close();
           return resultquery;
           
       }

   

  //GET INFORMATION
                
  static getInformation(dtoMarketingMedia, result) {

    dtoMarketingMedia.MediaID = result.MediaID;
    dtoMarketingMedia.MediaNamee = result.MediaNamee;
   

}

}
module.exports = { DataActivityMedia };