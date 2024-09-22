document.addEventListener('DOMContentLoaded', () => {
    const postForm = document.getElementById('postForm');
    const searchBar = document.getElementById('searchBar');
    const postsContainer = document.getElementById('posts');
  
    // Fetch and display all posts
    const fetchPosts = async (searchQuery = '') => {
      const url = searchQuery 
        ? `https://job-portal-spring-boot-application.onrender.com/api/fetch/posts/${searchQuery}` 
        : 'https://job-portal-spring-boot-application.onrender.com/api/fetch/posts';
      const response = await fetch(url);
      const posts = await response.json();
      displayPosts(posts);
    };
  
    const displayPosts = (posts) => {
      postsContainer.innerHTML = '';
      posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `
          <h3>${post.profile}</h3>
          <p>${post.des}</p>
          <p><strong>Experience:</strong> ${post.exp} years</p>
          <p><strong>Technologies:</strong> ${post.tech.join(', ')}</p>
        `;
        postsContainer.appendChild(postElement);
      });
    };
  
    // Handle form submission
    postForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(postForm);
      const postData = {
        profile: formData.get('profile'),
        desc: formData.get('desc'),
        exp: parseInt(formData.get('exp')),
        tech: formData.get('techs').split(',').map(tech => tech.trim())
      };
  
      await fetch('https://job-portal-spring-boot-application.onrender.com/api/add/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData)
      });
  
      postForm.reset();
      fetchPosts();
    });
  
    // Handle search input
    searchBar.addEventListener('input', (e) => {
      const searchQuery = e.target.value;
      fetchPosts(searchQuery);
    });
  
    // Initial fetch
    fetchPosts();
  });
  
