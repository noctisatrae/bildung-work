import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { getContainerRenderer as getMDXRenderer } from "@astrojs/mdx";
import { loadRenderers } from "astro:container";
import { getCollection, render } from "astro:content";
import rss from "@astrojs/rss";
import sanitizeHtml from "sanitize-html";
import { SITE_DESCRIPTION, SITE_TITLE } from "../consts";

export async function GET(context) {
  const renderers = await loadRenderers([getMDXRenderer()]);
  const container = await AstroContainer.create({ renderers });

  const posts = await getCollection("blog");
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: await Promise.all(
      posts.map(async (post) => {
        const { Content } = await render(post);
        const html = await container.renderToString(Content);
        return {
          ...post.data,
          link: `/${post.id}/`,
          content: sanitizeHtml(html, {
            allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
          }),
        };
      }),
    ),
  });
}
