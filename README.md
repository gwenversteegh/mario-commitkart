# :checkered_flag: Mario Commitkart 
<img width="400" alt="Screenshot 2022-04-14 at 10 23 44" src="https://user-images.githubusercontent.com/70577898/163344977-6c3eb47e-6448-48aa-b391-74956ce3b53e.png">     <img width="400" alt="Screenshot 2022-04-14 at 10 23 52" src="https://user-images.githubusercontent.com/70577898/163344960-c3d50276-4c84-43f0-accf-906a5ff7aa7d.png">

## De opdracht
Vier dagen creatieve verkenning met de GitHub GraphQL API

## Wat er gebeurt
Zodra de pagina wordt geladen gaat de race van start. De deelnemers zijn alle forks van de [project 2 repo](https://github.com/cmda-minor-web/project-2-2122). Degene met de meeste commits wint de race en komt op het podium terecht! 🥇

## Praktische informatie
### Installeren
Zorg er eerst voor dat je Git, Node en een werkende terminal op je computer hebt staan. Ten tweede, als je Github-desktop nog niet gebruikt, stop dan met wat je aan het doen bent en download het nu. Ik heb te veel tijd doorgebracht met rommelen in de terminal. Dus dat is een kleine hint van mij voor jou. 
Nu is het tijd voor de code. Als je op de code-tab van deze Github-repo bent, zie je een groene knop met de tekst 'code' erin. Klik op die knop en klik op de optie 'openen met Github Desktop'. Op deze manier kloont het mijn repo op jouw computer.
Zodra je de code op jouw computer hebt staan, open je de terminal en installeer je alle dependencies door ``npm install`` uit te voeren. 

### Gebruiken
Voordat je de SPA op de computer kunt zien, moet je de server starten. Dit kun je doen door ``npm run dev`` in de terminal uit te voeren. Zodra je dit hebt gedaan, kun je http://localhost:3333/ openen in je browser.

### API
Wij hebben gebruik gemaakt van de [GraphQL API](https://docs.github.com/en/graphql). <br>
Om een query samen te stellen is de [API explorer](https://docs.github.com/en/graphql/overview/explorer) super handig! Hiermee kan je d.m.v. checkboxes een kant en klare query samenstellen.<br>

Dit is de query die wij gebruiken voor onze SPA
```
const graphqlAuth = graphql.defaults({
  headers: { authorization: 'token ' + process.env.API_KEY },
})

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
```

En zo wordt het gebruikt in EJS
```
<img src="<%= element.node.owner.avatarUrl %>" alt="">
<div>
  <p><a href="<%= element.node.owner.url %>"><%= element.node.owner.login %></a></p>
  <p><span><%= element.node.defaultBranchRef.target.history.totalCount %></span> commits</p>
</div>
```                    
