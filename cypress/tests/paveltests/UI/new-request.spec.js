//Тест 1. Проверка создания нового запроса на перевод денежных средств
it('1. should create a new money request', () => {

  cy.task('db:seed') // удалить все тестовые данные/сброс БД до исходного состояния
 

  cy.loginpavel('Reyes.Osinski', 's3cret')
  
 
  cy.contains('@Reyes.Osinski') //проверка пользователь отображен на странице
    .should('be.visible')
 
 cy.get('[data-test="nav-top-new-transaction"]').click()

 
   cy.contains('Ted Parisian').click()
   cy.get('[name="amount"]').type('5')
   cy.get('#transaction-create-description-input').type('Other')
   cy.get('[data-test="transaction-create-submit-request"]').click()
   cy.contains('Transaction Submitted!').should('be.visible')
   cy.contains('Requested $5.00 for Other').should('be.visible')

})




//Тест 2. Проверка создания запроса на перевод нулевой суммы
it('2. should allow creating a money request with a zero amount', () => {

  cy.task('db:seed') // удалить все тестовые данные/сброс БД до исходного состояния
 
 cy.intercept('POST', '/login').as('login') //перехват запроса
 
  cy.loginpavel('Reyes.Osinski', 's3cret')
 
 
  cy.wait('@login')// проверка сервер вернул 200
   .its('response.statusCode')
   .should('eq', 200)
 
 cy.get('[data-test="nav-top-new-transaction"]').click()
 
   cy.contains('Ted Parisian').click()
   cy.get('[name="amount"]').type('0')
   cy.get('#transaction-create-description-input').type('Other')
   cy.get('[data-test="transaction-create-submit-request"]').click()
   cy.contains('Transaction Submitted!').should('be.visible')
   cy.contains('Requested $0.00 for Other').should('be.visible')

})



//Тест 3. Проверка создания запроса на перевод отрицательной суммы
it('3. should allow requesting a negative amount', () => {

  cy.task('db:seed') // удалить все тестовые данные/сброс БД до исходного состояния
 
  
  cy.loginpavel('Reyes.Osinski', 's3cret')
 
 
 cy.get('[data-test="nav-top-new-transaction"]').click()
 
   cy.contains('Ted Parisian').click()
   cy.get('[name="amount"]').type('-85')
   cy.get('#transaction-create-description-input').type('Other')
   cy.get('[data-test="transaction-create-submit-request"]').click()
   cy.contains('Transaction Submitted!').should('be.visible')
   cy.contains('Requested -$85.00 for Other').should('be.visible')

})




//Тест 4. Проверка усечения дробной части суммы при создании запроса на перевод денежных средств
it('4. should truncate the decimal amount when creating a money request', () => {

  cy.task('db:seed') // удалить все тестовые данные/сброс БД до исходного состояния
 
 cy.intercept('POST', '/login').as('login') //перехват запроса
 
  cy.loginpavel('Reyes.Osinski', 's3cret')
 
 
  cy.wait('@login')// проверка сервер вернул 200
   .its('response.statusCode')
   .should('eq', 200)
 
 cy.get('[data-test="nav-top-new-transaction"]').click()
 
   cy.contains('Ted Parisian').click()
   cy.get('[name="amount"]').type('85.63')
   cy.get('#transaction-create-description-input').type('Other')
   cy.get('[data-test="transaction-create-submit-request"]').click()
   cy.contains('Transaction Submitted!').should('be.visible')
   cy.contains('Requested $85.00 for Other').should('be.visible')

})




//Тест 5. Проверка создания запроса на сумму, превышающую доступный остаток на счете
it('5. should allow creating a money request exceeding the available balance', () => {

  cy.task('db:seed') // удалить все тестовые данные/сброс БД до исходного состояния
 
 cy.intercept('POST', '/login').as('login') //перехват запроса
 
  cy.loginpavel('Reyes.Osinski', 's3cret')
 
 
  cy.wait('@login')// проверка сервер вернул 200
   .its('response.statusCode')
   .should('eq', 200)
 
 cy.get('[data-test="nav-top-new-transaction"]').click()
 
   cy.contains('Ted Parisian').click()
   cy.get('[name="amount"]').type('4500')
   cy.get('#transaction-create-description-input').type('Other')
   cy.get('[data-test="transaction-create-submit-request"]').click()
   cy.contains('Transaction Submitted!').should('be.visible')
   cy.contains('Requested $4,500.00 for Other').should('be.visible')

})



//Тест 6. Проверка невозможности создания запроса с пустым описанием
it('6. should not allow creating a money request with an empty description', () => {

  cy.task('db:seed') // удалить все тестовые данные/сброс БД до исходного состояния
 
 cy.intercept('POST', '/login').as('login')
  
  cy.loginpavel('Reyes.Osinski', 's3cret')
 
 
  cy.wait('@login')
   .its('response.statusCode')
   .should('eq', 200)
 
 cy.get('[data-test="nav-top-new-transaction"]').click()
 
   cy.contains('Ted Parisian').click()
   cy.get('[name="amount"]').type('65')
   cy.get('#transaction-create-description-input').focus().blur()


   cy.get('[data-test="transaction-create-submit-request"]').should('be.disabled')
   cy.contains('Please enter a note').should('be.visible')

})



