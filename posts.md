---
layout: default
title: "Posts"
permalink: /posts/
---

## All Posts

<div class="post-list">
{% for post in site.posts %}
<div class="post-item">
  <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
  <span class="post-date">{{ post.date | date: "%b %-d, %Y" }}</span>
</div>
{% endfor %}
</div>
