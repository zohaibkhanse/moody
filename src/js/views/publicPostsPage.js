import view from "./view.js";
class PublicPostsPage extends view {
  _parentElement = document.querySelector(".public-posts-page");
  _logInPageBtn = document.querySelector(".public-posts-page__log-in--btn");
  _logInPageEl = document.querySelector(".log-in-page");
  _headerEl = document.querySelector('.header')

  _hidePublicPostsPageAndShowLogInPage(handler) {
    this._parentElement.classList.add("hidden");
    this._logInPageEl.classList.remove("hidden");
    handler();
    this._logInPageBtn.classList.add('hidden');
  }

  
  renderLoginPageHandler(handler) {
    this._logInPageBtn.addEventListener(
      "click",
      this._hidePublicPostsPageAndShowLogInPage.bind(this, handler)
    );
  }

  renderPostsForPublic(data) {
    const markup = `
                    <div class="user-profile-page__post">
                    <figure class="post-user-info"> <img src="${
                      data.userPhotoURL ||
                      "./src/image/user-profile-svgrepo-com.svg"
                    }"> ${data.userName} </figure>    
                    <p class="user-profile-page__post-paragraph">
                       ${data.body}
                        </p>
                        <div class="post-date">Date: ${this._addDate(
                          data.postedDate
                        )}</div>
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
}

export default new PublicPostsPage();
