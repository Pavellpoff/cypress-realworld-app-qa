/// Тест 1. Позитивный сценарий создания и удаления банковского счета
it('1. Create and delete bank account via API', () => {

     cy.task('db:seed')

// логин пользователя через API
  cy.request({
      method: 'POST',
      url: 'http://localhost:3001/login',
      failOnStatusCode: false,
      body: {
      username: 'Reyes.Osinski',
      password: 's3cret'
    }
  })

// Создание банковского аккаунта
  cy.request({
      method: 'POST',
      url: 'http://localhost:3001/graphql',
      body: {
      operationName: 'CreateBankAccount',

      query: `
      mutation CreateBankAccount(
        $bankName: String!,
        $accountNumber: String!,
        $routingNumber: String!
      ) {
      createBankAccount(
        bankName: $bankName
        accountNumber: $accountNumber
        routingNumber: $routingNumber
      ) {
        id
        uuid
        userId
        bankName
        accountNumber
        routingNumber
        isDeleted
        createdAt
      }
    }
  `,

   variables: {
      bankName: 'Bank API',
      accountNumber: '333333333',
      routingNumber: '241233233'
    }
}

 }).then((response) => {

   expect(response.status).to.eq(200)
   expect(response.body.errors).to.not.exist
   expect(response.body.data.createBankAccount.bankName).to.eq('Bank API')
   expect(response.body.data.createBankAccount.accountNumber).to.eq('333333333')
   expect(response.body.data.createBankAccount.routingNumber).to.eq('241233233')

   const bankId = response.body.data.createBankAccount.id
   cy.log(`Created bank id: ${bankId}`)



// Удаление только что созданного банковского аккаунта
  return cy.request({
      method: 'POST',
      url: 'http://localhost:3001/graphql',
      body: {
         operationName: 'DeleteBankAccount',

         query: `
             mutation DeleteBankAccount($id: ID!) {
             deleteBankAccount(id: $id)
             }
            `,

           variables: {
           id: bankId
            }
      }
  })

   }).then((response) => {
  console.log(response.body)

  expect(response.status).to.eq(200)



 // Если API возвращает true после удаления
  if (response.body.data) {
     expect(response.body.data.deleteBankAccount).to.eq(true)
   }

   })

})





// Тест 2. Создание банковского счета с пустым Bank Name
it('2. Create bank account with empty bank name', () => {

     cy.task('db:seed')

// логин пользователя через API
  cy.request({
      method: 'POST',
      url: 'http://localhost:3001/login',
      failOnStatusCode: false,
      body: {
      username: 'Reyes.Osinski',
      password: 's3cret'
    }
  })

// Создание банка
  cy.request({
      method: 'POST',
      url: 'http://localhost:3001/graphql',
      body: {
      operationName: 'CreateBankAccount',

      query: `
      mutation CreateBankAccount(
        $bankName: String!,
        $accountNumber: String!,
        $routingNumber: String!
      ) {
      createBankAccount(
        bankName: $bankName
        accountNumber: $accountNumber
        routingNumber: $routingNumber
      ) {
        id
        uuid
        userId
        bankName
        accountNumber
        routingNumber
        isDeleted
        createdAt
      }
    }
  `,

   variables: {
      bankName: '',
      accountNumber: '333333333',
      routingNumber: '241233233'
    }
}

 }).then((response) => {

   expect(response.status).to.eq(200)
   expect(response.body.errors).to.not.exist
   expect(response.body.data.createBankAccount.id).to.be.a('string')
   expect(response.body.data.createBankAccount.bankName).to.eq('')
   expect(response.body.data.createBankAccount.accountNumber).to.eq('333333333')
   expect(response.body.data.createBankAccount.routingNumber).to.eq('241233233')

})
})


