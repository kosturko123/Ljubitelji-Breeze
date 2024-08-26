import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ApplicationLogo from '@/Components/ApplicationLogo';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, Link, useForm } from '@inertiajs/react';
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextArea from '@/Components/TextArea';

const CommentPage = ({auth}) => {

    // Style
    const style = {
        container: {
            //backgroundColor: '#ABE6C6',
            padding: '20px',
            borderRadius: '5px',
            textAlign: 'center',
        },
        frame: {
            //border: '1px solid lightgray',
            paddingTop: '7%',
            paddingBottom: '5%',
            paddingLeft: '15%',
            textAlign: 'left',
            boxShadow: '0 0 8px 1px lightgray',
            borderRadius: '50px' 
        },
        comment: {
            width: '80%',
            paddingLeft: '10px',
            backgroundColor: '#FCC91D',
            boxShadow: '0 0 3px 1px #F5A209',
        }
    };

    //const { postId } = useParams(); // Get the post ID from the URL
    const postId = 1;


    const [post, setPost] = useState(null); // State to hold the post data
    const [comment, setComment] = useState(''); // State for new comment input
    const [comments, setComments] = useState([]); // State to hold comments
    const [likes, setLikes] = useState(0); // State to hold likes count
    useEffect(() => {
        // Fetch the post data based on the postId
        axios.get(`/posts/${postId}`)
            .then(response => {
                const postData = response.data;
                setPost(postData);
                setComments(postData.comments || []);
                setLikes(postData.likeCount || 0);
            })
            .catch(error => {
                console.error('Greška pri učitavanju posta:', error);
            });
    }, [postId]);

    const handleLike = () => {
        setLikes(likes + 1);
        const newLike = {
            post_id: postId,
            user_id: auth.user.id
        };
        // Update likes in the backend
        axios.post(`/posts/${postId}/like`, newLike)
            .then(response => {
                alert("Dodat lajk");
            })
            .catch(error => {
                alert("Vec ste lajkovali objavu");
                console.error('Greška pri dodavanju lajka:', error);
            });
    };

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        const newComment = {
            text: comment,
            post_id: postId,
            user_id: auth.user.id
        };

        axios.post(`/posts/${postId}/comments`, newComment)
            .then(response => {
                /*setComments([...comments, response.data]);
                setComment('');*/
                window.location.reload();
            })
            .catch(error => {
                console.error('Greška pri dodavanju lajka:', error);
            });
    };

    if (!post) {
        return <div>Učitavanje...</div>;
    }

    return (
        <AuthenticatedLayout
        user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Komentari</h2>}
        >
        <Head title="Komentari"/>
        <div className="flex items-center justify-center  bg-gray-100">
            <div className="w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl mt-8 px-8 py-6 bg-white shadow-md overflow-hidden sm:rounded-lg">
                <div className='flex justify-center mb-4'>
                    <ApplicationLogo/>
                </div>
                <hr/>
                <div className="comment-page" style={style.container}>
                    <img src={`/uploads/${post.photo}`} alt="Slika" style={{ width: '500px', height: '500px', borderRadius: '5px' }} />
                    <p style={{fontSize: '20px'}}>{post.text}</p>

                    <div style={style.frame}>
                        <div>
                            <p style={{fontSize: '11px', float:'left', marginRight:'30%'}}>Broj osoba kojima se svidja: {likes} </p>
                            <PrimaryButton onClick={handleLike}>Sviđa mi se</PrimaryButton>
                        </div>
                        <br/>
                        <br/>
                        <div>
                            <form onSubmit={handleCommentSubmit}>
                                <TextArea 
                                    type="text" 
                                    value={comment} 
                                    onChange={(e) => setComment(e.target.value)} 
                                    placeholder="Dodaj komentar..."
                                    style={{width: '80%', height: '70px'}}
                                /><br/>
                                <PrimaryButton type="submit">Komentariši</PrimaryButton>
                            </form>
                        </div>
                        <br/>
                        <br/>
                        <div className="comments">
                            <p style={{fontSize: '11px'}}>Komentari:</p>
                            {comments.length > 0 ? (
                                comments.map((comment) => (
                                    <div key={comment.id} style={style.comment}>
                                        <p>
                                            <strong style={{color: "#2F62A2", fontSize: '12px'}}>{comment.user.name + ": "}</strong><br/>
                                            <span style={{color: "white", fontSize: '18px', fontStyle:'italic'}}>{comment.text}</span>
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <p>Još nema komentara.</p>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
        </AuthenticatedLayout>
    );
};

export default CommentPage;
