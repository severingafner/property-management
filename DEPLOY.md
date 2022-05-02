# Rocket SaaS Boilerplate

Welcome to Rocket! Thank you for your purchase. Your support means a lot to me.

Rocket is a boilerplate for building full-stack SaaS applications using Node.js, React and MongoDB.

The documentation will guide you to deploy your app in either of the following ways:
- Docker (recommended)
- Manual deployment using Heroku and Vercel

If you're new to Rocket, start with the SETUP instructions, build your app, and when you're done, come back here to deploy.

## Deploy using Docker

This guide will help you deploy your app on a machine using Docker. Why Docker? It is the easiest way to deploy your app in an isolated containerized environment, which allows your app to work the same way on any machine. 

For this method, you will need a domain name, which can be purchased from any domain name registrar (namecheap, google domains, godaddy etc). After you have access to a domain, add an A record in the domain records to point to the public ip of your host.

Before deploying, make sure that docker is installed on the machine. If not, you can follow the installation steps here: https://docs.docker.com/engine/install/

We will also be using Docker compose to easily spin up multiple containers. You can follow the installation steps for Docker compose here: https://docs.docker.com/compose/install/

1. Copy your app source code to the machine (you may clone your code from your git repository)

2. Configure your environment variables (Make sure that you are using the production keys (Stripe, MongoDB) and not the test keys) : 
	- Make sure the Rocket server .env file is present in the server folder. If not, you can create one.
	- Leave the value of `CLIENT_URL` as empty
	- Make sure the Rocket client .env file is present in the client folder. If not, you can create one.
	- Leave the value of `REACT_APP_API_URL` as empty

3. Update the config file :
	- Open docker-compose.yml file and replace the email in the command under certbot to your contact email
	- Open nginx.config file inside the client directory, and replace all instances of cloud.rocketapp.me with your domain name
	- Open nginx.setup.config file inside the client directory, and replace all instances of cloud.rocketapp.me with your domain name

4. From the root directory of your source code, run the following command:
	```bash
	docker-compose -f docker-compose.yml -f docker-compose.setup.yml up --build -d
	```
	This commans sets up the mongodb database, the rocket server, and the nginx config with certbot to install ssl certificates. To check if the certificates are installed correctly, run the following command:
	```bash
	docker-compose exec client ls -la /etc/letsencrypt/live
	```
	If your request was successful, you will see output like this:
	```bash
	total 16
	drwx------ 3 root root 4096 Jun 10 23 16:48 .
	drwxr-xr-x 9 root root 4096 Jun 10 16:48 ..
	-rw-r--r-- 1 root root  740 Jun 10 16:48 README
	drwxr-xr-x 2 root root 4096 Jun 10 16:48 cloud.rocketapp.me
	```

5. Run the following command to run nginx server to serve the client and proxt api requests to the api server:
	```bash
	docker-compose up -d --force-recreate --build --no-deps client
	``` 

This will run your app on the machine. This will also create a MongoDB instance on the same machine, and connect the Rocket server with this DB. If you want to connect to a different MongoDB instance, open the docker-compose.yml file and remove the mongodb service. In the same file, update the `MONGODB_URL` under the server to point to the required MongoDB instance.

You can test your deployment by making requests and you should see the Rocket admin (Make sure that http and https traffic is enabled on the machine (i.e. port 80 and 443 are exposed)). 

6. Renewing certificates: Let’s Encrypt certificates are valid for 90 days, so you will need to renew certificates before they expire. One way to do this is to create a job with the cron scheduling utility. In this case, we will schedule a cron job using a script that will renew our certificates and reload our Nginx configuration.
	- Open the ssl_renew.sh file and replace the path `~/Rocket` to your project directory
	- Save the file and run the following command:
		```bash
		chmod +x ssl_renew.sh
		```
	- Run the following commant to open chrontab:
		```bash
		sudo crontab -e
		```
	- At the bottom of the file, add the following line (Replace the path `~/Rocket` to your project directory):
		```
		0 12 * * * ~/Rocket/ssl_renew.sh >> /var/log/cron.log 2>&1
		```
		This will run the script every day at noon and renew the ssl certificates

