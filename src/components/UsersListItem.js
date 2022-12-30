import { GoTrashcan } from 'react-icons/go'
import { useThunk } from '../hooks/use-thunk'
import { removeUser } from '../store'
import Button from './Button'

export const UsersListItem = ({ user }) => {
  const [doRemoveUser, isLoading, error] = useThunk(removeUser)

  const handleUserRemove = () => {
    doRemoveUser(user)
  }

  return (
    <div key={user.id} className="mb-2 border rounded">
      <div className="flex p-2 justify-between items-center cursor-pointer">
        <div className="flex items-center justify-between">
          <Button
            className="mr-3"
            loading={isLoading}
            onClick={handleUserRemove}
          >
            <GoTrashcan />
          </Button>
          {error && <div>Error Deleting user.</div>}
          {user.name}
        </div>
      </div>
    </div>
  )
}
