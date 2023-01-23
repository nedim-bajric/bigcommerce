import Link from 'next/link'
import s from './MenuSidebarView.module.css'
import SidebarLayout from '@components/common/SidebarLayout'
import type { Link as LinkProps } from './index'
import { useAppDispatch } from 'redux/hooks'
import { closeSidebar } from 'redux/Slices/UISlice'

export default function MenuSidebarView({
  links = [],
}: {
  links?: LinkProps[]
}) {
  const dispatch = useAppDispatch()

  const handleClose = () => dispatch(closeSidebar())

  return (
    <SidebarLayout handleClose={handleClose}>
      <div className={s.root}>
        <nav>
          <ul>
            <li className={s.item} onClick={handleClose}>
              <Link href="/search">All</Link>
            </li>
            {links.map((l: any) => (
              <li key={l.href} className={s.item} onClick={handleClose}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </SidebarLayout>
  )
}

MenuSidebarView
