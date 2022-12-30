import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers, addUser } from '../store'
import Button from './Button'
import { Skeleton } from './Skeleton'

export const UsersList = () => {
  const [isLoadingUsers, setIsLoadingUsers] = useState(false)
  const [loadingUsersError, setLoadingUsersError] = useState(null)
  const [isCreatingUser, setIsCreatingUser] = useState(false)
  const [creatingUserError, setCreatingUserError] = useState()

  const { data } = useSelector((state) => {
    return state.users
  })
  const dispatch = useDispatch()

  useEffect(() => {
    setIsLoadingUsers(true)
    dispatch(fetchUsers())
      .unwrap()
      .catch((error) => setLoadingUsersError(error))
      .finally(() => setIsLoadingUsers(false))
  }, [dispatch])

  const handleUserAdd = () => {
    setIsCreatingUser(true)
    dispatch(addUser())
      .unwrap()
      .catch((error) => setCreatingUserError(error))
      .finally(() => setIsCreatingUser(false))
  }

  if (isLoadingUsers) return <Skeleton times={6} className="h-10 w-full" />

  if (loadingUsersError) return <div>Error fetching</div>

  const renderedUsers = data.map((user) => {
    return (
      <div key={user.id} className="mb-2 border rounded">
        <div className="flex p-2 justify-between items-center cursor-pointer">
          {user.name}
        </div>
      </div>
    )
  })

  return (
    <div>
      <div className="flex justify-between m-3">
        <h1 className="m-2 text-xl">Users</h1>
        {isCreatingUser ? (
          'Creating User...'
        ) : (
          <Button onClick={handleUserAdd}>+ Add User</Button>
        )}
        {creatingUserError && 'Error creating user...'}
      </div>
      {renderedUsers}
    </div>
  )
}
