# Roomies
## A universal javascript web application to help you be a better roommate

# Description:

###Minimum Viable Product:
1. CRUD (Homes, Tasks)
2. Email weekly chores at the beginning of the week
3. Shared expenses
4. Auth - Passport

###Extra Features (To do):
    1. Rate chore quality - Develop algorithim to trend towards poorly received 
       reviewed chores (anonymous comments/reviews)
    2. Venmo/paypal integration?
        
#Current Tech Stack:
###Backend
- [Express](http://expressjs.com/) server stuff
- [Mongoose](http://mongoosejs.com/) ODM for mongoDB integration
- [Passport](http://passportjs.org/) for auth middleware

###Frontend
- [React.js](http://facebook.github.io/react/) for our v
- [Redux](https://github.com/rackt/redux) for flux implementation
- [Radium](http://projects.formidablelabs.com/radium/) for inline styles

###Misc
- [Immutable.js](https://facebook.github.io/immutable-js/) for data structures
- [React Router](https://github.com/rackt/react-router) for routing
- [socket io](http://socket.io/) for websocket integration.

###To run
You **will** need to configure with google oauth keys, or change/add passport strategies as you see fit.

for hot reload dev server:

    npm run dev

production build:

    npm run build && npm run start
