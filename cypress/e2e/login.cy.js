import loginPage from '../support/pages/login'
import shaversPage from '../support/pages/shavers'


describe('login', () => {

    context('quando submeto o formulario', () => {

        it('deve logar com sucesso', () => {
            const user = {
                name: 'Amanda',
                email: 'man_fut2@hotmail.com',
                password: 'man030990'
            }

            loginPage.submit(user.email, user.password)
            shaversPage.header.userShouldLoggedIn(user.name)
        })

        it('não deve logar com senha incorreta', () => {
            const user = {
                name: 'Amanda',
                email: 'man_fut2@hotmail.com',
                password: 'man123456'
            }

            loginPage.submit(user.email, user.password)

            const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'

            loginPage.noticeShouldBe(message)
        })

        it('não deve logar com email não cadastrado', () => {
            const user = {
                name: 'Amanda',
                email: 'amanda@404.com',
                password: 'man123456'
            }

            loginPage.submit(user.email, user.password)

            const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'

            loginPage.noticeShouldBe(message)
        })

        it('campos obrigatórios', () => {
            loginPage.submit()
            loginPage.requiredFields('E-mail é obrigatório', 'Senha é obrigatória')
        })
    })
})

context('senha muito curta', () => {
    const passwords = [
        '1',
        '12',
        '123',
        '1234',
        '12345'
    ]

    passwords.forEach((p) => {
        it(`não deve logar com a senha: ${p}`, () => {          //interpolação de string (só funciona com apóstrofo)
            loginPage.submit('man_fut2@hotmail.com', p)
            loginPage.alertShouldBe('Pelo menos 6 caracteres')
        })
    })
})

context('email no formato incorreto', () => {
    const emails = [
        'amanda&gmail.com',
        'amanda.com.br',
        '@gmail.com',
        '@',
        'amanda@',
        '12314523',
        '$#%#)&%)#&',
        'xpto123'
    ]

    emails.forEach((e) => {
        it(`não deve logar com a senha: ${e}`, () => {          //interpolação de string (só funciona com apóstrofo)
            loginPage.submit('e', 'man030990')
            loginPage.alertShouldBe('Informe um email válido')
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
