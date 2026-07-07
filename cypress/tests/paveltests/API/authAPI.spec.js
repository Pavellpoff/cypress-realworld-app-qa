// 1. Positive Auth
it('1. Positive Auth', () => {
  cy.request('POST', 'http://localhost:3001/login', {
    username: 'Reyes.Osinski',
    password: 's3cret'
  }).then((response) => {

    expect(response.status).to.eq(200)
    expect(response.body.user).to.exist
    expect(response.body.user.username).to.eq('Reyes.Osinski')
    expect(response.body.user.id).to.be.a('string')
    expect(response.body.user.email).to.be.a('string')
    expect(response.body.user.balance).to.be.a('number')
    expect(response.body.user).to.have.property('firstName')
    expect(response.body.user).to.have.property('lastName')

  })
})



// 2. Авторизация с пустыми username и password
  it('2. Authentication with empty username and password', () => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:3001/login',
    failOnStatusCode: false,
    body: {
      username: '',
      password: ''
    }
  }).then((response) => {

    expect(response.status).to.eq(400)
    expect(response.body).to.eq('Bad Request')

  })
})

 

// 3. Авторизация с неверным паролем
it('3. Login with invalid password', () => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:3001/login',
    failOnStatusCode: false,
    body: {
      username: 'Reyes.Osinski',
      password: '123456'
    }
  }).then((response) => {

    expect(response.status).to.eq(401)
    expect(response.body).to.eq('Unauthorized')
    
  })
})



// 4. Авторизация с несуществующим пользователем
it('4. Login with nonexistent user', () => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:3001/login',
    failOnStatusCode: false,
    body: {
      username: 'Reyes.ivanov',
      password: '1234ab'
    }
  }).then((response) => {

    expect(response.status).to.eq(401)
    expect(response.body).to.eq('Unauthorized')
    cy.log(JSON.stringify(response.body))

  })
})



// 5. Авторизация с пустым username
it('5. Login with empty username', () => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:3001/login',
    failOnStatusCode: false,
    body: {
      username: '',
      password: 's3cret'
    }
  }).then((response) => {

    expect(response.status).to.eq(400)
    expect(response.body).to.eq('Bad Request')
    cy.log(JSON.stringify(response.body))

  })
})



// 6. Авторизация без поля username
it('6. Login without username field', () => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:3001/login',
    failOnStatusCode: false,
    body: {
        password: 's3cret'
    }
  }).then((response) => {

    expect(response.status).to.eq(400)
    expect(response.body).to.eq('Bad Request')
    cy.log(JSON.stringify(response.body))

  })
})



// 7. Авторизация с null в полях username и password
it('7. Login with username and password set to null', () => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:3001/login',
    failOnStatusCode: false,
    body: {
        username: null,
        password: null
    }
  }).then((response) => {

    expect(response.status).to.eq(400)
    expect(response.body).to.eq('Bad Request')
    cy.log(JSON.stringify(response.body))

  })
})




// 8. Проверка отклонения авторизации при SQL-инъекции
it('8. Login with SQL injection payload', () => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:3001/login',
    failOnStatusCode: false,
    body: {
        username: "' OR '1'='1' --",
        password: "s3cret"
    }
  }).then((response) => {

    expect(response.status).to.eq(401)
    expect(response.body).to.eq('Unauthorized')
    cy.log(JSON.stringify(response.body))

  })
})
