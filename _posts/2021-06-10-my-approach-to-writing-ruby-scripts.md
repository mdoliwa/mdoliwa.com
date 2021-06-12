---
layout: post
title: "My approach to writing Ruby scripts."
date: 2021-06-10 00:38:00 +0200
---

Whenever I get asked what’s the best way to learn a programming language, my answer is by building things. I suggest starting by writing simple Ruby scripts that perform some useful tasks.

Easier said than done, especially when it’s all new and you don’t know where to start. There is a lot of resources on how to write Ruby on Rails apps, but much less on how to write scripts. I’d like to share with you some tips on how I approach it.

A few days ago I wrote a blog post [Top 10 most popular Rails repositories to get familiar with real-world apps](https://mdoliwa.com/articles/top-10-most-popular-rails-repositories-to-get-familiar-with-real-world-apps). I had a list of over 100 links to Ruby on Rails apps on Github. I wrote a script to get the number of stars from GitHub, sort the list, and output the top 10 links as a markdown list. I’ll use it as an example for this post.

## Define the task

Try to define the task that transforms inputs to your desired output.

In my case, I have a file where each line is a link to the GitHub repository. What I want my script to do is:

1. For each link in a file, somehow get the number of stars from GitHub.
2. Sort the whole list by the number of stars. 
3. Take the top 10 with the most stars.
  
## Figure out your unknowns

Now you can play with things you don't know, these 'somehows'. In my case, it was 'somehow get the number of stars'. I checked GitHub docs and found out, that they output this value in one of the endpoints, I just need to create an access token. Then I searched for Ruby gem that will make working with GitHub API quick and easy. I found the octokit gem.

In your case these unknowns can be 'somehow open a file' or 'somehow sort an array', but when you know what you don't know, it's much easier to fix it.

## Use console as your playground
When writing small scripts, I often try new things by starting `irb` session and playing there.
For example, I've never used the octokit gem and GitHub API, so I installed it, started `irb`, and tried:

```rb
require 'octokit'
client = Octokit::Client.new(:access_token => "MY_ACCESS_TOKEN")
repo = client.repo('discourse/discourse')
```

I checked what `repo` object looks like and found out that I can get the number of stars using `#watchers` method.
If you cannot find anything interesting by just printing it, you can always check the object's class names and lookup them in the documentation.

## Build it progressively

Don't try to write it all in one take. Set some small checkpoints, code and run it, fix errors, until you get to the checkpoint. Then move to the next one. Use `puts` and `pry` gem to help you with this.

In my example, the first step would be to open a file and read it line by line, do nothing with these lines just print it:

```rb
File.readlines('open-source-rails-apps.txt').each do |line|
  puts line
end
```

Ok, it's working. I played with the octokit gem in console, so I know that to get repository details I need to have its full name, not the URL like I have in my list. Let's try to output full names then.

```rb
File.readlines('open-source-rails-apps.txt').each do |line|
  puts line.gsub('https://github.com/', '')
end
```

Great, now I have full names, so time to get repository details, I use `pry` gem to check out what's inside such a repo.


```rb
require 'octokit'
require 'pry'

client = Octokit::Client.new(access_token: 'MY_ACCESS_TOKEN')


File.readlines('open-source-rails-apps.txt').each do |line|
  repo = client.repo(line.gsub('https://github.com/', ''))

  binding.pry
end
```

Oops, I get an error that `disourse/discourse\\n` is not a valid repository name, I'll remove the end of line character from the end and run it again.


```rb
require 'octokit'
require 'pry'

client = Octokit::Client.new(access_token: 'MY_ACCESS_TOKEN')

File.readlines('open-source-rails-apps.txt').each do |line|
  repo = client.repo(line.gsub('https://github.com/', '').chomp)

  binding.pry
end
```

Now program stops on the `binding.pry` line. I enter `repo` to check how it looks. I see there is `#watchers` method that returns the number of stars. I'll use it later, `#full_name` and `#url` methods as well. I don't need to download the rest of the repositories, so just enter `exit-program`. The next step is to store these repository objects in an array. I'll sort it later.

```rb
require 'octokit'

client = Octokit::Client.new(access_token: 'MY_ACCESS_TOKEN')

repositories = []

File.readlines('open-source-rails-apps.txt').each do |line|
  repo = client.repo(line.gsub('https://github.com/', '').chomp)

  repositories << repo
end

puts repositories.count
```

All repositories are loaded to an array, now it's time to sort it and take the first 10 elements.

```rb
require 'octokit'

client = Octokit::Client.new(access_token: 'MY_ACCESS_TOKEN')

repositories = []

File.readlines('open-source-rails-apps.txt').each do |line|
  repo = client.repo(line.gsub('https://github.com/', '').chomp)

  repositories << repo
end

repositories.sort{|repo| repo.watchers}.first(10).each{|repo| puts repo.watchers}
```

It works, now I need to output it in the correct format.

```rb
require 'octokit'

client = Octokit::Client.new(access_token: 'MY_ACCESS_TOKEN')

repositories = []

File.readlines('open-source-rails-apps.txt').each do |line|
  repo = client.repo(line.gsub('https://github.com/', '').chomp)

  repositories << repo
end

repositories
  .sort{|repo| repo.watchers}
  .first(10)
  .each.with_index(1){|repo, index| "#{index}. [#{repo.full_name}](#{repo.url})"}
```

and the list is ready to copy/paste :)

Of course, with experience, these steps are bigger, but more or less, that's the way I write these kinds of scripts. Hope it helps you. 

Happy scripting :)
