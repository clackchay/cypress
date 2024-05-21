import * as data from "../helpers/userdata_pokemons.json"

describe('Покупка аватара тренера', function () {

    it('Открыть сайт', function () {
         cy.visit('https://pokemonbattle.me');
         cy.wait(2000)
         cy.get(':nth-child(1) > .auth__input').type(data.login);
         cy.get('#password').type(data.password);
         cy.get('.auth__button').click(),
         cy.wait(2000),
         cy.get('.header__btns > [href="/shop"]').click();
         cy.get('.available > button').first().click();
         cy.get('.pay__payform-v2 > :nth-child(2) > .pay_base-input-v2').type('4111111111111111');
         cy.get(':nth-child(1) > .pay_base-input-v2').type('0529');
         cy.get('.pay-inputs-box > :nth-child(2) > .pay_base-input-v2').type('125');
         cy.get('.pay__input-box-last-of > .pay_base-input-v2').type('Kotik');
         cy.get('.pay-btn').click();
         cy.get('#cardnumber').type('56456');
         cy.get('.payment__submit-button').click();
         cy.contains('Покупка прошла успешно').should('be.visible')

    })
})