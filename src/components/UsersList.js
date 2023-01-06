import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers, addUser } from '../store'
import { useThunk } from '../hooks/use-thunk'
import Button from './Button'
import { Skeleton } from './Skeleton'
import { UsersListItem } from './UsersListItem'
import { addData } from '../store/slices/usersSlice'

export const UsersList = () => {
  const [doFetchUsers, isLoadingUsers, loadingUsersError] = useThunk(fetchUsers)
  const [doCreateUser, isCreatingUser, creatingUserError] = useThunk(addUser)
  const dispatch = useDispatch()

  const { data } = useSelector((state) => {
    return state.users
  })

  const newData = {
    id: 'dasdas',
    title: 'lorem lorem lorem',
  }

  const handleAddData = () => {
    dispatch(addData(newData))
  }

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
      return <UsersListItem key={user.id} user={user} />
    })
  }

  return (
    <div>
      <div className="flex justify-between items-center m-3">
        <h1 className="m-2 text-xl">Users</h1>
        <Button loading={isCreatingUser} onClick={handleAddData}>
          + Add User
        </Button>
        {creatingUserError && 'Error creating user...'}
      </div>
      {contentOrError}
    </div>
  )
}
