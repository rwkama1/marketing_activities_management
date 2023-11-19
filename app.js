

const { DataCustomer } = require("./data/DataCustomer");
const { DataMarketingActivities } = require("./data/DataMarketingActivities");
const { DataMarketingCampaigns } = require("./data/DataMarketingCampaigns");
const { DTOCustomer } = require("./entity/DTOCustomer");
const { DTOMarketingActivities } = require("./entity/DTOMarketingActivities");
const { DTOMarketingCampaigns } = require("./entity/DTOMarketingCampaigns");
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


    // async function updateCustomerName() {

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
    // updateCustomerName().then()


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

//#region MARKETING CAMPAIGNS 

//  async function registerMarketingCampaign() {

//         for (let index = 1; index < 8; index++) {

//             let dtoMarketingCampaigns = new DTOMarketingCampaigns();
//             dtoMarketingCampaigns.CampaignName = "CampaignName" + index.toString();
//             dtoMarketingCampaigns.StartDate = `2023-12-0${index}` ;
//             dtoMarketingCampaigns.EndDate = `2023-12-1${index}`;
//             dtoMarketingCampaigns.Budget = 0;

//             let registerMarketingCampaign = await DataMarketingCampaigns.registerMarketingCampaign(dtoMarketingCampaigns);
//             if (registerMarketingCampaign===-1) {
//                 throw new
//                  Error("The End Date must be higher than Start Date");
//             }
//             if (registerMarketingCampaign===-2) {
//                 throw new
//                  Error("The Budget must be higher than 0");
//             }
           
//                 console.log("Campaign registered successfully");
//         }
//     }
//     registerMarketingCampaign().then()



// async function updateMarketingCampaignNameBudget() {

//     let idcampaign = 6;
//     let CampaignName = "CampaignNameUpdated";
//     let Budget =9000;

//     let updateMarketingCampaignNameBudget =
//      await DataMarketingCampaigns
//      .updateMarketingCampaignNameBudget(idcampaign,CampaignName,Budget);
//     if (updateMarketingCampaignNameBudget===-1) {
//         throw new
//          Error("The Campaign does not exists");
//     }
//     if (updateMarketingCampaignNameBudget===-2) {
//         throw new
//       Error("The Budget must be higher than 0");
//     }
//     console.log("MarketingCampaigns updated successfully");
// }
// updateMarketingCampaignNameBudget().then()




    //   async function getMarketingCampaignById() {
    //             let getMarketingCampaignById =
    //             await DataMarketingCampaigns.getMarketingCampaignById(15);
    //              if (getMarketingCampaignById===-1) {
    //                     throw new
    //                     Error("MarketingCampaign Not Found");
    //                 }
    //             console.log(getMarketingCampaignById);
    
    //             }
    //  getMarketingCampaignById().then()

        // async function getMarketingCampaigns() {
        //         let getMarketingCampaigns =
        //         await DataMarketingCampaigns.getMarketingCampaigns();
                 
        //         console.log(getMarketingCampaigns);
    
        //         }
        //         getMarketingCampaigns().then()

        //  async function getMarketingCampaignsInProgress() {
        //         let getMarketingCampaignsInProgress =
        //         await DataMarketingCampaigns.getMarketingCampaignsInProgress();
                 
        //         console.log(getMarketingCampaignsInProgress);
    
        //         }
        //         getMarketingCampaignsInProgress().then()

        // async function getMarketingCampaignDuration() {
        //     let getMarketingCampaignDuration =
        //     await DataMarketingCampaigns.getMarketingCampaignDuration(5);
             
        //     console.log(getMarketingCampaignDuration);

        //     }
        //     getMarketingCampaignDuration().then()



        // async function getMarketingCampaignsTotalCost() {
        //     let getMarketingCampaignsTotalCost =
        //     await DataMarketingCampaigns.getMarketingCampaignsTotalCost();
             
        //     console.log(getMarketingCampaignsTotalCost);

        //     }
        //     getMarketingCampaignsTotalCost().then()


        
        // async function getMarketingCampaignsAverageBudgetPerDay() {
        //     let getMarketingCampaignsAverageBudgetPerDay =
        //     await DataMarketingCampaigns.getMarketingCampaignsAverageBudgetPerDay(3);
             
        //     console.log(getMarketingCampaignsAverageBudgetPerDay);

        //     }
        //     getMarketingCampaignsAverageBudgetPerDay().then()


        //  async function getMarketingCampaignsWithLargerBudget() {
        //     let getMarketingCampaignsWithLargerBudget =
        //     await DataMarketingCampaigns.getMarketingCampaignsWithLargerBudget(5);
             
        //     console.log(getMarketingCampaignsWithLargerBudget);

        //     }
        //     getMarketingCampaignsWithLargerBudget().then()

        //    async function getMarketingCampaignsByDate() {

        //      let StartDate = `2023-12-02` ;
        //      let EndDate = `2023-12-19` ;

        //     let getMarketingCampaignsByDate =
        //     await DataMarketingCampaigns.getMarketingCampaignsByDate(StartDate,EndDate);
             
        //     console.log(getMarketingCampaignsByDate);

        //     }
        //     getMarketingCampaignsByDate().then()

        
        //    async function getMarketingCampaignsDurationAverageCampaigns() {


        //     let getMarketingCampaignsDurationAverageCampaigns =
        //     await DataMarketingCampaigns.getMarketingCampaignsDurationAverageCampaigns();
             
        //     console.log(getMarketingCampaignsDurationAverageCampaigns);

        //     }
        //     getMarketingCampaignsDurationAverageCampaigns().then()

