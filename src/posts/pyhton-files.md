---
title: Parsing a file with Python
date: "2021-05-03"
---
 
Being a native "javascripter", I've always felt curiosity about the curly-brace-less language called Python. I never made the commitment to dig in, until I found the ["Python for Everybody"](https://www.py4e.com/) specialization by the master ["Dr. Chuck"](https://www.dr-chuck.com/). I decided to start travelling the ways of the snake and as usual share my findings.

![](https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Python.svg/1200px-Python.svg.png)
 
This blog post will be short and sweet, and is just to show how awesome Python can be for some tasks, in this case, parsing a huge file. So imagine you have a text file that looks a bit like this:
 
```
From stephen.marquard@uct.ac.za Sat Jan  5 09:14:16 2008
Return-Path:
Received: from murder (mail.umich.edu [141.211.14.90])
  by frankenstein.mail.umich.edu (Cyrus v2.3.8) with LMTPA;
  Sat, 05 Jan 2008 09:14:16 -0500
X-Sieve: CMU Sieve 2.3
Received: from murder ([unix socket])
  by mail.umich.edu (Cyrus v2.2.12) with LMTPA;
  Sat, 05 Jan 2008 09:14:16 -0500
Received: from holes.mr.itd.umich.edu (holes.mr.itd.umich.edu [141.211.14.79])
 by flawless.mail.umich.edu () with ESMTP id m05EEFR1013674;
 Sat, 5 Jan 2008 09:14:15 -0500
```
 
But with tons and tons of lines that seem never ending. Now, you want a way of checking who, out of all this big emailing craziness, sent the most amount of emails. Who do we check for this prolific writer with Python? This was my solution which I will explain in short:
 
```python
name = input("Enter file:")
if len(name) < 1 : name = "mbox-short.txt"
handle = open(name)
email_counter = dict()
email_addresses = list()
 
 
for line in handle:
   if line.startswith('From '):
       email_addresses.append(line.split()[1])
 
      
for email in email_addresses:
   email_counter[email] = email_counter.get(email, 0) + 1
 
biggestNumber = None
biggestEmail = None
 
for email,times in email_counter.items():
   if biggestNumber == None or times > biggestNumber:
       biggestNumber = times
       biggestEmail = email
      
print(biggestEmail, biggestNumber)
```
 
First thing we do is use the `open` function to access a file (in this case, in the same folder). What gets returned is not exactly the whole text but a handle, or a connection to it. Since the text file is composed by lines, we can also do something in each line, treating the handle as an iterable (by the way fellow javascripter, in Python *arrays* are called *lists* and *objects* are *dictionaries*).
 
So we go through each line, and if the line starts with "From: " we extract the email address in our list. Here you could also use regex, but I want something human readable, lol. Later we build a dictionary with each email address and the amount of times it appears in the text. `email_counter.get(email, 0) + 1` is a shorthand, basically it checks the counter for a particular email address and adds one, if the email address is being counted for the first time we use the **0** as default value, and add **1** to that. So now instead of a lsit with repeated email addresses we have a dictionary mapping email address with number of iterations.
 
Now, in the final *for loop* we have `for email,times`, why? Because in Python by using `.items()` on a dictionary, we get back a list of tuples, each tuple containing two values, which are, you guessed it, the respectives key and the value of the dictionary. So with `for email,times`, we get two iteration variables which enable us to loop through the key-value pairs. Pretty cool isn't it?
 
The rest is straight forward, we look for the largest number, when we find it, we print it alongside the correspondent email address.
 
### Takeaways
 
When I use Javascript, I rarely think of parsing data out of files, usually the operations I do look quite different. I don't even know how I would approach this challenge with Node, and I like that, because I don't need to use a hammer to cut a sandwich, I'm learning a new language that is a great tool to work on this big array of different tasks regarding data that I didn't thought about before. My learnings will continue, next up will be how to do some basic web scraping with Beautiful Soup. This is really fun and I can already think of some cool projects using this and D3 for data visualization.
