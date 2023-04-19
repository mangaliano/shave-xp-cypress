
import loginPage from '../support/pages/views/login'
import shaversPage from '../support/pages/views/shavers'

import data from '../fixtures/users-login.json'

describe('login', () => {

    context('quando submeto o formulario', () => {
        it('deve logar com sucesso', () => {
            const user = data.success
            cy.createUser(user)

            loginPage.submit(user.email, user.password)
            shaversPage.header.userShouldBeLoggedIn(user.name)
        })

        it('não deve logar com senha incorreta', () => {
            const user = data.invpass

            loginPage.submit(user.email, user.password)

            const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'
            loginPage.shared.noticeErrorShouldBe(message)
            
        })

        it('não deve logar com email não cadastrado', () => {
            const user = data.email404

            loginPage.submit(user.email, user.password)

            const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'
            loginPage.shared.noticeErrorShouldBe(message)
        })

        it('campos obrigatórios', () => {
            loginPage.submit()
            loginPage.requiredFields('E-mail é obrigatório', 'Senha é obrigatória')
        })
    })
})

context('senha muito curta', () => {

    data.shortpass.forEach((p) => {
        it(`não deve logar com a senha: ${p}`, () => {          //interpolação de string (só funciona com apóstrofo)
            loginPage.submit('man_fut2@hotmail.com', p)
            loginPage.shared.alertShouldBe('Pelo menos 6 caracteres')
        })
    })
})

context('email no formato incorreto', () => {
    data.invemails.forEach((e) => {
        it(`não deve logar com a senha: ${e}`, () => {          //interpolação de string (só funciona com apóstrofo)
            loginPage.submit(e, 'man030990')
            loginPage.shared.alertShouldBe('Informe um email válido')
        })
    })
})



// ESSE CONTEXTO FOI CRIADO PARA EXEMPLIFICAR UMA SITUAÇÃO ONDE SERIA NECESSÁRIO VALIDAR DIVERSOS CAMPOS OBRIGATÓRIOS EM UM FORMULÁRIO EXTENSO
//context('campos obrigatórios', () => {
//    beforeEach(() => {
//        loginPage.submit()
//    })
//    it('deve validar email', () => {
//        cy.get('.alert-error')
//            .should('have.length', 2)
//           .and(($small) => {
//                expect($small.get(0).textContent).to.equal('E-mail é obrigatório')
//            })
//        it('deve validar senha', () => {
//            cy.get('.alert-error')
//                .should('have.length', 2)
//                .and(($small) => {
//                    expect($small.get(1).textContent).to.equal('Senha é obrigatória')
//                })
//        })
//    })
//})
