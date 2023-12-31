USE marketing_activities_managemen
go

---------------------------------------------
----TABLES


CREATE TABLE Customers (
    CustomerID  INT NOT NULL PRIMARY KEY Identity(1,1),
    CustomerName VARCHAR(100) not null,
    EmailCustomer VARCHAR(100) not null,
    PhoneCustomer VARCHAR(20) not null,
    AddressCustomer VARCHAR(255) not null
);

go
CREATE TABLE MarketingCampaigns (
    CampaignID INT NOT NULL PRIMARY KEY Identity(1,1),
    CampaignName VARCHAR(100) not null,
    StartDate DATE not null,
    EndDate DATE not null,
    Budget DECIMAL(10, 2) null
);

go

CREATE TABLE MarketingActivities (
    ActivityID  INT NOT NULL PRIMARY KEY Identity(1,1), 
    ActivityName VARCHAR(100) not null,
    ActivityDescription varchar(500) not null,
    StartDate DATE not null,
    EndDate DATE not null,
    CampaignID INT FOREIGN KEY REFERENCES MarketingCampaigns(CampaignID) not null,
    Budget decimal(10,2) not null
);
go
CREATE TABLE ActivityParticipants (
    ParticipantID INT NOT NULL PRIMARY KEY Identity(1,1),
    ActivityID INT FOREIGN KEY REFERENCES MarketingActivities(ActivityID) not null,
    CustomerID INT FOREIGN KEY REFERENCES Customers(CustomerID) not null
);
go

CREATE TABLE ActivityResults (
    ResultID INT PRIMARY KEY Identity(1,1)  NOT NULL,
    ActivityID INT FOREIGN KEY REFERENCES MarketingActivities(ActivityID)  NOT NULL,
    ReportDate DATE  NOT NULL,
    ResultDescription varchar(500) not null,
	Revenue decimal(10,2) not null
); 

go
CREATE TABLE MarketingMedia (
    MediaID INT PRIMARY KEY Identity(1,1) not null,
    MediaNamee VARCHAR(50) not null
);
go
CREATE TABLE ActivityMedia (
    ActivityID INT FOREIGN KEY REFERENCES MarketingActivities(ActivityID) not null ,
    MediaID INT FOREIGN KEY REFERENCES MarketingMedia(MediaID) not null,
    PRIMARY KEY (ActivityID, MediaID)
);
go


DROP TABLE Customers;
DROP TABLE  MarketingCampaigns;
DROP TABLE  MarketingActivities;
DROP TABLE  ActivityParticipants;
DROP TABLE  MarketingActivities;
DROP TABLE  ActivityResults;
DROP TABLE  MarketingMedia;
DROP TABLE  ActivityMedia;


SELECT * FROM Customers;
SELECT * FROM   MarketingCampaigns;
SELECT * FROM  MarketingActivities;
SELECT * FROM   ActivityParticipants;
SELECT * FROM   MarketingActivities;
SELECT * FROM   ActivityResults;
SELECT * FROM   MarketingMedia;
SELECT * FROM  ActivityMedia;

