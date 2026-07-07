//Тест 1. Создание и удаление банка
it('1.1. should create and delete a bank account', () => {

 cy.task('db:seed') // удалить все тестовые данные/сброс БД до исходного состояния

 // 1.1 Создать банк
  cy.loginpavel('Reyes.Osinski', 's3cret')

cy.get('[data-test="sidenav-bankaccounts"]').click()
cy.get('[data-test="bankaccount-new"]')
  .click({ force: true })

    cy.get('[name="bankName"]').type('Test Bank')
    cy.get('[name="accountNumber"]').type('123456789')
    cy.get('[name="routingNumber"]').type('987654321')
    cy.get('[data-test="bankaccount-submit"]').click()


 //1.2 Проверить что банк создан
 cy.contains('Test Bank').should('be.visible') 


//1.3 Удалить созданный банк 
cy.get('[data-test="sidenav-bankaccounts"]').click()
cy.contains('Test Bank')
  .parents('li')
  .find('[data-test="bankaccount-delete"]').click()

 //1.4 Проверить что банк удален
 cy.contains('Test Bank')
  .parents('li')
  .should('contain', 'Deleted')
 })


//Тест 2. Проверка валидации формы: нижняя граница -1 для полей bankName и accountNumber
it('2. should prevent creating bank account with minimum-1 boundary values', () => {

  cy.task('db:seed') // удалить все тестовые данные/сброс БД до исходного состояния

cy.loginpavel('Reyes.Osinski', 's3cret')

cy.get('[data-test="sidenav-bankaccounts"]').click()
cy.get('[data-test="bankaccount-new"]').click({ force: true })

    cy.get('[name="bankName"]').type('Bank')
    cy.get('[name="routingNumber"]').type('123456789') 
    cy.get('[name="accountNumber"]').type('12345678')  
    
    cy.get('[data-test="bankaccount-submit"]').should('be.disabled')
    cy.contains('Must contain at least 5 characters').should('be.visible')
    cy.contains('Must contain at least 9 digits').should('be.visible')
  
})



//Тест 3. Проверка валидации формы: верхняя граница +1 для accountNumber
it('3. should prevent creating bank account with maximum+1 account number', () => {

    cy.task('db:seed') // удалить все тестовые данные/сброс БД до исходного состояния

  
  cy.loginpavel('Reyes.Osinski', 's3cret')

  cy.get('[data-test="sidenav-bankaccounts"]').click()
  cy.get('[data-test="bankaccount-new"]').click({ force: true })

    cy.get('[name="bankName"]').type('Test Bank')
    cy.get('[name="routingNumber"]').type('123456789')
    cy.get('[name="accountNumber"]').type('1234567891234')  
    
    cy.get('[data-test="bankaccount-submit"]').should('be.disabled')
    cy.contains('Must contain no more than 12 digits').should('be.visible')
 })



//Тест 4. Проверка валидации формы: минимально допустимое значение для accountNumber и bankName
it('4. should create bank account with minimum valid field lengths', () => {

  cy.task('db:seed') // удалить все тестовые данные/сброс БД до исходного состояния

cy.loginpavel('Reyes.Osinski', 's3cret')

cy.get('[data-test="sidenav-bankaccounts"]').click()
cy.get('[data-test="bankaccount-new"]').click({ force: true })

    cy.get('[name="bankName"]').type('Bank1')
    cy.get('[name="routingNumber"]').type('123456789') 
    cy.get('[name="accountNumber"]').type('123456789')  
    cy.get('[data-test="bankaccount-submit"]').click()
    
    //Проверить что банк создан
 cy.contains('Bank1').should('be.visible')
  
})


//Тест 5. Не валидное значение для поля routingNumber
it('5. should validate routing number format', () => {

  cy.task('db:seed') // удалить все тестовые данные/сброс БД до исходного состояния

cy.loginpavel('Reyes.Osinski', 's3cret')

cy.get('[data-test="sidenav-bankaccounts"]').click()
cy.get('[data-test="bankaccount-new"]').click({ force: true })

    cy.get('[name="bankName"]').type('Test Bank')
    cy.get('[name="routingNumber"]').type('1234') 
    cy.get('[name="accountNumber"]').type('123456789')  
        
    //Проверки
 cy.get('[data-test="bankaccount-submit"]').should('be.disabled')
    cy.contains('Must contain a valid routing number').should('be.visible')
  
})



