import { drizzle } from 'drizzle-orm/node-postgres'
import * as schema from '../database/schema'

export { sql, eq, and, or } from 'drizzle-orm'

export const tables = schema

export function useDB() {
  return drizzle(process.env.DATABASE_URL!, { schema })
}

export type Todo = typeof tables.todos.$inferSelect
export type User = typeof tables.users.$inferSelect
export type NeedType = typeof tables.needTypes.$inferSelect
export type NeedRequestField = typeof tables.needRequestFields.$inferSelect
export type Task = typeof tables.tasks.$inferSelect
export type NeedRequest = typeof tables.needRequests.$inferSelect
export type Match = typeof tables.matches.$inferSelect
