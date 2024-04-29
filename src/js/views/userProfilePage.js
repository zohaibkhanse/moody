import logInPage from "./logInPage.js";
import view from "./view.js";
class UserProfilePage extends view {
  _parentElement = document.querySelector(".user-profile-page");
  _postsContainerEl;
  _logOutBtnEl = document.querySelector(".user-profile-page__log-out--btn");
  _logInBtnEl = document.querySelector(".public-posts-page__log-in--btn");
  _publicPostsPageEl = document.querySelector('.public-posts-page');


  //========================================
  // User Profile Handlers
  //==========================================

  addPostHandler(handler) {
    this._parentElement.addEventListener("click", function (e) {
      if (!e.target.closest(".user-profile-page__post-btn")) return;
      const data = e.target.parentElement.querySelector(
        ".user-profile-page__post-text-area"
      ).value;
      handler(data);
      console.log(data);
    });
  }

  addEditPostHandler() {
    this._parentElement.addEventListener("click", function (e) {
      if (e.target.closest(".user-profile-page__edit-btn")) {
        console.log("Button working..");
        const selectText = e.target.parentElement.querySelector(
          ".user-profile-page__post-paragraph"
        );
        selectText.contentEditable = true;
      }
    });
  }

  renderLogOutBtn(){
    this._logOutBtnEl.classList.remove('hidden');
    this._logOutBtnEl.textContent = 'Log Out';
    console.log(this._logOutBtnEl);
  }

  _hideParentAndShowPublicPostsPage(logOutHandler){
    logOutHandler().then(res => {
      this._parentElement.classList.add("hidden");
      this._publicPostsPageEl.classList.remove("hidden");
      console.log(this);
      res();
      this._logOutBtnEl.classList.add('hidden')
      this._logInBtnEl.classList.remove('hidden')
    })
  }

  addLogOutAccountHandler(logOutHandler) {
    this._logOutBtnEl.addEventListener("click", this._hideParentAndShowPublicPostsPage.bind(this, logOutHandler));
  }

  addUpdatePostHandler(handler) {
    this._postsContainerEl.addEventListener("click", function (e) {
      if (e.target.closest(".user-profile-page__update-btn")) {
        const selectText = e.target.parentElement.querySelector(
          ".user-profile-page__post-paragraph"
        );
        const { postId } = e.target.parentElement.dataset;
        console.log(postId);
        handler(selectText.textContent, postId);
      }
    });
  }
  addDeletePostHandler(handler) {
    this._postsContainerEl.addEventListener("click", function (e) {
      if (e.target.closest(".user-profile-page__delete-btn")) {
        const { postId } = e.target.parentElement.dataset;
        handler(postId);
      }
    });
  }

  _clear() {
    this._postsContainerEl.innerHTML = "";
  }
  generateParent(hander) {
    this._postsContainerEl = hander();
  }

  renderSpinnerInPostsContainer() {
    this._clear();
    const markup = `
        <div class="spinner">
            <svg>
            <use
                href="./src/image/icons.svg#icon-loader"
            ></use>
            </svg>
        </div>
        `;
    this._postsContainerEl.insertAdjacentHTML("afterbegin", markup);
  }

  renderProfileInfo(account) {
    this._parentElement.innerHTML = "";
    const markup = `
        <div class="container user-profile-page--container">
        <div class="user-profile-page__user-profile">
          <img
            class="user-profile-page__user-image"
            src="${
              account.photoURL || "./src/image/user-profile-svgrepo-com.svg"
            }"
            alt="user photo"
          />
          <h2 class="user-profile-page__user-name">${account.displayName}</h2>
        </div>
        <textarea
          class="user-profile-page__post-text-area"
          name="post"
          id=""
          cols="30"
          rows="10"
          placeholder="Write your post here..."
        ></textarea>
        <button class="user-profile-page__post-btn btn btn--primary">
          POST
        </button>
          <div class="user-profile-page__posts-container">
           
          </div>
        </div>
      </div>


      `;

    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  _addDate(date) {
    return new Intl.DateTimeFormat(navigator.language, {
      hour: "numeric",
      minute: "numeric",
      year: "numeric",
      month: "short",
      day: "2-digit",
    }).format(date);
  }

  renderPostInUserProfile(data, postID) {
    const markup = `
                <div class="user-profile-page__post" data-post-id="${postID}">
                <figure class="post-user-info"> <img src="${
                  data.userPhotoURL ||
                  "./src/image/user-profile-svgrepo-com.svg"
                }"> ${data.userName} </figure>    
                <p class="user-profile-page__post-paragraph">
                   ${data.body}
                    </p>
                    <button class="user-profile-page__edit-btn btn--post">Edit</button>
                    <button class="user-profile-page__update-btn btn--post">Update</button>
                    <button class="user-profile-page__delete-btn btn--post">Delete</button>
                    <div class="post-date">Date: ${this._addDate(
                      data.postedDate
                    )}</div>
                </div>
        `;

    this._postsContainerEl.insertAdjacentHTML("afterbegin", markup);
  }

  renderPostMessageInUserProfile() {
    this._clear();
    const markup = `
               <p class="post-message">There is no post found, Please write new post about your mood that How are your feeling now?</p>
        `;

    this._postsContainerEl.insertAdjacentHTML("afterbegin", markup);
  }
}

export default new UserProfilePage();
