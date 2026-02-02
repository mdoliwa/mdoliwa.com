---
layout: default
title: "Home"
---

## Welcome to My Site

This is my personal blog where I share thoughts on technology, programming, and more.

---

## Recent Posts

<div class="post-list">
{% for post in site.posts %}
<div class="post-item">
  <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
  <span class="post-date">{{ post.date | date: "%b %-d, %Y" }}</span>
</div>
{% endfor %}
</div>
