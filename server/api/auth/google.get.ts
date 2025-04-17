import type { H3Event } from 'h3'
import { sanitizeUser } from '~~/server/utils/auth'

export default defineOAuthGoogleEventHandler({
  async onSuccess(event: H3Event, { user }) {
    const db = useDB()

    let existingUser = await db.query.users.findFirst({
      where: eq(tables.users.email, user.email)
    })

    if (!existingUser) {
      const [newUser] = await db
        .insert(tables.users)
        .values({
          email: user.email,
          name: user.name
        })
        .returning()
      existingUser = newUser
    }

    const safeUser = sanitizeUser(existingUser)

    await setUserSession(event, { user: safeUser })
    return sendRedirect(event, '/todos')
  }
})
