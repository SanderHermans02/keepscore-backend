# Examenopdracht Web Services

- Student: Sander Hermans
- Studentennummer: 202073918
- E-mailadres: sander.hermans@student.hogent.be

## Vereisten

Ik verwacht dat volgende software reeds geïnstalleerd is:

- [NodeJS](https://nodejs.org)
- [Yarn](https://yarnpkg.com)
- [MySQL Community Server](https://dev.mysql.com/downloads/mysql/)
- ...


## Opstarten

Budget API
To start this API, create a ```.env``` file in the root of this folder with this content
```
NODE_ENV="development"
DATABASE_USERNAME="root"
DATABASE_PASSWORD=""
```	
Update the username and password with the credentials of your local database.

You can also extend the ```.env``` file with these configurations, only if the database host/port are different than our default.
```
DATABASE_HOST="localhost"
DATABASE_PORT=3306
```
You can further extend the ```.env``` file with these configurations, if you wish to have authentication.
```
AUTH_JWKS_URI='https://keepscore.eu.auth0.com/.well-known/jwks.json'
AUTH_AUDIENCE='https://keepscore.sanderhermans.be'
AUTH_ISSUER='https://keepscore.eu.auth0.com/'
AUTH_USER_INFO='https://keepscore.eu.auth0.com/userinfo'
```	
## How to start
Run the app in development mode with ```yarn start```.

Run the app in production mode with ```yarn start:prod```. We then assume all necessary environment variables are set, no ```.env``` file is ever read with this command.
## Testen

/
