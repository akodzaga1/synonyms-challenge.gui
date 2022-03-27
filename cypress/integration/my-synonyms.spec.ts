describe('Full Workflow Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('https://synonyms-challenge.netlify.app/')
    cy.contains('Synonyms collection')
  })
  it('Open form for adding', () => {
    cy.get("[data-test=btn-add-new]").click()
    cy.contains('Add new synonyms')
  })
  it('Add first group of synonyms', () => {
    cy.get("[data-test=input-field]").eq(0).type("synonymA")
    cy.get("[data-test=input-field]").eq(1).type("synonymB")
    cy.get("[data-test=submit-add-new]").click()
    cy.get("[data-test=snack-bar]").should('exist')
    cy.contains('Synonyms successfully added!')
    cy.wait(6000);
    cy.get("[data-test=snack-bar]").should('not.exist')
  })
  it('Add second group of synonyms', () => {
    cy.get("[data-test=input-field]").eq(0).type("synonymB")
    cy.get("[data-test=input-field]").eq(1).type("synonymC")
    cy.get("[data-test=submit-add-new]").click()
    cy.get("[data-test=snack-bar]").should('exist')
    cy.contains('Synonyms successfully added!')
    cy.get("[data-test=btn-close-snack]").click()
    cy.get("[data-test=snack-bar]").should('not.exist')
  })
  it('Add third group of synonyms', () => {
    cy.get("[data-test=input-field]").eq(0).type("synonymC")
    cy.get("[data-test=input-field]").eq(1).type("synonymD")
    cy.get("[data-test=submit-add-new]").click()
    cy.get("[data-test=snack-bar]").should('exist')
    cy.contains('Synonyms successfully added!')
    cy.get("[data-test=btn-close-snack]").click()
    cy.get("[data-test=snack-bar]").should('not.exist')
  })
  it('Add fourth group of synonyms', () => {
    cy.get("[data-test=input-field]").eq(0).type("synonymE")
    cy.get("[data-test=input-field]").eq(1).type("synonymF")
    cy.get("[data-test=submit-add-new]").click()
    cy.get("[data-test=snack-bar]").should('exist')
    cy.contains('Synonyms successfully added!')
    cy.get("[data-test=btn-close-snack]").click()
    cy.get("[data-test=snack-bar]").should('not.exist')
  })
  it('Add fifth group of synonyms', () => {
    cy.get("[data-test=input-field]").eq(0).type("synonymG")
    cy.get("[data-test=input-field]").eq(1).type("synonymH")
    cy.get("[data-test=btn-add-input]").click()
    cy.get("[data-test=btn-add-input]").click()
    cy.get("[data-test=input-field]").eq(2).focus()
    cy.get("[data-test=input-field]").eq(3).focus()
    cy.contains('Word is required.')
    cy.get("[data-test=input-field]").eq(2).type("synonymI")
    cy.get("[data-test=input-field]").eq(3).type("synonymJ")
    cy.get("[data-test=btn-delete-input]").eq(1).click()
    cy.get("[data-test=submit-add-new]").click()
    cy.get("[data-test=snack-bar]").should('exist')
    cy.contains('Synonyms successfully added!')
    cy.get("[data-test=btn-close-snack]").click()
    cy.get("[data-test=snack-bar]").should('not.exist')
  })
  it('Exit form for adding', () => {
    cy.get("[data-test=btn-close]").click()
    cy.contains('Synonyms collection')
  })
  it('Open form for searching', () => {
    cy.get("[data-test=btn-search]").click()
    cy.contains('Search synonyms')
  })
  it('Search my synonyms for synonymA', () => {
    cy.get("[data-test=input-search]").type("synonymA")
    cy.get("[data-test=submit-my-syn]").click()
    cy.wait(5000)
    cy.contains('synonymB')
    cy.contains('synonymC')
    cy.contains('synonymD')
    cy.contains('Found 3 synonyms for synonymA:')
  })
  it('Search my synonyms for synonymB', () => {
    cy.get("[data-test=input-search]").clear().type("synonymB")
    cy.get("[data-test=submit-my-syn]").click()
    cy.wait(5000)
    cy.contains('synonymA')
    cy.contains('synonymC')
    cy.contains('synonymD')
    cy.contains('Found 3 synonyms for synonymB:')
  })
  it('Search my synonyms for synonymC', () => {
    cy.get("[data-test=input-search]").clear().type("synonymC")
    cy.get("[data-test=submit-my-syn]").click()
    cy.wait(5000)
    cy.contains('synonymA')
    cy.contains('synonymB')
    cy.contains('synonymD')
    cy.contains('Found 3 synonyms for synonymC:')
  })
  it('Search my synonyms for synonymD', () => {
    cy.get("[data-test=input-search]").clear().type("synonymD")
    cy.get("[data-test=submit-my-syn]").click()
    cy.wait(5000)
    cy.contains('synonymA')
    cy.contains('synonymB')
    cy.contains('synonymC')
    cy.contains('Found 3 synonyms for synonymD:')
  })
  it('Search my synonyms for synonymE', () => {
    cy.get("[data-test=input-search]").clear().type("synonymE")
    cy.get("[data-test=submit-my-syn]").click()
    cy.wait(5000)
    cy.contains('synonymF')
    cy.contains('Found 1 synonym for synonymE:')
  })
  it('Search my synonyms for synonymF', () => {
    cy.get("[data-test=input-search]").clear().type("synonymF")
    cy.get("[data-test=submit-my-syn]").click()
    cy.wait(5000)
    cy.contains('synonymE')
    cy.contains('Found 1 synonym for synonymF:')
  })
  it('Search all synonyms for synonymA', () => {
    cy.get("[data-test=input-search]").clear().type("synonymA")
    cy.get("[data-test=submit-all-syn]").click()
    cy.wait(5000)
    cy.contains('synonymB')
    cy.contains('Found 1 synonym for synonymA:')
  })
  it('Show more level 1 for synonymA', () => {
    cy.get("[data-test=btn-show-more]").click()
    cy.wait(5000)
    cy.contains('synonymB')
    cy.contains('synonymC')
    cy.contains('Found 2 synonyms for synonymA:')
  })
  it('Show more level 2 for synonymA', () => {
    cy.get("[data-test=btn-show-more]").click()
    cy.wait(5000)
    cy.contains('synonymB')
    cy.contains('synonymC')
    cy.contains('synonymD')
    cy.contains('Found 3 synonyms for synonymA:')
    cy.get("[data-test=btn-show-more]").should('not.exist')
    cy.get("[data-test=btn-show-all]").should('not.exist')
  })
  it('Search all synonyms for synonymA', () => {
    cy.get("[data-test=input-search]").clear().type("synonymA")
    cy.get("[data-test=submit-all-syn]").click()
    cy.wait(5000)
    cy.contains('synonymB')
    cy.contains('Found 1 synonym for synonymA:')
  })
  it('Show all level 1 for synonymA', () => {
    cy.get("[data-test=btn-show-all]").click()
    cy.wait(5000)
    cy.contains('synonymB')
    cy.contains('synonymC')
    cy.contains('synonymD')
    cy.contains('Found 3 synonyms for synonymA:')
    cy.get("[data-test=btn-show-more]").should('not.exist')
    cy.get("[data-test=btn-show-all]").should('not.exist')
  })
  it('Search all synonyms for synonymB', () => {
    cy.get("[data-test=input-search]").clear().type("synonymB")
    cy.get("[data-test=submit-all-syn]").click()
    cy.wait(5000)
    cy.contains('synonymA')
    cy.contains('synonymC')
    cy.contains('Found 2 synonyms for synonymB:')
  })
  it('Show more level 1 for synonymB', () => {
    cy.get("[data-test=btn-show-more]").click()
    cy.wait(5000)
    cy.contains('synonymA')
    cy.contains('synonymC')
    cy.contains('synonymD')
    cy.contains('Found 3 synonyms for synonymB:')
    cy.get("[data-test=btn-show-more]").should('not.exist')
    cy.get("[data-test=btn-show-all]").should('not.exist')
  })
  it('Search all synonyms for synonymB', () => {
    cy.get("[data-test=input-search]").clear().type("synonymB")
    cy.get("[data-test=submit-all-syn]").click()
    cy.wait(5000)
    cy.contains('synonymA')
    cy.contains('synonymC')
    cy.contains('Found 2 synonyms for synonymB:')
  })
  it('Show all level 1 for synonymB', () => {
    cy.get("[data-test=btn-show-all]").click()
    cy.wait(5000)
    cy.contains('synonymA')
    cy.contains('synonymC')
    cy.contains('synonymD')
    cy.contains('Found 3 synonyms for synonymB:')
    cy.get("[data-test=btn-show-more]").should('not.exist')
    cy.get("[data-test=btn-show-all]").should('not.exist')
  })
  it('Search all synonyms for synonymC', () => {
    cy.get("[data-test=input-search]").clear().type("synonymC")
    cy.get("[data-test=submit-all-syn]").click()
    cy.wait(5000)
    cy.contains('synonymB')
    cy.contains('synonymD')
    cy.contains('Found 2 synonyms for synonymC:')
  })
  it('Search all synonyms for synonymD', () => {
    cy.get("[data-test=input-search]").clear().type("synonymD")
    cy.get("[data-test=submit-all-syn]").click()
    cy.wait(5000)
    cy.contains('synonymC')
    cy.contains('Found 1 synonym for synonymD:')
  })
  it('Search all synonyms for synonymE', () => {
    cy.get("[data-test=input-search]").clear().type("synonymE")
    cy.get("[data-test=submit-all-syn]").click()
    cy.wait(5000)
    cy.contains('synonymF')
    cy.contains('Found 1 synonym for synonymE:')
    cy.get("[data-test=btn-show-more]").should('not.exist')
    cy.get("[data-test=btn-show-all]").should('not.exist')
  })
  it('Search all synonyms for synonymF', () => {
    cy.get("[data-test=input-search]").clear().type("synonymF")
    cy.get("[data-test=submit-all-syn]").click()
    cy.wait(5000)
    cy.contains('synonymE')
    cy.contains('Found 1 synonym for synonymF:')
    cy.get("[data-test=btn-show-more]").should('not.exist')
    cy.get("[data-test=btn-show-all]").should('not.exist')
  })
  it('Search my synonyms for testSynonym', () => {
    cy.get("[data-test=input-search]").clear().type("testSynonym")
    cy.get("[data-test=submit-my-syn]").click()
    cy.wait(5000)
    cy.contains('No synonyms for that word')
    cy.wait(6000);
    cy.get("[data-test=snack-bar]").should('not.exist')
    cy.get("[data-test=result-span]").should('not.exist')
  })
  it('Search all synonyms for testSynonym', () => {
    cy.get("[data-test=input-search]").clear().type("testSynonym")
    cy.get("[data-test=submit-all-syn]").click()
    cy.wait(5000)
    cy.contains('No synonyms for that word')
    cy.get("[data-test=btn-close-snack]").click()
    cy.get("[data-test=snack-bar]").should('not.exist')
    cy.get("[data-test=btn-show-more]").should('not.exist')
    cy.get("[data-test=btn-show-all]").should('not.exist')
    cy.get("[data-test=result-span]").should('not.exist')
  })
  it('Check last group of synonyms', () => {
    cy.get("[data-test=input-search]").clear().type("synonymH")
    cy.get("[data-test=submit-my-syn]").click()
    cy.wait(5000)
    cy.contains('synonymG')
    cy.contains('synonymI')
    cy.contains('Found 2 synonyms for synonymH:')
  })
  it('Exit form for searching', () => {
    cy.get("[data-test=btn-close]").click()
    cy.contains('Synonyms collection')
  })
})