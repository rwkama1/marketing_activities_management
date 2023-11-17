

const { DataCustomer } = require("./data/DataCustomer");
const { DTOCustomer } = require("./entity/DTOCustomer");
//#region CUSTOMER
    // async function registerCustomer() {

    //     for (let index = 1; index < 8; index++) {

    //         let dtocustomer = new DTOCustomer();
    //         dtocustomer.CustomerName = "CustomerName" + index.toString();
    //         dtocustomer.EmailCustomer = `email${index}@gmail.com` ;
    //         dtocustomer.PhoneCustomer = `${index}${index}${index}${index}${index}${index}${index}`;
    //         dtocustomer.AddressCustomer = `AddressCustomer${index}`;

    //         let registerCustomer = await DataCustomer.registerCustomer(dtocustomer);
    //         if (registerCustomer===-1) {
    //             throw new
    //              Error("Incorrect Email");
    //         }
    //         if (registerCustomer===-2) {
    //             throw new
    //              Error("Email already exists in the system");
    //         }
    //              if (registerCustomer===-3) {
    //                 throw new
    //                 Error("Phone number must have 10 numeric digits.");
    //           }
    //             console.log("Customer registered successfully");
    //     }
    // }
    // registerCustomer().then()


    // async function updateCustomer() {

    //     let idcustomer = 1;
    //     let customername = "CustomerUpdate";

    //     let updateCustomerName =
    //      await DataCustomer.updateCustomerName(idcustomer,customername);
    //     if (updateCustomerName===-1) {
    //         throw new
    //          Error("The Customer does not exists");
    //     }
    //     console.log("Customer updated successfully");
    // }
    // updateCustomer().then()


    // async function updateCustomerPhone() {

    //     let idcustomer = 1;
    //     let PhoneCustomer = "8455464645645";

    //     let updateCustomerName =
    //      await DataCustomer.updateCustomerPhone(idcustomer,PhoneCustomer);
    //     if (updateCustomerName===-1) {
    //         throw new
    //          Error("The Customer does not exists");
    //     }
    //     if (updateCustomerName===-2) {
    //         throw new
    //          Error("Phone number must have 10 numeric digits.");
    //     }
    //     console.log("Customer updated successfully");
    // }
    // updateCustomerPhone().then()


    //    async function updateCustomerEmail() {

    //     let idcustomer = 8;
    //     let PhoneCustomer = "email8@gmail.com";

    //     let updateCustomerEmail =
    //      await DataCustomer.updateCustomerEmail(idcustomer,PhoneCustomer);
    //     if (updateCustomerEmail===-1) {
    //         throw new
    //          Error("The Customer does not exists");
    //     }
    //     if (updateCustomerEmail===-2) {
    //         throw new
    //         Error("Incorrect Email");
    //     }
    //     if (updateCustomerEmail===-3) {
    //      throw new
    //      Error("Email already exists in the system");
  
    //     }
     
    //     console.log("Customer updated successfully");
    // }
    // updateCustomerEmail().then()


    //     async function getCustomerById() {
    //             let getCustomerById =
    //             await DataCustomer.getCustomerById(5);
    //              if (getCustomerById===-1) {
    //                     throw new
    //                     Error("Customer Not Found");
    //                 }
    //             console.log(getCustomerById);
    
    //             }
    //  getCustomerById().then()

        //  async function getCustomerByName() {
        //         let getCustomerByName =
        //         await DataCustomer.getCustomerByName("9");
                
        //         console.log(getCustomerByName);
    
        //         }
        //         getCustomerByName().then()
    
//#endregion CUSTOMER