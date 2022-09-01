import { useEffect, useState, useRef } from 'react';
import PostServise from '../API/PostService';
import { useFetching } from '../components/hooks/useFetching';
import { useObserver } from '../components/hooks/useObserver';
import { usePosts } from "../components/hooks/usePosts";
import Pagination from '../components/pagination/Pagination';
import PostFilter from '../components/PostFilter';
import PostForm from '../components/PostForm';
import PostList from '../components/PostList';
import '../components/styles/app.css';
import MyButton from '../components/UI/button/MyButton';
import Loader from '../components/UI/Loader/Loader';
import MyModal from '../components/UI/MyModal/MyModal';
import MySelect from '../components/UI/select/MySelect';
import { getPageCount } from '../components/utils/pages';

function Posts() {
  const [posts, setPosts] = useState([])

  const [filter, setFilter] = useState({sort: '', query: ''})

  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0)

  const [limit, setLimit] = useState(10);

  const [page, setPage] = useState(1);

  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  const lastElement = useRef();



  
  const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
    const response = await PostServise.getAll(limit, page);
    setPosts([...posts, ...response.data])
    const totalCount = response.headers['x-total-count']
    setTotalPages(getPageCount(totalCount, limit))
  })

  
  useObserver(lastElement, page < totalPages, isPostsLoading, () =>{
    setPage(page + 1)
  })
  
  
  useEffect(() => {
    fetchPosts(limit, page)
  }, [page, limit])
  
  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
  }

  
  
  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  const changePage = (page) => {
    setPage(page)
    fetchPosts(limit, page)
  }
  

  return (
    <div className="Posts">
      <MyButton style={{marginTop: '30px' }} onClick={() => setModal(true)}>
        создать пост
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost}/>
      </MyModal>
      <hr style={{margin: '15px 0'}}/>
      <PostFilter
        filter={filter}
        setFilter={setFilter}
      />
      <MySelect
        value={limit}
        onChange={value => setLimit(value)}
        defaultValue="Кол-во элементов на странице"
        options={[
          {value: 5, name: '5'},
          {value: 10, name: '10'},
          {value: 15, name: '15'},
          {value: -1, name: 'показать все'}
        ]}
      
      />
      {postError && 
        <h1>произошла ошибка ${postError}</h1>
      }
      <PostList remove={removePost}posts={sortedAndSearchedPosts} title="посты про жс"/>
      <div ref={lastElement} style={{height: 20, background: 'red'}}></div>
      {isPostsLoading &&
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}><Loader/></div>
      }

      <Pagination
        page = {page} changePage = {changePage} totalPages = {totalPages}
      />
      
    </div>
  );
}

export default Posts;