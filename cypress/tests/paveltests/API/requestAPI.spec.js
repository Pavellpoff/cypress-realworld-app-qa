// Тест 1. Успешное создание нового запроса на перевод
it('1. should create a new money request', () => {

    let senderId
    let receiverId

     cy.task('db:seed')

// авторизация через API + добавил const id пользователя
  cy.request({
     method: 'POST',
     url: 'http://localhost:3001/login',
     body: {
      username: 'Reyes.Osinski',
      password: 's3cret'
      }
  }).then((response) => {

     senderId = response.body.user.id

     cy.log(senderId)

})


  // Получение id users и запись в const 
  cy.request({
      method: 'GET',
      url: 'http://localhost:3001/users'
  }).then((response) => {

  const user = response.body.results.find(
    user => user.firstName === 'Ted'
  )

  receiverId = user.id


  // Создание запроса
  cy.request({
    method: 'POST',
    url: 'http://localhost:3001/transactions',
    body: {
      senderId: senderId,
      receiverId: receiverId,
      amount: 100,
      description: 'Other',
      transactionType: "request"
    }
  }).then((response) => {

    expect(response.status).to.eq(200)
    expect(response.body.transaction.id).to.exist
    expect(response.body.transaction.senderId).to.eq(senderId)
    expect(response.body.transaction.receiverId).to.eq(receiverId)
    expect(response.body.transaction.amount).to.eq(10000)
    expect(response.body.transaction.status).to.eq('pending')
    })

})

})


// Тест 2. Создание запроса на перевод с пустым полем Amount
it('2. should handle creating a new money request with empty amount', () => {
    let senderId
    let receiverId

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

     senderId = response.body.user.id

     cy.log(senderId)

})


  // Получение id users и запись в const 
  cy.request({
      method: 'GET',
      url: 'http://localhost:3001/users'
  }).then((response) => {

  const user = response.body.results.find(
    user => user.firstName === 'Ted'
  )

  receiverId = user.id


  // Создание запроса
  cy.request({
    method: 'POST',
    url: 'http://localhost:3001/transactions',
    failOnStatusCode: false,
    body: {
      senderId: senderId,
      receiverId: receiverId,
      amount: '',
      description: 'Other',
      transactionType: "request"
    }
  }).then((response) => {

    expect(response.status).to.eq(422)

    expect(response.body.errors).to.have.length(1)
    expect(response.body.errors[0].param).to.eq('amount')
    expect(response.body.errors[0].msg).to.eq('Invalid value')
    expect(response.body.errors[0].location).to.eq('body')
    
    cy.log(JSON.stringify(response.body))
    })
})
})




/// Тест 3. Создание запроса на перевод с пустым Description
it('3. should handle creating a new money request with empty description', () => {

    let senderId
    let receiverId

     cy.task('db:seed')

// авторизация через API + добавил const id пользователя
  cy.request({
     method: 'POST',
     url: 'http://localhost:3001/login',
     body: {
      username: 'Reyes.Osinski',
      password: 's3cret'
      }
  }).then((response) => {

     senderId = response.body.user.id

     cy.log(senderId)

})


  // Получение id users и запись в const 
  cy.request({
      method: 'GET',
      url: 'http://localhost:3001/users'
  }).then((response) => {

  const user = response.body.results.find(
    user => user.firstName === 'Ted'
  )

  receiverId = user.id


  // Создание запроса
  cy.request({
    method: 'POST',
    url: 'http://localhost:3001/transactions',
    failOnStatusCode: false,
    body: {
      senderId: senderId,
      receiverId: receiverId,
      amount: 300,
      description: '',
      transactionType: "request"
    }
  }).then((response) => {

    expect(response.status).to.eq(200)
    expect(response.body.transaction.id).to.exist
    expect(response.body.transaction.senderId).to.eq(senderId)
    expect(response.body.transaction.receiverId).to.eq(receiverId)
    expect(response.body.transaction.amount).to.eq(30000)
    expect(response.body.transaction.status).to.eq('pending')
    expect(response.body.transaction.description).to.eq('')
    
    cy.log(JSON.stringify(response.body))
    })
})
})




