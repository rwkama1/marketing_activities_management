const { VarChar,Int ,Date} = require("mssql");
const { DTOCustomer } = require("../entity/DTOCustomer");

const { Conection } = require("./Connection");


class DataCustomer
{
     //SET

     static  registerCustomer=async(dtocustomer)=>
     {
         let {CustomerName ,EmailCustomer ,PhoneCustomer ,AddressCustomer}=dtocustomer;
         let resultquery;
         let queryinsert = `

         DECLARE @CustomerName VARCHAR(100) = '${CustomerName}';
         DECLARE @Email VARCHAR(100) = '${EmailCustomer}';
         DECLARE @PhoneCustomer VARCHAR(20) = '${PhoneCustomer}';
         DECLARE @AddressCustomer VARCHAR(255) = '${AddressCustomer}';
        
         IF LEN(@PhoneCustomer) != 10 AND @PhoneCustomer  LIKE '%[^0-9]%'
         BEGIN
             SELECT -3 AS incorrectphonenumber
             RETURN;
         END
         IF @Email LIKE '%@%.%'
             AND @Email NOT LIKE '%@%@%'
             AND @Email NOT LIKE '%..%'
             AND PATINDEX('%[^a-zA-Z0-9.@_-]%', @Email) = 0
             AND LEN(@Email) - LEN(REPLACE(@Email, '.', '')) <= 1
             AND LEN(@Email) - LEN(REPLACE(@Email, '@', '')) = 1
             AND LEN(@Email) - LEN(REPLACE(@Email, '-', '')) <= 1
             AND RIGHT(@Email, 1) != '.'
             AND CHARINDEX('.', @Email) > CHARINDEX('@', @Email) + 1
             AND CHARINDEX('@', @Email) > 1
         BEGIN
             IF EXISTS (SELECT 1 FROM Customers WHERE EmailCustomer = @Email)
             BEGIN
                 SELECT -2 AS duplicateemail;
             END
             ELSE
             BEGIN
             INSERT INTO Customers (CustomerName, EmailCustomer, PhoneCustomer, AddressCustomer)
             VALUES (@CustomerName, @Email, @PhoneCustomer, @AddressCustomer);
                 
                 SELECT 1 AS insertsuccess;
             END
         END
         ELSE
         BEGIN
             SELECT -1 AS incorrectemail;
         END
         
           `;
           let pool = await Conection.conection();
             const result = await pool.request()
             .query(queryinsert)
             resultquery = result.recordset[0].incorrectemail;
             if(resultquery===undefined)
             {
             resultquery = result.recordset[0].insertsuccess;
                  if(resultquery===undefined)
                  {
                  resultquery = result.recordset[0].duplicateemail;
                        if(resultquery===undefined)
                        {
                        resultquery = result.recordset[0].incorrectphonenumber;
                        }
                  }
             }
         pool.close();
         return resultquery;
         
     }
     static  updateCustomerName=async(idcustomer,CustomerName)=>
     {
        
         let resultquery;
         let queryinsert = `
 
             declare @CustomerID int = ${idcustomer};
             DECLARE @CustomerName VARCHAR(100) = '${CustomerName}';
            
 
              IF NOT EXISTS (SELECT CustomerID 
                 FROM Customers WHERE CustomerID = @CustomerID)
              BEGIN
                  SELECT -1 AS notexistcustomer
              END
              ELSE
              BEGIN
                 UPDATE Customers SET
                 CustomerName = @CustomerName
                 WHERE CustomerID = @CustomerID;
 
                 select 1 as updatesucess
             END
 
           `;
           let pool = await Conection.conection();
             const result = await pool.request()
             .query(queryinsert)
             resultquery = result.recordset[0].notexistcustomer;
             if(resultquery===undefined)
             {  
                 resultquery = result.recordset[0].updatesucess;
                 
             }
         pool.close();
         return resultquery;
         
     }
     static  updateCustomerPhone=async(idcustomer,PhoneCustomer)=>
     {
        
         let resultquery;
         let queryinsert = `
 
             declare @CustomerID int = ${idcustomer};
             DECLARE @PhoneCustomer VARCHAR(20) = '${PhoneCustomer}';
            
 
              IF NOT EXISTS (SELECT CustomerID 
                 FROM Customers WHERE CustomerID = @CustomerID)
              BEGIN
                  SELECT -1 AS notexistcustomer
                  RETURN;
              END
              IF LEN(@PhoneCustomer) != 10 AND @PhoneCustomer  LIKE '%[^0-9]%'
             BEGIN
                 SELECT -2 AS incorrectphonenumber
                 RETURN;
             END

                 UPDATE Customers SET
                 PhoneCustomer = @PhoneCustomer
                 WHERE CustomerID = @CustomerID;
 
                 select 1 as updatesucess
             
 
           `;
           let pool = await Conection.conection();
             const result = await pool.request()
             .query(queryinsert)
             resultquery = result.recordset[0].notexistcustomer;
             if(resultquery===undefined)
             {  
                 resultquery = result.recordset[0].incorrectphonenumber;
                 if(resultquery===undefined)
                    {  
                        resultquery = result.recordset[0].updatesucess;
                    }
             }
         pool.close();
         return resultquery;
         
     }
     static  updateAddressCustomer=async(idcustomer,AddressCustomer)=>
     {
        
         let resultquery;
         let queryinsert = `
 
             declare @CustomerID int = ${idcustomer};
             DECLARE @AddressCustomer VARCHAR(20) = '${AddressCustomer}';
            
 
              IF NOT EXISTS (SELECT CustomerID 
                 FROM Customers WHERE CustomerID = @CustomerID)
              BEGIN
                  SELECT -1 AS notexistcustomer
                  RETURN;
              END
             

                 UPDATE Customers SET
                 AddressCustomer = @AddressCustomer
                 WHERE CustomerID = @CustomerID;
 
                 select 1 as updatesucess
             
 
           `;
           let pool = await Conection.conection();
             const result = await pool.request()
             .query(queryinsert)
             resultquery = result.recordset[0].notexistcustomer;
             if(resultquery===undefined)
             {  
                 
                        resultquery = result.recordset[0].updatesucess;
             }
         pool.close();
         return resultquery;
         
     }
     static  updateCustomerEmail=async(idcustomer,Email)=>
     {
        
         let resultquery;
         let queryinsert = `
 
             declare @CustomerID int = ${idcustomer};
             DECLARE @Email VARCHAR(100) = '${Email}';
            
 
             IF NOT EXISTS (SELECT CustomerID 
                FROM Customers WHERE CustomerID = @CustomerID)
             BEGIN
                 SELECT -1 AS notexistcustomer
                 RETURN;
             END
             IF @Email LIKE '%@%.%'
             AND @Email NOT LIKE '%@%@%'
             AND @Email NOT LIKE '%..%'
             AND PATINDEX('%[^a-zA-Z0-9.@_-]%', @Email) = 0
             AND LEN(@Email) - LEN(REPLACE(@Email, '.', '')) <= 1
             AND LEN(@Email) - LEN(REPLACE(@Email, '@', '')) = 1
             AND LEN(@Email) - LEN(REPLACE(@Email, '-', '')) <= 1
             AND RIGHT(@Email, 1) != '.'
             AND CHARINDEX('.', @Email) > CHARINDEX('@', @Email) + 1
             AND CHARINDEX('@', @Email) > 1
         BEGIN
             IF EXISTS (SELECT 1 FROM Customers WHERE EmailCustomer = @Email)
             BEGIN
                 SELECT -3 AS duplicateemail;
             END
             ELSE
             BEGIN
                UPDATE Customers SET
                EmailCustomer = @Email
                WHERE CustomerID = @CustomerID;

                select 1 as updatesucess
             END
         END
         ELSE
         BEGIN
             SELECT -2 AS incorrectemail;
         END
 
           `;
           let pool = await Conection.conection();
             const result = await pool.request()
             .query(queryinsert)
             resultquery = result.recordset[0].notexistcustomer;
             if(resultquery===undefined)
             {  
                 resultquery = result.recordset[0].incorrectemail;
                 if(resultquery===undefined)
                 {  
                     resultquery = result.recordset[0].duplicateemail;
                     if(resultquery===undefined)
                     {  
                         resultquery = result.recordset[0].updatesucess;
                     }
                 }
             }
         pool.close();
         return resultquery;
         
     }

