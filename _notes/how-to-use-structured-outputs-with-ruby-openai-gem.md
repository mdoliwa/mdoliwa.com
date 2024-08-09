---
title: How to use Structured Outputs with ruby-openai gem?
---

In my case I had to fetch diminutives of a term, to get a json like this:

```json
{
  term: "Anna",
  diminutives: ["Annie", "Ann", "Anny"]
}
```

First step is to create a schema, in my case:

```ruby
schema = {
  "type": "object",
  "properties": {
    "term": {
      "type": "string",
      "description": "The main term or word."
    },
    "diminutives": {
      "type": ["array"],
      "description": "An array of diminutives related to the term.",
      "items": {
        "type": "string"
      }
    }
  },
  "additionalProperties": false,
  "required": ["term", "diminutives"]
}
```

Full request will look like this (remember to use models with datestamp 2024-08-06 or later):

```
response = OpenAI::Client.new.chat(
    parameters: {
      model: "gpt-4o-2024-08-06",
      response_format: {
        type: "json_schema",
        json_schema: {
          "strict": true,
          "name": "get_diminutives",
          "description": "Fetches a term diminutives",
          "schema": schema,
        },
      },
      messages: [{ role: "user", content: "return list of diminutives for the word #{word}"}],
      temperature: 0.7,
    }
)
```

### How to output empty array when using Structured Outputs?
Looks like I cannot use `"minItems": 0` as it's not supported yet. What I found is that I can set `"type": ["array", "null"]` and it works, returns empty diminutives array for terms like "asasasaa".