//Тест 6. Ввод значения длиной 50 символов для поля Bank Name
it('6. should accept a 50-character bank name', () => {

  cy.task('db:seed') // удалить все тестовые данные/сброс БД до исходного состояния

cy.loginpavel('Reyes.Osinski', 's3cret')

cy.get('[data-test="sidenav-bankaccounts"]').click()
cy.get('[data-test="bankaccount-new"]').click({ force: true })

    cy.get('[name="bankName"]').type('Bank Name Test123456789012345678901234567890123456')
    cy.get('[name="routingNumber"]').type('123456789') 
    cy.get('[name="accountNumber"]').type('123456789')  
    cy.get('[data-test="bankaccount-submit"]').click()
    
    //Проверка что банк создан
 cy.contains('Bank Name Test123456789012345678901234567890123456').should('be.visible')
  
})


//Тест 7. Ввод максимально допустимого значения для accountNumber
it('7. should accept maximum allowed account number', () => {

  cy.task('db:seed') // удалить все тестовые данные/сброс БД до исходного состояния

cy.loginpavel('Reyes.Osinski', 's3cret')

cy.get('[data-test="sidenav-bankaccounts"]').click()
cy.get('[data-test="bankaccount-new"]').click({ force: true })

    cy.get('[name="bankName"]').type('Test Bank')
    cy.get('[name="routingNumber"]').type('123456789') 
    cy.get('[name="accountNumber"]').type('123456789012')  
    cy.get('[data-test="bankaccount-submit"]').click()
    
    //Проверка что банк создан
 cy.contains('Test Bank').should('be.visible')
  
})



//Тест 8. Ввод пробелов в поля routingNumber и accountNumber. Кол-во пробелов = допустимому значению в полях 
it('8. should allow creating bank account with whitespace-only numeric fields', () => {

  cy.task('db:seed') // удалить все тестовые данные/сброс БД до исходного состояния

cy.loginpavel('Reyes.Osinski', 's3cret')

cy.get('[data-test="sidenav-bankaccounts"]').click()
cy.get('[data-test="bankaccount-new"]').click({ force: true })

    cy.get('[name="bankName"]').type('Bank Test')
    cy.get('[name="routingNumber"]').type('         ') 
    cy.get('[name="accountNumber"]').type('         ')  
    cy.get('[data-test="bankaccount-submit"]').click()
    
    //Проверка что банк создан
 cy.contains('Bank Test').should('be.visible')
  
})



//Тест 9. Ввод пробела в начале " Test Bank"
it('9. should handle leading whitespace in bank name', () => {

  cy.task('db:seed') // удалить все тестовые данные/сброс БД до исходного состояния

cy.loginpavel('Reyes.Osinski', 's3cret')

cy.get('[data-test="sidenav-bankaccounts"]').click()
cy.get('[data-test="bankaccount-new"]').click({ force: true })

    cy.get('[name="bankName"]').type(' Test Bank')
    cy.get('[name="routingNumber"]').type('123456789') 
    cy.get('[name="accountNumber"]').type('123456789')  
    cy.get('[data-test="bankaccount-submit"]').click()
    
    //Проверка что банк создан
 cy.contains(' Test Bank').should('be.visible')
  
})



//Тест 10. Ввод пробела в конце "Test Bank "
it('10. should handle trailing whitespace in bank name', () => {

  cy.task('db:seed') // удалить все тестовые данные/сброс БД до исходного состояния

cy.loginpavel('Reyes.Osinski', 's3cret')

cy.get('[data-test="sidenav-bankaccounts"]').click()
cy.get('[data-test="bankaccount-new"]').click({ force: true })

    cy.get('[name="bankName"]').type('Test Bank ')
    cy.get('[name="routingNumber"]').type('123456789') 
    cy.get('[name="accountNumber"]').type('123456789')  
    cy.get('[data-test="bankaccount-submit"]').click()
    
    //Проверка что банк создан
 cy.contains('Test Bank ').should('be.visible')
  
})





   //Тест 11. Проверка обязательных полей 
  it('11. should display validation messages for empty required fields', () => {

    cy.task('db:seed')


  cy.loginpavel('Reyes.Osinski', 's3cret')

  cy.get('[data-test="sidenav-bankaccounts"]').click()
  cy.get('[data-test="bankaccount-new"]')
  .click({ force: true })

    cy.get('[name="bankName"]').focus().blur()
    cy.get('[name="routingNumber"]').focus().blur()
    cy.get('[name="accountNumber"]').focus().blur()
      
    cy.get('[data-test="bankaccount-submit"]').should('be.disabled')
    cy.contains('Enter a valid bank routing number').should('be.visible')
    cy.contains('Enter a valid bank account number').should('be.visible')
    cy.contains('Enter a bank name').should('be.visible')

  })





