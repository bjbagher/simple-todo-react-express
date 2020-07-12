import React, { useState, useRef, useEffect } from "react"



function App() {
    const [todos, setTodos] = useState([])
    const input = useRef()
    const url = "http://localhost:3000/todos"

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetch(url)
            const json = await data.json()
            setTodos(json)
        }
        fetchData()
    }, [])


    const addTodo = () => {
        const data = [...todos, { id: todos.length + 1, content: input.current.value }]
        setTodos(data)

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ content: input.current.value })
        }

        fetch(url, options)
        input.current.value = ""
    }


    return (
        <div>
            <div>
                <input type="text" ref={input} minLength="3" />
                <button onClick={addTodo}>Add Todo</button>
            </div>
            <h1>Todos</h1>
            <ul>
                {todos.map((t, ti) =>
                    <li key={ti}>{t.content}</li>
                )}
            </ul>
        </div>
    )
}



export default App;