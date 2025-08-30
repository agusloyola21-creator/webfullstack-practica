import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";

const ENDPOINT_blog = `${process.env.REACT_APP_API_URL}/api/blog`


// read blogs
export const readBlogs = createAsyncThunk("readBlogs", async (data) => {
    const config = {    // tells the backend the response should be in json format
        headers: {
            'Accept': 'application/json'
        }
    };
    try {
        const response = await axios.get(`${ENDPOINT_blog}/list`,data,config);
        // console.log(response.data);
        return response.data;
    } catch (error) {
        return isRejectedWithValue(error.response);
    }
})
// read blogs pages
export const readBlogsPages = createAsyncThunk("readBlogsPages", async ({p},thunkAPI) => {
    console.log(p)
    const config = {    // tells the backend the response should be in json format
        headers: {
            'Accept': 'application/json'
        }
    };
    try {
        const response = await axios.get(`${ENDPOINT_blog}/list?p=${p}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(    { 
                                                data: error.response?.data,
                                                status: error.response?.status,
                                            }
        );
    }
})
// read blogs by category
export const readBlogsByCategory = createAsyncThunk("readBlogsByCategory", async ({slug},thunkAPI) => {
    console.log('Slug recibido:', slug);

    const config = {    // tells the backend the response should be in json format
        headers: {
            'Accept': 'application/json'
        }
    };
    try {
        const response = await axios.get(`${ENDPOINT_blog}/by_category?slug=${slug}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response);
    }
})
// read blogs by category page
export const readBlogsByCategotyPage = createAsyncThunk("readBlogsByCategoryPage", async ({p,slug},thunkAPI) => {

    try {
        const response = await axios.get(`${ENDPOINT_blog}/by_category?p=${p}&slug=${slug}`); //?p=2&slug=back-end
        console.log(response.data);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response);
    }
})
// read detail Post
export const readPost = createAsyncThunk("readPost", async (data,post) => {
    const config = {    // tells the backend the response should be in json format
        headers: {
            'Accept': 'application/json'
        }
    };
    try {
        const response = await axios.get(`${ENDPOINT_blog}/detail/${post}`,data,config);
        console.log(response.data);
        return response.data;
    } catch (error) {
        return isRejectedWithValue(error.response);
    }
})
// search post
export const searchPost = createAsyncThunk("searchPost", async ({search_term},thunkAPI) => {

    try {
        const response = await axios.get(`${ENDPOINT_blog}/search?s=${search_term}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response);
    }
})
// search post page
export const searchPostPage = createAsyncThunk("searchPostPage", async ({search_term,p},thunkAPI) => {
    console.log(search_term,p)
    try {
        const response = await axios.get(`${ENDPOINT_blog}/search?p=${p}&s=${search_term}`); //?p=2&s=post
        // console.log(response.data);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response);
    }
})