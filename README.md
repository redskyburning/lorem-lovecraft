# Lorem Lovecraft

#### An AngularJS Lorem Ipsum generator using the works of HP Lovecraft

Why settle for mundane lorem ipsum when a better, less euclidean option exists? Lorem Lovecraft uses Gulp to convert plaintext books into easily-consumable json and uses it to power a static AngularJS single page app. The app itself can either grab a selection from a book or use a sample of a book to generate random ipsum text. You can see it in action at [lorem-lovecraft.com](https://lorem-lovecraft.com).

Enjoy snippets of old books but fear the consequences of repeated exposure to horrors from beyond space and time? No problem! Lorem Lovecraft is designed to be easy to fork and repurpose to make your own ipsum generator. 

## Local Development

### Installation

* Install Node and Npm
* Install Gulp : `npm install -g gulp`
* Install Dependencies : `npm install && bower install`
* Done! Run `gulp serve` to view the app. On most systems a browser window will open automatically, if not go to [http://localhost:3000](http://localhost:3000).

### Gulp Commands
* `gulp serve` : Start a local development server.
* `gulp build` : Generate an optimized build for deployment
* `gulp serve:dist` : Build and serve the generated build.
* `gulp books` : Parse books into json

## Deployment

### Deploying to Firebase

Lorem Lovecraft comes with built-in support for Firebase Hosting. There's a free tier, it's painless, you'll be up and running in no time. [Firebase quickstart.](https://firebase.google.com/docs/hosting/quickstart) Once you've set up an account and a project, just follow these instructions.

```shell
# Install the Firebase CLI
npm install -g firebase-tools

# Auth with Firebase
firebase login

# Deploy!
firebase deploy
```

### Deploying Elsewhere

`gulp build` generates an easily deployable bundle in the `/dist` folder. Copy the contents into the webroot of the server of your choice, configure your server to rewrite requests to `/index.html` and you'll be up and running. 

More thorough instructions to come in a future version.

### Continuous Integration with CircleCI and Firebase

Adding CircleCI support is easy. Once you've forked the repo, set up a CircleCI account with your github account. Set up a project using the repo and add the following environment variables: 

* `FIREBASE_PROJECT_PROD` : The name of your firebase project
* `FIREBASE_DEPLOY_TOKEN` : The firebase deploy token				
* `ENVIRONMENT_NAME_TEST`		
* `FIREBASE_DEPLOY_TOKEN_TEST`		
* `FIREBASE_PROJECT_TEST`
