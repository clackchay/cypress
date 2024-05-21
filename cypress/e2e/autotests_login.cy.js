import * as main_page from "../locators/main_page.json";
import * as recovery_password_page from "../locators/recovery_password_page.json"
import * as result_page from "../locators/result_page.json"
import * as data from "../helpers/default_data.json"

describe('Проверка авторизации', function () {

   beforeEach('Начало теста', function () {
         cy.visit('/');
         cy.get(main_page.fogot_pass_btn).should('have.css', 'color', 'rgb(0, 85, 152)');
           });

   afterEach('Конец теста', function () {
         cy.get(result_page.close).should('be.visible');
        });

    it('Восстановление пароля', function () {
        cy.get(main_page.fogot_pass_btn).click();
        cy.get(recovery_password_page.email).type(data.login);
        cy.get(recovery_password_page.send_button).click();
        cy.get(result_page.title).contains('Успешно отправили пароль на e-mail');
    })

    it('Верные логин и пароль', function () {
        cy.get(main_page.email).type(data.login);
        cy.get(main_page.password).type(data.password);
        cy.get(main_page.login_button).click();
        cy.get(result_page.title).should('be.visible').contains('Авторизация прошла успешно');
    })

    it('Неверный логин и верный пароль', function () {
        cy.get(main_page.email).type(data.wronglogin);
        cy.get(main_page.password).type(data.password);
        cy.get(main_page.login_button).click();
        cy.get(result_page.title).should('be.visible').contains('Такого логина или пароля нет');
    })

    it('Верный логин и неверный пароль', function () {
        cy.get(main_page.email).type(data.login);
        cy.get(main_page.password).type(data.wrongpassword);
        cy.get(main_page.login_button).click();
        cy.get(result_page.title).should('be.visible').contains('Такого логина или пароля нет');
    })

    it('Валидация на наличие @', function () {
        cy.get(main_page.email).type(data.loginnoa);
        cy.get(main_page.password).type(data.password);
        cy.get(main_page.login_button).click();
        cy.get(result_page.title).should('be.visible').contains('Нужно исправить проблему валидации');
    })

    it('Проверка приведения логина к строчным буквам', function () {
      cy.get(main_page.email).type(data.logincapitalletters); // Ввожу логин с заглавными буквами
      cy.get(main_page.password).type(data.password); // Ввожу правильный пароль
      cy.get(main_page.login_button).click(); // Нажимаю войти
      cy.get(result_page.title).should('be.visible').contains('Авторизация прошла успешно');
    })  
})
