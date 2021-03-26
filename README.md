# Blog Coding Challenge

## Demo
https://cl-fancy-blog.herokuapp.com/

## Description
The app shows blog posts in two separated sections; one section for remote posts pulled from https://newsapi.org and the other section for local post that are stored in the app database.

The user can add, update and delete the local posts.

## Implementation
The app is served as a Ruby On Rails app using React.js as a frontend.

All non api endpoints points to the `static#root` action that runs the React app.

Some of the libraries used for the React app:
- react-redux
- @reduxjs/toolkit
- axios
- humps
- lodash

## Running the app locally

1. Clone this repo and config the database.yml
2. Create a `.env` at the root of the project and add the hey `NEWS_API_KEY` with an api key from https://newsapi.org as value
3. Install dependencies
```
bundle install
yarn install
```
4. Set the database
```bazaar
rake db:create
rake db:migrate
```
5. Run the app
```bazaar
foreman start -f Procfile
```

## Tests
Tests was made using `rspec`
```bazaar
rspec
```

## Code Analysis
Ruby static code analysis:
```bazaar
rubocop
```
Javascript code analysis:
```bazaar
yarn lint
```