---
template: BlogPost
path: /load-data
date: 2021-02-06T22:20:02.085Z
title: Load Data using GraphQL Queries Directly in a Gatsby v2 Component with
  StaticQuery
thumbnail: /assets/nonsap-visuals-z65bg9si-9i-unsplash.jpg
---
<!--StartFragment-->

Let's start by taking a look at where the data comes from. Right now, the heading is being pulled in through this GraphQL query that goes to the site metadata. Site metadata is added in Gatsby config. We have site metadata, title, and that gives us My Fantastic Website which is displayed here.

\[00:19] The way that that's being done is this GraphQL query goes in this site, site metadata, title, and then that gets passed as data into our header component as a prop, so data, site metadata, title. That shows up in the header as a title prop which we then display.

\[00:37] We want to convert this over to a staticquery, so that we're able to get the data in the component that uses it instead of having to pass it around via props. To do that, we're going to start by importing both staticquery and GraphQL from Gatsby.

\[00:55] Then, we're going to set up this staticquery, and the static query has two props. The first one is the query prop, and the second one is a render prop which is going to receive data as an argument, and then it returns a component which we're going to use the same component that we had before.

\[01:18] Then we have to close this. Great. Now we're set up almost, so we can remove this title prop because we're not going to use it anymore. Then we have to go back to our index, and we're going to just take this GraphQL query as is.

\[01:31] Let's pull that out. Don't need this anymore at all. No longer need GraphQL from Gatsby, and we don't need to pass this title prop down anymore. Let's go ahead and get rid of that. This gives us our index file, nice and clean.

\[01:45] We're not pulling in data that we don't need, that we're not using. We're only displaying this header component and header component is responsible for its own data. To do that, let's put this query in place, get this ready, and now the results of this GraphQL query is going to be passed down as data.

\[02:00] We need to make sure that that data is ending up giving us the title. Data site, site metadata, title. Here we go. Data site, site metadata, title. Let's save everything. We're going to need to restart our Gatsby server with yarn develop because we just changed the GraphQL query and that requires updating the cache.

\[02:26] We're going to restart that, reload our page and there we go. Now we've got My Fantastic Website. Just to make sure that that is in fact what we need. Yep, that's shown up. Then let's go in and let's change the Gatsby config.

\[02:44] Perfect. It's doing exactly what we want. We're changing it in Gatsby config, and so I haven't saved yet. Right now, it's showing the title of what I was before. When we save, there it goes. It's just updated to be the new title.

\[02:56] That's how we use staticquery to set up a GraphQL query inside of a component right where it's going to get used.

<!--EndFragment-->