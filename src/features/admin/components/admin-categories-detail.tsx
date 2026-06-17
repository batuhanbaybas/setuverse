import {
  CardContainer,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '#/shared/components/ui/card/card-wrapper'

import AdminDataTable from './admin-data-table'
import { getAdminCategoryColumns } from '../lib/admin-table-columns'
import type { AdminCategory } from '../server/get-admin-categories.functions'

type AdminCategoriesDetailProps = {
  categories: AdminCategory[]
}

function AdminCategoriesDetail({ categories }: AdminCategoriesDetailProps) {
  return (
    <CardContainer>
      <CardHeader className="border-b pb-4">
        <CardTitle>Categories</CardTitle>
        <CardDescription>Manage platform setup categories.</CardDescription>
      </CardHeader>

      <CardContent>
        <AdminDataTable
          data={categories}
          columns={getAdminCategoryColumns()}
          getRowKey={(category) => category.id}
          emptyTitle="No categories found"
          emptyDescription="Categories will appear here once they are created."
          bordered={false}
        />
      </CardContent>
    </CardContainer>
  )
}

export default AdminCategoriesDetail
