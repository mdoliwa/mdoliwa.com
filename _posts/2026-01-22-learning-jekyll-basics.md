---
layout: post
title: "Learning Jekyll Basics"
date: 2026-01-22
---

Jekyll is an amazing tool for building static websites. In this post, I'll share some basics I've learned along the way.

## Project Structure

A typical Jekyll project has the following structure:

```
_config.yml    # Site configuration
_posts/        # Blog posts
_layouts/      # HTML templates
_sass/         # Stylesheets
assets/        # Static files (images, CSS, JS)
```

## Writing Posts

Posts are written in Markdown and stored in the `_posts` directory. The filename must follow this format:

```
YYYY-MM-DD-title-of-post.md
```

## Front Matter

Each post starts with YAML front matter that defines metadata:

```yaml
---
layout: post
title: "My Post Title"
date: 2026-01-22
---
```

Happy Jekylling!
