---
layout: post
title: "How to setup Jekyll with Tailwind CSS?"
date: 2020-08-22 00:04:53 +0200
redirect_from: /2020/08/22/how-to-setup-jekyll-with-tailwind-css.html
---
I tried it before and had some problems. This time it went smooth so I decided to write it down. Hope it will help someone.

You probably have Jekyll website setup already. In my case I wanted to build it from scratch and initialized it with `jekyll new mysite --blank`. It creates Jekyll scaffolding with empty files.

## 1. Install Tailwind via npm
```bash
# Using npm
npm install tailwindcss

# Using Yarn
yarn add tailwindcss
```
## 2. Add Tailwind to your CSS
In my case I had to add this to `assets/css/main.scss` file:

```sass
@tailwind base;

@tailwind components;

@tailwind utilities;
```
## 3. Create Tailwind config file
Run `npx tailwindcss init` to create `tailwind.config.js` file.

## 4. Setup PostCSS with Tailwind
Add `jekyll-postcss` to your `Gemfile` and run `bundle install`
```
group :jekyll_plugins do
  gem "jekyll-postcss"
end
```

Then add `jekyll-postcss` to your plugins in `_config.yml`:
```yaml
plugins:
  - jekyll-postcss
```

Now create or edit `postcss.config.js` file by adding tailwind and autoprefixer:
```js
module.exports = {
  plugins: [
    // ...
    require('tailwindcss')('./tailwind.config.js'),
    require('autoprefixer'),
    // ...
  ]
}
```

## 5. Remove unused CSS
When you deploy it to production it would be good to remove unused css. To do this you need to add `purge` option to your `tailwind.config.js`.
In my case I pointed Tailwind to check `html` files in `_site` and all its subdirectories. My config file looks like this:
```js
module.exports = {
	purge: ['./_site/**/*.html'],
	theme: {
		extend: {},
	},
	variants: {},
	plugins: [],
}
```

Whenever you build your Jekyll site with `NODE_ENV` environment variable set to `production`, Tailwind will automatically purge unused styles from your CSS.

Now you can copy/paste some Tailwind code to check if it's working (I hope it its :)
