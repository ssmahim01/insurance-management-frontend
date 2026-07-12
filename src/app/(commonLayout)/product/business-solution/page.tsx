import B2BCommonQueries from '@/components/public-views/products/enterprise/B2bcommonqueries'
import B2BSolutions from '@/components/public-views/products/enterprise/B2bSolutions'
import B2BSolutionsForm from '@/components/public-views/products/enterprise/B2bSolutionsForm'
import React from 'react'

export default function page() {
  return (
    <div>
        <B2BSolutions />
        <B2BSolutionsForm />
        <B2BCommonQueries />
    </div>
  )
}
