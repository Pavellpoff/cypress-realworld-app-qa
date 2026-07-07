// 1. Positive Auth
it('1. Positive Auth', () => {

  cy.task('db:seed') // удалить все тестовые данные/сброс БД до исходного состояния
  
 cy.intercept('POST', '/login').as('login') //перехват запроса

  cy.visit('/signin')
  cy.contains('Sign In').should('be.visible')// проверка что страница загрузилась
  cy.get('[name="username"]').type('Reyes.Osinski');
  cy.get('[name="password"]').type('s3cret');
  cy.get('[data-test="signin-submit"]').click();


  cy.wait('@login')// проверка что login вернул 200
  .its('response.statusCode')
  .should('eq', 200)

  cy.contains('@Reyes.Osinski') //проверка пользователь отображен на странице
    .should('be.visible')

    //logout
    cy.get('[data-test="sidenav-signout"]').click()
    cy.contains('Sign In').should('be.visible')


})



// 2. Проверка обязательности полей логина и пароля
it('2. Should display validation messages for empty credentials', () => {
  cy.task('db:seed') // удалить все тестовые данные/сброс БД до исходного состояния


  cy.visit('/signin')

  cy.get('[name="username"]').should('have.value', '').click()
  cy.get('[name="password"]').should('have.value', '').click()

    cy.contains('Username is required').should('be.visible')
    
})


// 3. Неверный пароль
it('3. Should show error for invalid password', () => {

  cy.task('db:seed') // удалить все тестовые данные/сброс БД до исходного состояния

 cy.intercept('POST', '/login').as('login') //перехват запроса

  cy.visit('/signin')
  cy.contains('Sign In').should('be.visible')// проверка что страница загрузилась
  cy.get('[name="username"]').type('Reyes.Osinski');
  cy.get('[name="password"]').type('123456');
  cy.get('[data-test="signin-submit"]').click();


  cy.wait('@login')// проверка что login вернул 401
  .its('response.statusCode')
  .should('eq', 401) 

  cy.contains('Username or password is invalid').should('be.visible')
  
})



// 4. Неверный логин
it('4. Should show invalid username', () => {

  cy.task('db:seed') // удалить все тестовые данные/сброс БД до исходного состояния

 cy.intercept('POST', '/login').as('login') //перехват запроса

  cy.visit('/signin')
  cy.contains('Sign In').should('be.visible')// проверка что страница загрузилась
  cy.get('[name="username"]').type('Reyes1234');
  cy.get('[name="password"]').type('s3cret');
  cy.get('[data-test="signin-submit"]').click();


  cy.wait('@login')// проверка сервер вернул 401
  .its('response.statusCode')
  .should('eq', 401)

  cy.contains('Username or password is invalid').should('be.visible')

})





// 5. Неверный логин и пароль
it('5. Should show invalid username and password', () => {

  cy.task('db:seed') // удалить все тестовые данные/сброс БД до исходного состояния

 cy.intercept('POST', '/login').as('login') //перехват запроса

  cy.visit('/signin')
  cy.contains('Sign In').should('be.visible')// проверка что страница загрузилась
  cy.get('[name="username"]').type('Reyes.123');
  cy.get('[name="password"]').type('s31235');
  cy.get('[data-test="signin-submit"]').click();


  cy.wait('@login')// проверка сервер вернул 401
  .its('response.statusCode')
  .should('eq', 401)

  cy.contains('Username or password is invalid').should('be.visible')

})





// 6. Авторизация с логином, содержащим пробелы
it('6. Should reject username with trailing spaces', () => {

  cy.task('db:seed') // удалить все тестовые данные/сброс БД до исходного состояния

 cy.intercept('POST', '/login').as('login') //перехват запроса

  cy.visit('/signin')
  cy.contains('Sign In').should('be.visible')// проверка что страница загрузилась
  cy.get('[name="username"]').type('Reyes1234  ');
  cy.get('[name="password"]').type('s3cret');
  cy.get('[data-test="signin-submit"]').click();


  cy.wait('@login')// проверка сервер вернул 401
  .its('response.statusCode')
  .should('eq', 401)

  cy.contains('Username or password is invalid').should('be.visible')

})




// 7. Авторизация с паролем, содержащим пробелы
it('7. Should reject login with password containing trailing spaces', () => {

  cy.task('db:seed') // удалить все тестовые данные/сброс БД до исходного состояния

 cy.intercept('POST', '/login').as('login') //перехват запроса

  cy.visit('/signin')
  cy.contains('Sign In').should('be.visible')// проверка что страница загрузилась
  cy.get('[name="username"]').type('Reyes1234');
  cy.get('[name="password"]').type('s3cret  ');
  cy.get('[data-test="signin-submit"]').click();


  cy.wait('@login')// проверка сервер вернул 401
  .its('response.statusCode')
  .should('eq', 401)

  cy.contains('Username or password is invalid').should('be.visible')

})




// 8. Попытка авторизации с использованием SQL-инъекции
it('8. Should reject login with SQL injection', () => {

  cy.task('db:seed') // удалить все тестовые данные/сброс БД до исходного состояния

 cy.intercept('POST', '/login').as('login') //перехват запроса

  cy.visit('/signin')
  cy.contains('Sign In').should('be.visible')// проверка что страница загрузилась
  cy.get('[name="username"]').type("' OR '1'='1'");
  cy.get('[name="password"]').type('Password123!');
  cy.get('[data-test="signin-submit"]').click();


  cy.wait('@login')// проверка сервер вернул 401
  .its('response.statusCode')
  .should('eq', 401)

  cy.contains('Username or password is invalid').should('be.visible')

})



// 9. Enter вместо кнопки
it('9. Should submit login form by pressing Enter', () => {

  cy.task('db:seed') // удалить все тестовые данные/сброс БД до исходного состояния

 cy.intercept('POST', '/login').as('login') //перехват запроса

   cy.visit('/signin')
  cy.contains('Sign In').should('be.visible')// проверка что страница загрузилась
  cy.get('[name="username"]').type('Reyes.Osinski');
  cy.get('[name="password"]').type('s3cret{enter}');


  cy.wait('@login')// проверка сервер вернул 200
  .its('response.statusCode')
  .should('eq', 200)

  cy.contains('@Reyes.Osinski') //проверка пользователь отображен на странице
    .should('be.visible')

})



