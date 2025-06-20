import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingCartModel } from './shoppingCartModel';

describe('ShoppingCartModel', () => {

  it('should create an  empty instance', () => {
    expect(new ShoppingCartModel()).toBeTruthy();

  });

  it('should create an instance from realtimeDb data', () => {

    const kart = {
      dataAcquisto: "2017-09-16T09:49:13.587Z",
      fornitoreId: "fornitoreId",
      key: "key",
      items: [{
        categoriesKey: "categoriesKey",
        descrizione: "descrizione",
        note: "note",
        prezzo: 14,
        quantita: 0
      }],
      note: "note",

        sellerKey: "sellerKey",

    }
    expect(new ShoppingCartModel(kart)).toBeTruthy();
    expect(new ShoppingCartModel(kart).payments.length).toEqual(0);
  });



});