/// Тест 3. Создание банковского аккаунта с пустым Routing Number
it('3. Create bank account with empty routing number', () => {

     cy.task('db:seed')

// логин пользователя через API
  cy.request({
      method: 'POST',
      url: 'http://localhost:3001/login',
      failOnStatusCode: false,
      body: {
      username: 'Reyes.Osinski',
      password: 's3cret'
    }
  })

// Создание банка
  cy.request({
      method: 'POST',
      url: 'http://localhost:3001/graphql',
      body: {
      operationName: 'CreateBankAccount',

      query: `
      mutation CreateBankAccount(
        $bankName: String!,
        $accountNumber: String!,
        $routingNumber: String!
      ) {
      createBankAccount(
        bankName: $bankName
        accountNumber: $accountNumber
        routingNumber: $routingNumber
      ) {
        id
        uuid
        userId
        bankName
        accountNumber
        routingNumber
        isDeleted
        createdAt
      }
    }
  `,

   variables: {
      bankName: 'Bank API',
      accountNumber: '333333333',
      routingNumber: ''
    }
}

 }).then((response) => {

   expect(response.status).to.eq(200)
   expect(response.body.errors).to.not.exist
   expect(response.body.data.createBankAccount.bankName).to.eq('Bank API')
   expect(response.body.data.createBankAccount.accountNumber).to.eq('333333333')
   expect(response.body.data.createBankAccount.routingNumber).to.eq('')

   })
})




// Тест 4. Создание банковского аккаунта с пустым Account Number
it('4. Create bank account with empty account number', () => {

     cy.task('db:seed')

// логин пользователя через API
  cy.request({
      method: 'POST',
      url: 'http://localhost:3001/login',
      failOnStatusCode: false,
      body: {
      username: 'Reyes.Osinski',
      password: 's3cret'
    }
  })

// Создание банка
  cy.request({
      method: 'POST',
      url: 'http://localhost:3001/graphql',
      body: {
      operationName: 'CreateBankAccount',

      query: `
      mutation CreateBankAccount(
        $bankName: String!,
        $accountNumber: String!,
        $routingNumber: String!
      ) {
      createBankAccount(
        bankName: $bankName
        accountNumber: $accountNumber
        routingNumber: $routingNumber
      ) {
        id
        uuid
        userId
        bankName
        accountNumber
        routingNumber
        isDeleted
        createdAt
      }
    }
  `,

   variables: {
      bankName: 'Bank API',
      accountNumber: '',
      routingNumber: '241233233'
    }
}

 }).then((response) => {

   expect(response.status).to.eq(200)
   expect(response.body.errors).to.not.exist
   expect(response.body.data.createBankAccount.bankName).to.eq('Bank API')
   expect(response.body.data.createBankAccount.accountNumber).to.eq('')
   expect(response.body.data.createBankAccount.routingNumber).to.eq('241233233')

})
})





// Тест 5. Создание аккаунта с Account Number и Routing Number, превышающими допустимую длину
it('5. Create bank account with long account number and routing number', () => {

     cy.task('db:seed')

// логин пользователя через API
  cy.request({
      method: 'POST',
      url: 'http://localhost:3001/login',
      failOnStatusCode: false,
      body: {
      username: 'Reyes.Osinski',
      password: 's3cret'
    }
  })

// Создание банка
  cy.request({
      method: 'POST',
      url: 'http://localhost:3001/graphql',
      body: {
      operationName: 'CreateBankAccount',

      query: `
      mutation CreateBankAccount(
        $bankName: String!,
        $accountNumber: String!,
        $routingNumber: String!
      ) {
      createBankAccount(
        bankName: $bankName
        accountNumber: $accountNumber
        routingNumber: $routingNumber
      ) {
        id
        uuid
        userId
        bankName
        accountNumber
        routingNumber
        isDeleted
        createdAt
      }
    }
  `,

   variables: {
      bankName: 'Bank API',
      accountNumber: '51556655656561565565256652652655',
      routingNumber: '481952525252525256256256256565656'
    }
}

 }).then((response) => {

   expect(response.status).to.eq(200)
   expect(response.body.errors).to.not.exist
   expect(response.body.data.createBankAccount.bankName).to.eq('Bank API')
   expect(response.body.data.createBankAccount.accountNumber).to.eq('51556655656561565565256652652655')
   expect(response.body.data.createBankAccount.routingNumber).to.eq('481952525252525256256256256565656')

   const bankId = response.body.data.createBankAccount.id
   cy.log(`Created bank id: ${bankId}`)


})
})