// Тест 4. Создание запроса на перевод с Description, состоящим только из пробелов
it('4. should handle creating a new money request with description containing only spaces', () => {

    let senderId
    let receiverId

     cy.task('db:seed')

// авторизация через API + добавил const id пользователя
  cy.request({
     method: 'POST',
     url: 'http://localhost:3001/login',
     body: {
      username: 'Reyes.Osinski',
      password: 's3cret'
      }
  }).then((response) => {

     senderId = response.body.user.id

     cy.log(senderId)

})


  // Получение id users и запись в const 
  cy.request({
      method: 'GET',
      url: 'http://localhost:3001/users'
  }).then((response) => {

  const user = response.body.results.find(
    user => user.firstName === 'Ted'
  )

  receiverId = user.id


  // Создание запроса 
  cy.request({
    method: 'POST',
    url: 'http://localhost:3001/transactions',
    failOnStatusCode: false,
    body: {
      senderId: senderId,
      receiverId: receiverId,
      amount: 300,
      description: '  ',
      transactionType: "request"
    }
  }).then((response) => {

    expect(response.status).to.eq(200)
    expect(response.body.transaction.id).to.exist
    expect(response.body.transaction.senderId).to.eq(senderId)
    expect(response.body.transaction.receiverId).to.eq(receiverId)
    expect(response.body.transaction.amount).to.eq(30000)
    expect(response.body.transaction.status).to.eq('pending')
    // API автоматически удаляет пробелы и сохраняет пустую строку
    expect(response.body.transaction.description).to.eq('')
    
    cy.log(JSON.stringify(response.body))
    })
})
})



// Тест 5. Создание запроса на перевод с очень большим значением Amount
it('5. should handle creating a new money request with large amount', () => {

    let senderId
    let receiverId

     cy.task('db:seed')

// авторизация через API + добавил const id пользователя
  cy.request({
     method: 'POST',
     url: 'http://localhost:3001/login',
     body: {
      username: 'Reyes.Osinski',
      password: 's3cret'
      }
  }).then((response) => {

     senderId = response.body.user.id

     cy.log(senderId)

})


  // Получение id users и запись в const 
  cy.request({
      method: 'GET',
      url: 'http://localhost:3001/users'
  }).then((response) => {

  const user = response.body.results.find(
    user => user.firstName === 'Ted'
  )

  receiverId = user.id


  // Создание транзакции 
  cy.request({
    method: 'POST',
    url: 'http://localhost:3001/transactions',
    failOnStatusCode: false,
    body: {
      senderId: senderId,
      receiverId: receiverId,
      amount: 3000000000000000,
      description: 'Other',
      transactionType: "request"
    }
  }).then((response) => {

    expect(response.status).to.eq(200)
    expect(response.body.transaction.id).to.exist
    expect(response.body.transaction.senderId).to.eq(senderId)
    expect(response.body.transaction.receiverId).to.eq(receiverId)
    expect(response.body.transaction.amount).to.eq(300000000000000000)
    expect(response.body.transaction.status).to.eq('pending')
    
    cy.log(JSON.stringify(response.body))
    })
})
})




// Тест 6. Создание запроса на перевод с отрицательным значением Amount
it('6. should handle creating a new money request with negative amount', () => {

    let senderId
    let receiverId

     cy.task('db:seed')

// авторизация через API + добавил const id пользователя
  cy.request({
     method: 'POST',
     url: 'http://localhost:3001/login',
     body: {
      username: 'Reyes.Osinski',
      password: 's3cret'
      }
  }).then((response) => {

     senderId = response.body.user.id

     cy.log(senderId)

})


  // Получение id users и запись в const 
  cy.request({
      method: 'GET',
      url: 'http://localhost:3001/users'
  }).then((response) => {

  const user = response.body.results.find(
    user => user.firstName === 'Ted'
  )

  receiverId = user.id


  // Создание запроса
  cy.request({
    method: 'POST',
    url: 'http://localhost:3001/transactions',
    failOnStatusCode: false,
    body: {
      senderId: senderId,
      receiverId: receiverId,
      amount: -550,
      description: 'Other',
      transactionType: "request"
    }
  }).then((response) => {

    expect(response.status).to.eq(200)
    expect(response.body.transaction.id).to.exist
    expect(response.body.transaction.senderId).to.eq(senderId)
    expect(response.body.transaction.receiverId).to.eq(receiverId)
    expect(response.body.transaction.amount).to.eq(-55000)
    expect(response.body.transaction.status).to.eq('pending')
    
    cy.log(JSON.stringify(response.body))
    })
})
})




