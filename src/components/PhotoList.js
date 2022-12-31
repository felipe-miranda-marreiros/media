import { useFetchPhotosQuery, useAddPhotoMutation } from '../store'
import Button from './Button'
import { PhotoListItem } from './PhotoListItem'
import { Skeleton } from './Skeleton'

export const PhotoList = ({ album }) => {
  const { data, isFetching, error } = useFetchPhotosQuery(album)
  const [addPhoto, addPhotoResults] = useAddPhotoMutation()

  const handleAddPhoto = () => {
    addPhoto(album)
  }

  let content
  if (isFetching) {
    content = <Skeleton className="h-8 w-8" times={4} />
  } else if (error) {
    content = <div>Error fetching photos</div>
  } else {
    content = data.map((photo) => {
      return <PhotoListItem key={photo.id} photo={photo} />
    })
  }

  return (
    <div>
      <div className="m-2 flex items-center justify-between">
        <h3 className="text-lg font-bold">Photos In {album.title}</h3>
        <Button onClick={handleAddPhoto} loading={addPhotoResults.isLoading}>
          + Add Photo
        </Button>
      </div>
      <div className="mx-8 flex flex-wrap justify-center">{content}</div>
    </div>
  )
}
