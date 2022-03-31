import { useEffect, useReducer, createContext, useContext } from 'react';
import BasketDisplay from './BasketDisplay';
import ProductsList from './ProductsList';

export const BasketDispatchContext = createContext(null);

export function useBasketDispatchContext() {
  return useContext(BasketDispatchContext);
}

export default function Shop() {
  const [basket, basketDispatch] = useReducer(
	basketReducer,
	null, // Startwert für basket, wenn keine Funktion an dritter Stelle folgt
	getInitialBasket // Optional: Funktion, die den Startwert zurückgibt
  );

  useEffect(
	() => localStorage.setItem('basket', JSON.stringify(basket)),
	[basket]
  );

  return (
	<div className="shop">
  	<BasketDispatchContext.Provider value={basketDispatch}>
    	<ProductsList />
    	<BasketDisplay basket={basket}/>
  	</BasketDispatchContext.Provider>
	</div>
  );
}

function basketReducer(basket, message) {
  const productNotInBasket = !basket.some(({ id }) => id === message.id);

  switch (message.type) {
	/*
	basket enthält den aktuellen state. Dieser sollte nie
	direkt manipuliert werden, etwa mit basket.push(), sondern
	stattdessen sollte man aus der Reducer-Funktion einen
	veränderte Kopie des states zurückgeben. Stichwort "Immutability",
	d.h. "Mutationen" von Daten vermeiden und stattdessen
	veränderte Kopien verwenden.
	Dadurch kann z.B. React sicherer erkennen, dass der neue State
	ein neues Objekt ist, und ein erneutes Rendern auslösen. Bei
	tief verschachtelten Objekten wäre die Unterscheidung sonst
	eventuell falsch, weil React den alten und neuen State nur
	oberflächlich ("shallow") vergleicht.
	*/

	case 'add':
  	if (productNotInBasket) {
    	return [...basket, { id: message.id, amount: 1 }];

    	/*     	basket.push({ id: message.id, amount: 1 });
    	return basket; */
  	}

  	return basket.map((product) => {
    	/* Um Mutationen des Original-Arrays bzw. des Objektes im
      	Original-Array zu vermeiden, nutzen wir Objekt-Spread,
       	um eine veränderte Kopie des Produkt-Objektes in den
       	neuen Array zu legen. */
    	if (product.id === message.id) {
      	// product.amount += 1;
      	return { id: product.id, amount: product.amount + 1 };
    	}

    	return product;
  	});

	case 'subtract':
  	return basket.map((product) => {
    	if (product.id === message.id) {
      	return {
        	id: product.id,
        	amount: product.amount - 1 < 0 ? 0 : product.amount - 1,
      	};
    	}
    	return product;
  	});

	case 'remove':
  	return basket.filter((product) => product.id !== message.id);

	case 'emptyBasket':
  	return [];
  }
}

function getInitialBasket() {
  const oldBasket = JSON.parse(localStorage.getItem('basket'));

  return Array.isArray(oldBasket) ? oldBasket : [];
}

/*

1. Der Button "Warenkorb leeren" soll funktionieren. Nutzt dafür
basketDispatch mit type "emptyBasket", und gebt dann aus basketReducer
einen leeren Array zurück.

2. Verbindet die Buttons in BasketItem mit dem Aufruf der dispatch-Funktion,
wobei type hier add, subtract und remove sein soll.
Mit subtract soll die Anzahl auf minimal 0 gesetzt werden können, ohne
dass das Produkt aus dem Warenkorb verschwindet.
Mit remove soll das Produkt komplett aus dem Warenkorb entfernt werden.

3. Bonus: Nutzt localStorage, JSON, getInitialBasketState und useEffect so zusammen,
dass der der Inhalt des Warenkorbes stets in localStorage gespeichert ist und
am Anfang bei ersten Laden wieder (wenn vorhanden) hergestellt wird.

*/
