// Тест 7. Создание запроса на перевод с дробной суммой (55.33)
it('7. should handle creating a new money request with decimal amount 55.33', () => {

    let senderId
    let receiverId

     cy.task('db:seed')

// авторизация через API + добавил const id пользователя
  cy.request({
     method: 'POST',
     url: 'http://localhost:3001/login',
     body: {
      username: 'Reyes.Osinski',
      password: 's3cret'
      }
  }).then((response) => {

     senderId = response.body.user.id

     cy.log(senderId)

})


  // Получение id users и запись в const 
  cy.request({
      method: 'GET',
      url: 'http://localhost:3001/users'
  }).then((response) => {

  const user = response.body.results.find(
    user => user.firstName === 'Ted'
  )

  receiverId = user.id


  // Создание запроса
  cy.request({
    method: 'POST',
    url: 'http://localhost:3001/transactions',
    failOnStatusCode: false,
    body: {
      senderId: senderId,
      receiverId: receiverId,
      amount: 55.33,
      description: 'Other',
      transactionType: "request"
    }
  }).then((response) => {

    expect(response.status).to.eq(200)
    expect(response.body.transaction.id).to.exist
    expect(response.body.transaction.senderId).to.eq(senderId)
    expect(response.body.transaction.receiverId).to.eq(receiverId)
    expect(response.body.transaction.amount).to.eq(5500)
    expect(response.body.transaction.status).to.eq('pending')
    
    cy.log(JSON.stringify(response.body))
    })
})
})




// Тест 8. Создание запроса на перевод с дробной суммой (55.01)
it('8. should handle creating a new money request with decimal amount 55.01', () => {

    let senderId
    let receiverId

     cy.task('db:seed')

// авторизация через API + добавил const id пользователя
  cy.request({
     method: 'POST',
     url: 'http://localhost:3001/login',
     body: {
      username: 'Reyes.Osinski',
      password: 's3cret'
      }
  }).then((response) => {

     senderId = response.body.user.id

     cy.log(senderId)

})


  // Получение id users и запись в const 
  cy.request({
      method: 'GET',
      url: 'http://localhost:3001/users'
  }).then((response) => {

  const user = response.body.results.find(
    user => user.firstName === 'Ted'
  )

  receiverId = user.id


  // Создание запроса
  cy.request({
    method: 'POST',
    url: 'http://localhost:3001/transactions',
    failOnStatusCode: false,
    body: {
      senderId: senderId,
      receiverId: receiverId,
      amount: 55.01,
      description: 'Other',
      transactionType: "request"
    }
  }).then((response) => {

    expect(response.status).to.eq(200)
    expect(response.body.transaction.id).to.exist
    expect(response.body.transaction.senderId).to.eq(senderId)
    expect(response.body.transaction.receiverId).to.eq(receiverId)
    expect(response.body.transaction.amount).to.eq(5500)
    expect(response.body.transaction.status).to.eq('pending')
    
    cy.log(JSON.stringify(response.body))
    })
})
})




// Тест 9. Создание запроса на перевод с дробной суммой (55.99)
it('9. should handle creating a new money request with amount 55.99', () => {

    let senderId
    let receiverId

     cy.task('db:seed')

// авторизация через API + добавил const id пользователя
  cy.request({
     method: 'POST',
     url: 'http://localhost:3001/login',
     body: {
      username: 'Reyes.Osinski',
      password: 's3cret'
      }
  }).then((response) => {

     senderId = response.body.user.id

     cy.log(senderId)

})


  // Получение id users и запись в const 
  cy.request({
      method: 'GET',
      url: 'http://localhost:3001/users'
  }).then((response) => {

  const user = response.body.results.find(
    user => user.firstName === 'Ted'
  )

  receiverId = user.id


  // Создание запроса
  cy.request({
    method: 'POST',
    url: 'http://localhost:3001/transactions',
    failOnStatusCode: false,
    body: {
      senderId: senderId,
      receiverId: receiverId,
      amount: 55.99,
      description: 'Other',
      transactionType: "request"
    }
  }).then((response) => {

    expect(response.status).to.eq(200)
    expect(response.body.transaction.id).to.exist
    expect(response.body.transaction.senderId).to.eq(senderId)
    expect(response.body.transaction.receiverId).to.eq(receiverId)
    expect(response.body.transaction.amount).to.eq(5500)
    expect(response.body.transaction.status).to.eq('pending')
    
    cy.log(JSON.stringify(response.body))
    })
})
})



