"use client";
import { PageHeader } from "@/components/shared";
import { AnimatedSection } from "@/components/shared";
import { blogPosts } from "@/lib/data/content";
import { BlogCard } from "@/features/blog/components";

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <PageHeader
        accent="Blog"
        title="Latest Posts"
        subtitle="Insights and updates from my journey in technology and project management."
      />

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post, index) => (
          <AnimatedSection key={post.id} delay={index * 0.1}>
            <BlogCard
              id={post.id}
              title={post.title}
              excerpt={post.excerpt}
              image={post.image}
              date={post.date}
              tags={post.tags}
              index={index}
            />
          </AnimatedSection>
        ))}
      </div>
    </div>
  );
}
