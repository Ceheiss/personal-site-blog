---
title: Todo app revisited
date: "2019-11-19"
---

![](https://i.imgur.com/OvMZBs9.jpg)
I'm building a todo list. Yes, might sound boring, since is the "hello world" of apps, but for me it has been an excellent learning experience.

In my crusade of learning Node, handling file system is an unavoidable thing, so I needed an excuse to do just that, because I always learn better when I have a toy app that can focus my attention and efforts. My second point of interest was keeping state in a JSON file as opposed to have a full fledged database (or use Local Storage, but I have tried that before), so a few options came to mind.

One of my mentors, Dejan, suggested to keep it simple and do a todo app, and do it as a CLI app. Todos have to be created, read, updated, and deleted, the full CRUD functionality, so I thought it was a great idea.

![](https://static.tvtropes.org/pmwiki/pub/images/waxonwaxoff_3986.jpg)
_Wax on, wax off_

My first approach, before handling anything with the JSON file, was having the basic functions of CRUD, so I created a file for each (and a separate file for tests), and developed each function in a TDD way. I tried to keep the functions away of side effects.

```javascript
const updateTodo = (position, newValue, todoList) => {
  todoList[position] = newValue
  return todoList
}
module.exports = updateTodo
// example test
test("it updates the value of a specific todo", () => {
  let list = ["first todo", "second todo", "third todo"]
  updateTodo(1, "changed value", list)
  expect(list[1]).toBe("changed value")
})
```

With that out of the way, it was time to handle persistence. I learned how to use the `fs` module, and had a plan: use `fs.readFile`, parse the received data into JS, do operations to it, and then un `fs.writeFile` to update the content of the file. In paper it was super easy, but since this functions where asynchronous (they also have a sync version, but that is another topic), the callbacks soon started to confuse me (I'm generally quite confused with async stuff as it is) and started to do a mess.

Luckily, when I was explaining this, Sergei told me there was a `fs` module that supported promises ([this one](https://nodejs.org/dist/latest-v10.x/docs/api/fs.html#fs_fs_promises_api)). Nice, beyond the scope of `fetch` promises remain a confusing subject to me, but it was a nice improvement, so I ended up with a couple of functions like this in a file called _"fileOperations.js"_:

```javascript
const deleteTodoFromFile = async (deleteTodo, position) => {
  try {
    const data = JSON.parse(await fs.readFile("database/todoList.json"))
    deleteTodo(position, data[0].todos)
    const jsonData = JSON.stringify(data)
    await fs.writeFile("database/todoList.json", jsonData)
    readTodosFromFile(readTodos)
  } catch (err) {
    console.error(err)
  }
}
```

With functions like this I built all of the functionality, and finally wired everything together in the app file like this:

```javascript
const command = process.argv[2]
;``
const firstArg = process.argv[3]
const secondArg = process.argv[4]

const startFunc = (command, firstArg, secondArg) => {
  if (command === "add") addTodoInFile(createTodo, firstArg)
  if (command === "read") readTodosFromFile(readTodos)
  if (command === "edit") updateTodoInFile(updateTodo, firstArg, secondArg)
  if (command === "delete") deleteTodoFromFile(deleteTodo, firstArg)
}

startFunc(command, firstArg, secondArg)
```

So the app, very non-elegantly get's called like: `node ./src/app.js add "new todo"`. That is totally stupid UX, but I'm not done with it, it's just a prototype. I'm looking at [Caporal](https://www.npmjs.com/package/caporal) and [Inquirer](https://www.npmjs.com/package/inquirer) packages to provide all of the niceties of a real CLI app.

![](https://cliapp.store/images/terminal_screenshot.png)
_by the way, I installed cowsay and so should you. `cowsay -f dragon "hola"` gets you a Spanish speaking dragon, how is that for an app_

At the beginning I was thinking of doing it myself, "Vanilla Node", but as Preetham told me, using libraries is an skill on itself, and I often try to keep dependencies down (I did rewrite array methods like map, index, and others and made an absurd, yet educational, library out of it... so there is that), but I think that good code is there for a reason, and learning to use it and handle documentation is also extremely relevant.

So that is my experience so far, more information on this app soon!
