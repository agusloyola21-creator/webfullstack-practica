import { Helmet } from "react-helmet-async"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useSearchParams } from "react-router-dom"
import { useParams } from "react-router-dom"

import { searchPost,readBlogsByCategory} from "../../redux/blog/blogActions"
import {readCategories} from "../../redux/categories/categoriesActions"

import ListBlogSearch from "../../components/blog/ListBlogSearch"
import CategoryHeader from "../../components/blog/CategoryHeader"

function SearchBlog() {

    const dispatch = useDispatch()
    const [searchParams] = useSearchParams();
    const term = searchParams.get('query');
    const blogs = useSelector((state) => state.blogs)
    const categories = useSelector((state) => state.categories)
    const param = useParams()
    const slug = param.slug


    useEffect(() => {
        dispatch(readCategories())
    }, [dispatch]
    )

    useEffect(() => {

        if (slug){

            dispatch(readBlogsByCategory({ slug }))
        }
    }, [slug]
    )

    useEffect(() => {

        dispatch(searchPost({search_term:term}))
    }, [dispatch]
    )



    return (
        <div className="py-2 px-8 mx-14 " style={{ marginTop: "75px" }} >
            <Helmet>
                <title>FullStack | Blog</title>
                <meta name="description" content="Agencia de software y marketing digital Creacion de paginas web y desarrollo de aplicaciones" />
                <meta name="keywords" content="desarrollo web, diseño web, desarrollo de sitios web, aplicaciones web, React, Node.js, HTML5, CSS3, JavaScript, diseño responsive, optimización SEO, desarrollo full stack, páginas web profesionales, landing pages, tiendas online" />
                <meta name="robots" content="all" />
                <link rel="canonical" href="" />
                <meta name="author" content="FullStack" />
                <meta name="publisher" content="FullStack" />

                <meta property="og:title" content="Desarrollo Web Profesional | FullStack" />
                <meta property="og:description" content="Creamos sitios web rápidos, modernos y optimizados para buscadores. Soluciones web a medida con tecnologías como React y Node.js." />
                <meta property="og:image" content="https://tusitio.com/img/preview.jpg" />
                <meta property="og:url" content="https://tusitio.com/" />
                <meta property="og:type" content="website" />
                <meta property="og:locale" content="es_ES" />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Desarrollo Web Profesional | Mi Empresa" />
                <meta name="twitter:description" content="Creamos sitios web rápidos, modernos y optimizados para buscadores. Soluciones web a medida con tecnologías como React y Node.js." />
                <meta name="twitter:image" content="https://tusitio.com/img/preview.jpg" />
                <meta name="twitter:site" content="@TuCuentaTwitter" />

            </Helmet>
            
            {categories && <CategoryHeader categories={categories.data.Categories} />}
            <h2 className="text-2xl font-semibold mb-4">Resultado de búsqueda</h2>

            {blogs &&  <ListBlogSearch blogs={blogs.filtered_posts}  count={blogs.count && blogs.count} term={term}/>}
            

        </div>


    )
}




export default SearchBlog