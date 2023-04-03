---
layout: post
title: "What are CSV converters and how to use them?"
date: 2022-03-16 23:24:00 +0200 
---

Recently I was writing a script that converts CSV file exported from my bank account to the format accepted by the budgeting app I'm using.
The input file contained amount fields in a format `1 234,56`. I had to convert it to `1234.56` While writing a code to perform this task I have learned about `header_converters` and `converters` options, that you can use when parsing csv files using CSV  class from Ruby standard library. 

## What are CSV converters?

CSV converters are lambdas that transform csv fields (or csv headers). For regular fields we use `converters` option, for headers we have `header_converters`.  Let me show it on example.

This is my input file.

```
DATE;DESCRIPTION;AMOUNT
2022-03-13;Rent;2 000,00
```

When parsing it I want to downcase headers and convert them to symbols, so when iterating through the rows I can use `row[:amount]` instead of `row['AMOUNT']`. 

Let's create a lambda that downcases a string, changes all it's non-word characters to single underscore and finally changes it to symbol. Then we want to pass it to `CSV.parse` method and check if it works.

```ruby
symbolize = lambda { |header| header.downcase.gsub(/\W+/, '_').to_sym }
csv = CSV.parse(input, headers: true, header_converters: symbolize, col_sep: ';')

csv.headers
=> [:date, :description, :amount] 
```

## Built in converters

It turns out there are some built in converters and we already have one that symbolize headers.

To list built in converters check `CSV::Coverters` and `CSV::HeaderConverters` hashes. For example the one doing symbolizing headers has key `:symbol` and it's source code looks like this:

```ruby
symbol:   lambda { |h|
  h.encode(ConverterEncoding).downcase.gsub(/[^\s\w]+/, "").strip.
                                       gsub(/\s+/, "_").to_sym
}
```

To use it just pass `header_converters: :symbol`.

If you want to use multiple converters you can pass array of symbols/lambdas to the converter option. For example `converters: [:integer, :date]`

## Converting single column 

Now lets get back to the script I was working on. I wanted to convert single column only. To do this, we need our converter lambda to accept two parameters. `field` which will be filled with field value and `field_info` which will be filled with the `FieldInfo` object. This object is just simple `Struct` with three attributes: `index` - the zero-based index of the field in its row, `line` - the line of the data source this row is from and `header` - the header for the column, when available.

In my case header was available, so my `amount_converter` lambda, could look like this:

```ruby
amount_converter = lambda { |field, field_info|
  field_info.header == :amount ? field.gsub(/\s/, '').gsub(',','.') : field
}
csv = CSV.parse(input, headers: true, header_converters: :symbol, converters: amount_converter, col_sep: ';')

csv.first
=> #<CSV::Row date:"2022-03-13" description:"Rent" amount:"2000.00">

```

You can also save this converter to the `CSV::Converters` hash and use it like this:

```ruby
CSV::Converters[:amount] = lambda { |field, field_info|
  field_info.header == :amount ? field.gsub(/\s/, '').gsub(',','.') : field
}
csv = CSV.parse(input, headers: true, header_converters: :symbol, converters: :amount, col_sep: ';')

csv.first
=> #<CSV::Row date:"2022-03-13" description:"Rent" amount:"2000.00">
```



## Summary

- If you want to convert values of CSV file in simple and elegant way, you can use `converters`/`header_converters` options when parsing a file.
- We pass there symbols of built in converters or lambdas with custom made converters
- To list built in converters you can check `CSV::Converters` and `CSV::HeadConverters`
- Custom made converters accept one or two arguments. With two arguments one is current field value, second one is FieldInfo object (with info about index, line and header)
- Don't forget about `require 'csv'` :)
