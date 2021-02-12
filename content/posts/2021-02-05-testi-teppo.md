---
template: BlogPost
path: /testi-teppo
date: 2021-02-05T11:59:26.049Z
title: Another example of a transformation relationship is the
  gatsby-source-filesystem...
metaDescription: Hello
thumbnail: /assets/isaac-smith-at77q0njnt0-unsplash.jpg
---
Another example of a transformation relationship is the gatsby-source-filesystem plugin used with the gatsby-transformer-remark plugin. This combination transforms a parent File node’s markdown string into a MarkdownRemark node. The remark transformer plugin adds its newly created child node as a child of the parent node using the action createParentChildLink. Transformation relationships like this are used when a new node is completely derived from a single parent node. E.g. the markdown node is derived from the parent File node and would not exist if the parent File node hadn’t been created.

Because all children nodes are derived from their parent, when a parent node is deleted or changed, Gatsby deletes all of the child nodes (and their child nodes, and so on). 

> Gatsby does so with the expectation that they’ll be recreated again by transformer plugins. This is done to ensure there are no nodes left over that were derived from older versions of data but should no longer exist.

![](/assets/proxyclick-visitor-management-system-s86whghp25y-unsplash.jpg)

For examples of other plugins creating transformation relationships, you can see the gatsby-transformer-remark plugin (from the above example) or the gatsby-transformer-sharp plugin.