export default defineTask({
  meta: {
    name: 'db:seed-tasks',
    description: 'Görevleri veritabanına ekle'
  },
  async run() {
    console.log('Görevler ekleniyor...')
    const db = useDB()

    try {
      // Mektup ihtiyaç türü için görevler
      await db.insert(tables.tasks).values([
        {
          needTypeId: 1, // Mektup
          name: 'Mektup Yazımı',
          description: 'Tutuklu gence mektup yazılması',
          order: 1
        },
        {
          needTypeId: 1,
          name: 'Mektup Gönderimi',
          description: 'Yazılan mektubun gönderilmesi',
          order: 2
        },
        {
          needTypeId: 1,
          name: 'Mektup Teslimi',
          description: 'Mektubun tutuklu gence ulaştırılması',
          order: 3
        }
      ])

      // Hukuki Destek ihtiyaç türü için görevler
      await db.insert(tables.tasks).values([
        {
          needTypeId: 2, // Hukuki Destek
          name: 'Avukat Ataması',
          description: 'Tutuklu gence avukat atanması',
          order: 1
        },
        {
          needTypeId: 2,
          name: 'Hukuki Danışmanlık',
          description: 'Tutuklu gence hukuki danışmanlık verilmesi',
          order: 2
        },
        {
          needTypeId: 2,
          name: 'Dava Takibi',
          description: 'Tutuklu gencin davasının takip edilmesi',
          order: 3
        }
      ])

      console.log('Görevler başarıyla eklendi')
      return { result: 'Success' }
    }
    catch (error) {
      console.error('Görevler eklenirken hata oluştu:', error)
      return { result: 'Error', error: (error as Error).message }
    }
  }
})
