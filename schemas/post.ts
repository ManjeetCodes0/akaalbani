import { defineArrayMember, defineField, defineType } from "sanity";

function slugifyEnglish(input: string): string {
  const ascii = input
    .normalize("NFKD")
    .replace(/[^\x00-\x7F]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 96);

  return ascii || `post-${Date.now()}`;
}

export default defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Punjabi Headline",
      type: "string",
      validation: (Rule) => Rule.required().min(10)
    }),
    defineField({
      name: "slug",
      title: "English Slug",
      type: "slug",
      options: {
        source: "title",
        slugify: slugifyEnglish
      },
      validation: (Rule) =>
        Rule.required().custom((value) => {
          const slug = value?.current;
          if (!slug) return "Slug is required";
          return /^[a-z0-9-]+$/.test(slug)
            ? true
            : "Use English URL-friendly slug only (lowercase letters, numbers, hyphens).";
        })
    }),
    defineField({
      name: "mainImage",
      title: "Main Image",
      type: "image",
      options: {
        hotspot: true
      },
      fields: [
        defineField({
          name: "caption",
          title: "Caption",
          type: "string",
          validation: (Rule) => Rule.required()
        }),
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
          validation: (Rule) => Rule.required()
        })
      ],
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "category" }]
        })
      ],
      validation: (Rule) => Rule.required().min(1)
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading", value: "h2" },
            { title: "Subheading", value: "h3" },
            { title: "Quote", value: "blockquote" }
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Numbered", value: "number" }
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" }
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  defineField({
                    name: "href",
                    type: "url",
                    title: "URL",
                    validation: (Rule) => Rule.uri({ allowRelative: false, scheme: ["http", "https"] })
                  })
                ]
              }
            ]
          }
        }),
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "caption",
              type: "string",
              title: "Caption"
            }),
            defineField({
              name: "alt",
              type: "string",
              title: "Alt Text",
              validation: (Rule) => Rule.required()
            })
          ]
        })
      ],
      validation: (Rule) => Rule.required().min(1)
    }),
    defineField({
      name: "sourceUrl",
      title: "Source URL",
      type: "url",
      validation: (Rule) =>
        Rule.required().uri({
          allowRelative: false,
          scheme: ["http", "https"]
        })
    })
  ],
  orderings: [
    {
      title: "Published (Newest)",
      name: "publishedDesc",
      by: [{ field: "publishedAt", direction: "desc" }]
    }
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "publishedAt",
      media: "mainImage"
    }
  }
});
