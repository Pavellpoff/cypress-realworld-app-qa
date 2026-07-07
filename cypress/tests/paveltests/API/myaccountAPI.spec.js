//Тест 1. Позитивный API тест на изменение данных пользователя
it('1. should update user profile via API', () => {

  cy.task('db:seed')

  // логин пользователя
    cy.request({
      method: 'POST',
      url: 'http://localhost:3001/login',
      failOnStatusCode: false,
      body: {
         username: 'Reyes.Osinski',
         password: 's3cret'
        }
    }).then((response) => {
    expect(response.status).to.eq(200)
  })
  


 // изменение данных пользователя
  cy.request({
    method: 'PATCH',
    url: 'http://localhost:3001/users/M1ty1gR8B3',
    body: {
      id: 'M1ty1gR8B3',
      firstName: 'Pavel',
      lastName: 'QA',
      email: 'pavel@test.com',
      phoneNumber: '123-456-7890',
      defaultPrivacyLevel: 'private'
    }
  }).then((response) => {

    expect(response.status).to.eq(204)

  })

// проверка измененных данных пользователя
  cy.request('GET', 'http://localhost:3001/users/M1ty1gR8B3')
  .then((response) => {

    expect(response.status).to.eq(200)
    expect(response.body.user.firstName).to.eq('Pavel')
    expect(response.body.user.lastName).to.eq('QA')
    expect(response.body.user.email).to.eq('pavel@test.com')
    expect(response.body.user.phoneNumber).to.eq('123-456-7890')

  })

})



//Тест 2. Пустой First name - изменение данных пользователя через API
it('2. should update user profile First name empty', () => {

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


 // изменение данных пользователя через API
  cy.request({
    method: 'PATCH',
    url: 'http://localhost:3001/users/M1ty1gR8B3',
    body: {
      id: 'M1ty1gR8B3',
      firstName: '',
      lastName: 'QA',
      email: 'pavel@test.com',
      phoneNumber: '123-456-7890',
      defaultPrivacyLevel: 'private'
    }
  }).then((response) => {

    expect(response.status).to.eq(204)

  })

// проверка измененных данных пользователя через API
  cy.request('GET', 'http://localhost:3001/users/M1ty1gR8B3')
  .then((response) => {

    expect(response.status).to.eq(200)
    expect(response.body.user.firstName).to.eq('')
    expect(response.body.user.lastName).to.eq('QA')
    expect(response.body.user.email).to.eq('pavel@test.com')
    expect(response.body.user.phoneNumber).to.eq('123-456-7890')

  })

})



//Тест 3. Пустой Last name - изменение данных пользователя
it('3.should update user profile Last name empty', () => {

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


 // изменение данных пользователя через API
  cy.request({
    method: 'PATCH',
    url: 'http://localhost:3001/users/M1ty1gR8B3',
    body: {
      id: 'M1ty1gR8B3',
      firstName: 'Pavel',
      lastName: '',
      email: 'pavel@test.com',
      phoneNumber: '123-456-7890',
      defaultPrivacyLevel: 'private'
    }
  }).then((response) => {

    expect(response.status).to.eq(204)

  })

// проверка измененных данных пользователя через API
  cy.request('GET', 'http://localhost:3001/users/M1ty1gR8B3')
  .then((response) => {

    expect(response.status).to.eq(200)
    expect(response.body.user.firstName).to.eq('Pavel')
    expect(response.body.user.lastName).to.eq('')
    expect(response.body.user.email).to.eq('pavel@test.com')
    expect(response.body.user.phoneNumber).to.eq('123-456-7890')

  })

})




