import axios from "axios";

const PORT = 3000;

const readTodos = async () => {
    let res = await axios.get(`http://localhost:${PORT}/todos`);

    return res.data;
}

const createTodo = async (name) => {
    let res = await axios.post(
        `http://localhost:${PORT}/todos`,
        {
            'name': name
        }
    );

    return res.data;
}

const doneTodo = async (id) => {
    let res = await axios.put(
        `http://localhost:${PORT}/todos/${id}/done`
    );

    return res.data;
}

const undoneTodo = async (id) => {
    let res = await axios.delete(
        `http://localhost:${PORT}/todos/${id}/done`
    );

    return res.data;
}

export {
    readTodos,
    createTodo,
    doneTodo,
    undoneTodo
}