// Тест 10. Создание запроса на перевод для несуществующего получателя
it('10. should handle creating a new money request for non-existing receiver', () => {

    let senderId

     cy.task('db:seed')

// авторизация через API + добавил const id пользователя
  cy.request({
     method: 'POST',
     url: 'http://localhost:3001/login',
     body: {
      username: 'Reyes.Osinski',
      password: 's3cret'
      }
  }).then((response) => {

     senderId = response.body.user.id
     cy.log(senderId)

})


  // Создание транзакции 
  cy.request({
    method: 'POST',
    url: 'http://localhost:3001/transactions',
    failOnStatusCode: false,
    body: {
      senderId: senderId,
      receiverId: 'Bmeaz5',
      amount: 70,
      description: 'Other',
      transactionType: "request"
    }
  }).then((response) => {

    expect(response.status).to.eq(200)
        
    cy.log(JSON.stringify(response.body))
    })



    // Проверка запроса 
  cy.request({
  method: 'GET',
  url: 'http://localhost:3001/transactions',
  failOnStatusCode: false
}).then((response) => {

  expect(response.status).to.eq(500)
  cy.log(JSON.stringify(response.body))
})

})




// Тест 11. Попытка создания запроса на перевод самому себе
//сообщение "Invalid value" является слишком общим и не позволяет понять конкретную причину отказа
it('11. should handle creating a new money request to self', () => {

    let senderId

     cy.task('db:seed')

// авторизация через API + добавил const id пользователя
  cy.request({
     method: 'POST',
     url: 'http://localhost:3001/login',
     body: {
      username: 'Reyes.Osinski',
      password: 's3cret'
      }
  }).then((response) => {

     senderId = response.body.user.id
     cy.log(senderId)

})


  // Создание запроса 
  cy.request({
    method: 'POST',
    url: 'http://localhost:3001/transactions',
    failOnStatusCode: false,
    body: {
      senderId: senderId,
      receiverId: senderId,
      amount: 70,
      description: 'Other',
      transactionType: "request"
    }
  }).then((response) => {

    expect(response.status).to.eq(422)

expect(response.body.errors).to.have.length(1)
expect(response.body.errors[0].param).to.eq('receiverId')
expect(response.body.errors[0].msg).to.eq('Invalid value')
expect(response.body.errors[0].location).to.eq('body')

    cy.log(JSON.stringify(response.body))
    })

})




// Тест 12. Создание запроса на перевод с amount = 0
it('12. should allow creating a money request with zero amount', () => {
    let senderId
    let receiverId

     cy.task('db:seed')

// авторизация через API + добавил const id пользователя
  cy.request({
     method: 'POST',
     url: 'http://localhost:3001/login',
     body: {
      username: 'Reyes.Osinski',
      password: 's3cret'
      }
  }).then((response) => {

     senderId = response.body.user.id

     cy.log(senderId)

})


  // Получение id users и запись в const 
  cy.request({
      method: 'GET',
      url: 'http://localhost:3001/users'
  }).then((response) => {

  const user = response.body.results.find(
    user => user.firstName === 'Ted'
  )

  receiverId = user.id


  // Создание запроса
  cy.request({
    method: 'POST',
    url: 'http://localhost:3001/transactions',
    failOnStatusCode: false,
    body: {
      senderId: senderId,
      receiverId: receiverId,
      amount: 0,
      description: 'Other',
      transactionType: "request"
    }
  }).then((response) => {

    expect(response.status).to.eq(200)
    expect(response.body.transaction.id).to.exist
    expect(response.body.transaction.senderId).to.eq(senderId)
    expect(response.body.transaction.receiverId).to.eq(receiverId)
    expect(response.body.transaction.amount).to.eq(0)
    expect(response.body.transaction.status).to.eq('pending')
    
    cy.log(JSON.stringify(response.body))
    })
})
})



// Тест 13. Проверка создания запроса на перевод с amount = null
it('13. should validate null amount when creating a money request', () => {
    let senderId
    let receiverId

     cy.task('db:seed')

// авторизация через API + добавил const id пользователя
  cy.request({
     method: 'POST',
     url: 'http://localhost:3001/login',
     body: {
      username: 'Reyes.Osinski',
      password: 's3cret'
      }
  }).then((response) => {

     senderId = response.body.user.id

     cy.log(senderId)

})


  // Получение id users и запись в const 
  cy.request({
      method: 'GET',
      url: 'http://localhost:3001/users'
  }).then((response) => {

  const user = response.body.results.find(
    user => user.firstName === 'Ted'
  )

  receiverId = user.id


  // Создание запроса
  cy.request({
    method: 'POST',
    url: 'http://localhost:3001/transactions',
    failOnStatusCode: false,
    body: {
      senderId: senderId,
      receiverId: receiverId,
      amount: null,
      description: 'Other',
      transactionType: "request"
    }
  }).then((response) => {

    expect(response.status).to.eq(422)
    expect(response.body.errors).to.have.length(1)
    expect(response.body.errors[0].value).to.eq(null)
    expect(response.body.errors[0].msg).to.eq('Invalid value')
    expect(response.body.errors[0].param).to.eq('amount')
    expect(response.body.errors[0].location).to.eq('body')
    
    
    cy.log(JSON.stringify(response.body))
    })
})
})






