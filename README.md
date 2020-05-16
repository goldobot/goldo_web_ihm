# goldo_web_ihm

Build process:
The web ihm uses is built using nodejs.
First install nodejs following instructions at https://nodejs.org/fr/download/package-manager/
Then run npm install in the root of the repository
run npm run-script build to build the ihm into the dist directory

Web server install
You need a web server running on the raspberry to use the ihm
install nginx with apt
copy the goldo_web_ihm.conf file into /etc/nginx/sites-available/
run ln -s /etc/nginx/sites-available/goldo_web_ihm.conf /etc/nginx/sites-enable/goldo_web_ihm.conf
edit goldo_web_ihm.conf to point the root to the dist directory and set the proper hostname for the raspberry
run systemctl restart nginx to restart the web server
enter the url of your raspberry pi into a web browser to access the interface.