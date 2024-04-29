import view from "./view.js";

class LogInPage extends view {
  _userProfilePageParent = document.querySelector(".user-profile-page");
  _parentElement = document.querySelector(".log-in-page");
  _inputMessageEl = document.querySelector(".input-message");
  _accountCreationSuccessMessage = "Account created successfully!";
  _logOutBtnEl = document.querySelector('.user-profile-page__log-out--btn')

  ////////////////////////////////////

  signUpViewHandler(handler) {
    this._parentElement.addEventListener("click", function (e) {
      if (e.target.closest("#sign-up-view")) {
        e.preventDefault();
        handler();
      }
    });
  }

  // Handlers

  signInViewHandler(handler) {
    this._parentElement.addEventListener("click", function (e) {
      e.preventDefault();
      if (e.target.closest("#sign-in-view")) {
        e.preventDefault();
        handler();
      }
    });
  }

  createAccountHandler(handler) {
    this._parentElement.addEventListener("click", function (e) {
      if (e.target.closest("#create-account")) {
        e.preventDefault();
        console.log(e.target.closest("#form-2"));
        const data = [...new FormData(e.target.closest("#form-2"))];
        console.log(data);
        const objData = Object.fromEntries(data);
        handler(objData);
      }
    });
  }

  signInAccountHandler(handler) {
    this._parentElement.addEventListener("click", function (e) {
      e.preventDefault();
      if (e.target.closest("#log-in")) {
        e.preventDefault();
        const data = [...new FormData(e.target.closest("#form-1"))];
        const objData = Object.fromEntries(data);
        handler(objData);
      }
    });
  }

  renderLogOutBtn(){
    this._logOutBtnEl.classList.remove('hidden');
  }

  renderUserProfilePage() {
    this._userProfilePageParent.classList.remove("hidden");
    this._parentElement.classList.add("hidden");
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }

  renderSignInView() {
    this._clear();
    const markup = `
        <form class="log-in-page__sign-in-view" id="form-1">
          <div class="container log-in-page--container">
                <h1 class="log-in-page__sign-in-view-title title">Log in</h1>
                <label for="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Write your email"
                />
                <label for="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Write your password"
                  />
                <button type="submit" class="btn btn--sign-in btn--primary" id="log-in">
                  Sign In
                </button>
                <button class="btn btn--sign-up btn--primary" id="sign-up-view">
                  Sign Up
                </button>
            </div>
        </form>
          `;
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderSignUpView() {
    this._clear();
    const markup = `
         <form class="log-in-page__sign-up-view" id="form-2">
            <div class="container log-in-page--container">
                <h1 class="log-in-page__sign-up-view-title title">sign up</h1>
                <label for="userName">Full Name</label>
                <input
                  type="text"
                  id="userName"
                  name="userName"
                  placeholder="User name"
                  reqired
                />
                <label for="pictureURl">Picture URL</label>
                <input
                  type="url"
                  id="pictureURL"
                  name="pictureURL"
                  placeholder="Your picture URL"
                  reqired
                />
                <label for="email">Email</label>
                <input type="email" id="email" name="email" placeholder="email" reqired />
                <label for="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="password"
                  reqired
                />
                <button class="btn btn--sign-up btn--primary" id="create-account">Sign Up</button>
                <button class="btn btn--sign-in btn--primary" id="sign-in-view">
                  Sign in
                </button>
            </div>
        </form>
          `;

    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
  renderSignUpErrorView(message) {
    this._clear();
    const markup = `
      <form class="log-in-page__sign-up-view" id="form-2">
      <div class="container log-in-page--container">
        <h1 class="log-in-page__sign-up-view-title title">sign up</h1>
        <label for="userName">Full Name</label>
        <input
          type="text"
          id="userName"
          name="userName"
          placeholder="User name"
          reqired
        />
          ${
            message === "name"
              ? `<p class="error-message">* User name field should not empty</p>`
              : ""
          }
          <label for="pictureURl">Picture URL</label>
          <input
            type="url"
            id="pictureURL"
            name="pictureURL"
            placeholder="Your picture URL"
            reqired
          />
          <label for="email">Email</label>
          <input type="email" id="email" name="email" placeholder="email" reqired />
          ${
            message === "Firebase: Error (auth/email-already-in-use)."
              ? '<p class="error-message">* Email already in use. Please try with another email.</p>'
              : ""
          }
          ${
            message === "name"
              ? '<p class="error-message">* Email field should not empty</p>'
              : ""
          }
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="password"
            reqired
          />
          ${
            message ===
            "Firebase: Password should be at least 6 characters (auth/weak-password)."
              ? '<p class="error-message">* Password at least 6 characters long.</p>'
              : ""
          }
          ${
            message === "name"
              ? '<p class="error-message">* Password field should not empty.</p>'
              : ""
          }
  
  
          <button class="btn btn--sign-up btn--primary" id="create-account">Sign Up</button>
          <button class="btn btn--sign-in btn--primary" id="sign-in-view">
            Sign in
          </button>
      </div>
  </form>
          `;

    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderSignInErrorView(message) {
    this._clear();
    const markup = `
          <form class="log-in-page__sign-in-view" id="form-1">
          <div class="container log-in-page--container">
                <h1 class="log-in-page__sign-in-view-title title">Log in</h1>
                <label for="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Write your email"
                />
                  ${
                    message === "Firebase: Error (auth/invalid-email)."
                      ? '<p class="error-message">* Invalid email</p>'
                      : ""
                  }
                  ${
                    message === "name"
                      ? '<p class="error-message">* Email field should not empty.</p>'
                      : ""
                  }
                  <label for="password">Password</label>
                  <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Write your password"
                  reqired
                  />
                  ${
                    message === "Firebase: Error (auth/invalid-credential)."
                      ? '<p class="error-message">* Invalid password.</p>'
                      : ""
                  }
                  ${
                    message === "name"
                      ? '<p class="error-message">* Password field should not empty.</p>'
                      : ""
                  }
                  
                  <button type="submit" class="btn btn--sign-in btn--primary" id="log-in">
                  Sign In
                </button>
                <button class="btn btn--sign-up btn--primary" id="sign-up-view">
                  Sign Up
                </button>
            </div>
        </form>
          `;
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderSuccessMessageOnAccountCreation(
    message = this._accountCreationSuccessMessage
  ) {
    this._inputMessageEl.classList.remove("hide-message");
    this._inputMessageEl.textContent = message;
  }
  removeSuccessMessage() {
    setTimeout(() => {
      this._inputMessageEl.classList.add("hide-message");
    }, 4000);
  }

  renderInputError(message = this._inputErrorMessage) {
    this._inputMessageEl.textContent = message;
    this._inputMessageEl.classList.remove("hide-message");
  }
}

export default new LogInPage();