//#endregion MARKETING CAMPAIGNS 
//#region MARKETING ACTIVITIES

//  async function registerMarketingActivities() {
//   for (let index = 1; index < 8; index++) {
//             let dtoMarketingActivities = new DTOMarketingActivities();
//             dtoMarketingActivities.ActivityName = "ActivityName" + index.toString();
//             dtoMarketingActivities.ActivityDescription = "ActivityDescription" + index.toString();
//             dtoMarketingActivities.CampaignID = 0+index;
//             dtoMarketingActivities.StartDate = `2023-12-0${index}` ;
//             dtoMarketingActivities.EndDate = `2023-12-1${index}`;
            

//             let registerMarketingActivities = await DataMarketingActivities.registerMarketingActivities(dtoMarketingActivities);
//             if (registerMarketingActivities===-1) {
//                 throw new
//                  Error("The End Date must be higher than Start Date");
//             }
//             if (registerMarketingActivities===-2) {
//                 throw new
//                Error("The Campaign does not exists");
//             }
//             if (registerMarketingActivities===-3) {
//                 throw new
//                Error("Marketing Activities dates must be within the campaign date range");
//             }
//                 console.log("Marketing Activity registered successfully");
//         }
//     }
//     registerMarketingActivities().then()

// async function updateMarketingActivityNameDesc() {

//     let idactivity = 6;
//     let name = "nameupdate";
//     let description ="descriptionupdate";

//     let updateMarketingActivityNameDesc =
//      await DataMarketingActivities
//      .updateMarketingActivityNameDesc(idactivity,name,description);
//     if (updateMarketingActivityNameDesc===-1) {
//         throw new
//          Error("The Activity does not exists");
//     }
   
//     console.log("Activity updated successfully");
// }
// updateMarketingActivityNameDesc().then()

    //  async function getMarketingActivityById() {


    //  let getMarketingActivityById =
    //      await DataMarketingActivities.getMarketingActivityById(5);
    //      if (getMarketingActivityById===-1) {
    //             throw new
    //            Error("The Activity does not exists");
    //         }
    //   console.log(getMarketingActivityById);

    //      }

    //      getMarketingActivityById().then()


    //   async function getMarketingActivityByCampaign() {


    //  let getMarketingActivityByCampaign =
    //      await DataMarketingActivities.getMarketingActivityByCampaign(5);
        
    //   console.log(getMarketingActivityByCampaign);

    //      }
    //      getMarketingActivityByCampaign().then()


//#endregion MARKETING ACTIVITIES