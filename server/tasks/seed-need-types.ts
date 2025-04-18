export default defineTask({
  meta: {
    name: 'db:seed-need-types',
    description: 'İhtiyaç türlerini seed et'
  },
  async run() {
    console.log('İhtiyaç türleri seed ediliyor...')

    const db = useDB()
    const needTypeData = [
      {
        name: 'Mektup',
        description: 'Tutuklu gençlere moral mektupları yazma desteği',
        active: true
      },
      {
        name: 'Hukuki Destek',
        description: 'Hukuki süreçlerde destek ve danışmanlık',
        active: true
      },
      {
        name: 'Psikolojik Destek',
        description: 'Psikolojik danışmanlık ve destek hizmetleri',
        active: true
      },
      {
        name: 'Eğitim Desteği',
        description: 'Eğitim materyalleri ve ders desteği',
        active: true
      }
    ]

    try {
      await db.insert(tables.needTypes).values(needTypeData)
      console.log('İhtiyaç türleri başarıyla seed edildi')
      return { result: 'Success' }
    }
    catch (error) {
      console.error('İhtiyaç türleri seed edilirken hata oluştu:', error)
      return { result: 'Error', error: (error as Error).message }
    }
  }
})
