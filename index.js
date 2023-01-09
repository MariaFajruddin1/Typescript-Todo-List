#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import figlet from "figlet";
import gradient from "gradient-string";
import chalkAnimation from 'chalk-animation';
const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));
async function Welcome() {
    const rainbowTitle = chalkAnimation.rainbow(figlet.textSync(`Welcome  My  Todo  List`));
    await sleep();
    rainbowTitle.stop();
}
await Welcome();
// let todos: string[] = [];
// let loop = true
// while (loop) {
//     const answers: {
//         Todo: string,
//         cont: boolean
//     } = await inquirer.prompt([{
//         name: "Todo",
//         type: "input",
//         message: "What do you want to add in your todo ?"
//     }, {
//         name: "cont",
//         type: "confirm",
//         message: "do you want to continue ?",
//         default: false
//     }])
//     const { Todo, cont } = answers;
//     console.log(answers);
//     loop = cont
//     if (Todo) {
//         todos.push(Todo)
//     } else {
//         console.log("Kindly add valid input");
//     }
// }
// if (todos.length > 0) {
//     console.log("Your Todo List \n");
//     todos.forEach(Todo => {
//         console.log(Todo);
//     })
// } else {
//     console.log("No todo found !");
// }
let todos = [];
async function Repeat() {
    const answer = await inquirer.prompt([{
            name: "repeat",
            type: "list",
            choices: ["Yes", "No"],
            message: "do you want to continue ?"
        }]);
    return (answer.repeat == "Yes") ? true : false;
    Repeat();
}
async function TodoList() {
    let startAgain = true;
    do {
        const answer = await inquirer.prompt([{
                name: "List",
                type: "list",
                choices: ["Add", "List", "Delete",],
                message: "Select your Todo "
            }]);
        if (answer.List === "Add") {
            const item = await inquirer.prompt([{
                    name: "newItem",
                    type: "input",
                    message: "Enter your Item ?"
                }]);
            todos.push(item.newItem);
            startAgain = await Repeat();
        }
        else if (answer.List === "List") {
            if (todos.length == 0) {
                console.log(chalk.red("Your List is empty !!!"));
            }
            todos.forEach(element => console.log(element));
            console.log(typeof todos);
            startAgain = await Repeat();
        }
        else if (answer.List === "Delete") {
            if (todos.length == 0) {
                console.log(chalk.red("Your list is already empty !!!"));
            }
            else {
                const remove = await inquirer.prompt([{
                        name: "RemoveItem",
                        type: "input",
                        message: "which item you you want to delete/remove ?"
                    }]);
                let index = todos.indexOf(remove.RemoveItem);
                console.log(index);
                if (index !== -1) {
                    todos.splice(index, 1);
                }
            }
            startAgain = await Repeat();
        }
    } while (startAgain !== false);
    {
        console.log(gradient.rainbow("Thanks to play todo list "));
    }
}
TodoList();
