//Тест 1. Проверка отображения навигации по транзакциям и работы фильтра по датам
it('1. should navigate transaction feeds and filter personal transactions by date range', () => {

 cy.task('db:seed') // удалить все тестовые данные/сброс БД до исходного состояния

  cy.loginpavel('Reyes.Osinski', 's3cret')

//1.1 Добавление транзакции
cy.get('[data-test="nav-top-new-transaction"]').click()
  cy.contains('Ted Parisian').click()
 cy.get('[name="amount"]').type('50')
 cy.get('#transaction-create-description-input').type('Other')
 cy.get('[data-test="transaction-create-submit-request"]').click()
 cy.contains('Transaction Submitted!').should('be.visible')
 cy.contains('Requested $50.00 for Other').should('be.visible')


//1.2 Проверка отображения навигации по транзакциям 
  cy.get('[data-test="sidenav-home"]').click()
  cy.contains('Public').should('be.visible')

    cy.get('[data-test="nav-contacts-tab"]').click()
  cy.contains('Contacts').should('be.visible')

  cy.get('[data-test="nav-personal-tab"]').click()
  cy.contains('Personal').should('be.visible')


  //1.3 Проверка работы фильтра по Дате в личных транзакциях
  cy.intercept('GET', '**/transactions*').as('filterTransactions')
cy.get('[data-test="transaction-list-filter-date-range-button"]').click()
cy.get('.react-calendar__tile--now')
  .click()
  .click()

  cy.wait('@filterTransactions')
  .its('response.statusCode')
  .should('eq', 200)

  cy.get('[data-test^="transaction-item-"]').should('have.length', 1)
  cy.contains('requested Ted Parisian').should('be.visible')
  cy.contains('$50.00').should('be.visible')



 //1.4 Сброс фильтра по Дате и проверка обновления ленты
 cy.intercept('GET', '/transactions*').as('transactions')

   cy.get('[data-test="transaction-list-filter-date-clear-button"]').click()

   cy.wait('@transactions')

   cy.get('[data-test^="transaction-item-"]').should('have.length.greaterThan', 1)

 })



//Тест 2. Проверка работы фильтра по сумме в транзакциях
it('2. should filter personal transactions by amount range', () => {

  cy.task('db:seed') // удалить все тестовые данные/сброс БД до исходного состояния

  cy.loginpavel('Reyes.Osinski', 's3cret')


  //2.1 Проверка работы фильтра по сумме 
  cy.setTransactionAmountRange(0, 50)

  cy.contains('$36.56').should('be.visible')


  //2.2 Сброс фильтра по сумме и проверка обновления ленты
cy.intercept('GET', '**/transactions/public*').as('transactions')

cy.get('[data-test="transaction-list-filter-amount-clear-button"]')
  .click()

cy.get('[data-test="transaction-list-filter-amount-range-text"]')
  .should('contain', '$0 - $1,000')

})



//Тест 3. Проверка отображения пустого результата при выборе диапазона дат без транзакций
it('3. should display "No Transactions" when no transactions match the selected date range', () => {

  cy.task('db:seed') // удалить все тестовые данные/сброс БД до исходного состояния

  cy.loginpavel('Reyes.Osinski', 's3cret')


  //// Выбор сегодняшнего дня как начала и конца диапазона
      cy.get('[data-test="transaction-list-filter-date-range-button"]').click()
      cy.get('.react-calendar__tile--now')
      .click()
      .click()

     cy.contains('No Transactions').should('be.visible')
  
})




