import React, { FC, useState } from 'react'
import cn from 'clsx'
import { Heart } from '@components/pages/icons'
import useAddItem from '@framework/wishlist/use-add-item'
import useCustomer from '@framework/customer/use-customer'
import useWishlist from '@framework/wishlist/use-wishlist'
import useRemoveItem from '@framework/wishlist/use-remove-item'
import s from './WishlistButton.module.css'
import type { Product, ProductVariant } from '@commerce/types/product'
import { useAppDispatch } from 'redux/hooks'
import { openModal, setModalView } from 'redux/Slices/uiSlice'

type Props = {
  productId: Product['id']
  variant: ProductVariant
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const WishlistButton: FC<Props> = ({
  productId,
  variant,
  className,
  ...props
}) => {
  const dispatch = useAppDispatch()
  const { data } = useWishlist()
  const addItem = useAddItem()
  const removeItem = useRemoveItem()
  const { data: customer } = useCustomer()
  const [loading, setLoading] = useState(false)

  const handleModal = () => dispatch(openModal())
  const handleModalView = () => dispatch(setModalView('LOGIN_VIEW'))
  // @ts-ignore Wishlist is not always enabled
  const itemInWishlist = data?.items?.find(
    // @ts-ignore Wishlist is not always enabled
    (item) => item.product_id === productId && item.variant_id === variant.id
  )

  const handleWishlistChange = async (e: any) => {
    e.preventDefault()

    if (loading) return

    // A login is required before adding an item to the wishlist
    if (!customer) {
      handleModalView()
      return handleModal()
    }

    setLoading(true)

    try {
      if (itemInWishlist) {
        await removeItem({ id: itemInWishlist.id! })
      } else {
        await addItem({
          productId,
          variantId: variant?.id!,
        })
      }

      setLoading(false)
    } catch (err) {
      setLoading(false)
    }
  }

  return (
    <button
      aria-label="Add to wishlist"
      className={cn(s.root, className)}
      onClick={handleWishlistChange}
      {...props}
    >
      <Heart
        className={cn(s.icon, {
          [s.loading]: loading,
          [s.inWishlist]: itemInWishlist,
        })}
      />
    </button>
  )
}

export default WishlistButton