// Тест 6. Создание банковского аккаунта с буквами и спец символами в Account Number и Routing Number
it('6. Create bank account with invalid account number and routing number', () => {

     cy.task('db:seed')

// логин пользователя через API
  cy.request({
      method: 'POST',
      url: 'http://localhost:3001/login',
      failOnStatusCode: false,
      body: {
      username: 'Reyes.Osinski',
      password: 's3cret'
    }
  })

// Создание банка
  cy.request({
      method: 'POST',
      url: 'http://localhost:3001/graphql',
      body: {
      operationName: 'CreateBankAccount',

      query: `
      mutation CreateBankAccount(
        $bankName: String!,
        $accountNumber: String!,
        $routingNumber: String!
      ) {
      createBankAccount(
        bankName: $bankName
        accountNumber: $accountNumber
        routingNumber: $routingNumber
      ) {
        id
        uuid
        userId
        bankName
        accountNumber
        routingNumber
        isDeleted
        createdAt
      }
    }
  `,

   variables: {
      bankName: 'Bank API',
      accountNumber: '5155665aaa*--/',
      routingNumber: '48195252wwww&^%'
    }
}

 }).then((response) => {

   expect(response.status).to.eq(200)
   expect(response.body.errors).to.not.exist
   expect(response.body.data.createBankAccount.bankName).to.eq('Bank API')
   expect(response.body.data.createBankAccount.accountNumber).to.eq('5155665aaa*--/')
   expect(response.body.data.createBankAccount.routingNumber).to.eq('48195252wwww&^%')

})
})




// Тест 7. Создание дубликата банковского счета (bug)
// В БД уже существует банковский счет с такими реквизитами.
it('7. Create duplicate bank account (bug)', () => {

     cy.task('db:seed')

// логин пользователя через API
  cy.request({
      method: 'POST',
      url: 'http://localhost:3001/login',
      failOnStatusCode: false,
      body: {
      username: 'Reyes.Osinski',
      password: 's3cret'
    }
  })

// Создание банка
  cy.request({
      method: 'POST',
      url: 'http://localhost:3001/graphql',
      body: {
      operationName: 'CreateBankAccount',

      query: `
      mutation CreateBankAccount(
        $bankName: String!,
        $accountNumber: String!,
        $routingNumber: String!
      ) {
      createBankAccount(
        bankName: $bankName
        accountNumber: $accountNumber
        routingNumber: $routingNumber
      ) {
        id
        uuid
        userId
        bankName
        accountNumber
        routingNumber
        isDeleted
        createdAt
      }
    }
  `,

   variables: {
      bankName: 'Rosenbaum, Dach and Goyette Bank',
      accountNumber: '7151213986',
      routingNumber: '956968094'
    }
}


 }).then((response) => {

   expect(response.status).to.eq(200)
   expect(response.body.data.createBankAccount.bankName).to.eq('Rosenbaum, Dach and Goyette Bank')
   expect(response.body.data.createBankAccount.accountNumber).to.eq('7151213986')
   expect(response.body.data.createBankAccount.routingNumber).to.eq('956968094')

   const bankId = response.body.data.createBankAccount.id
   cy.log(`Created bank id: ${bankId}`)


  })

})

// Тест проходит, хотя не должен. 
// Тест 8. Тест 8. Создание банковского счета со значениями ниже минимально допустимой длины для Bank Name и Account Number (bug). 
// Нижняя граница -1 для bankName и accountNumber
it('8. Create bank account with values below minimum length for bank name and account number', () => {

     cy.task('db:seed')

// логин пользователя через API
  cy.request({
      method: 'POST',
      url: 'http://localhost:3001/login',
      failOnStatusCode: false,
      body: {
      username: 'Reyes.Osinski',
      password: 's3cret'
    }
  })

// Создание банка
  cy.request({
      method: 'POST',
      url: 'http://localhost:3001/graphql',
      body: {
      operationName: 'CreateBankAccount',

      query: `
      mutation CreateBankAccount(
        $bankName: String!,
        $accountNumber: String!,
        $routingNumber: String!
      ) {
      createBankAccount(
        bankName: $bankName
        accountNumber: $accountNumber
        routingNumber: $routingNumber
      ) {
        id
        uuid
        userId
        bankName
        accountNumber
        routingNumber
        isDeleted
        createdAt
      }
    }
  `,

   variables: {
      bankName: 'Bank',
      accountNumber: '123456789',
      routingNumber: '12345678'
    }
}

 }).then((response) => {

   expect(response.status).to.eq(200)
   expect(response.body.data.createBankAccount.bankName).to.eq('Bank')
   expect(response.body.data.createBankAccount.accountNumber).to.eq('123456789')
   expect(response.body.data.createBankAccount.routingNumber).to.eq('12345678')

   const bankId = response.body.data.createBankAccount.id
   cy.log(`Created bank id: ${bankId}`)


})
})