//Тест 4. Проверка работы фильтра по сумме на граничных значениях диапазона
it('4. should filter personal transactions using boundary amount value', () => {

  cy.task('db:seed') // удалить все тестовые данные/сброс БД до исходного состояния

  cy.loginpavel('Reyes.Osinski', 's3cret')



  //Создание перевода
cy.get('[data-test="nav-top-new-transaction"]').click()
  cy.contains('Ted Parisian').click()
 cy.get('[name="amount"]').type('101')
 cy.get('#transaction-create-description-input').type('Other')
 cy.get('[data-test="transaction-create-submit-payment"]').click()
 cy.contains('Transaction Submitted!').should('be.visible')
 cy.contains('Paid $101.00 for Other').should('be.visible')


 //Переход в раздел личных переводов
 cy.get('[data-test="sidenav-home"]').click()
     cy.get('[data-test="nav-personal-tab"]').click()
     cy.contains('Ruthie Prosacco paid Ted Parisian').should('be.visible')

  //Выбор граничного значения в фильтре
  cy.setTransactionAmountRange(101, 101)
  cy.get('[data-test="transaction-list-filter-amount-range-text"]')
  .should('contain', '$101 - $101')
  cy.contains('No Transactions').should('be.visible')
  
})



//Тест 5. Проверка комбинированной фильтрации личных транзакций по дате и диапазону суммы
it('5. should filter personal transactions using date and amount filters', () => {

  cy.task('db:seed') // удалить все тестовые данные/сброс БД до исходного состояния

  cy.loginpavel('Reyes.Osinski', 's3cret')


  //Создание перевода №1
cy.get('[data-test="nav-top-new-transaction"]').click()
  cy.contains('Ted Parisian').click()
 cy.get('[name="amount"]').type('801')
 cy.get('#transaction-create-description-input').type('Other')
 cy.get('[data-test="transaction-create-submit-payment"]').click()
 cy.contains('Transaction Submitted!').should('be.visible')
 cy.contains('Paid $801.00 for Other').should('be.visible')


   //Создание перевода №2
cy.get('[data-test="new-transaction-create-another-transaction"]').click()
  cy.contains('Kristian Bradtke').click()
 cy.get('[name="amount"]').type('805')
 cy.get('#transaction-create-description-input').type('Other')
 cy.get('[data-test="transaction-create-submit-payment"]').click()
 cy.contains('Transaction Submitted!').should('be.visible')
 cy.contains('Paid $805.00 for Other').should('be.visible')


 //Переход в раздел личных переводов
 cy.get('[data-test="sidenav-home"]').click()
     cy.get('[data-test="nav-personal-tab"]').click()
     cy.contains('Ruthie Prosacco paid Ted Parisian').should('be.visible')


    // Выбор сегодняшнего дня как начала и конца диапазона
      cy.get('[data-test="transaction-list-filter-date-range-button"]').click()
      cy.get('.react-calendar__tile--now')
      .click()
      .click()


  //Выбор суммы в фильтре
  cy.setTransactionAmountRange(800, 810)
  cy.get('[data-test="transaction-list-filter-amount-range-text"]')
  .should('contain', '$800 - $810')

  cy.get('[data-test^="transaction-item-"]').should('have.length', 2)
  cy.contains('Ruthie Prosacco paid Kristian Bradtke').should('be.visible')
  cy.contains('Ruthie Prosacco paid Ted Parisian').should('be.visible')
  
})




//Тест 6. Проверка сброса фильтров после обновления страницы
it('6. should reset date and amount filters after page reload', () => {

  cy.task('db:seed') // удалить все тестовые данные/сброс БД до исходного состояния

  cy.loginpavel('Reyes.Osinski', 's3cret')


  // Выбор сегодняшнего дня как начала и конца диапазона
      cy.get('[data-test="transaction-list-filter-date-range-button"]').click()
      cy.get('.react-calendar__tile--now')
      .click()
      .click()


  //Выбор суммы в фильтре
  cy.setTransactionAmountRange(100, 500)
  cy.get('[data-test="transaction-list-filter-amount-range-text"]')
  .should('contain', '$100 - $500')

  cy.reload()
    cy.get('[data-test="transaction-list-filter-amount-range-button"]').should('contain', 'Amount: $0 - $1,000')
    cy.get('[data-test="transaction-list-filter-date-range-button"]').should('contain', 'Date: ALL')
  
})