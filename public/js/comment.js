const formComment = document.querySelector('.comment')

const newComment = async (event) => { 
    event.preventDefault(); 

    const comment = document.querySelector('.comment-description').value.trim(); 
    // Need to make 'comment description' tag
    const id = document.querySelector('.post-id').dataset.id; 

    if (comment && id) { 
        const response = await fetch(`/api/post/${id}/comment`, { 
            method: 'POST', 
            body: JSON.stringify({ post_id, comment }), 
            headers: { 'Content-Type': 'application/json' },
        }); 

        if (response.ok) { 
            document.location.reload();
        } else { 
            alert('Error creating post');
        }
    }


};

formComment.addEventListener('submit', newComment);