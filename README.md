# orcatech-project
A simple web application built using ReactJS, WebPack, and PHP that displays a table of information.

# Usage
This was literally whipped up in under a day, and I have little experience with a few of the tech stacks involved, so bear with me.

You've got to run both the PHP server and the NPM client separately:

### NPM
Assuming you have Node.js and NPM up and running on your machine, CD into the "/front-end/orcatech" folder and run "npm build", then "npm start"

### PHP
Assuming you have PHP installed on your machine, CD into the root project directory and run "php -S localhost:3001"

This _should_ be enough to get 'er up and running on "http://localhost:3000".

#### Note: the 'delete' functionality is only in place on the front end so far ( so it can get out of sync, and act abnormally ). I have yet to quite figure out how to get the PHP server to serialize the removal of an item...
