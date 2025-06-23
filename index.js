const BASE_URL = "http://localhost:3000/posts";

document.addEventListener("DOMContentLoaded", () => {
  fetchPosts();
  handleNewPost();
});

function fetchPosts() {
  fetch(BASE_URL)
    .then(res => res.json())
    .then(posts => {
      const postList = document.getElementById("post-list");
      postList.innerHTML = "";
      posts.forEach(post => {
        const item = document.createElement("div");
        item.textContent = post.title;
        item.addEventListener("click", () => loadPost(post.id));
        postList.appendChild(item);
      });
      if (posts[0]) loadPost(posts[0].id);
    });
}

function loadPost(id) {
  fetch(`${BASE_URL}/${id}`)
    .then(res => res.json())
    .then(post => {
      const detail = document.getElementById("post-detail");
      detail.innerHTML = `
        <h2>${post.title}</h2>
        <p><strong>Author:</strong> ${post.author}</p>
        <p>${post.content}</p>
        <button id="edit-button">Edit</button>
        <button id="delete-button">Delete</button>
      `;
      document.getElementById("edit-button").onclick = () => editPost(post);
      document.getElementById("delete-button").onclick = () => removePost(post.id);
    });
}

function handleNewPost() {
  document.getElementById("new-post-form").addEventListener("submit", e => {
    e.preventDefault();
    const post = {
      title: document.getElementById("new-title").value,
      author: document.getElementById("new-author").value,
      content: document.getElementById("new-content").value,
    };
    fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post)
    }).then(() => {
      fetchPosts();
      e.target.reset();
    });
  });
}

function editPost(post) {
  const form = document.getElementById("edit-post-form");
  form.classList.remove("hidden");
  form["edit-title"].value = post.title;
  form["edit-content"].value = post.content;

  form.onsubmit = e => {
    e.preventDefault();
    const updated = {
      title: form["edit-title"].value,
      content: form["edit-content"].value
    };
    fetch(`${BASE_URL}/${post.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated)
    }).then(() => {
      fetchPosts();
      form.classList.add("hidden");
    });
  };

  document.getElementById("cancel-edit").onclick = () => form.classList.add("hidden");
}

function removePost(id) {
  fetch(`${BASE_URL}/${id}`, { method: "DELETE" })
    .then(() => {
      fetchPosts();
      document.getElementById("post-detail").innerHTML = "<p>Select a post to view its details.</p>";
    });
}
