Reading and writing CSV files works for small applications, but if we want the News Aggregator we worked on previously to take over the world, we're going to need something a little more heavy-duty. Let's redesign our persistence layer so that we're reading from and writing to a PostgreSQL database rather than directly to a file.

## Learning Objectives

* Define a database schema to store user-submitted articles.
* Read from and write information to a PostgreSQL database from an Express application.

## Instructions

There are two steps involved when converting an app from CSV files to PostgreSQL: defining the schema and modifying the application.

## Getting started

```no-highlight
$ yarn install
```

## Define the Schema

Before we can start writing to PostgreSQL, we need to create a new database and define a schema. To create a new database named `news_aggregrator_development` run the following command:

```no-highlight
$ createdb news_aggregator_development
```

Now consider how you want to store the articles in your database. Within the `schema.sql` file, uncomment the `CREATE TABLE` SQL statement and add the appropriate column definitions for the *articles* table (`--` starts a comment in SQL). Create columns for each of the **attributes** of an article: title, URL, and description. These can all be of type `VARCHAR`. Remember to include any necessary constraint (like `NOT NULL`).

To execute these SQL statements against the database, run the following command:

```no-highlight
psql news_aggregator_development

news_aggregator_development=# \i schema.sql
```

## Adding data

Eventually, you will build a form to add articles to your web application. To get
started, you can manually add data from the `psql` terminal using `INSERT` statements. Don't forget to add those semicolons at the end of every `INSERT` statement!

```no-highlight
psql news_aggregator_development
```

## Modify the Web Application to Support Databases

We'll want to update both the listing and creation of our Articles. Currently, there is already code in place at the server routes to handle persistence to a CSV. Rewrite this logic to support the user stories with persistence in PostgreSQL database. Make sure to review all of the code provided so that you are acquainted with the application.

As a reminder, here are the user stories the application needs to support.

Build a web application using NodeJS and Express that displays a list of articles that users have submitted. The application should satisfy the following user stories:

```no-highlight
As a slacker
I want to be able to submit an incredibly interesting article
So that other slackers may benefit
```

Acceptance Criteria:

* When I visit `/articles/new` it has a form to submit a new article.
* The form accepts an article title, URL, and description.
* When I successfully post an article, it should be saved to database.

```no-highlight
As a slacker
I want to be able to visit a page that shows me all the submitted articles
So that I can slack off
```

Acceptance Criteria:

* When I visit `/articles` I should be able to see all the articles that have been submitted.
* Each article should show the description, title, and URL.
* If I click on the URL it should take me to the relevant page inside of a new tab.

For an extra **optional** challenge, implement the following additional user stores:

```no-highlight
As an errant slacker
I want to receive an error message
When I submit an invalid article
```

Acceptance Criteria:

* If I do not specify a title, URL, and description, I receive an error message, and the submission form is re-rendered with the details I have previously submitted.
* If I specify an invalid URL, I receive an error message, and the submission form is re-rendered with the details I have previously submitted.
* If I specify a description that doesn't have 20 or more characters, I receive an error message, and the submission form is re-rendered with the details I have previously submitted.
* The submitted article is not saved in any of the above cases.

```no-highlight
As a plagiarizing slacker
I want to receive an error message
When I submit an article that has already been submitted
```

Acceptance Criteria:

* If I specify a URL that has already been submitted, I receive an error message, and the submission form is re-rendered with the details I have previously submitted.
* The submitted article is not saved in the above case.

## Important Tips:

A URL is valid if it begins with `http` or `https`.

## Part 2: Build on the Application

You will need to introduce schema changes to support the next round of user stories. Modify your `schema.sql` file to affect the necessary changes to support commenting on articles.

### View an Individual Article

```no-highlight
As a slacker
I want to view a page for an individual article
So that I can engage in discussion around the article
```

Acceptance Criteria:

* I can navigate to a URL that is distinct for an article saved in the database
* There is a link on this page that allows me to get back to the list of articles
* On the list of articles, each article has a "More" link that takes me to the article's individual page

### Comment on an Article

```no-highlight
As a slacker
I want to comment on an article
So that I can engage in a discussion about the article
```

Acceptance Criteria:

* When viewing a specific article, I am presented with a form to add a comment
* I must specify my nickname and the body of my comment
* If I fail to provide a nickname or body and I submit my comment, I am presented with an error message
* If I provide a valid comment, the comment is saved to the database
* The saved comment should also include a record of when the comment was submitted

### View Comments on an Article

```no-highlight
As a slacker
I want to view a list of comments for an article
So that I can engage in a discussion about the article
```

Acceptance Criteria:

* When viewing a specific article, all comments for that article are listed on the bottom of the page
* All displayed comments are related to only the article I'm viewing
* Comments are ordered by their timestamp

### Delete an Article

```no-highlight
As a user
I can delete an article
So that it is no longer displayed
```

Acceptance Criteria:

* I have an option to delete an article on the article listing page
* When I delete an article, it is no longer persisted in the database