// Тест 9. Проверка создания банковского счета с минимально допустимой длиной Bank Name и Account Number 
it('9. Create bank account with minimum valid field lengths', () => {

     cy.task('db:seed')

// логин пользователя через API
  cy.request({
      method: 'POST',
      url: 'http://localhost:3001/login',
      failOnStatusCode: false,
      body: {
      username: 'Reyes.Osinski',
      password: 's3cret'
    }
  })

// Создание банка
  cy.request({
      method: 'POST',
      url: 'http://localhost:3001/graphql',
      body: {
      operationName: 'CreateBankAccount',

      query: `
      mutation CreateBankAccount(
        $bankName: String!,
        $accountNumber: String!,
        $routingNumber: String!
      ) {
      createBankAccount(
        bankName: $bankName
        accountNumber: $accountNumber
        routingNumber: $routingNumber
      ) {
        id
        uuid
        userId
        bankName
        accountNumber
        routingNumber
        isDeleted
        createdAt
      }
    }
  `,

   variables: {
      bankName: 'Bank1',
      accountNumber: '123456789',
      routingNumber: '123456789'
    }
}

 }).then((response) => {

   expect(response.status).to.eq(200)
   expect(response.body.errors).to.not.exist
   expect(response.body.data.createBankAccount.bankName).to.eq('Bank1')
   expect(response.body.data.createBankAccount.accountNumber).to.eq('123456789')
   expect(response.body.data.createBankAccount.routingNumber).to.eq('123456789')

   const bankId = response.body.data.createBankAccount.id
   cy.log(`Created bank id: ${bankId}`)


})
})



// Тест 10. Проверка создания банковского счета с максимально допустимой длиной Account Number
it('10. Create bank account with a long Account Number', () => {

     cy.task('db:seed')

// логин пользователя через API
  cy.request({
      method: 'POST',
      url: 'http://localhost:3001/login',
      failOnStatusCode: false,
      body: {
      username: 'Reyes.Osinski',
      password: 's3cret'
    }
  })

// Создание банка
  cy.request({
      method: 'POST',
      url: 'http://localhost:3001/graphql',
      body: {
      operationName: 'CreateBankAccount',

      query: `
      mutation CreateBankAccount(
        $bankName: String!,
        $accountNumber: String!,
        $routingNumber: String!
      ) {
      createBankAccount(
        bankName: $bankName
        accountNumber: $accountNumber
        routingNumber: $routingNumber
      ) {
        id
        uuid
        userId
        bankName
        accountNumber
        routingNumber
        isDeleted
        createdAt
      }
    }
  `,

   variables: {
      bankName: 'Bank Test',
      routingNumber: '123456789',
      accountNumber: '123456789012'
    
    }
}

 }).then((response) => {

   expect(response.status).to.eq(200)
   expect(response.body.errors).to.not.exist
   expect(response.body.data.createBankAccount.bankName).to.eq('Bank Test')
   expect(response.body.data.createBankAccount.routingNumber).to.eq('123456789')
   expect(response.body.data.createBankAccount.accountNumber).to.eq('123456789012')
   
   const bankId = response.body.data.createBankAccount.id
   cy.log(`Created bank id: ${bankId}`)


})
})