//Тест 4. Пустой email - изменение данных пользователя
it('4. should update user profile email empty', () => {

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


 // изменение данных пользователя
  cy.request({
    method: 'PATCH',
    url: 'http://localhost:3001/users/M1ty1gR8B3',
    body: {
      id: 'M1ty1gR8B3',
      firstName: 'Pavel',
      lastName: 'QA',
      email: '',
      phoneNumber: '123-456-7890',
      defaultPrivacyLevel: 'private'
    }
  }).then((response) => {

    expect(response.status).to.eq(204)

  })

// проверка измененных данных пользователя
  cy.request('GET', 'http://localhost:3001/users/M1ty1gR8B3')
  .then((response) => {

    expect(response.status).to.eq(200)
    expect(response.body.user.firstName).to.eq('Pavel')
    expect(response.body.user.lastName).to.eq('QA')
    expect(response.body.user.email).to.eq('')
    expect(response.body.user.phoneNumber).to.eq('123-456-7890')

  })

})


 

//Тест 5. Пустой phoneNumber - изменение данных пользователя 
it('5. should update user profile phoneNumber empty', () => {

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


 // изменение данных пользователя
  cy.request({
    method: 'PATCH',
    url: 'http://localhost:3001/users/M1ty1gR8B3',
    body: {
      id: 'M1ty1gR8B3',
      firstName: 'Pavel',
      lastName: 'QA',
      email: 'pavel@test.com',
      phoneNumber: '',
      defaultPrivacyLevel: 'private'
    }
  }).then((response) => {

    expect(response.status).to.eq(204)

  })

// проверка измененных данных пользователя 
  cy.request('GET', 'http://localhost:3001/users/M1ty1gR8B3')
  .then((response) => {

    expect(response.status).to.eq(200)
    expect(response.body.user.firstName).to.eq('Pavel')
    expect(response.body.user.lastName).to.eq('QA')
    expect(response.body.user.email).to.eq('pavel@test.com')
    expect(response.body.user.phoneNumber).to.eq('')

  })

})
    



//Тест 6. Невалидный email - изменение данных пользователя
it('6. should update user profile email invalid', () => {

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


 // изменение данных пользователя через API
  cy.request({
    method: 'PATCH',
    url: 'http://localhost:3001/users/M1ty1gR8B3',
    body: {
      id: 'M1ty1gR8B3',
      firstName: 'Pavel',
      lastName: 'QA',
      email: 'paveltest.com',
      phoneNumber: '123-456-7890',
      defaultPrivacyLevel: 'private'
    }
  }).then((response) => {

    expect(response.status).to.eq(204)

  })

// проверка измененных данных пользователя через API
  cy.request('GET', 'http://localhost:3001/users/M1ty1gR8B3')
  .then((response) => {

    expect(response.status).to.eq(200)
    expect(response.body.user.firstName).to.eq('Pavel')
    expect(response.body.user.lastName).to.eq('QA')
    expect(response.body.user.email).to.eq('paveltest.com')
    expect(response.body.user.phoneNumber).to.eq('123-456-7890')

  })

})






//Тест 7. Невалидный phoneNumber - изменение данных пользователя
it('7. should update user profile phoneNumber invalid', () => {

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


 // изменение данных пользователя через API
  cy.request({
    method: 'PATCH',
    url: 'http://localhost:3001/users/M1ty1gR8B3',
    body: {
      id: 'M1ty1gR8B3',
      firstName: 'Pavel',
      lastName: 'QA',
      email: 'pavel@test.com',
      phoneNumber: '123-456-7890-515145',
      defaultPrivacyLevel: 'private'
    }
  }).then((response) => {

    expect(response.status).to.eq(204)

  })

// проверка измененных данных пользователя через API
  cy.request('GET', 'http://localhost:3001/users/M1ty1gR8B3')
  .then((response) => {

    expect(response.status).to.eq(200)
    expect(response.body.user.firstName).to.eq('Pavel')
    expect(response.body.user.lastName).to.eq('QA')
    expect(response.body.user.email).to.eq('pavel@test.com')
    expect(response.body.user.phoneNumber).to.eq('123-456-7890-515145')

  })

})



