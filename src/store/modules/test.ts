import { defineStore } from 'pinia'

const useTestStore = defineStore('test', {
    state: () => {
        return {
            name: 'test',
            value: 100,
        }
    },
})

export default useTestStore