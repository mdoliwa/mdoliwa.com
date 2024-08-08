---
title: How to Generate Sitemap in Rails App Deployed with Kamal?
---
I assume you use [sitemap_generator](https://github.com/kjvarga/sitemap_generator) gem.

Let's change `bin/docker-entrypoint` file so whenever you start this container as a Rails server it will generate the sitemap.

```bash
#!/bin/bash -e

# If running the rails server then create or migrate existing database
if [ "${1}" == "./bin/rails" ] && [ "${2}" == "server" ]; then
  ./bin/rails db:prepare
  ./bin/rails sitemap:refresh
fi

exec "${@}"
```
Make sure the `public` directory, where the sitemap will be generated, is owned by the `rails` user, so you won't have any problems with permissions. Add `public` to the line that is setting this in your `Dockerfile`:


```
# Run and own only the runtime files as a non-root user for security
RUN useradd rails --create-home --shell /bin/bash && \
    chown -R rails:rails db log storage tmp public
```
