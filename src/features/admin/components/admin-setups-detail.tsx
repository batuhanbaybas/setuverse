import {
  CardContainer,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '#/shared/components/ui/card/card-wrapper'

import AdminDataTable from './admin-data-table'
import { getAdminSetupColumns } from '../lib/admin-table-columns'
import type { AdminSetup } from '../server/get-admin-setups.functions'

type AdminSetupsDetailProps = {
  title: string
  description: string
  setups: AdminSetup[]
  showStatus?: boolean
  emptyTitle?: string
  emptyDescription?: string
}

function AdminSetupsDetail({
  title,
  description,
  setups,
  showStatus = false,
  emptyTitle = 'No setups found',
  emptyDescription = 'Setups will appear here once they leave draft status.',
}: AdminSetupsDetailProps) {
  return (
    <CardContainer>
      <CardHeader className="border-b pb-4">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent>
        <AdminDataTable
          data={setups}
          columns={getAdminSetupColumns({ showStatus })}
          getRowKey={(setup) => setup.id}
          emptyTitle={emptyTitle}
          emptyDescription={emptyDescription}
          bordered={false}
        />
      </CardContent>
    </CardContainer>
  )
}

export default AdminSetupsDetail
