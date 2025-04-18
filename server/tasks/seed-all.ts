import seedUsers from './seed-users'
import seedNeedTypes from './seed-need-types'
import seedNeedRequestFields from './seed-need-request-fields'
import seedTasks from './seed-tasks'

export default defineTask({
  meta: {
    name: 'db:seed-all',
    description: 'Tüm veritabanı seed işlemlerini çalıştır'
  },
  async run({ payload }) {
    console.log('Tüm seed işlemleri başlatılıyor...')

    try {
      // Sırasıyla seed işlemlerini çalıştır
      await seedUsers.run({
        name: 'db:seed-users',
        payload,
        context: {}
      })
      console.log('Kullanıcı seed işlemi tamamlandı')

      await seedNeedTypes.run({
        name: 'db:seed-need-types',
        payload,
        context: {}
      })
      console.log('İhtiyaç türleri seed işlemi tamamlandı')

      await seedNeedRequestFields.run({
        name: 'db:seed-need-request-fields',
        payload,
        context: {}
      })
      console.log('İhtiyaç talebi form alanları seed işlemi tamamlandı')

      await seedTasks.run({
        name: 'db:seed-tasks',
        payload,
        context: {}
      })
      console.log('Görevler seed işlemi tamamlandı')

      console.log('Tüm seed işlemleri başarıyla tamamlandı')
      return { result: 'Success' }
    }
    catch (error) {
      console.error('Seed işlemleri sırasında hata oluştu:', error)
      return { result: 'Error', error: (error as Error).message }
    }
  }
})
