---
title: How to delete elements from an array in Ruby?
layout: post
date: 2021-12-14 23:06:00 +0200
---
  
In this article I'd like you show you different ways of removing elements from an array in Ruby.

We can remove elements from an array in two fundamental ways, by index and by value.

## Removing elements by index

To remove first element, you can use `.shift` method, to remove the last one, you can `.pop` it.
```rb
> array = [1,2,3,4,5]
 => [1, 2, 3, 4, 5] 
> array.shift
 => 1 
> array
 => [2, 3, 4, 5] 
> array.pop
 => 5 
> array
 => [2, 3, 4] 
```

To remove element with index N, you can use `.delete_at` method.
```rb
> array = [1,2,3,4,5]
 => [1, 2, 3, 4, 5] 
> n = 1
 => 1
> array.delete_at(n)
 => 2 
> array
 => [1, 3, 4, 5] 
```

You can also do this by combining an array from two slices, one from index 0 and length N, the second from index N+1 to the last element of an array
```rb
> array = [1,2,3,4,5]
 => [1, 2, 3, 4, 5] 
> n = 2
 => 2
> array[0,n] + array[(n+1)..-1]
```

You can also use `.reject`/`.select` with `.with_index`
```rb
> array = [1,2,3,4,5]
 => [1, 2, 3, 4, 5] 
> n = 3
 => 3 
> array.reject.with_index { |_, index| index == n }
 => [1, 2, 3, 5] 
```

## Removing elements by value

If you want to remove all elements of certain value, use `.delete` method.
```rb
> array = [1,2,3,1,2,3]
 => [1, 2, 3, 1, 2, 3] 
> array.delete(1)
 => 1 
> array
 => [2, 3, 2, 3] 
> 
```

You can also substract an array from an array, it will remove all occurences of elements in the second array
```rb
> array = [1,2,3,1,2,3]
 => [1, 2, 3, 1, 2, 3] 
> array - [1,2]
 => [3, 3] 
 ```
 
and of course you can always use `.reject`/`.select` methods
```rb
> array = [1,2,3,1,2,3]
 => [1, 2, 3, 1, 2, 3] 
> array.reject { |element| element == 1 }
 => [2, 3, 2, 3] 
```

To delete elements when some condition is met, try `.delete_if`
```rb
> array = [1,2,3,4,5]    
 => [1, 2, 3, 4, 5] 
> array.delete_if(&:odd?)
 => [2, 4] 
> array
 => [2, 4] 
```

or `keep_if` if that's more readable
```rb
> array = [1,2,3,4,5]    
 => [1, 2, 3, 4, 5] 
> array.keep_if(&:even?) 
 => [2, 4] 
> array
 => [2, 4] 
```

It's important to take notice that some of these methods are changing the original array, the others are returning a new array. I recommend to check documentation of Array class [https://ruby-doc.org/core-3.0.3/Array.html](https://ruby-doc.org/core-3.0.3/Array.html)
