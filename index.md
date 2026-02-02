---
layout: default
title: "Home"
---

Hi, my name is Marcin. I'm a Ruby developer living in Białystok, Poland with my wife and 3 kids. I love building online projects and this is a place where I write about it (and other random things that currently interest me).

## Recent Posts

<div class="post-list">
{% for post in site.posts %}
<div class="post-item">
  <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
  <span class="post-date">{{ post.date | date: "%b %-d, %Y" }}</span>
</div>
{% endfor %}
</div>
