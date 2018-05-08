import React from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumb as BreadcrumbSUIR } from 'semantic-ui-react'

import If from '../if'

const Breadcrumb = ({ links }) => (
  <BreadcrumbSUIR size='big' style={{ marginBottom: '20px' }}>
    <BreadcrumbSUIR.Section>
      <Link to='/'>Home</Link>
    </BreadcrumbSUIR.Section>
    {links.map(item => (
      <React.Fragment key={item.name}>
        <BreadcrumbSUIR.Divider icon='right chevron' />
        <BreadcrumbSUIR.Section>
          <If test={item.active}>
            {item.name}
          </If>
          <If test={!item.active}>
            <Link to={item.link}>{item.name}</Link>
          </If>
        </BreadcrumbSUIR.Section>
      </React.Fragment>
    ))}
  </BreadcrumbSUIR>
)

export default Breadcrumb