     //GET

     static  getCustomerById=async(idcustomer)=>
     {


         let resultquery;
 
         let queryinsert = `
 
         DECLARE @CustomerID INT = ${idcustomer};
         
         IF NOT EXISTS (SELECT CustomerID 
            FROM Customers WHERE CustomerID = @CustomerID)
         BEGIN
             SELECT -1 AS notexistcustomer
             RETURN;
         END
        
             SELECT 
                 C.CustomerID, 
                 C.CustomerName,
                 C.EmailCustomer,
                 C.PhoneCustomer,
                C.AddressCustomer
             FROM Customers C
             WHERE CustomerID = @CustomerID;
        
 
         `
         let pool = await Conection.conection();
         const result = await pool.request()
          .query(queryinsert)
          resultquery = result.recordset[0].notexistcustomer;
          if(resultquery===undefined)
          {
                 let dtocustomer = new DTOCustomer();   
                 this.getInformation(dtocustomer,result.recordset[0]);
                 resultquery=dtocustomer;
 
         }
      return resultquery;
         
     }
     static  getCustomerByName=async(name="")=>
     {


         let arrayn=[];
 
         let queryinsert = `
 
             SELECT 
                 C.CustomerID, 
                 C.CustomerName,
                 C.EmailCustomer,
                 C.PhoneCustomer,
                C.AddressCustomer
             FROM Customers C
             WHERE C.CustomerName like '%${name}%'
        
 
         `
         let pool = await Conection.conection();
         const result = await pool.request()
          .query(queryinsert)
          for (let re of result.recordset) {
            let dtocustomer = new DTOCustomer();   
            this.getInformation(dtocustomer,re);
            arrayn.push(dtocustomer);
         }
          return arrayn;
     
         
     }
     static  getCustomerEngagementMetrics=async(CustomerID)=>
     {


         let arrayn=[];
 
         let queryinsert = `
         declare @CustomerID int = ${CustomerID};
             SELECT 
                 C.CustomerID, 
                 C.CustomerName,
                 C.EmailCustomer,
                 C.PhoneCustomer,
                C.AddressCustomer,
            COUNT(DISTINCT AP.ActivityID) AS ParticipatedActivities,
             SUM(AR.Revenue) AS TotalRevenue
            FROM Customers C
            LEFT JOIN ActivityParticipants AP ON C.CustomerID = AP.CustomerID
            LEFT JOIN ActivityResults AR ON AP.ActivityID = AR.ActivityID
            WHERE C.CustomerID = @CustomerID
            GROUP BY C.CustomerID, C.CustomerName,C.EmailCustomer,C.PhoneCustomer,C.AddressCustomer;
        
 
         `
         let pool = await Conection.conection();
         const result = await pool.request()
          .query(queryinsert)
          for (let re of result.recordset) {
            let dtocustomer = new DTOCustomer();   
            this.getInformation(dtocustomer,re);
            dtocustomer.ParticipatedActivities = re.ParticipatedActivities;
            dtocustomer.TotalRevenue = re.TotalRevenue;
            arrayn.push(dtocustomer);
         }
          return arrayn;
     
         
     }

        //GET INFORMATION
                
        static getInformation(dtocustomer, result) {

            dtocustomer.CustomerID = result.CustomerID;
            dtocustomer.CustomerName = result.CustomerName;
            dtocustomer.EmailCustomer = result.EmailCustomer;
            dtocustomer.PhoneCustomer = result.PhoneCustomer;
            dtocustomer.AddressCustomer = result.AddressCustomer;
        }
}

module.exports = { DataCustomer };
