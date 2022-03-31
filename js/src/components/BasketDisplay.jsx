import BasketItem from './BasketItem';
import { useBasketDispatchContext } from './Shop';

export default function BasketDisplay({ basket }) {
  const basketIsEmpty = basket.length === 0;
  const basketDispatch = useBasketDispatchContext();

  return (
    <section className="basket">
      <h2 className="basket__heading">Warenkorb</h2>
      {basketIsEmpty && <strong>Warenkorb ist leer</strong>}
      {basketIsEmpty || (
        <>
          <ul className="basket__list">
            {basket.map((item) => (
              <BasketItem
                key={item.id}
                {...item}
              />
            ))}
          </ul>
          <button onClick={() => basketDispatch({ type: 'emptyBasket' })}>
            Warenkorb leeren
          </button>
        </>
      )}
    </section>
  );
}

/* 

1. Wenn man auf den button klickt, soll der komplette Warenkorb
geleert werden.
2. In ul soll für jeden Eintrag im basket eine BasketItem-Komponente
dargestellt werden.


*/
