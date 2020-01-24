const createError = require("http-errors")
const express = require("express")
const path = require("path")
const logger = require("morgan")
const bodyParser = require("body-parser")
const expressSession = require("express-session")
const hbsMiddleware = require("express-handlebars")
const json2csv = require("json2csv")
const csv2json = require("csvtojson")
const fs = require("fs")
const flash = require("flash")
// const debugFunc = require("debug")

// const appName = "news-aggregator"
// const debug = debugFunc(`${appName}:server`)

const Article = require("./models/Article")

const app = express()

// view engine setup
app.set("views", path.join(__dirname, "../views"))
app.engine(
  "hbs",
  hbsMiddleware({
    defaultLayout: "default",
    extname: ".hbs"
  })
)
app.set("view engine", "hbs")

app.use(logger("dev"))
app.use(express.json())
app.use(
  expressSession({
    secret: "Launch Academy",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  })
)
app.use(flash())

// flush session
app.use((req, res, next) => {
  if (req.session && req.session.flash && req.session.flash.length > 0) {
    req.session.flash = []
  }
  next()
})

const dataPath = path.join(__dirname, "../data.json")

app.use(express.static(path.join(__dirname, "../public")))
app.use(bodyParser.urlencoded({ extended: true }))

const getArticles = () => {
  return JSON.parse(fs.readFileSync(dataPath))
}

app.get("/", async (req, res) => {
  let articles = []
  if (fs.existsSync(dataPath)) {
    articles = getArticles()
  }

  res.render("articles/index", {
    articles
  })
})

app.get("/articles/new", (req, res) => {
  const article = {}
  res.render("articles/new", { article })
})

app.post("/articles", (req, res) => {
  const { article: articleParams } = req.body
  const article = new Article(articleParams)
  if (article.validate()) {
    const articles = getArticles()
    articles.push(article)
    fs.writeFileSync(path.join(__dirname, "../data.json"), articles)
    req.flash("info", "Article saved.")
    res.redirect("/")
  } else {
    res.render("articles/new", { article: articleParams, errors: article.errors })
  }
})

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get("env") === "development" ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render("error")
})

app.listen(3000, "0.0.0.0", () => {
  console.log("Server is listening...")
})

module.exports = app