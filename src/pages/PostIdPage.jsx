import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PostServiсe from '../API/PostService';
import { useFetching } from '../components/hooks/useFetching';
import Loader from '../components/UI/Loader/Loader';

const PostIdPage = () => {
    const params = useParams()
    const [post, setPost] = useState ({});
    const [comments, setComments] = useState ([]);
    const [fetchPostById, isLoading, error] = useFetching( async (id) => {
        const response = await PostServiсe.getById(id)
        setPost(response.data);
    })

    const [fetchComments, isComLoading, comError] = useFetching( async (id) => {
        const response = await PostServiсe.getCommentsByPostId(id)
        setComments(response.data);
    })

    useEffect(() => {
        fetchPostById(params.id)
        fetchComments(params.id)
        
    }, [])
    return (
        <div>
            <h1>вы открыли страницу поста с id = {params.id}</h1>
            {isLoading
                ? <Loader/>
                :<div>{post.id}.{post.title}</div>
            }
            <h1>
                Комментарии
            </h1>
            {isComLoading
                ? <Loader/>
                :<div>
                    {comments.map(comm =>
                        <div style={{marginTop: 15}}>
                            <h5>{comm.email}</h5>
                            <div>{comm.body}</div>
                        </div>    
                    )}
                </div>
            }
            
        </div>
    );
};

export default PostIdPage;