# Food Saver

Food Saver is an application that keeps track of your perishable food at home to help reduce food waste and guide sustainable grocery shopping. If any food item is closely approaching its expiration date, Food Saver will send notifications as a reminder to make use of that food soon. Food Saver also gives recipe recommendations to help you make the best use of your food.

## Getting Started

To run this project, run ```$ npm install``` in both ```foodsaver-frontend``` and ```foodsaver-backend``` folders to get all dependencies and packages.

#### Knex.js & MySQL

When running Knex.js migrations, please run the ```users``` migration file first in order to avoid any DB issues. Afterwards, please ensure to run the remaining migration files (```inventory```, ```notifications```, ```favorites```). 

#### .env

```.env.sample``` in ```foodsaver-backend``` provides a sample of environment variables required to run this project. You will need to add the following environment variables to your .env file:

For Local Database: 
`PORT`
`DB_HOST`
`DB_DBNAME`
`DB_USER`
`DB_PASSWORD`

JSON Web Token Secret Key: 
`JWT_SECRET`

MailJet API Credentials:   
`MJ_APIKEY_PUBLIC`
`MJ_APIKEY_PRIVATE`

Edamam API Credentials: 
`EDAMAM_APP_ID`
`EDAMAM_APP_KEY`

#### External APIs

MailJet and Edamam are external APIs that are required for full functionality of this application. The MailJet API is required for sending automatic email notifications, and the Edamam API is required for searching up recipe recommendations. Sign up is required to retreive API Credentials from these external APIs. 

Links to External APIs: 
MailJet: [(https://www.mailjet.com/)]
Edamam: [(https://www.edamam.com/)]

#### Now you are all set!

Run ```$ npx nodemon index.js``` in ```foodsaver-backend``` and ```$ npm start``` in ```foodsaver-frontend``` to start the project.

## API Documentation

#### Create a user account

```
  POST /users/signup
```


#### Log in to an existing user account

```
  POST /users/login
```


#### Get user info

```
  GET /users
```
| Requirements |            
| :----| 
| Auth |


#### Update user info

```
  PUT /users
```
| Requirements |            
| :----| 
| Auth |


#### Change user password 

```
  PUT /users/password
```
| Requirements |            
| :----| 
| Auth |


#### Delete user account 

```
  DELETE /users
```
| Requirements |            
| :----| 
| Auth |


#### Get user inventory

```
  GET /inventory
```
| Requirements |            
| :----| 
| Auth |


#### Create food item in user inventory

```
  POST /inventory
```
| Requirements |            
| :----| 
| Auth |


#### Update or discard food item in user inventory

```
  PUT /inventory/:id
```
| Requirements |            
| :----| 
| Auth |


#### Get favorite recipes for user

```
  GET /favorites
```
| Requirements |            
| :----| 
| Auth |


#### Add favorite recipe for user

```
  POST /favorites
```
| Requirements |            
| :----| 
| Auth |


#### Delete favorite recipe for user

```
  DELETE /favorites
```
| Requirements |            
| :----| 
| Auth |

#### Add default notification settings for new user

```
  POST /notifications
```


#### Get notification settings for user

```
  POST /notifications
```
| Requirements |            
| :----| 
| Auth |


#### Edit notification settings for user 

```
  PUT /notifications
```
| Requirements |            
| :----| 
| Auth |


#### Get suggested recipes from Edamam API for user

```
  POST /edamamAPI/recipes
```
| Requirements |            
| :----| 
| Auth |


#### Get favorite recipes data from Edamam API for user

```
  POST /edamamAPI/favorites
```
| Requirements |            
| :----| 
| Auth |


## Built with

```React.js``` ```SASS``` ```Node.js``` ```Express``` ```Knex.js``` ```MySQL```


## 🔗 Links
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://ca.linkedin.com/in/davidjiwonpark)


## Support

For support, email davidpark48@hotmail.com 

