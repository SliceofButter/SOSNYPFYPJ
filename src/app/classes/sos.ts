//class for SOS object
// consist 2 properties
//1. emergency message
//2. current date

export class SOS{

    headline; // emergency message
    currentDate; //date
    adminNo; //student's admin no
    mapURL;
    desc;
    imageURL;
    attend;
    attendedwho;
    UID;


    //constructor
    InitializeSOSRecord(headline, currentDate, adminNo, desc, mapURL, imageURL, attend, attendedwho, UID){
        this.headline = headline;
        this.currentDate = currentDate;
        this.adminNo = adminNo;
        this.desc = desc;
        this.mapURL = mapURL;
        this.imageURL = imageURL;
        this.attend= attend;
        this.attendedwho=attendedwho;
        this.UID = UID
    }

}