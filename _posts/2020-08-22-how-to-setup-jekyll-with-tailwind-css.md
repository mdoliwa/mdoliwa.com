---
layout: post
title: "How to setup Jekyll with Tailwind CSS?"
date: 2020-08-22 00:04:53 +0200
redirect_from: /articles/how-to-setup-jekyll-with-tailwind-css
---
Let's start with blank Jekyll website by running `jekyll new mysite --blank`. Change working directory to `mysite`.

## 1. Install required packages
`npm install tailwindcss@latest postcss@latest autoprefixer@latest postcss-import@latest`

## 2. Setup PostCSS
Create Gemfile, add `jekyll-postcss` gem to it and run `bundle install`  
  
```ruby
# Gemfile

source "https://rubygems.org"

gem "jekyll", "~> 4.1.1"
gem 'jekyll-postcss'
```

Add `jekyll-postcss` plugin to `_config.yml` file  

```yml
# _config.yml

url: "" # the base hostname & protocol for your site, e.g. http://example.com
baseurl: "" # the subpath of your site, e.g. /blog
title: "" # the name of your site, e.g. ACME Corp.

plugins:
  - jekyll-postcss
```

and create `postcss.config.js` file.

```js
// postcss.config.js

module.exports = {
  plugins: [
    require('postcss-import'),
    require('tailwindcss'),
    require('autoprefixer'),
  ]
}
```
## 3. Setup Tailwind CSS config file
Run `npx tailwindcss init` to create empty Tailwind config file.
```js
//tailwind.config.js

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
```

## 4. Import Tailwind stylesheets to your CSS file.
Edit `assets/css/main.scss` file to make it look like this:

```css
---
---

@import "tailwindcss/base";

@import "tailwindcss/components";

@import "tailwindcss/utilities";
```

Run `jekyll serve`. Jekyll is using Taiwlind CSS now.
