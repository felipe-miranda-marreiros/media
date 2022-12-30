import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { fetchUsers, addUser } from '../store'
import { useThunk } from '../hooks/use-thunk'
import Button from './Button'
import { Skeleton } from './Skeleton'

export const UsersList = () => {
  const [doFetchUsers, isLoadingUsers, loadingUsersError] = useThunk(fetchUsers)
  const [doCreateUser, isCreatingUser, creatingUserError] = useThunk(addUser)
  const { data } = useSelector((state) => {
    return state.users
  })

  useEffect(() => {
    doFetchUsers()
  }, [doFetchUsers])

  const handleUserAdd = () => {
    doCreateUser()
  }

  let contentOrError
  if (isLoadingUsers) {
    contentOrError = <Skeleton times={6} className="h-10 w-full" />
  } else if (loadingUsersError) {
    contentOrError = <div>Error fetching</div>
  } else {
    contentOrError = data.map((user) => {
      return (
        <div key={user.id} className="mb-2 border rounded">
          <div className="flex p-2 justify-between items-center cursor-pointer">
            {user.name}
          </div>
        </div>
      )
    })
  }

  return (
    <div>
      <div className="flex justify-between items-center m-3">
        <h1 className="m-2 text-xl">Users</h1>
        <Button loading={isCreatingUser} onClick={handleUserAdd}>
          + Add User
        </Button>
        {creatingUserError && 'Error creating user...'}
      </div>
      {contentOrError}
    </div>
  )
}
