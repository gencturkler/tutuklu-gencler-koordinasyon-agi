import type { User } from './db'

/**
 * Removes sensitive information from the user object.
 * @param user
 * @returns
 */
export function sanitizeUser(user: User) {
  const { password, createdAt, updatedAt, ...safeUser } = user

  if (!safeUser.id) {
    throw new Error('User ID is required')
  }

  return {
    id: safeUser.id,
    name: safeUser.name ?? '',
    email: safeUser.email ?? '',
    role: safeUser.role ?? 'user'
  }
}
