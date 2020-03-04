/// <reference types="Cypress" />

describe("test1", function() {
  it("提供面談時段,檢核職缺未選", function() {
    cy.visit("http://60.251.22.46/rp");

    cy.get("#UserID").type("033751");
    cy.get("#Password").type("1234");

    cy.contains("登入").click();

    cy.url().should("include", "/Common/ToDoList");

    cy.contains("預約面談").click();
    cy.contains("履歷挑選(三選一)").click();

    // test1 from github issue#136
    cy.wait(2000);
    cy.get(".mfp-iframe").then($iframe => {
      const $doc = $iframe.contents();
      cy.wrap($doc.find("#User")).type("033751");
      cy.wrap($doc.find("button")).click();
      //cy.wait(2000)
    });

    cy.wait(5000);
    cy.get(".mfp-iframe").then($iframe => {
      const $doc = $iframe.contents();
      cy.wrap($doc.find('label:contains("全選")')).click();
      cy.wrap($doc.find('label[for="ch1"]:eq(0)')).click();
      cy.wrap($doc.find('div.act:contains("提供面談時段")')).click();
    });

    cy.wait(3000);
    cy.get(".mfp-iframe").then($iframe => {
      var $doc = $iframe.contents();
      cy.wrap($doc.find('a:contains("確定")')).click();
      //cy.wait(1000)
      cy.wrap($doc.find("#Confirm .modal-body p")).should(
        "include.text",
        "請選擇職缺"
      );
    });
  });
});