//Тест 12. Создание дубликата банковского счета с существующими реквизитами (успешно создан, в UI это видно, но в апи не проверял)
  it('12. 12. should allow creating duplicate bank accounts', () => {

 cy.task('db:seed') // удалить все тестовые данные/сброс БД до исходного состояния

 // Создать банк
  cy.loginpavel('Reyes.Osinski', 's3cret')

cy.get('[data-test="sidenav-bankaccounts"]').click()
cy.get('[data-test="bankaccount-new"]')
  .click({ force: true })

    cy.get('[name="bankName"]').type('Rosenbaum, Dach and Goyette Bank')
    cy.get('[name="accountNumber"]').type('7151213986')
    cy.get('[name="routingNumber"]').type('956968094')
    cy.get('[data-test="bankaccount-submit"]').click()


 //// Проверить, что в списке отображаются 2 банковских счета с одинаковыми реквизитами
   cy.get('[data-test="bankaccount-list"] p')
  .filter((index, el) => el.innerText === 'Rosenbaum, Dach and Goyette Bank')
  .should('have.length', 2)

 })





 //Тест 13. Проверка скрыта ли кнопка удаления для уже удаленного счета
it('13.should hide delete action after bank account is deleted', () => {

 cy.task('db:seed') // удалить все тестовые данные/сброс БД до исходного состояния

 // Создать банк
  cy.loginpavel('Reyes.Osinski', 's3cret')

cy.get('[data-test="sidenav-bankaccounts"]').click()
cy.get('[data-test="bankaccount-new"]')
  .click({ force: true })

    cy.get('[name="bankName"]').type('Test Bank')
    cy.get('[name="accountNumber"]').type('123456789')
    cy.get('[name="routingNumber"]').type('987654321')
    cy.get('[data-test="bankaccount-submit"]').click()


 //Проверить что банк создан
 cy.contains('Test Bank').should('be.visible') 


//Удалить созданный банк 
cy.get('[data-test="sidenav-bankaccounts"]').click()
cy.contains('Test Bank')
  .parents('li')
  .find('[data-test="bankaccount-delete"]').click()

 //Проверить что банк удален
 cy.contains('Test Bank')
  .parents('li')
  .should('contain', 'Deleted')

//Попытка повторного удаления
  cy.contains('Test Bank')
  .parents('li')
  .find('[data-test="bankaccount-delete"]')
  .should('not.exist')
  
 })



 //Тест 14. Проверка сохранения после исправления ошибок
it('14.should create a bank account after correcting validation errors', () => {

 cy.task('db:seed') // удалить все тестовые данные/сброс БД до исходного состояния

   // Логин
   cy.loginpavel('Reyes.Osinski', 's3cret')


  // Создать банк -  заполнение формы нвалидными данными
     cy.get('[data-test="sidenav-bankaccounts"]').click()
     cy.get('[data-test="bankaccount-new"]').click({ force: true })

     cy.get('[name="bankName"]').type('Test Bank')
     cy.get('[name="routingNumber"]').type('12345')
     cy.get('[name="accountNumber"]').type('1234567')  
    

    // проверка что появляются сообщения об ошибках
      cy.get('[data-test="bankaccount-submit"]').should('be.disabled')
      cy.contains('Must contain a valid routing number').should('be.visible')
      cy.contains('Must contain at least 9 digits').should('be.visible')

    // исправление ошибок в форме
     cy.get('[name="routingNumber"]').type('6789')
     cy.get('[name="accountNumber"]').type('890')  

    // проверка что сообщения об ошибках исчезли
     cy.contains('Must contain a valid routing number').should('not.exist')
     cy.contains('Must contain at least 9 digits').should('not.exist')


     // проверка что кнопка стала активной и создание банка
     cy.get('[data-test="bankaccount-submit"]').should('be.enabled').click()


   //Проверка что банк создан
   cy.contains('Test Bank').should('be.visible') 
  
 })