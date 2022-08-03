import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore'
import { db } from '../firebase.config'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { Navigation, Pagination } from 'swiper'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import Spinner from './Spinner'

function Slider() {
  const [loading, setLoading] = useState(true)
  const [listings, setListings] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    const fetchListings = async () => {
      const listingRef = collection(db, 'listings')
      const q = query(listingRef, orderBy('timestamp', 'desc'), limit(5))
      const querySnap = await getDocs(q)

      let listings = []

      querySnap.forEach((doc) => {
        return listings.push({ id: doc.id, data: doc.data() })
      })
      setListings(listings)
      console.log(listings)
      setLoading(false)
    }
    fetchListings()
  }, [])

  if (loading) {
    return <Spinner />
  }
  return (
    listings && (
      <>
        <p className='exploreHeading'>Recommended</p>

        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          slidesPerView={1}
          pagination={{ clickable: true }}
          loop
        >
          {listings.map(({ data, id }) => (
            <SwiperSlide
              key={id}
              onClick={() => navigate(`/category/${data.type}/${id}`)}
            >
              <div>
                <img
                  src={data.imageUrls[0]}
                  alt=''
                  className='swiperSlideDiv'
                />
                <p className='swiperSlideText'>{data.name}</p>
                <p className='swiperSlideText' style={{ marginTop: '150px' }}>
                  {data.location}
                </p>
                <p className='swiperSlidePrice'>
                  ${data.discountedPrice ?? data.regularPrice}{' '}
                  {data.type === 'rent' && '/ month'}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    )
  )
}

export default Slider