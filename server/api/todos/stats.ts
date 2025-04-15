import { sql } from 'drizzle-orm'

export default eventHandler(async () => {
  // Count the total number of todos
  const [stats] = await useDB()
    .select({
      todos: sql<number>`count(*)`,
      users: sql<number>`count(distinct(${tables.todos.userId}))`
    })
    .from(tables.todos)

  return stats
})
