# Basic Express Template

To use this template, follow these steps:

```shell
# clone the repo
$ git clone https://github.com/ironhack-labs/lesson-code-basic-express-template.git

# enter inside the repo
$ cd lesson-code-basic-express-template

# install dependencies
$ npm i

# run the project (open it on the http://localhost:3000)
$ npm run dev
```

### Adapt to the project specifics

- Update database name in the `./configs/db.config.js` file
- Define your models in the `./models` folder
- Create your routes in the `./routes` folder
  - Don't forget to export routes, `module.exports = router;`
  - Don't forget to import routes in the `app.js`, `app.use('/', require('./routes/myRoutesFile.routes'));`

**Happy coding!** :heart:
