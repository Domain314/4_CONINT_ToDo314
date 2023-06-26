import { mount } from '@vue/test-utils'
import Todo from '../src/components/Todo.vue'

test('Todo Component', async () => {
    const todo = {
        id: 1,
        name: 'Test Todo',
        done: false
    }

    const wrapper = mount(Todo, {
        props: { todo }
    })

    // Checking that the component correctly renders the todo's name
    expect(wrapper.text()).toContain(todo.name)

    // Checking that the done method emits the correct event based on the done property of todo
    await wrapper.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('done')
    expect(wrapper.emitted().done[0]).toEqual([todo.id])

    // Update props to check for the 'undone' event emission
    await wrapper.setProps({ todo: { ...todo, done: true } })
    await wrapper.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('undone')
    expect(wrapper.emitted().undone[0]).toEqual([todo.id])
})
