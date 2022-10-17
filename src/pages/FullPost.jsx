import React from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import axios from '../axios';
import { Post } from '../components/Post';
import { Index } from '../components/AddComment';
import { CommentsBlock } from '../components/CommentsBlock';
import CircularProgress from '@mui/material/CircularProgress';

export const FullPost = () => {
  const [data, setData] = React.useState();
  const [isLoading, setLoading] = React.useState(true);
  const [comments, setComments] = React.useState([]);
  const { id } = useParams();

  React.useEffect(() => {
    const fetching = async () => {
      await axios
      .get(`/posts/${id}`)
      .then((res) => {
        console.log(res.data)
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        alert('Ошибка при получении статьи');
      });

      await axios
      .get(`/comments/${id}`)
      .then((res) => {
        console.log(res.data)
        setComments(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        alert('Ошибка при получении статьи');
      });
    }
    const interval = setInterval(() => {
      fetching()
    }, 1000);
    return () => clearInterval(interval);
    
  }, [id, setData, setComments, setLoading]);

  if (isLoading) {
    return (  <div style={{display: 'flex', justifyContent: 'center', marginTop: '100px'}}>
                <CircularProgress size={200} />
              </div>
            )
  }

  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl ? `http://localhost:8000${data.imageUrl}` : ''}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={3}
        tags={data.tags}
        isFullPost>
        <ReactMarkdown children={data.text} />
      </Post>
      <CommentsBlock
        items={comments}
        isLoading={false}>
        <Index />
      </CommentsBlock>
    </>
  );
};
