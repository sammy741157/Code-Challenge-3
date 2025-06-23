const BASE_URL = "http://localhost:3000/posts";

document.addEventListener("DOMContentLoaded", main);

function main() {
  console.log("App started");
  displayPosts();
  addNewPostListener();
}

function displayPosts() {
  console.log("Fetching all posts...");
  fetch(BASE_URL)
    .then(res => res.json())
    .then(posts => {
      console.log("Posts fetched:", posts);
      const postList = document.getElementById("post-list");
      postList.innerHTML = "";

      posts.forEach(post => {
        const postItem = document.createElement("div");
        postItem.textContent = post.title;
        postItem.classList.add("post-item");
        postItem.addEventListener("click", () => handlePostClick(post.id));
        postList.appendChild(postItem);
      });

      if (posts.length > 0) {
        handlePostClick(posts[0].id);
      }
    })
    .catch(error => console.error("Error fetching posts:", error));
}

function handlePostClick(id) {
  console.log(`Fetching post with ID: ${id}`);
  fetch(`${BASE_URL}/${id}`)
    .then(res => res.json())
    .then(post => {
      console.log("Post details fetched:", post);
      const postDetail = document.getElementById("post-detail");
      postDetail.innerHTML = `
        <h2>${post.title}</h2>
        <p><strong>Author:</strong> ${post.author}</p>
        <p>${post.content}</p>
        <button id="edit-button">Edit</button>
        <button id="delete-button">Delete</button>
      `;

      document.getElementById("edit-button").onclick = () => showEditForm(post);
      document.getElementById("delete-button").onclick = () => deletePost(post.id);
    })
    .catch(error => console.error("Error fetching post detail:", error));
}

function addNewPostListener() {
  document.getElementById("new-post-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const newPost = {
      title: document.getElementById("new-title").value,
      author: document.getElementById("new-author").value,
      content: document.getElementById("new-content").value,
    };

    console.log("Submitting new post:", newPost);

    fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPost),
    })
      .then(res => res.json())
      .then(addedPost => {
        console.log("New post added:", addedPost);
        displayPosts();
        e.target.reset();
      })
      .catch(error => console.error("Error adding new post:", error));
  });
}

function showEditForm(post) {
  console.log("Editing post:", post);
  const form = document.getElementById("edit-post-form");
  form.classList.remove("hidden");

  document.getElementById("edit-title").value = post.title;
  document.getElementById("edit-content").value = post.content;

  form.onsubmit = (e) => {
    e.preventDefault();

    const updatedPost = {
      title: document.getElementById("edit-title").value,
      content: document.getElementById("edit-content").value,
    };

    console.log(`Updating post ID ${post.id} with data:`, updatedPost);

    fetch(`${BASE_URL}/${post.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedPost),
    })
      .then(res => res.json())
      .then(updated => {
        console.log("Post updated successfully:", updated);
        displayPosts();
        form.classList.add("hidden");
      })
      .catch(error => console.error("Error updating post:", error));
  };

  document.getElementById("cancel-edit").onclick = () => {
    console.log("Edit cancelled.");
    form.classList.add("hidden");
  };
}

function deletePost(id) {
  console.log(`Deleting post with ID: ${id}`);
  fetch(`${BASE_URL}/${id}`, {
    method: "DELETE"
  })
    .then(() => {
      console.log(`Post with ID ${id} deleted successfully.`);
      displayPosts();
      document.getElementById("post-detail").innerHTML = "<p>Select a post to view its details.</p>";
    })
    .catch(error => console.error("Error deleting post:", error));
}
