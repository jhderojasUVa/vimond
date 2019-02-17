# Vimond test

This is a node based test so I thought you have some node knowledge but, if not, don't worry it's very easy to understand.

## Before you start

Before you start you will need node installed, so go to https://nodejs.org and download the LTS version (recommended). Install it in your system (Linux, MacOS or Windows). And we aware of the shell of your system (you will need it a little).

You will need, at least, a web browser (whatever) or you can do some with curl, but I recommend to use a web browser.

So, remember you will need a OS with node installed and a web browser.

## What I have do

Instead of giving you one and only one javascript file with all inside, I give you "one" per exercise.

Thinking about how to do this I find two ways:

- _Incremental way_. Where I put the result of the preceded exercise on the one I work with.

- _From 0 way_. Where I try to begin from zero everytime and, on this case you will not find the solution of the previous exercise.

I use the second way, the "from 0 way" because I think that it's more easy, for you, to read what I have do looking directly into the code and not seen code you don't want to because you are in a different exercise (I think you will know what I'm saying). But looking at the exercise 9 I thought that I must use the "incremental way" (too late).

If you wanted one and only one app.js solution, I'm sorry very much. You can blame me.

So for every exercise you will find a directory with all you need inside.

## Directories and what's inside

You will find this:

```
Vimond Node Exercise 2019[17008].pdf = PDF where you can find the exercises
Readme.md = This file! :)
/cache_module = Directory where you can find the solution for the exercise 11 and 12
  cache_module.js = Basic memory cache module
  cache_module_fs.js = Disk cache module
/exercise_X = The directory where you will find the solution of an exercise
  app.js = The solution file
  app_X.js = If the exercise (like the 4) have parts, it's the solution of that part
  index.html = If the exercise have a POST you will need a way to do it... this is the way
```

So, some folders will have only one kind of file, two or all.

## How to run an exercise

Running an exercise it's very easy.

1. Open a terminal (Unix/MacOS) or Powershell (Windows). I hope you know how to do this.
2. Go or "cd" where the exercise you want is.
3. run: node <filename> to run the execercise, for example: run app_1.js (in exercise 4, the part 4.1)
4. (Maybe) one will need you to have a post, so after runing the node exercise, you must open the index.html file in your browser and do what the web tells you (push a button to make the POST).

In all the exercises we send the result into the terminal/Powershell and into the browser because I don't know if I must send only to one and if so, which one (sorry).

## Whats inside every app.js

All the exercise files have a lot of comments, so you can find what I want, what I do and how I do it by reading them. Maybe there's too much comments but it's my way when I write something to "third parties".

In every app.js or app_X.js file you will find the solution and, at the end, other ways about how it can be done (in comments).

Thanks that (I guest) you will begin with exercise 1 to the last one, you will find how I do things so, sometimes there will be a fewer comments (because you have seen how I do it before and I think you understand it) and only (sometimes) for the new things I do.

So, because all the file have extensive comments it's dumb to explain what I do on every exercise here (sorry).

## About exercises 11 and 12

Because _exercise 11_ you want a cache I have thinking about two ways or doing it (but it will take more time).

- _Importing third party module_. No, you are refactoring all your services without no third party modules (if I understood well) so, this is not the way to do this.

- _Creating a cache module_. But, why not create my own cache module? How can I do it.

If I will choose to create my own cache module (and I think this is the way you want) I will need to use some storage, for example, what I like most, the local storage, for caching the request.

So, the way of doing this is when you do the http GET, go through your local storage and see if it's there, and if it's there send the data from your local storage.

But it's there any "local storage" in terms like the local browser storage in node... no. So there must be other solution, like using the file system to put the data (with his time stamp for the 10 second cache) or creating a module that uses the file storage system inside node to take care of a file where the cache is... and sound that it will take more than 2 days to make it.

But there's another "bad way" by creating an object with an emitter to put/find/delete data from the object that can be used as a cache. The way it will work is extending the EventEmmiter class to an object where I store the data with a timestamp. When you do a get first you emite to this object to ask the cache and his contain to know if it's there or not and act in the way you want (you know if there's data and it's your data you retrieve it, if not, you put the data, and if there's data but their timestamp is old, you delete it and retrieve it). It's little mesh but I think easy to understand.

That's why I say the/me idea of doing it.

_Exercise 12_ it's nearly the same I say before or maybe I'm thinking about a full cache or something similar and, because of the question 11 (exercise) I think you are asking me to do it on the first way I thought, but, as always correct me if I'm wrong (I'm always wrong).

## About exercises 11 and 12 (update)

Excercise 4 have now a basic cache (exercise 11). I have created a module (in cache_modules) called "cache_module" where relays a basic server cache in memory.

You can use it by the usual require way.

Finished file cache (exercise 12), but not tested. It's easy to see the way I have used.