//Тест 7. Проверка создания запроса на перевод с описанием, содержащим только пробелы
it('7. should allow creating a money request with a whitespace-only description', () => {

  cy.task('db:seed') // удалить все тестовые данные/сброс БД до исходного состояния
 
 cy.intercept('POST', '/login').as('login') 
 
  cy.loginpavel('Reyes.Osinski', 's3cret')
 
 
  cy.wait('@login')
   .its('response.statusCode')
   .should('eq', 200)
 
 cy.get('[data-test="nav-top-new-transaction"]').click()
 
   cy.contains('Ted Parisian').click()
   cy.get('[name="amount"]').type('50')
   cy.get('#transaction-create-description-input').type(' ')
   cy.get('[data-test="transaction-create-submit-request"]').click()
   cy.contains('Transaction Submitted!').should('be.visible')
   cy.contains('Requested $50.00 for ').should('be.visible')

})





//Тест 8. Проверка сброса незавершенного запроса денежных средств после обновления страницы
it('8. should discard unsaved request form data after page reload', () => {

  cy.task('db:seed') // удалить все тестовые данные/сброс БД до исходного состояния
 
 cy.intercept('POST', '/login').as('login') 
 
  cy.loginpavel('Reyes.Osinski', 's3cret')
 
 
  cy.wait('@login')
   .its('response.statusCode')
   .should('eq', 200)
 
 cy.get('[data-test="nav-top-new-transaction"]').click()
   cy.contains('Ted Parisian').click()
   cy.get('[name="amount"]').type('57')
   cy.get('#transaction-create-description-input').type('Other')


  // Проверка возврата к первому шагу создания запроса
     cy.reload()
     cy.contains('Select Contact').should('be.visible')


     cy.get('[data-test="sidenav-home"]').click()
     cy.get('[data-test="nav-personal-tab"]').click()
     cy.contains('+$57').should('not.exist')
  

})





//Тест 9. Полный сценарий создания, подтверждения запроса на перевод и изменения балансов пользователей
it('9. should complete a money request flow and update both users balances', () => {

  cy.task('db:seed') // удалить все тестовые данные/сброс БД до исходного состояния
 

  // логин под 1ым пользователем  
    cy.intercept('POST', '/login').as('login') //перехват запроса
 
    cy.loginpavel('Reyes.Osinski', 's3cret')
 

  // проверки сервер вернул 200 и пользователь отображен на странице
    cy.wait('@login')// проверка сервер вернул 200
       .its('response.statusCode')
       .should('eq', 200)
 
    cy.contains('@Reyes.Osinski').should('be.visible')


  // считать баланс с экрана и сохранить в переменную senderBalance
     let senderBalance

     cy.get('[data-test="sidenav-user-balance"]')
     .invoke('text')
     .then((text) => {
     senderBalance = Number(text.replace(/[$,]/g, ''))
    })



  // создание запроса на перевод  
     cy.get('[data-test="nav-top-new-transaction"]').click()
 
     cy.contains('Ted Parisian').click()
     cy.get('[name="amount"]').type('60')
     cy.get('#transaction-create-description-input').type('Other')
     cy.get('[data-test="transaction-create-submit-request"]').click()
     cy.contains('Transaction Submitted!').should('be.visible')
     cy.contains('Requested $60.00 for Other').should('be.visible')
  
     cy.get('[data-test="sidenav-signout"]').click()


  // логин под 2-ым пользователем
     cy.loginpavel('Heath93', 's3cret')
 
     
  //проверка 2ой пользователь отображен на странице
       cy.contains('@Heath93').should('be.visible')


    // считать баланс с экрана 2го пользователя и сохранить в переменную requesterBalance
       let requesterBalance

       cy.get('[data-test="sidenav-user-balance"]')
         .invoke('text')
         .then((text) => {
        requesterBalance = Number(text.replace(/[$,]/g, ''))
      })



    // переход в личное и проверка что пользователь видит запрос на перевод
      cy.get('[data-test="nav-personal-tab"]').click()
      cy.contains('Ruthie Prosacco requested Ted Parisian').should('be.visible')

    // переход на страницу перевода и подтверждение запроса на перевод
        cy.contains('[data-test^="transaction-item-"]',
       'Ruthie Prosacco requested Ted Parisian')
       .click()

       cy.get('[data-test^="transaction-accept-request-"]').click()
       cy.get('[data-test^="transaction-accept-request-"]').should('not.exist')
      
    // выход из 2-го пользователя  
    cy.get('[data-test="sidenav-signout"]').click()


    // повторный вход под 2-ым пользователем для проверки баланса
       cy.loginpavel('Heath93', 's3cret')
              
    //проверка 2ой пользователь отображен на странице
       cy.contains('@Heath93').should('be.visible')


    // проверка изменения баланса у 2 го пользователя после подтверждения запроса
        cy.get('[data-test="sidenav-user-balance"]')
         .invoke('text')
         .then((text) => {
        const newBalance = Number(text.replace(/[$,]/g, ''))

       expect(newBalance).to.eq(requesterBalance - 60)
       })

    // выход из 2-го пользователя  
      cy.get('[data-test="sidenav-signout"]').click()


// повторный вход под 1-ым пользователем
   cy.loginpavel('Reyes.Osinski', 's3cret')
  


//проверка 1ый пользователь отображен на странице
       cy.contains('@Reyes.Osinski').should('be.visible')


// проверка изменения баланса у 1го пользователя после подтверждения запроса
cy.get('[data-test="sidenav-user-balance"]')
  .invoke('text')
  .then((text) => {
    const newBalance = Number(text.replace(/[$,]/g, ''))

    expect(newBalance).to.eq(senderBalance + 60)
  })

// выход из 1-го пользователя  
      cy.get('[data-test="sidenav-signout"]').click()

})
