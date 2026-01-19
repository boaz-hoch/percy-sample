describe('Percy Sample NX App', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('Home Page', () => {
    it('should display the app title', () => {
      cy.get('[data-testid="app-title"]').should('contain', 'Percy Sample NX App');
    });

    it('should display welcome message on home page', () => {
      cy.get('[data-testid="home-page"]').should('be.visible');
      cy.get('[data-testid="home-page"]').should('contain', 'Welcome to Percy Sample NX App');
    });

    it('should have navigation links', () => {
      cy.get('[data-testid="home-link"]').should('be.visible');
      cy.get('[data-testid="counter-link"]').should('be.visible');
      cy.get('[data-testid="todos-link"]').should('be.visible');
      cy.get('[data-testid="contact-link"]').should('be.visible');
    });
  });

  describe('Counter Page', () => {
    beforeEach(() => {
      cy.get('[data-testid="counter-link"]').click();
    });

    it('should display counter with initial value of 0', () => {
      cy.get('[data-testid="counter-value"]').should('contain', 'Count: 0');
    });

    it('should increment counter when increment button is clicked', () => {
      cy.get('[data-testid="increment-btn"]').click();
      cy.get('[data-testid="counter-value"]').should('contain', 'Count: 1');
      cy.get('[data-testid="increment-btn"]').click();
      cy.get('[data-testid="counter-value"]').should('contain', 'Count: 2');
    });

    it('should decrement counter when decrement button is clicked', () => {
      cy.get('[data-testid="decrement-btn"]').click();
      cy.get('[data-testid="counter-value"]').should('contain', 'Count: -1');
      cy.get('[data-testid="decrement-btn"]').click();
      cy.get('[data-testid="counter-value"]').should('contain', 'Count: -2');
    });

    it('should reset counter to 0 when reset button is clicked', () => {
      cy.get('[data-testid="increment-btn"]').click();
      cy.get('[data-testid="increment-btn"]').click();
      cy.get('[data-testid="increment-btn"]').click();
      cy.get('[data-testid="counter-value"]').should('contain', 'Count: 3');
      cy.get('[data-testid="reset-btn"]').click();
      cy.get('[data-testid="counter-value"]').should('contain', 'Count: 0');
    });
  });

  describe('Todo List Page', () => {
    beforeEach(() => {
      cy.get('[data-testid="todos-link"]').click();
    });

    it('should display todo list with empty state', () => {
      cy.get('[data-testid="todo-input"]').should('be.visible');
      cy.get('[data-testid="add-todo-btn"]').should('be.visible');
      cy.get('[data-testid="todo-list"]').children().should('have.length', 0);
    });

    it('should add a new todo item', () => {
      cy.get('[data-testid="todo-input"]').type('Buy groceries');
      cy.get('[data-testid="add-todo-btn"]').click();
      cy.get('[data-testid="todo-list"]').children().should('have.length', 1);
      cy.get('[data-testid="todo-item-0"]').should('contain', 'Buy groceries');
    });

    it('should add multiple todo items', () => {
      cy.get('[data-testid="todo-input"]').type('Buy groceries');
      cy.get('[data-testid="add-todo-btn"]').click();
      cy.get('[data-testid="todo-input"]').type('Walk the dog');
      cy.get('[data-testid="add-todo-btn"]').click();
      cy.get('[data-testid="todo-input"]').type('Read a book');
      cy.get('[data-testid="add-todo-btn"]').click();

      cy.get('[data-testid="todo-list"]').children().should('have.length', 3);
      cy.get('[data-testid="todo-item-0"]').should('contain', 'Buy groceries');
      cy.get('[data-testid="todo-item-1"]').should('contain', 'Walk the dog');
      cy.get('[data-testid="todo-item-2"]').should('contain', 'Read a book');
    });

    it('should add todo by pressing Enter', () => {
      cy.get('[data-testid="todo-input"]').type('Press Enter to add{enter}');
      cy.get('[data-testid="todo-list"]').children().should('have.length', 1);
      cy.get('[data-testid="todo-item-0"]').should('contain', 'Press Enter to add');
    });

    it('should remove a todo item', () => {
      cy.get('[data-testid="todo-input"]').type('Buy groceries');
      cy.get('[data-testid="add-todo-btn"]').click();
      cy.get('[data-testid="todo-input"]').type('Walk the dog');
      cy.get('[data-testid="add-todo-btn"]').click();

      cy.get('[data-testid="todo-list"]').children().should('have.length', 2);
      cy.get('[data-testid="remove-todo-0"]').click();
      cy.get('[data-testid="todo-list"]').children().should('have.length', 1);
      cy.get('[data-testid="todo-item-0"]').should('contain', 'Walk the dog');
    });

    it('should not add empty todo items', () => {
      cy.get('[data-testid="add-todo-btn"]').click();
      cy.get('[data-testid="todo-list"]').children().should('have.length', 0);
      cy.get('[data-testid="todo-input"]').type('   ');
      cy.get('[data-testid="add-todo-btn"]').click();
      cy.get('[data-testid="todo-list"]').children().should('have.length', 0);
    });
  });

  describe('Contact Form Page', () => {
    beforeEach(() => {
      cy.get('[data-testid="contact-link"]').click();
    });

    it('should display contact form', () => {
      cy.get('[data-testid="contact-form"]').should('be.visible');
      cy.get('[data-testid="name-input"]').should('be.visible');
      cy.get('[data-testid="email-input"]').should('be.visible');
      cy.get('[data-testid="message-input"]').should('be.visible');
      cy.get('[data-testid="submit-btn"]').should('be.visible');
    });

    it('should submit contact form with valid data', () => {
      cy.get('[data-testid="name-input"]').type('John Doe');
      cy.get('[data-testid="email-input"]').type('john@example.com');
      cy.get('[data-testid="message-input"]').type('This is a test message');
      cy.get('[data-testid="submit-btn"]').click();

      cy.get('[data-testid="success-message"]').should('be.visible');
      cy.get('[data-testid="success-message"]').should('contain', 'Thank you, John Doe!');
    });

    it('should validate required fields', () => {
      cy.get('[data-testid="submit-btn"]').click();
      cy.get('[data-testid="name-input"]').should('have.attr', 'required');
      cy.get('[data-testid="email-input"]').should('have.attr', 'required');
      cy.get('[data-testid="message-input"]').should('have.attr', 'required');
    });

    it('should validate email format', () => {
      cy.get('[data-testid="email-input"]').should('have.attr', 'type', 'email');
    });
  });

  describe('Navigation', () => {
    it('should navigate between pages', () => {
      cy.get('[data-testid="home-page"]').should('be.visible');

      cy.get('[data-testid="counter-link"]').click();
      cy.get('[data-testid="counter-value"]').should('be.visible');

      cy.get('[data-testid="todos-link"]').click();
      cy.get('[data-testid="todo-input"]').should('be.visible');

      cy.get('[data-testid="contact-link"]').click();
      cy.get('[data-testid="contact-form"]').should('be.visible');

      cy.get('[data-testid="home-link"]').click();
      cy.get('[data-testid="home-page"]').should('be.visible');
    });
  });
});
