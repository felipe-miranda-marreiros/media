import { useRemoveAlbumMutation } from '../store'
import Button from './Button'
import { ExpandablePanel } from './ExpandablePanel'
import { GoTrashcan } from 'react-icons/go'
import { PhotoList } from './PhotoList'

export const AlbumsListItem = ({ album }) => {
  const [removeAlbum, removeAlbumResult] = useRemoveAlbumMutation()

  const handleRemoveAlbum = () => {
    removeAlbum(album)
  }

  const header = (
    <>
      <Button
        className="mr-2"
        loading={removeAlbumResult.isLoading}
        onClick={handleRemoveAlbum}
      >
        <GoTrashcan />
      </Button>
      {album.title}
    </>
  )

  return (
    <ExpandablePanel key={album.id} header={header}>
      <PhotoList album={album} />
    </ExpandablePanel>
  )
}
