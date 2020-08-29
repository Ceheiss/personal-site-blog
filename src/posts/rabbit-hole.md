---
title: The Rabbit Hole Struggle
date: "2019-11-07"
---

Lately I've been having some issues with what I would call "The Rabbit Hole Struggle". What do I mean by that? Well basically it has been the realization of how one area of knowledge is better understood by first understanding another area of knowledge, and then go recursively.

I’ve encountered this while migrating my Javascript comfort zone from the browser to Node. Just to give an example: If you are going to spend more time in the in the CLI, doing operations, running tests, and other things, you are better served if you do some shell scripting in order to automate some of recurrent tasks.

So you are set into that. To make an executable I should start with `#!/bin/bash` the first thing called a "Shebang" that indicates the file is executable. What does `/bin/bash` mean? Crap, I don’t know enough about the Unix File System, start reading [here](http://homepages.uc.edu/~thomam/Intro_Unix_Text/TOC.html). Okey cool, so `/` denotes the parent of all directories and `bin` is the directory where `bash` is stored. Bash as in ‘Bourne Again Shell’, Bash as in the the ‘soul-program’ of my Terminal window. I assume then I’m somehow telling `bash` that I would be very happy if he executes the content of my file when I call it.

But wait, to be executable I need to change file permission... OK, so... Hello World `drwxr-xr-x` nice meeting you. `chmod`? OK, octal values? Got it. `chmod 755 pleaseExecuteSomeday.sh` (`4 (read) + 2 (write) + 1 (execute) = 7 (sayayin user)`). OK awesome, now what do I write? I usually just `mkdir`, `install`, `touch`, `rm` and `cd` my way around, if feeling particularly adventurous I might throw some **recursive flag** in the mix while deleting non-empty directories and hope I don't create a black hole, oh I also `sudo` force stuff, but that is the extent of it.

So should I use my GUI friendly VSCode to write this? Is it cheating? Or should I go **all in** and just **VIM** my way into it? OK, so `h j k l` to move, what's wrong with arrows? Oh, this is kind of fun, so I use commands for **operations** and **insert mode** like **i** to actually write stuff? I finished after some struggle **:q!** oh no, I have to save **:qw**, there you go, much better.

Dot files? Oh, I know some things are usually hidden but I need them as well? There is `.bash_profile` I need to tweak? For someone who used the CLI for very specific tasks, and usually checked all javascript related issues (or HTML and CSS for that matter) directly in the **Chrome Console**, this has been eye opening.

I’m a bit taken back about all the things I realize now that I don’t know, and that brings me to the initial question, how deep should I go? How much ground knowledge should I cover before being more active in the CLI? Should I be contempt with just being able to "hack myself around" the CLI? Should I go deeper into the architecture of the OS? How much of hardware should I know? I’m excited to learn more, I’m just scared of looking to much into the holes and get myself lost in the caverns.
