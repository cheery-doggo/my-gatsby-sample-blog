import React from "react"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"

import SEO from "../components/seo"

import {
  FontAwesomeIcon
} from "@fortawesome/react-fontawesome"
import {
  faChevronCircleLeft,
  faChevronCircleRight
} from "@fortawesome/free-solid-svg-icons"

export default ({ data, location, pageContext }) => (
  <Layout>
    <SEO
      pagetitle="ブログ"
      pagedesc="ESSENTIALSのブログです"
      pagepath={location.pathname}
    />
    <section className="content bloglist">
      <div className="container">
        <h1 className="bar">RECENT POSTS</h1>
        <div className="posts">
          {data.allContentfulBlogPost.edges.map(({ node }) => (
            <article className="post" key={node.id}>
              <Link to={`/blog/post/${node.slug}/`}>
                <figure>
                  <Img
                    fluid={node.eyecatch.fluid}
                    alt={node.eyecatch.description}
                    style={{ height: "100%" }}
                  />
                </figure>
                <h3>{node.title}</h3>
              </Link>
            </article>
          ))}
        </div>

        <ul className="pagenation">
          {!pageContext.isFirst && (
            <li className="prev">
              <Link
                to={
                  pageContext.currentPage === 2
                    ? `/blog/`
                    : `/blog/${pageContext.currentPage - 1}/`
                }
                rel='prev'>
                <FontAwesomeIcon icon={faChevronCircleLeft}/>
                <span>前のページ</span>
              </Link>
            </li>
          )}
          {!pageContext.isLast && (
            <li className="next">
              <Link
                to={`/blog/${pageContext.currentPage + 1}/`}
                rel='next'>
                <span>次のページ</span>
                <FontAwesomeIcon icon={faChevronCircleRight}/>
              </Link>
            </li>
          )}
        </ul>

      </div>
    </section>
  </Layout>
)

export const query = graphql`
  query($skip: Int!, $limit: Int!) {
    allContentfulBlogPost(
      filter: {node_locale: {eq: "ja"}},
      sort: {order: DESC, fields: publishData}
      skip: $skip
      limit: $limit
    ) {
      edges {
        node {
          id
          title
          slug
          eyecatch {
            fluid(maxWidth: 500) {
              ...GatsbyContentfulFluid_withWebp
            }
          description
          }
        }
      }
    }

  }
`