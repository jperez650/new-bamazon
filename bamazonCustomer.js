var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');
var password = require('./key.js')


var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  user: "root",

  password: password,
  database: "bamazon"
});
function start() {
  inquirer
    .prompt({
      name: "buy",
      type: "confirm",
      message: "Would you like to visit the bamazon store?",
    })
    .then(function(answer) {
      if(answer.buy === true){
        showTable();
      }
      else{
      connection.end();
      }
    });
}
start();

function shopAgain() {
  inquirer
    .prompt({
      name: "buy",
      type: "confirm",
      message: "Would you like to make buy another item?",
    })
    .then(function(answer) {
      if(answer.buy === true){
        showTable();
      }
      else{
      connection.end();
      }
    });
}

function showTable(){
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    var table = new Table({
        head: ['item_id', 'product_name', 'department_name', 'price', 'stock_quantity']
      , colWidths: [10, 30, 30, 10, 20]
    });
    for(var i = 0; i < res.length; i++){
      table.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]);
    }
   console.log(table.toString());
   buyProduct();
  })
}

function buyProduct() {
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "choice",
          type: "list",
          choices: function() {
            var choiceArray = [];
            for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].product_name);
            }
            // choiceArray.push("quit")
            return choiceArray;
          },
          message: "Which item would you like to buy?" 
          // (Enter the item id)(press "+(results.length + 1)+" to quit)"
        },
        {
          name: "quantity",
          type: "input",
          message: "Enter the quantity of items that you'd like to buy"
        }
      ])
      .then(function(answer) {
        var chosenItem;
        for (var i = 0; i < results.length; i++) {
          if (results[i].product_name === answer.choice) {
            chosenItem = results[i];
          }
        }
        if (answer.quantity === "q" || answer.quantity ==="Q"){
          connection.end();
        }
        if (chosenItem.stock_quantity >= parseInt(answer.quantity)) {
            var onStock = chosenItem.stock_quantity-parseInt(answer.quantity)
            var total = chosenItem.price * parseInt(answer.quantity)
          connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              {
                stock_quantity: onStock
              },
              {
                item_id: chosenItem.item_id
              }
            ],
            function(error) {
              if (error) throw err;
              console.log("You successfully purchased "+chosenItem.product_name+"'s.\n Your total is:$ "+total);
              shopAgain();
            }
          );
        }
        else {
          console.log("The item you chose is either out of stock or the quantity is insuficient!");
          showTable();
        }
      });
  });
}




