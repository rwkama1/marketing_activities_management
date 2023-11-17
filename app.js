//#region CUSTOMER

const { DataCustomer } = require("./data/DataCustomer");
const { DTOCustomer } = require("./entity/DTOCustomer");

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


       async function updateCustomerPhone() {

        let idcustomer = 15;
        let AddressCustomer = "AddressUpdate";

        let updateCustomerName =
         await DataCustomer.updateAddressCustomer(idcustomer,AddressCustomer);
        if (updateCustomerName===-1) {
            throw new
             Error("The Customer does not exists");
        }
      
        console.log("Customer updated successfully");
    }
    updateCustomerPhone().then()
    
//#endregion CUSTOMER