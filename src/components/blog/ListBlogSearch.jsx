
import React from 'react'
import { NavLink } from 'react-router-dom'
import SmallSetPaginationSearch from 'components/pagination/SmallSetPaginationSearch'

const ListBlogSearch = ({ blogs, count, term }) => {
  return (
    <>

      {blogs && blogs.map((blog, index) => (

        <NavLink key={index} className="bg-[#f3f3f3] mt-16">
          <div className="container mx-auto py-8 px-4 md:px-0 md:flex md:justify-center md:items-center">
            <div className="md:w-1/2 lg:w-1/3 md:mr-8">
              <h3 id="slug__blog">{blog.slug}</h3>
              <h1 id="title_card_blog" className="text-3xl font-bold mb-4">{blog.title}</h1>
              <p id="desc_card_blog" className="text-lg mb-4">{blog.description}.</p>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Learn More
              </button>
            </div>
            <div className="md:w-1/2 lg:w-2/3 mt-8 md:mt-0">
              {/* <img src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f" alt="Responsive Design" className="w-full h-full object-cover"></img> */}
              <img src={blog.thumbnail} alt="Responsive Design" className="w-full h-full object-cover"></img>
            </div>
          </div>
        </NavLink>
      )

      )}

      <SmallSetPaginationSearch list={blogs} count={count} term={term} />
  

    </>


  )
}

export default ListBlogSearch