//Тест 8. Проверка запрета изменения профиля другого пользователя
  it('8. should update another users profile via API', () => {

     cy.task('db:seed')


  cy.request({
  method: 'POST',
  url: 'http://localhost:3001/login',
  body: {
    username: 'Reyes.Osinski',
    password: 's3cret'
  }
}).then((loginResponse) => {

  cy.log(loginResponse.body.user.id)

  cy.request({
    method: 'PATCH',
    url: 'http://localhost:3001/users/uBmeaz5pX',
    failOnStatusCode: false,
    body: {
      id: 'uBmeaz5pX',
      firstName: 'Pavel123',
      lastName: 'QA',
      email: 'pavel@test.com',
      phoneNumber: '123-456-7890',
      defaultPrivacyLevel: 'private'
    }
  }).then((patchResponse) => {

    cy.log(`PATCH status: ${patchResponse.status}`)

  })

})

cy.request({
  method: 'GET',
  url: 'http://localhost:3001/users/uBmeaz5pX',
  failOnStatusCode: false
}).then((response) => {

  cy.log(`GET status: ${response.status}`)
  cy.log(JSON.stringify(response.body))

})

})



//Тест 9. Проверка запрета изменения данных пользователя без авторизации
it('9. should not update user profile without authentication', () => {

  cy.task('db:seed')


 // попытка изменить данные пользователя без авторизации
  cy.request({
    method: 'PATCH',
    url: 'http://localhost:3001/users/M1ty1gR8B3',
    failOnStatusCode: false,
    body: {
      id: 'M1ty1gR8B3',
      firstName: 'Pavel',
      lastName: 'QA',
      email: 'pavel@test.com',
      phoneNumber: '123-456-7890',
      defaultPrivacyLevel: 'private'
    }
  }).then((response) => {
    expect(response.status).to.eq(401)
    expect(response.body.error).to.eq('Unauthorized')
    })

})




//Тест 10. Проверка невозможности изменения данных пользователя без body 
it('10. should not update user profile without request body', () => {

  cy.task('db:seed')

  // логин
  cy.request({
      method: 'POST',
      url: 'http://localhost:3001/login',
      failOnStatusCode: false,
      body: {
      username: 'Reyes.Osinski',
      password: 's3cret'
    }
  })


 // попытка изменить данные пользователя
  cy.request({
    method: 'PATCH',
    url: 'http://localhost:3001/users/M1ty1gR8B3',
    failOnStatusCode: false,
  }).then((response) => {

    expect(response.status).to.eq(422)
    expect(response.body.errors[0].param).to.eq('_error')
    

  })

// проверка что данные пользователя не изменились
  cy.request('GET', 'http://localhost:3001/users/M1ty1gR8B3')
  .then((response) => {

    expect(response.status).to.eq(200)
    expect(response.body.user.firstName).to.eq('Ruthie')
    expect(response.body.user.lastName).to.eq('Prosacco')
    expect(response.body.user.email).to.eq('Norma27@gmail.com')
    expect(response.body.user.phoneNumber).to.eq('467-316-5352')
    })

})





//Тест 11. Проверка изменения данных пользователя без передачи id в теле PATCH-запроса
it('11. should update user profile using id from URL', () => {

  cy.task('db:seed')

  // логин пользователя
  cy.request({
      method: 'POST',
      url: 'http://localhost:3001/login',
      failOnStatusCode: false,
      body: {
      username: 'Reyes.Osinski',
      password: 's3cret'
    }
  })


 // // изменение данных пользователя без передачи id в теле запроса
  cy.request({
    method: 'PATCH',
    url: 'http://localhost:3001/users/M1ty1gR8B3',
    body: {
      firstName: 'Pavel',
      lastName: 'QA',
      email: 'pavel@test.com',
      phoneNumber: '123-456-7890',
      defaultPrivacyLevel: 'private'
    }
  }).then((response) => {

    expect(response.status).to.eq(204)

  })

// проверка измененных данных пользователя
  cy.request('GET', 'http://localhost:3001/users/M1ty1gR8B3')
  .then((response) => {

    expect(response.status).to.eq(200)
    expect(response.body.user.firstName).to.eq('Pavel')
    expect(response.body.user.lastName).to.eq('QA')
    expect(response.body.user.email).to.eq('pavel@test.com')
    expect(response.body.user.phoneNumber).to.eq('123-456-7890')

  })

})


