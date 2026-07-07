// Тест 1. Чтение уведомлений и пометка уведомления как прочитанного
it('1. should mark notification as read', () => {

    cy.task('db:seed')

// авторизация
  cy.request({
     method: 'POST',
     url: 'http://localhost:3001/login',
     body: {
      username: 'Reyes.Osinski',
      password: 's3cret'
      }
  }).then((response) => {
    expect(response.status).to.eq(200)

})


// получение списка уведомлений и пометка одного как прочитанное
  let notificationId

  cy.request('GET', 'http://localhost:3001/notifications')
     .then((response) => {

      expect(response.status).to.eq(200)

      notificationId = response.body.results[0].id

      cy.log(notificationId)

    cy.request({
      method: 'PATCH',
      url: `http://localhost:3001/notifications/${notificationId}`,
      body: {
        id: notificationId,
        isRead: true
      }
    }).then((response) => {
      expect(response.status).to.eq(204)
    })

  })


// Повторное получение списка уведомлений и проверка что первого id уведомлений больше нет
  cy.request('GET', 'http://localhost:3001/notifications')
     .then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.results.some(item => item.id === notificationId)).to.be.false
      notificationId = response.body.results[0].id
  })
  
})





// Тест 2. Проверка обработки попытки пометить несуществующее уведомление как прочитанное.
it('2. should handle marking a non-existent notification as read', () => {

    cy.task('db:seed')

// авторизация
  cy.request({
     method: 'POST',
     url: 'http://localhost:3001/login',
     body: {
      username: 'Reyes.Osinski',
      password: 's3cret'
      }
  }).then((response) => {
    expect(response.status).to.eq(200)

})


// попытка пометить несуществующее уведомление как прочитанное
    cy.request({
      method: 'PATCH',
      url: `http://localhost:3001/notifications/123456`,
      body: {
        id: 123456,
        isRead: true
      }
    }).then((response) => {
      expect(response.status).to.eq(204)
    })

  })

  




