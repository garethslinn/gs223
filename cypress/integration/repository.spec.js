/// <reference types="cypress" />

// Function to generate mock repository items
const generateMockRepositories = (num) => {
  const mockRepositories = [];
  for (let i = 1; i <= num; i++) {
    mockRepositories.push({
      id: i,
      full_name: `example/repo${i}`,
      description: `This is the example repo number ${i}`,
      owner: {
        avatar_url: `https://example.com/avatar${i}.png`,
        html_url: `https://github.com/example${i}`
      }
    });
  }
  return mockRepositories;
};

describe('Browse Github', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://api.github.com/search/repositories?q=javascript&sort=stars&per_page=10&page=1', {
      statusCode: 200,
      body: {
        items: generateMockRepositories(10),
        total_count: 30
      }
    }).as('getReposPage1');

    cy.intercept('GET', 'https://api.github.com/search/repositories?q=javascript&sort=stars&per_page=10&page=2', {
      statusCode: 200,
      body: {
        items: generateMockRepositories(10).map((repo, index) => ({
          ...repo,
          id: index + 11,
          full_name: `example/repo${index + 11}`,
          description: `This is the example repo number ${index + 11}`,
          owner: {
            avatar_url: `https://example.com/avatar${index + 11}.png`,
            html_url: `https://github.com/example${index + 11}`
          }
        })),
        total_count: 30
      }
    }).as('getReposPage2');

    cy.intercept('GET', 'https://api.github.com/search/repositories?q=javascript&sort=stars&per_page=10&page=3', {
      statusCode: 200,
      body: {
        items: generateMockRepositories(10).map((repo, index) => ({
          ...repo,
          id: index + 21,
          full_name: `example/repo${index + 21}`,
          description: `This is the example repo number ${index + 21}`,
          owner: {
            avatar_url: `https://example.com/avatar${index + 21}.png`,
            html_url: `https://github.com/example${index + 21}`
          }
        })),
        total_count: 30
      }
    }).as('getReposPage3');

    cy.visit('/');
  });

  it('should display the title', () => {
    cy.contains('Browse Github').should('be.visible');
  });

  it('should paginate repositories', () => {
    cy.wait('@getReposPage1');

    cy.get('button').contains('Next').click();

    cy.wait('@getReposPage2');
    for (let i = 11; i <= 20; i++) {
      cy.contains(`example/repo${i}`, { timeout: 10000 }).should('be.visible');
      cy.contains(`This is the example repo number ${i}`, { timeout: 10000 }).should('be.visible');
    }

    cy.get('button').contains('Next').click();

    cy.wait('@getReposPage3');
    for (let i = 21; i <= 30; i++) {
      cy.contains(`example/repo${i}`, { timeout: 10000 }).should('be.visible');
      cy.contains(`This is the example repo number ${i}`, { timeout: 10000 }).should('be.visible');
    }
  });

  it('should persist flag state across pagination and reset correctly', () => {
    cy.wait('@getReposPage1');

    cy.get('[data-testid="cross-icon"]').first().click();

    cy.get('button').contains('Next').click();
    cy.wait('@getReposPage2');

    cy.get('button').contains('Previous').click();
    cy.wait('@getReposPage1');

    cy.get('[data-testid="check-icon"]').first().should('be.visible');

    cy.get('[data-testid="check-icon"]').first().click();

    cy.get('button').contains('Next').click();
    cy.wait('@getReposPage2');

    cy.get('button').contains('Previous').click();
    cy.wait('@getReposPage1');

    cy.get('[data-testid="cross-icon"]').first().should('be.visible');
  });
});
