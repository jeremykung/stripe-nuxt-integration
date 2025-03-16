export function useServer() {

    async function sayHi() {
        const { data } = await useFetch('/api/hello')
        return data
    }

    return { sayHi }
}