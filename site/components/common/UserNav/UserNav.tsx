import { FC, Fragment } from 'react'
import Link from 'next/link'

import cn from 'clsx'

import s from './UserNav.module.css'
import { Avatar } from '@components/common'
import { useAppDispatch } from 'redux/hooks'
import useCart from '@framework/cart/use-cart'
import type { LineItem } from '@commerce/types/cart'
import { Heart, Bag, Menu } from '@components/pages/icons'
import CustomerMenuContent from './CustomerMenuContent'
import useCustomer from '@framework/customer/use-customer'
import {
  Dropdown,
  DropdownTrigger as DropdownTriggerInst,
  Button,
} from '@components/ui'
import {
  closeSidebarIfPresent,
  openModal,
  openSidebar,
  setSidebarView,
  SIDEBAR_VIEWS,
} from 'redux/Slices/uiSlice'

const countItem = (count: number, item: LineItem) => count + item.quantity

const UserNav: FC<{
  className?: string
}> = ({ className }) => {
  const dispatch = useAppDispatch()
  const { data } = useCart()
  const { data: isCustomerLoggedIn } = useCustomer()

  const itemsCount = data?.lineItems?.reduce(countItem, 0) ?? 0
  const DropdownTrigger = isCustomerLoggedIn ? DropdownTriggerInst : Fragment

  const handleSidebar = (view: SIDEBAR_VIEWS) => {
    dispatch(openSidebar())
    dispatch(setSidebarView(view))
  }

  const handleIfPresent = () => {
    dispatch(closeSidebarIfPresent())
  }

  const handleModal = () => {
    isCustomerLoggedIn ? null : dispatch(openModal())
  }
  return (
    <nav className={cn(s.root, className)}>
      <ul className={s.list}>
        {process.env.COMMERCE_CART_ENABLED && (
          <li className={s.item}>
            <Button
              className={s.item}
              variant="naked"
              onClick={() => {
                handleSidebar('CART_VIEW')
              }}
              aria-label={`Cart items: ${itemsCount}`}
            >
              <Bag />
              {itemsCount > 0 && (
                <span className={s.bagCount}>{itemsCount}</span>
              )}
            </Button>
          </li>
        )}
        {process.env.COMMERCE_WISHLIST_ENABLED && (
          <li className={s.item}>
            <Link href="/wishlist" legacyBehavior>
              <a onClick={handleIfPresent} aria-label="Wishlist">
                <Heart />
              </a>
            </Link>
          </li>
        )}
        {process.env.COMMERCE_CUSTOMERAUTH_ENABLED && (
          <li className={s.item}>
            <Dropdown>
              <DropdownTrigger>
                <button
                  aria-label="Menu"
                  className={s.avatarButton}
                  onClick={handleModal}
                >
                  <Avatar />
                </button>
              </DropdownTrigger>
              <CustomerMenuContent />
            </Dropdown>
          </li>
        )}
        <li className={s.mobileMenu}>
          <Button
            className={s.item}
            aria-label="Menu"
            variant="naked"
            onClick={() => {
              handleSidebar('MOBILE_MENU_VIEW')
            }}
          >
            <Menu />
          </Button>
        </li>
      </ul>
    </nav>
  )
}

export default UserNav
