import {
  CardContainer,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '#/shared/components/ui/card/card-wrapper'

import AdminDataTable from './admin-data-table'
import { getAdminUserColumns } from '../lib/admin-table-columns'
import type { AdminUser } from '../server/get-admin-users.functions'

type AdminUsersDetailProps = {
  users: AdminUser[]
}

function AdminUsersDetail({ users }: AdminUsersDetailProps) {
  return (
    <CardContainer>
      <CardHeader className="border-b pb-4">
        <CardTitle>Total Users</CardTitle>
        <CardDescription>Registered users on the platform.</CardDescription>
      </CardHeader>

      <CardContent>
        <AdminDataTable
          data={users}
          columns={getAdminUserColumns()}
          getRowKey={(user) => user.id}
          emptyTitle="No users found"
          emptyDescription="Registered users will appear here."
          bordered={false}
        />
      </CardContent>
    </CardContainer>
  )
}

export default AdminUsersDetail
