const app = require("express")()
const morgan = require("morgan")
const bodyParser = require("body-parser")
const helmet = require("helmet")
const cors = require("cors")
const fs = require("fs")

app.use(morgan("dev"))
app.use(cors())
app.use(helmet())
app.use(bodyParser.json())


const dataPath = '/home/bb/Projects/todoapp/database/todos.json'


app.get('/todos', (req, res) => {

    fs.readFile(dataPath, "utf8", (err, data) => {
        if (err) {
            throw err;
        }
        res.send(data);
    });
})


// CREATE
app.post("/todos", (req, res) => {

    fs.readFile(dataPath, "utf8", (err, data) => {
        if (err) {
            throw err;
        }

        data = JSON.parse(data)
        const newUserId = data.length + 1;
        const entry = { id: newUserId, content: req.body.content }

        data.push(entry)

        fs.writeFile(dataPath, JSON.stringify(data), () => {
            res.status(200).send("new todo added");
        });
    });
});

app.listen(3000, () => console.log("listening to port....3000"))


