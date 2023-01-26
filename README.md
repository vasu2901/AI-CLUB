# AI-Club Backend Task
This repository is about how to store and retrieve information of club members stored in the cloud database of MongoDBAtlas. 

This project will perform a set of tasks like:-
1.Club members Signup
2.Club members Login
3.Club memeber phone no update
4.Fetch all Club member details
5.Fetch a particular Club member's details using Club member ID.

For signup- It's going to be a POST method and for calling you must use <strong>"/api/user/createuser"</strong>. For providing the data to the server it should be in the form
of json file. Below given is an example:-
{
  "name" : "vighnesh",
  "email" : "xyz@gmail.com",
  "password" : "bvrufvu",
  "phone" : 1548
 }
 
 After sending the data, the server will send us an auth-token which is an unique identity.
 
 For login- It is again going to be a POST method and for calling you must use <strong>"/api/user/loginuser"</strong>. In this we only have to provide our email ID 
 and password. After sending the data, the server will send us an auth-token which is an unique identity. This is auth-token should be provided in the 
 header section of request with the name <strong> auth-token </strong>.
 
 For updating the phone number, the user first have to login and then have to visit  and after logging in they have to provide the auth-token received from server in the header section
 of api call <strong>"/api/user/updateuser"</strong>. Then in the body section, they have to provide their updated phone number. Please remember that this has to
 be a POST METHOD.
 
 For getting  all user's details, you should be the admin of the server. If you are then first you have to login and then have to visit  and after logging in they have to provide the auth-token received from server in the header section
 of api call <strong>"/api/user/getalluser"</strong>. You will receive the data in JSON format. Please remember that this has to
 be a GET METHOD.
 
  For getting  a particular user's details, you should be the admin of the server. If you are then first you have to login and then have to visit  and after logging in they have to provide the auth-token received from server in the header section
 of api call <strong>"/api/user/getuser"</strong>.Then in the body section, type the email address of that club member and shown in the above example. You will receive the data in JSON format. Please remember that this has to
 be a POST METHOD.
 
 Also for adding your database address and port, go to the .env file and make the changes. 
 
 I hope I have answered your questions pretty well. 
 
 Thank You!
