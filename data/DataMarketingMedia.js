const { VarChar,Int ,Date} = require("mssql");
const { DTOMarketingMedia } = require("../entity/DTOMarketingMedia");

const { Conection } = require("./Connection");

class DataMarketingMedia
{
       //SET
       static  registerMarketingMedia
       =async(MediaNamee)=>
       {
           let resultquery;
           let queryinsert =  `
           
          
           DECLARE @MediaNamee varchar(50) = '${MediaNamee}';
          
           INSERT INTO MarketingMedia (MediaNamee)
           VALUES (@MediaNamee);
                   
         SELECT 1 AS insertsuccess;
         
             `;
             let pool = await Conection.conection();
               const result = await pool.request()
               .query(queryinsert)
               resultquery = result.recordset[0].insertsuccess;
               
           pool.close();
           return resultquery;
           
       }

       static  updateMarketingMedia
       =async(MediaID,MediaNamee)=>
       {
           let resultquery;
           let queryinsert =  `
           
           declare @MediaID int = ${MediaID};
           DECLARE @MediaNamee varchar(50) = '${MediaNamee}';
          
           IF NOT EXISTS (SELECT MediaID 
            FROM MarketingMedia WHERE MediaID = @MediaID)
         BEGIN
             SELECT -1 AS notexistmediaid
             RETURN;
         END


           UPDATE MarketingMedia SET
           MediaNamee = @MediaNamee
           WHERE MediaID = @MediaID;

           select 1 as updatesucess
                   
         
         
             `;
             let pool = await Conection.conection();
               const result = await pool.request()
               .query(queryinsert)
               resultquery = result.recordset[0].notexistmediaid;
               if(resultquery===undefined)
               {
                  resultquery = result.recordset[0].updatesucess;
                 
               }
               
           pool.close();
           return resultquery;
           
       }
   //GET
   static  getMarketingMediaById=async(MediaID)=>
   {


       let resultquery;

       let queryinsert = `

       DECLARE @MediaID INT = ${MediaID};
       
       IF NOT EXISTS (SELECT MediaID 
        FROM MarketingMedia WHERE MediaID = @MediaID)
     BEGIN
         SELECT -1 AS notexistmediaid
         RETURN;
     END
       SELECT 
       M.MediaID, 
       M.MediaNamee
      FROM 
      MarketingMedia M
      WHERE 
      M.MediaID = @MediaID;
      

       `
       let pool = await Conection.conection();
       const result = await pool.request()
        .query(queryinsert)
        resultquery = result.recordset[0].notexistmediaid;
        if(resultquery===undefined)
        {
               let dtoMarketingMedia = new DTOMarketingMedia();   
               this.getInformation(dtoMarketingMedia,result.recordset[0]);
               resultquery=dtoMarketingMedia;

       }
    return resultquery;
       
   }
   static  getMarketingMedias=async()=>
   {


       let arrayn=[];

       let queryinsert = `

       SELECT 
       M.MediaID, 
       M.MediaNamee
      FROM 
      MarketingMedia M
       `
       let pool = await Conection.conection();
          const result = await pool.request()
           .query(queryinsert)
           for (let re of result.recordset) {
             let dtoMarketingMedia = new DTOMarketingMedia();   
             this.getInformation(dtoMarketingMedia,re);
             arrayn.push(dtoMarketingMedia);
          }
           return arrayn;
       
   }
   static  getMediaByActivity=async(ActivityID)=>
   {

       let arrayn=[];

       let queryinsert = `

       declare @ActivityID int = ${ActivityID};

       SELECT 
       M.MediaID, 
       M.MediaNamee
       FROM MarketingMedia M
       INNER JOIN ActivityMedia AM ON M.MediaID = AM.MediaID
       WHERE AM.ActivityID = @ActivityID;
       `
       let pool = await Conection.conection();
          const result = await pool.request()
           .query(queryinsert)
           for (let re of result.recordset) {
             let dtoMarketingMedia = new DTOMarketingMedia();   
             this.getInformation(dtoMarketingMedia,re);
             arrayn.push(dtoMarketingMedia);
          }
           return arrayn;
       
   }
   static  getMediaPerformanceMetrics=async(MediaID)=>
   {

       let arrayn=[];

       let queryinsert = `
       
        DECLARE @MediaID INT = ${MediaID};
        SELECT
        M.MediaID,
        M.MediaNamee,
        COUNT(AM.ActivityID) AS TotalActivities,
        ISNULL(SUM(AR.Revenue), 0) AS TotalRevenue
        FROM MarketingMedia M
        LEFT JOIN ActivityMedia AM ON M.MediaID = AM.MediaID
        LEFT JOIN ActivityResults AR ON AM.ActivityID = AR.ActivityID
        WHERE M.MediaID = @MediaID
        GROUP BY M.MediaID, M.MediaNamee;
       `
       let pool = await Conection.conection();
          const result = await pool.request()
           .query(queryinsert)
           for (let re of result.recordset) {
             let dtoMarketingMedia = new DTOMarketingMedia();   
             this.getInformation(dtoMarketingMedia,re);
             dtoMarketingMedia.TotalActivities = re.TotalActivities;
             dtoMarketingMedia.TotalRevenue = re.TotalRevenue;
             arrayn.push(dtoMarketingMedia);
          }
           return arrayn;
       
   }


  //GET INFORMATION
                
  static getInformation(dtoMarketingMedia, result) {

    dtoMarketingMedia.MediaID = result.MediaID;
    dtoMarketingMedia.MediaNamee = result.MediaNamee;
   

}

}
module.exports = { DataMarketingMedia };