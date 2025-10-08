import { createSlice } from "@reduxjs/toolkit";
import { readBlogs,readBlogsByCategotyPage, readBlogsByCategory, readBlogsPages, readPost, searchPost, searchPostPage } from "./blogActions";

const blogSlice = createSlice({
    name: 'blogs',
    initialState: {
        
    
        blog_list:[],
        list_category:[],
        filtered_posts:[],
        post:null,
        count:null,
        next:null,
        previous:null,
        loading:false,
        error:null,
        
        
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        //read Blogs
        .addCase(readBlogs.pending, (state)=>{
            state.loading=true
        })
        .addCase(readBlogs.fulfilled, (state,action)=>{
            
            state.loading = false
            state.blog_list=action.payload.results.post
            state.count=action.payload.count
            state.next=action.payload.next
            state.previous=action.payload.previous
        })
        .addCase(readBlogs.rejected, (state,action)=>{
            
            state.loading = false
            state.blog_list=null
            state.count=null
            state.next=null
            state.previous=null
            state.error = action.payload.message


        })
        //read Blogs pagination
        .addCase(readBlogsPages.pending, (state)=>{
            state.loading=true
        })
        .addCase(readBlogsPages.fulfilled, (state,action)=>{
            
            state.loading = false
            state.blog_list=action.payload.results.post
            state.count=action.payload.count
            state.next=action.payload.next
            state.previous=action.payload.previous
        })
        .addCase(readBlogsPages.rejected, (state,action)=>{
            
            state.loading = false
            state.blog_list=null
            state.count=null
            state.next=null
            state.previous=null
            state.error = action.payload.message

        })
        //read Blogs By Category
        .addCase(readBlogsByCategory.pending, (state)=>{
            state.loading=true
        })
        .addCase(readBlogsByCategory.fulfilled, (state,action)=>{
            console.log(action)
            state.loading = false 
            state.list_category = action.payload.results.post
            state.count=action.payload.count
            state.next=action.payload.next
            state.previous=action.payload.previous
        })
        .addCase(readBlogsByCategory.rejected, (state,action)=>{
            state.loading = false
            state.list_category=null
            state.count=null
            state.next=null
            state.previous=null
            state.error = action.payload.message
            
        })
        //read Blogs By Category Pagr
        .addCase(readBlogsByCategotyPage.pending, (state)=>{
            state.loading=true
        })
        .addCase(readBlogsByCategotyPage.fulfilled, (state,action)=>{
            console.log(action)
            state.loading = false 
            state.list_category = action.payload.results.post
            state.count=action.payload.count
            state.next=action.payload.next
            state.previous=action.payload.previous
        })
        .addCase(readBlogsByCategotyPage.rejected, (state,action)=>{
            state.loading = false
            state.list_category=null
            state.count=null
            state.next=null
            state.previous=null
            state.error = action.payload.message
            
        })

        //read Post
        .addCase(readPost.pending, (state)=>{
            state.loading=true
        })
        .addCase(readPost.fulfilled, (state,action)=>{
            state.loading = false
            state.post=action.payload.post
            
        })
        .addCase(readPost.rejected, (state,action)=>{
            state.loading = false
            state.post=null
            state.error = action.payload.message
            
        })
        //searchBlog
        .addCase(searchPost.pending, (state)=>{
            state.loading=true
        })
        .addCase(searchPost.fulfilled, (state,action)=>{
            state.loading = false
            state.filtered_posts=action.payload.results.post
            state.count=action.payload.count
            state.next=action.payload.next
            state.previous=action.payload.previous
        })
        .addCase(searchPost.rejected, (state,action)=>{
            state.loading = false
            state.filtered_posts=null
            state.count=null
            state.next=null
            state.previous=null
            state.error = action.payload.message
            
        })
        //searchBlog page
        .addCase(searchPostPage.pending, (state)=>{
            state.loading=true
        })
        .addCase(searchPostPage.fulfilled, (state,action)=>{
            state.loading = false
            state.filtered_posts=action.payload.results.post
            state.count=action.payload.count
            state.next=action.payload.next
            state.previous=action.payload.previous
        })
        .addCase(searchPostPage.rejected, (state,action)=>{
            state.loading = false
            state.filtered_posts=null
            state.count=null
            state.next=null
            state.previous=null
            state.error = action.payload.message
            
        })
    }
    
})

export default blogSlice.reducer