// Тест 11. Проверка создания банковского счета с длиной поля Bank Name 100 символов
it('11. Create bank account with a 100-character bank name', () => {

     cy.task('db:seed') 

// логин пользователя через API
  cy.request({
      method: 'POST',
      url: 'http://localhost:3001/login',
      failOnStatusCode: false,
      body: {
      username: 'Reyes.Osinski',
      password: 's3cret'
    }
  })

// Создание банка
  cy.request({
      method: 'POST',
      url: 'http://localhost:3001/graphql',
      body: {
      operationName: 'CreateBankAccount',

      query: `
      mutation CreateBankAccount(
        $bankName: String!,
        $accountNumber: String!,
        $routingNumber: String!
      ) {
      createBankAccount(
        bankName: $bankName
        accountNumber: $accountNumber
        routingNumber: $routingNumber
      ) {
        id
        uuid
        userId
        bankName
        accountNumber
        routingNumber
        isDeleted
        createdAt
      }
    }
  `,

   variables: {
      bankName: 'Bank of America National Association Corporate Trust Services New York Branch Global Division 2026',
      routingNumber: '123456789',
      accountNumber: '123456789012'
    
    }
}

 }).then((response) => {

   expect(response.status).to.eq(200)
   expect(response.body.errors).to.not.exist
   expect(response.body.data.createBankAccount.bankName).to.eq('Bank of America National Association Corporate Trust Services New York Branch Global Division 2026')
   expect(response.body.data.createBankAccount.routingNumber).to.eq('123456789')
   expect(response.body.data.createBankAccount.accountNumber).to.eq('123456789012')
   

})
})





// Тест 12. Проверка обработки GraphQL-запроса без обязательного поля routingNumber
it('12. Create bank account without routing number', () => {

     cy.task('db:seed')

// логин пользователя через API
  cy.request({
      method: 'POST',
      url: 'http://localhost:3001/login',
      failOnStatusCode: false,
      body: {
      username: 'Reyes.Osinski',
      password: 's3cret'
    }
  })

// Создание банка
  cy.request({
      method: 'POST',
      url: 'http://localhost:3001/graphql',
      body: {
      operationName: 'CreateBankAccount',

      query: `
      mutation CreateBankAccount(
        $bankName: String!,
        $accountNumber: String!,
        $routingNumber: String!
      ) {
      createBankAccount(
        bankName: $bankName
        accountNumber: $accountNumber
        routingNumber: $routingNumber
      ) {
        id
        uuid
        userId
        bankName
        accountNumber
        routingNumber
        isDeleted
        createdAt
      }
    }
  `,

   variables: {
      bankName: 'Bank of America National Association Corporate Trust Services New York Branch Global Division 2026',
            accountNumber: '123456789012'
    
    }
}

 }).then((response) => {

   expect(response.status).to.eq(200)
   expect(response.body.errors).to.exist
expect(response.body.errors).to.have.length.greaterThan(0)
  expect(response.body.errors[0].message).to.include('routingNumber')

})
   

})




// Тест 13. Проверка создания банковского счета со значениями, состоящими только из пробелов
it('13. Create bank account with whitespace-only values (bug)', () => {

     cy.task('db:seed')

// логин пользователя через API
  cy.request({
      method: 'POST',
      url: 'http://localhost:3001/login',
      failOnStatusCode: false,
      body: {
      username: 'Reyes.Osinski',
      password: 's3cret'
    }
  })

// Создание банка
  cy.request({
      method: 'POST',
      url: 'http://localhost:3001/graphql',
      body: {
      operationName: 'CreateBankAccount',

      query: `
      mutation CreateBankAccount(
        $bankName: String!,
        $accountNumber: String!,
        $routingNumber: String!
      ) {
      createBankAccount(
        bankName: $bankName
        accountNumber: $accountNumber
        routingNumber: $routingNumber
      ) {
        id
        uuid
        userId
        bankName
        accountNumber
        routingNumber
        isDeleted
        createdAt
      }
    }
  `,

   variables: {
      bankName: '     ',
      routingNumber: '         ',
      accountNumber: '         '
    
    }
}

 }).then((response) => {

   expect(response.status).to.eq(200)
   expect(response.body.data.createBankAccount.bankName).to.eq('     ')
   expect(response.body.data.createBankAccount.routingNumber).to.eq('         ')
   expect(response.body.data.createBankAccount.accountNumber).to.eq('         ')
   expect(response.body.errors).to.not.exist
   expect(response.body.data.createBankAccount.id).to.be.a('string')
   expect(response.body.data.createBankAccount.isDeleted).to.eq(false)
   
  })
})