Stripe webhook forwarding:
- Login to your Stripe account (https://stripe.com/).
- On the sidebar, click on **Developers** and inside that click on **Webhooks**.
- In the Endpoints section, click on *Add endpoint*.
- Enter the following string : "{your-domain-name}/v1/stripe/stripe-webhook" here. In Events to send, click on recieve all events, and then click on **Add endpoint**.

(optional) Github Oauth:
- Go to [Github Account Settings](https://github.com/settings/profile).
- Select **Developer settings** from the sidebar.
- Then click on **OAuth Apps** and then select your registered application.
- Update the *Homepage URL* to your domain name.
- Update *Authorization Callback URL*: "{your-domain-name}/v1/auth/github/callback".
- Click **Update application**.

(optional) Google Oauth:
- Go to [Google Cloud Console](https://console.cloud.google.com/home/dashboard).
- Select your project from the dropdown.
- Then click on **APIs & Services** in the sidebar and select **Credentials** tab.
- Click on the edit button beside your OAuth 2.0 Client ID.
- Application Type: Web Application.
- Update *Authorized Javascript origins*: "{your-domain-name}".
- Update *Authorized redirect URI*: "{your-domain-name}/v1/auth/google/callback".
- Click **Save**.

Congratulations! You have successfully deployed you SaaS app. Navigate to your domain and start using the app!

## Deploy using Heroku and Vercel

This part is split into two sections:
- Rocket Server (the back-end Node application) 
- Rocket Client (the front-end React client)

Before deploying, you will need to push your app to a Github repository, and it will be required in the following steps. Also make sure that you are using the production keys (Stripe, MongoDB) and not the test keys.

### Deploy Rocket Server

This guide will help you deploy the server on Heroku. Why Heroku? I appreciate that it's not for everyone. If you're confident managing AWS in production, then you should do that. However, if you want to click a few buttons on a UI and have your app deployed in a few minutes, Heroku will eliminate most of the pain associated with deployment. Heroku also have an excellent support team that can help you if something goes wrong - so you're not on your own.

1. Create a Heroku account :
	- Head on over to [Heroku](https://www.heroku.com/) and create an account.

2. Create a pipeline :
	- On your Heroku dashboard you will see a button called New which reveals two options:
		- Create a new app
		- Create a new pipeline
	- Select create a new app

3. Configure Your Heroku App :
	- Now, you need to configure the application that you just have created. If you click on the application name, you'll see the dashboard for that application.
	- Congifure Settings: From your dashboard, click on Settings. 
		- In the settings section, head over to Config Vars and click on Reveal Config Vars Button.
		- Enter the key-value pairs from your Rocket server .env file here except the PORT. We will update the `CLIENT_URL` later.
		- Add a `PROJECT_PATH` env var with value "server" (without quotes).
		- Now head over to Buildpacks within the settings section and click on add buildpack.
		- Enter the following buildpack URL: https://github.com/timanovsky/subdir-heroku-buildpack.git and click save changes.
		- Again click on add buildpack, select the node.js buildpack and click save changes.
	- Configure Deploy: From your dashboard, click on Deploy.
		- In deployment method, select Github and connect your Github repo, this will ease pushing out changes in production.
		- Head over to Automatic deploys, choose your branch to deploy and click on Enable Automatic Deploys.
		- Head over to Manual deploy, choose your branch to deploy and click on Deploy Branch.

Now click on Open app, copy the URL and keep it in a safe place, we will need this later.

### Deploy Rocket Client

This guide will help you deploy the server on Vercel. Why Vercel? ​Vercel is a deployment and collaboration platform for frontend developers. ​Vercel enables developers to host websites and web services that deploy instantly and scale automatically – all without any configuration.

1. Create a Vercel account :
	- Head on over to [Vercel](https://vercel.com/) and create an account.

2. Create a project :
	- On your Vercel dashboard you will see a button New Project, click on that.
	- Connect you Github repo, this will ease pushing out changes in production.
	- Select Vercel Scope: select the personal account.
	- Select the client folder inside the Rocket directory and click continue
	- Give a name to your app, and then click on Environment Variables.
		- Enter the key-value pairs from your Rocket client .env file here.
		- For `REACT_APP_API_URL`, set the value as the heroku server URL that you saved before. Remove the trailing '/' from the URL.
	* Click on deploy.

Now click on Visit, copy the URL and keep it in a safe place, we will need this later.

NOTE: Vercel deployment will fail if you have any warnings in your React client. Make sure to handle any warnings before deploying to Vercel.

We have now deployed the Rocket server and client. Head back to heroku Settings, head over to Config Vars and click on Reveal Config Vars Button. Update the value of `CLIENT_URL` to the vercel client URL (Remove the trailing '/' from the URL) saved above and click on Save Changes. 

Stripe webhook forwarding:
- Login to your Stripe account (https://stripe.com/).
- On the left menu, click on **Developers** and inside that click on **Webhooks**.
- In the Endpoints section, click on *Add endpoint*.
- Enter the following string : "{Heroku server URL}/v1/stripe/stripe-webhook" here. In Events to send, click on recieve all events, and then click on **Add endpoint** 

(optional) Github Oauth:
- Go to [Github Account Settings](https://github.com/settings/profile).
- Select **Developer settings** from the sidebar.
- Then click on **OAuth Apps** and then select your registered application.
- Update *Homepage URL*: "{Heroku server URL}".
- Update *Authorization Callback URL*: "{Heroku server URL}/v1/auth/github/callback".
- Click **Update application**.

(optional) Google Oauth:
- Go to [Google Cloud Console](https://console.cloud.google.com/home/dashboard).
- Select your project from the dropdown.
- Then click on **APIs & Services** in the sidebar and select **Credentials** tab.
- Click on the edit button beside your OAuth 2.0 Client ID.
- Application Type: Web Application.
- Update *Authorized Javascript origins*: "{Heroku server URL}".
- Update *Authorized redirect URI*: "{Heroku server URL}/v1/auth/google/callback".
- Click **Save**.
- Update the google strategy in passport config file (`server/src/config/passport.js`) : update googleOptions and set callbackURL: "{Heroku server URL}/v1/auth/google/callback"

Congratulations! You have successfully deployed you SaaS app. Open the Vercel client URL and start using the app!
