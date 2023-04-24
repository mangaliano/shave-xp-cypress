describe('esqueci minha senha', () => {

    it('deve poder solicitar o resgate de senha', () => {

        const user = {
            name: 'Amanda Esquecida',
            email: 'amanda.esquecida@gmail.com',
            password: 'man030990',
            is_shaver: false
        }

        cy.createUser(user)

        cy.requestPassword(user.email)

        const message = 'Enviamos um e-mail para confirmar a recuperação de senha, verifique sua caixa de entrada.'
        cy.noticeSuccessShouldBe(message)
    })

    context('quando o usuário solicita resgate de senha', () => {

        const user = {
            name: 'Amanda Souza',
            email: 'amanda.souza@yahoo.com',
            password: 'man030990',
            is_shaver: false
        }

        beforeEach(()=> {
            cy.createUser(user)
            cy.recoveryPass(user.email)
            cy.getToken(user.email)
        })

        it('deve poder cadastrar uma nova senha', () => {
            cy.resetPassword(Cypress.env('passToken'), 'abc123', 'abc123')

            const message = 'Agora você já pode logar com a sua nova senha secreta.'
            cy.noticeSuccessShouldBe(message)
        })

        afterEach(()=> {
            cy.submitLogin(user.email, 'abc123')
            cy.userShouldBeLoggedIn(user.name)
        })
    })

})