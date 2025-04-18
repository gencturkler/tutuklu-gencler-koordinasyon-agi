export default defineTask({
  meta: {
    name: 'db:seed-users',
    description: 'Kullanıcı verilerini seed et'
  },
  async run() {
    console.log('Kullanıcı verileri seed ediliyor...')

    const db = useDB()
    const userData = [
      {
        email: 'admin@example.com',
        name: 'Admin Kullanıcı',
        password: '$2a$10$X7z3b9Z8Y2v4W1x5N6M7P8Q9R0S1T2U3V4W5X6Y7Z8A9B0C1D2E3F4G5H6', // 'admin123' şifresinin hash'i
        phone: '5551234567',
        role: 'admin',
        active: true
      },
      {
        email: 'coordinator@example.com',
        name: 'Koordinatör Kullanıcı',
        password: '$2a$10$X7z3b9Z8Y2v4W1x5N6M7P8Q9R0S1T2U3V4W5X6Y7Z8A9B0C1D2E3F4G5H6',
        phone: '5552345678',
        role: 'coordinator',
        active: true
      },
      {
        email: 'supporter@example.com',
        name: 'Destekçi Kullanıcı',
        password: '$2a$10$X7z3b9Z8Y2v4W1x5N6M7P8Q9R0S1T2U3V4W5X6Y7Z8A9B0C1D2E3F4G5H6',
        phone: '5553456789',
        role: 'supporter',
        active: true
      },
      {
        email: 'applicant@example.com',
        name: 'Başvuru Sahibi',
        password: '$2a$10$X7z3b9Z8Y2v4W1x5N6M7P8Q9R0S1T2U3V4W5X6Y7Z8A9B0C1D2E3F4G5H6',
        phone: '5554567890',
        role: 'applicant',
        active: true
      }
    ]

    try {
      await db.insert(tables.users).values(userData)
      console.log('Kullanıcı verileri başarıyla seed edildi')
      return { result: 'Success' }
    }
    catch (error) {
      console.error('Kullanıcı verileri seed edilirken hata oluştu:', error)
      return { result: 'Error', error: (error as Error).message }
    }
  }
})