// Тест 14. Проверка подтверждения запроса на перевод и изменения балансов обоих пользователей
it('14. should accept a money request and update both users balances', () => {

    let requesterId  // ID 1го пользователя
    let receiverId   // ID 2го пользователя 
    let requesterBalance // баланс 1го пользователя
    let receiverBalance // баланс 2го пользователя
    let transactionid  // id запроса на перевод

    cy.task('db:seed')

// авторизация API + const id 1го пользователя + баланс
  cy.request({
     method: 'POST',
     url: 'http://localhost:3001/login',
     body: {
      username: 'Reyes.Osinski',
      password: 's3cret'
      }
  }).then((response) => {

     requesterId = response.body.user.id
     requesterBalance = response.body.user.balance

     cy.log(requesterId)
     cy.log(requesterBalance)

})


  // Получение id users и запись в const 
  cy.request({
      method: 'GET',
      url: 'http://localhost:3001/users'
  }).then((response) => {

  const user = response.body.results.find(
    user => user.firstName === 'Ted'
  )
  
  receiverId = user.id
  cy.log(receiverId)


  // Создание запроса
  cy.request({
    method: 'POST',
    url: 'http://localhost:3001/transactions',
    body: {
      senderId: requesterId,
      receiverId: receiverId,
      amount: 100,
      description: 'Other',
      transactionType: "request"
    }
  }).then((response) => {

    expect(response.status).to.eq(200)
    expect(response.body.transaction.id).to.exist
    expect(response.body.transaction.receiverId).to.eq(receiverId)
    expect(response.body.transaction.amount).to.eq(10000)
    expect(response.body.transaction.status).to.eq('pending')
    })
})

// авторизация под 2м пользователем и запись баланса
  cy.request({
     method: 'POST',
     url: 'http://localhost:3001/login',
     body: {
      username: 'Heath93',
      password: 's3cret'
      }
  }).then((response) => {

    expect(response.status).to.eq(200)

     receiverBalance = response.body.user.balance
     cy.log(receiverBalance)

  })

   // Получение списка транзакций у 2го пользователя и проверка наличия запроса и подтверждение
     cy.request({
        method: 'GET',
        url: 'http://localhost:3001/transactions'
    }).then((response) => {

      expect(response.status).to.eq(200)

      const transaction = response.body.results.find(
        transaction => transaction.senderId === requesterId && transaction.receiverId === receiverId && transaction.amount === 10000
      )

      expect(transaction).to.exist
      expect(transaction.status).to.eq('pending') 

      transactionid = transaction.id
      cy.log(transactionid)


          // Подтверждение запроса на перевод 2м пользователем
            cy.request({
              method: 'PATCH',
              url: `http://localhost:3001/transactions/${transactionid}`,
              body: {
                id: transactionid,
                requestStatus: 'accepted'
               }
            }).then((response) => {

            expect(response.status).to.eq(204)
          })
     })


    // Проверка статуса запроса на перевод
      cy.request({
       method: 'GET',
       url: 'http://localhost:3001/transactions'
       }).then((response) => {

       const transaction = response.body.results.find(
       t => t.id === transactionid
       )

       expect(transaction).to.exist
       expect(transaction.requestStatus).to.eq('accepted')

      })

      // Повторная авторизация под 2м пользователем и проверка баланса
        cy.request({
          method: 'POST',
          url: 'http://localhost:3001/login',
          body: {
           username: 'Heath93',
           password: 's3cret'
          }
         }).then((response) => {

         expect(response.body.user.balance).to.eq(receiverBalance - 10000)

      })


      // Повторная авторизация под 1м пользователем и проверка баланса
        cy.request({
          method: 'POST',
          url: 'http://localhost:3001/login',
          body: {
           username: 'Reyes.Osinski',
           password: 's3cret'
          }
         }).then((response) => {

         expect(response.body.user.balance).to.eq(requesterBalance + 10000)

      })

})





