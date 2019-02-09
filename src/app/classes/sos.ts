//class for SOS object
// consist 2 properties
//1. emergency message
//2. current date

export class SOS{

    headline; // emergency message
    currentDate; //date
    adminNo; //student's admin no


    //constructor
    InitializeSOSRecord(headline, currentDate, adminNo){
        this.headline = headline;
        this.currentDate = currentDate;
        this.adminNo = adminNo;
    }

}