describe('TodoMVC', () => {
  it('should add a todo', () => {
    cy.visit('http://localhost:3000/');

    cy.get('input.new-todo').type('Cheese {enter}');

    cy.get('.todo-list').find('li').should('have.length', 1);
  });
});
