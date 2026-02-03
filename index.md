---
layout: default
title: "Home"
---

Hi, my name is Marcin. I'm a Ruby developer living with my wife and 3 kids in Białystok, Poland.

I have a plan to get lucky by building cool things and writing about them here.

## Recent Posts

<div class="post-list">
{% for post in site.posts %}
<div class="post-item">
  <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
  <span class="post-date">{{ post.date | date: "%b %-d, %Y" }}</span>
</div>
{% endfor %}
</div>
