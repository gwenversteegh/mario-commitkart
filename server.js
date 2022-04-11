const express = require('express')

const app = express()
const port = 3333

require('dotenv').config({path: '.env'})

const { graphql } = require('@octokit/graphql')
const graphqlAuth = graphql.defaults({
  headers: { authorization: 'token ' + process.env.API_KEY },
})

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static(__dirname + '/public'))

app.get("/", renderPagina)

/* Functies */
function renderPagina( req, res){
    graphqlAuth(`query {
        repositoryOwner(login: "cmda-minor-web") {
          repository(name: "project-2-2122") {
            forks(first: 100) {
              edges {
                node {
                  owner {
                    avatarUrl
                    login
                    ... on User {
                      url
                    }
                  }
                  defaultBranchRef {
              target {
                ... on Commit {
                  id
                  history {
                    totalCount
                  }
                }
              }
            }
                }
              }
            }
            
          }
        }
      }`)
    .then((data) => {
        res.render('index', {
          data: data.repositoryOwner.repository.forks.edges,
        })
    })
}

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })



  