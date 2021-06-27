const formComment = document.querySelector('.comment')

const newComment = async (event) => { 
    event.preventDefault(); 

    const comment = document.querySelector('.comment-description').value.trim(); 
    const id = document.querySelector('.post-id').dataset.id; 

    if (comment && id) { 
        const response = await fetch(`/api/post/${id}/comment`, { 
            method: 'POST', 
            body: JSON.stringify({ id, comment }), 
            headers: { 'Content-Type': 'application/json' },
        }); 

        if (response.ok) { 
            doocument.location.replace(`./post/${id}`);
        } else { 
            alert(response.statusText);
        }
    }


};

formComment.addEventListener('submit', addComment);