import { defineField, defineType } from "sanity";

export default defineType({
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Punjabi Title",
      type: "string",
      validation: (Rule) => Rule.required().min(2)
    }),
    defineField({
      name: "slug",
      title: "English Slug",
      type: "slug",
      options: {
        source: "title",
        slugify: (input: string) =>
          input
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, "")
            .trim()
            .replace(/\s+/g, "-")
            .slice(0, 96)
      },
      validation: (Rule) =>
        Rule.required().custom((value) => {
          const slug = value?.current;
          if (!slug) return "Slug is required";
          return /^[a-zA-Z0-9-]+$/.test(slug)
            ? true
            : "Use English URL-friendly slug only (letters, numbers, hyphens).";
        })
    }),
    defineField({
      name: "description",
      title: "Punjabi Description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().min(10)
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "image",
      options: {
        hotspot: true
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
          validation: (Rule) => Rule.required()
        })
      ]
    })
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "slug.current",
      media: "icon"
    }
  }
});
