//Тест 1. Позитивный сценарий изменения профиля
it('1. should successfully update the user profile', () => {

   cy.task('db:seed') // удалить все тестовые данные/сброс БД до исходного состояния

   cy.loginpavel('Reyes.Osinski', 's3cret')

  cy.get('[data-test="sidenav-user-settings"]').click()

    cy.get('[name="firstName"]').clear()
    cy.get('[name="lastName"]').clear()
    cy.get('[name="phoneNumber"]').clear()
    

    cy.get('[name="firstName"]').type('Pavel')
    cy.get('[name="lastName"]').type('QA')
    cy.get('[name="phoneNumber"]').type('123-456-7890')
    cy.get('[data-test="user-settings-submit"]').click()

    //проверка что пользователь отображен на странице
       cy.contains('Pavel Q').should('be.visible')

  //проверка что изменения сохранились после перезагрузки страницы
   cy.reload()
      cy.get('[name="firstName"]').should('have.value', 'Pavel')
      cy.get('[name="lastName"]').should('have.value', 'QA')
      cy.get('[name="phoneNumber"]').should('have.value', '123-456-7890')


   })


//Тест 2. Проверка обязательных полей - пустые поля
it('2. should validate myaccount null fields', () => {

 cy.task('db:seed') // удалить все тестовые данные/сброс БД до исходного состояния

  cy.loginpavel('Reyes.Osinski', 's3cret')

cy.get('[data-test="sidenav-user-settings"]').click()

    cy.get('[name="firstName"]').clear()
    cy.get('[name="lastName"]').clear()
    cy.get('[name="email"]').clear()
    cy.get('[name="phoneNumber"]').clear()


    cy.get('[data-test="user-settings-submit"]').should('be.disabled')
    cy.contains('Enter a first name').should('be.visible')
    cy.contains('Enter a last name').should('be.visible')
    cy.contains('Enter an email address').should('be.visible')
    cy.contains('Enter a phone number').should('be.visible')

 })



//Тест 3. Негативный тест валидация формы - email и phone number минимальная граница
it('3. should validate email phonenumber min field length', () => {
 
  cy.task('db:seed') // удалить все тестовые данные/сброс БД до исходного состояния


cy.loginpavel('Reyes.Osinski', 's3cret')

cy.get('[data-test="sidenav-user-settings"]').click()

    cy.get('[name="email"]').clear()
    cy.get('[name="phoneNumber"]').clear()
    

    cy.get('[name="email"]').type('123a/*')
    cy.get('[name="phoneNumber"]').type('1234')


    cy.get('[data-test="user-settings-submit"]').should('be.disabled')
    cy.contains('Must contain a valid email address').should('be.visible')
    cy.contains('Phone number is not valid').should('be.visible')
  
})


 //Тест 4. Проверка сохранения профиля с нестандартными символами в полях
  it('4. should allow unexpected characters in profile fields', () => {
    cy.task('db:seed') // удалить все тестовые данные/сброс БД до исходного состояния

    cy.loginpavel('Reyes.Osinski', 's3cret')

  cy.get('[data-test="sidenav-user-settings"]').click()

    cy.get('[name="firstName"]').clear()
    cy.get('[name="lastName"]').clear()
    cy.get('[name="phoneNumber"]').clear()
    

    cy.get('[name="firstName"]').type('44444')
    cy.get('[name="lastName"]').type('abcdefgabcdefg abcdefgabcdefg 44/*')
    cy.get('[name="phoneNumber"]').type('46731653524452727217')
    cy.get('[data-test="user-settings-submit"]').click()

  
    //проверка пользователь отображен на странице
    cy.contains('44444 a').should('be.visible')

   })



   //Тест 5. Проверка отмены изменений 
it('5. should discard unsaved profile changes after page reload', () => {

   cy.task('db:seed') // удалить все тестовые данные/сброс БД до исходного состояния

   cy.loginpavel('Reyes.Osinski', 's3cret')

  cy.get('[data-test="sidenav-user-settings"]').click()

    cy.get('[name="firstName"]').clear()
    cy.get('[name="lastName"]').clear()
    cy.get('[name="phoneNumber"]').clear()
    

    cy.get('[name="firstName"]').type('Pavel')
    cy.get('[name="lastName"]').type('QA')
    cy.get('[name="phoneNumber"]').type('123-456-7890')
    

  //проверка что изменения не сохранились после перезагрузки страницы
   cy.reload()
      cy.contains('Ruthie P').should('be.visible')
      cy.get('[name="firstName"]').should('have.value', 'Ruthie')
      cy.get('[name="lastName"]').should('have.value', 'Prosacco')
      cy.get('[name="phoneNumber"]').should('have.value', '467-316-5352')

   })

