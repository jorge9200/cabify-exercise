import React from 'react'
import { ReactComponent as Close } from '../../assets/close.svg';
import RetinaImage from 'react-retina-image'

const ItemDetail = ({
  item,
  setItem
}) => (
  <React.Fragment>
    <section className='itemDetail-image'>
      <RetinaImage src={`/assets/productImages/${item.img}.jpg`} alt={item.name}/>
    </section>
    <aside className='itemDetail-description'>
      <Close className='itemDetail-close' onClick={() => setItem(null)}/>
      <section className='row-spaceBetween with-divider'>
        <h1>{item.name}</h1>
        <h1>{`${item.price}€`}</h1>
      </section>
      <p className='itemDetail-text with-divider'>
        {'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sodales semper elit sit amet interdum. Praesent volutpat sed elit vel consectetur. Nulla tempus tincidunt ex, sit amet semper ipsum imperdiet varius. In rutrum aliquam nisl, sagittis faucibus felis bibendum id.'}
      </p>
      <span className='itemDetail-code'>{`Product code ${item.code}`}</span>
      <button type="submit">
        {'Add to cart'}
      </button>
    </aside>
  </React.Fragment>
)

export default ItemDetail
