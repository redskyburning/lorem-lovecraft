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
* `gulp books:parse` : Parse books into json

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

#### Creating a test environment

You may want a second environment to test changes before you deploy to production. Create a second project in firebase and run the following commands.

```shell
# Auth into firebase as above if you haven't already.

# Add a reference to your test environment and switch to using that environment.
firebase use --add

# Deploy as normal, now using the test environment
firebase deploy

# Switch between firebase environments locally
firebase use my-firebase-project-name

```

### Deploying Elsewhere

`gulp build` generates an easily deployable bundle in the `/dist` folder. Copy the contents into the webroot of the server of your choice, configure your server to rewrite requests to `/index.html` and you'll be up and running. 

More thorough instructions to come in a future version.

## Continuous Integration with CircleCI and Firebase

Adding CircleCI support is easy. Once you've forked the repo, set up a CircleCI account with your github account. Set up a project using the repo and two workflows will automatically populate in Circle.
 
 * `deploy_release` : Watches for new tags on master and deploys to production. 
 * `deploy_develop` : Watches for commits on develop and deploys to test. 
 
 ### Generating a Firebase deploy token
 
 In order for Circle to deploy to Firebase you're going to need a CI-friendly deploy token.
 
 ```shell
 firebase use my-firebase-project-name
 firebase login:ci
 
 # Follow the instructions and save the generated token for later.
 ```
 Note that you'll need to do this for each environemnt, switching between them by using `firebase use new-firebase-environment-name`.
 
### Adding CircleCI environment variables
 
To bring together CircleCI and Firebase we're going to need to add some environment variables. For security reasons you should *never* store sensitive information like deploy tokens in your repo. You also shouldn't store environment-specific configuration information like your google analytics id. Environment variables solve for both of these issues. You can set these variables in the environment variables section of your project's settings. Add the following environment variables and Circle will use them as arguments in the gulp build to generate an environment-specific build.

#### Production Enviroment Variables

* `FIREBASE_PROJECT_PROD` : The firebase project name for production environment.
* `FIREBASE_DEPLOY_TOKEN_PROD` : The firebase deploy token for production environment.
* `ANALYTICS_ID_PROD` : Google analytics Id for production environment.

#### Testing Enviroment Variables

* `FIREBASE_PROJECT_TEST` : The firebase project name for test environment.
* `FIREBASE_DEPLOY_TOKEN_TEST` : The firebase deploy token for production environment.
* `ANALYTICS_ID_TEST` : Google analytics Id for test environment.

## Adding Content

Lorem Lovecraft is designed to be a repurposable seed project for creating lorem ipsum generators. With a bit of modification any plaintext (.txt) document can be added to the site. 

Keep in mind that copyright is an issue when selecting texts to use, so finding works that are [public domain](https://en.wikipedia.org/wiki/Public_domain_in_the_United_States) is your best bet. [Project Gutenberg](https://www.gutenberg.org) and [WikiSource](https://en.wikisource.org) are both great sources for public domain content with support for downloading plaintext. Works that use a [Creative Commons](https://creativecommons.org/) license are a good option too, but these tend to be harder to find. 

Once you've found some content add the .txt file to the `/book_source` directory to get started.

### Preparing content

The text needs to be fairly uniform for `gulp books:parse` to parse it into json. Most books are a fairly uniform collection of paragraphs and section headings that form the body of the book, bookened by non-uniform sections at the start and end with titles, tables of contents, footnotes, etc. Step one is removing these start and end sections. Don't worry about chapter headings, the parser will deal with them.

### Adding metadata with frontmatter

Some of the information you just removed was useful, things like the book's title. We can preserve this information using frontmatter, a block of yaml at the start of the content. Frontmatter is an idea that comes from the [Jekyll](https://jekyllrb.com/docs/frontmatter/) static site generator, in case you were wondering. 

#### Example

```yaml 

---
title: 'The Call of Cthulhu'
key: 'call-of-cthulhu'
---
```

#### Frontmatter Schema


```yaml 

---
title: 'Title of the book. (required)'
key: 'Internal unqiue name for the book. Kebab case (written-like-this) is standard. (optional)'
---
```

### Testing your content

Once your .txt file is in place in the `/book_source` directory the build process can handle the rest. Running `gulp books:parse` will parse the .txt file into json and place the resulting file in the `/book_json`. Running this job and checking the json is a good first step, or you can just run `gulp serve` and see the json in action.

## License

MIT

