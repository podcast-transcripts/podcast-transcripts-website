import * as React from "react";
import { HeadFC, Link } from "gatsby";
import "../styles.scss";
import { graphql, PageProps } from "gatsby";
import { compareStrings } from "../utils";
import { PageQueryResult } from "../types";

const IndexPage = ({
  data: {
    site: {
      siteMetadata: { siteTitle },
    },
    dataJson: { podcasts },
  },
}: PageProps<PageQueryResult>) => (
  <main>
    <h1>{siteTitle}</h1>
    <h2>About</h2>
    <p>
      An open source website with automatically generated transcripts of
      podcasts. The transcripts are far from perfect, but they're close enough
      to help you find which episode something was talked about.
    </p>
    <h2>Podcasts</h2>
    <ul>
      {podcasts
        .sort((a, b) => compareStrings(a.podcastTitle, b.podcastTitle))
        .map((podcast) => (
          <li>
            <Link to={`podcasts/${podcast.podcastId}`}>
              {podcast.podcastTitle}
            </Link>
          </li>
        ))}
    </ul>
    <h2>Source Code</h2>
    <p>
      This website and the software that transcribes the podcasts are completely
      free and open source. The copyright of the podcasts are owned by their
      original creators.
    </p>
    <ul>
      <li>
        <a href="https://github.com/podcast-transcripts/podcast-transcriber">
          Source code
        </a>{" "}
        for the podcast scraper, downloader and transcriber —{" "}
        <a href="https://github.com/podcast-transcripts/podcast-transcriber/blob/main/LICENCE">
          GPL-3
        </a>
      </li>
      <li>
        <a href="https://github.com/podcast-transcripts/podcast-transcripts-website">
          Source code
        </a>{" "}
        for the website you're reading now —{" "}
        <a href="https://github.com/podcast-transcripts/podcast-transcripts-website/blob/main/LICENCE">
          GPL-3
        </a>
      </li>
      <li>
        <a href="https://github.com/openai/whisper">Source code</a> for{" "}
        <a href="https://openai.com/blog/whisper/">OpenAI's Whisper</a> which is
        used for speech-to-text —{" "}
        <a href="https://github.com/openai/whisper/blob/main/LICENSE">MIT</a>
      </li>
    </ul>
    <h2>Inspirations</h2>
    <p>This project is inspired by similar projects</p>
    <ul>
      <li>
        <a href="http://podcastsearch.david-smith.org">
          David Smith's Podcast Search
        </a>
      </li>
      <li>
        <a href="https://karpathy.ai/lexicap/">Andrej Karpathy's Lexicap</a>
      </li>
    </ul>
  </main>
);

export const query = graphql`
  {
    site {
      siteMetadata {
        siteTitle: title
      }
    }
    dataJson {
      podcasts {
        podcastId: podcast_id
        podcastTitle: podcast_title
        episodes {
          episodeTitle: episode_title
          slug: episode_slug
          published
          transcript {
            segments {
              text
              timestamp
            }
          }
        }
      }
    }
  }
`;

export default IndexPage;

export const Head: HeadFC<PageQueryResult> = ({
  data: {
    site: {
      siteMetadata: { siteTitle },
    },
  },
}) => <title>{siteTitle}</title>;
