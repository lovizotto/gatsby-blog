import * as React from "react";
import Layout from "../../components/layout";
import Seo from "../../components/seo";
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

interface BlogPostProps {
  data: {
    mdx: {
      frontmatter: {
        title: string;
        date: string;
        hero_image_alt: string;
        hero_image_credit_link: string;
        hero_image_credit_text: string;
        hero_image: {
          childImageSharp: {
            gatsbyImageData: any;
          };
        };
      };
    };
  };
  children: React.ReactNode;
}

const BlogPost = ({ data, children }: BlogPostProps) => {
  const image = getImage(data.mdx.frontmatter.hero_image);
  return (
    <Layout pageTitle={data.mdx.frontmatter.title}>
      <p>Posted: {data.mdx.frontmatter.date}</p>
      {image && (
        <>
          <GatsbyImage
            image={image}
            alt={data.mdx.frontmatter.hero_image_alt}
          />
          <p>
            Photo Credit:
            <a href={data.mdx.frontmatter.hero_image_credit_link}>
              {data.mdx.frontmatter.hero_image_credit_text}
            </a>
          </p>
        </>
      )}

      {children}
    </Layout>
  );
};

export const Head = ({ data }: Pick<BlogPostProps, "data">) => (
  <Seo title={data.mdx.frontmatter.title} />
);
export const query = graphql`
  query ($id: String) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        date(formatString: "MMMM D, YYYY")
        hero_image_alt
        hero_image_credit_link
        hero_image_credit_text
        hero_image {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
    }
  }
`;
export default BlogPost;
