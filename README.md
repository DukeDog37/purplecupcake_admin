# purplecupcake_admin

1. run the DDL (data definition) in schema.sql in your mySQL workbench instance.  This will create the cupcake_db database.

2. Go into the config.json in config folder and change the development password from "default" to whatever your local mySQL database password is

3. from command line, navigate to the project directory and run npm install
	This will install the packages declared in package.json (just a few)

4. From command line, run 'node server.js'

5. you can hit the app from browser: localhost:3000

Note:  I am still working on the routese for orders, so the only two object CRUD routes that are functional now are the customer and product routes.
