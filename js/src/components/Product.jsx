
import { getFormattedPrice } from '../helpers';
import { useBasketDispatchContext } from './Shop';

export default function Product({ title, image, price, sale, id }) {
  const cssClasses = `product ${sale ? 'product--sale' : ''}`;

  const basketDispatch = useBasketDispatchContext();

  return (
	<article className={cssClasses}>
  	<div className="product__image">{image}</div>
  	<h3 className="product__heading">{title}</h3>
  	<p className="product__price">{getFormattedPrice(price)}</p>
  	<button
    	onClick={() => basketDispatch({ type: 'add', id })}
    	aria-label={`${title} in den Warenkorb`}
  	>
    	Kaufen
  	</button>
	</article>
  );
}


