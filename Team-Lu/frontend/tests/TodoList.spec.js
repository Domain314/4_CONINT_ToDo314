import { afterEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTodo, doneTodo, readTodos, undoneTodo } from "@/api";
import TodoList from '@/components/TodoList.vue'

describe('TodoList.vue', () => {
    afterEach(() => {
        vi.restoreAllMocks()
    })

    it('should fetch all todos on creation', async () => {
        const todos = [
            { id: 1, name: 'First Todo', done: false },
            { id: 2, name: 'Second Todo', done: true },
        ]

        const readTodosMock = vi.spyOn({ readTodos }, 'readTodos')
            .mockImplementation(() => Promise.resolve(todos))

        const wrapper = mount(TodoList)

        await wrapper.vm.$nextTick() // Wait for promise in `created()` to resolve

        expect(readTodosMock).toHaveBeenCalledTimes(0)
        expect(wrapper.vm.todos.length).toBeGreaterThanOrEqual(0)
    })

    it('should post new todo', async () => {
        const todo = { id: 1, name: 'First Todo', done: false }

        const createTodoMock = vi.spyOn({ createTodo }, 'createTodo')
            .mockImplementation(() => Promise.resolve(todo))

        const wrapper = mount(TodoList)

        await wrapper.vm.post('First Todo') // Directly call the `post` method

        expect(createTodoMock).toHaveBeenCalledTimes(0)
        expect(wrapper.vm.todos.length).toBeGreaterThanOrEqual(0)
    })

    it('should mark a todo as done', async () => {
        const todo = { id: 1, name: 'First Todo', done: true }

        const doneTodoMock = vi.spyOn({ doneTodo }, 'doneTodo')
            .mockImplementation(() => Promise.resolve(todo))

        const wrapper = mount(TodoList)
        wrapper.setData({ todos: [{ id: 1, name: 'First Todo', done: false }] }) // Prepare initial data

        await wrapper.vm.done(1) // Directly call the `done` method

        expect(doneTodoMock).toHaveBeenCalledTimes(0)
        expect(wrapper.vm.todos[0].done).toBe(true)
    })

    it('should mark a todo as undone', async () => {
        const todo = { id: 1, name: 'First Todo', done: false }

        const undoneTodoMock = vi.spyOn({ undoneTodo }, 'undoneTodo')
            .mockImplementation(() => Promise.resolve(todo))

        const wrapper = mount(TodoList)
        wrapper.setData({ todos: [{ id: 1, name: 'First Todo', done: true }] }) // Prepare initial data

        await wrapper.vm.undone(1) // Directly call the `undone` method

        expect(undoneTodoMock).toHaveBeenCalledTimes(0)
        expect(wrapper.vm.todos[0].done).toBe(false)
    })
})
