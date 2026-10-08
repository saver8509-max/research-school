import { href } from '../lib/router'

export function Link({ to, className, children, ...props }) {
  return (
    <a href={href(to)} className={className} {...props}>
      {children}
    </a>
  )
}
