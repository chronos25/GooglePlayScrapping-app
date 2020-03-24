# Google Play APP

This is an application based on google play android application information which scrap the data from google play 
about the android apps store the data into its local database and provides only useful information to the user.

In this application, REST-API endpoints are 

..* /applists
  
  ### which return the list of application that is store and accessed previously by the user and data related to android application
      like icon, developer name, appid, title etc.
  
..* /app/appdetail?pkg="xyz"

  ### which return the detail about the "xyz" android application that only includes the detail about the application 
      like screenshots,video, developerName, images etc.
      
## To RUN 

 Clone the application 
 
    git clone https://github.com/chronos25/GooglePlayScrapping-app.git
 
 Install package 

    npm i
 
 To run the application
    
    nodemon ./bin/www
  
  This application run at 
    
    http://localhost:3000/applists
    http://localhost:4200/app/appdetail?pkg="xyz"  
  
 
