import { GoTrashcan } from 'react-icons/go'
import { useThunk } from '../hooks/use-thunk'
import { removeUser } from '../store'
import { AlbumsList } from './AlbumsList'
import Button from './Button'
import { ExpandablePanel } from './ExpandablePanel'

export const UsersListItem = ({ user }) => {
  const [doRemoveUser, isLoading, error] = useThunk(removeUser)

  const handleUserRemove = () => {
    doRemoveUser(user)
  }

  const header = (
    <>
      <Button className="mr-3" loading={isLoading} onClick={handleUserRemove}>
        <GoTrashcan />
      </Button>
      {error && <div>Error Deleting user.</div>}
      {user.name}
    </>
  )

  return (
    <ExpandablePanel header={header}>
      <AlbumsList user={user} />
    </ExpandablePanel>
  )
}
