const { VarChar,Int ,Date} = require("mssql");

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
}

module.exports = { DataCustomer };
