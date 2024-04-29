import { VAlIDATE_INPUTS } from "./helper.js";
import * as model from "./model.js";
import logInPage from "./views/logInPage.js";
import userProfilePage from "./views/userProfilePage.js";
import publicPostsPage from "./views/publicPostsPage.js";
/////////////////////////////////////////

import {
  onSnapshotC,
  collectionC,
  authC,
  dbC,
  queryC,
  whereC,
} from "./model.js";

const firebaseConfig = {
  apiKey: "AIzaSyDqdWS2ROyQr2VobygKtek17uQszt_qQS4",
  authDomain: "moodi-87fe4.firebaseapp.com",
  projectId: "moodi-87fe4",
  storageBucket: "moodi-87fe4.appspot.com",
};

///////////////////////////////////

//============================
//  Controle Logout Views
//  ===========================
// SIGN UP
const controlSignUpView = function () {
  logInPage.renderSignUpView();
};
// SIGN IN
const controlSignInView = function () {
  logInPage.renderSignInView();
};

//==============================
// Control user Account Creation
//==============================
const controlUserAccountCreation = async function (accountData) {
  try {
    //1 Validate Form
    VAlIDATE_INPUTS(accountData);
    //1. Render Spinner
    logInPage.renderSpinner();
    //2. Store Data in State
    model.state.account = accountData;
    //3. Create Account In Firebase
    await model.createNewUserAccount();
    //4. Render SIGN IN View
    logInPage.renderSignInView();
    //5. Render Success Message on Account Creattion
    logInPage.renderSuccessMessageOnAccountCreation();
    //6. Remove Message after 3 seconds
    logInPage.removeSuccessMessage();
  } catch (error) {
    logInPage.renderSignUpErrorView(error.message);
  }
};

const controlSignInAccount = async function (account) {
  try {
    VAlIDATE_INPUTS(account);
    //1. Render Spinner
    logInPage.renderSpinner();
    model.state.account = account;
    await model.signInAccount();
    // Here We will Goto User Profile Page
    logInPage.renderUserProfilePage();
    userProfilePage.renderProfileInfo(authC.currentUser);
    // Initialize Posts Container Element
    userProfilePage.generateParent(function () {
      return document.querySelector(".user-profile-page__posts-container");
    });
    controleFetchDataInRealTime(authC.currentUser);
    // logInView.renderSignInView(model.state);
    // initalize User Profile Listeners
    inituserProfilePageListeners();
    logInPage.renderLogOutBtn()
  } catch (error) {
    logInPage.renderSignInErrorView(error.message);
    console.log("Error");
  }
};
// =================================
// Sign In View
// =================================

const controlSendDataInFirestore = async function (data) {
  try {
    await model.storePostInFirestore(data, authC.currentUser);
    console.log("Data stored successfully! 👍😂😂😂😂");
    controleFetchDataInRealTime(authC.currentUser);
  } catch (error) {
    console.error(error.message);
  }
};

function controleFetchDataInRealTime(user) {
  userProfilePage.renderSpinnerInPostsContainer();
  const postsRef = collectionC(dbC, "posts");
  const q = queryC(postsRef, whereC("uid", "==", user.uid));

  onSnapshotC(q, (querySnapshot) => {
    userProfilePage._clear();
    querySnapshot.forEach((doc) => {
      userProfilePage.renderPostInUserProfile(doc.data(), doc.id);
    });

    if (querySnapshot.empty) {
      userProfilePage.renderPostMessageInUserProfile();
    }
  });
}

function controleFetchDataInRealTimeForPublic(user) {
  publicPostsPage.renderSpinner();
  const postsRef = collectionC(dbC, "posts");
  onSnapshotC(postsRef, (querySnapshot) => {
    publicPostsPage._clear();
    querySnapshot.forEach((doc) => {
      publicPostsPage.renderPostsForPublic(
        doc.data()
      );
    });

    if (querySnapshot.empty) {
      // publicPostsPage.renderPostMessageInUserProfile();
    }
  });
}

controleFetchDataInRealTimeForPublic();

async function controlLogoutAccount() {
  try {
    const state = await model.signoutUserAccount();
    if (state) {
      return controlSignInView;
    }
  } catch (error) {
    console.error(error.message);
  }
}

// =====================================
// Control Update post function takes
// data from logInView and send it to
// UpdatePostInFirebase function
// =====================================
const controlUpdatePost = async function (postContent, postId) {
  try {
    await model.updatePostInFirestore(postContent, postId);
    controleFetchDataInRealTime(authC.currentUser);
  } catch (error) {
    console.error(error.message);
  }
};
// =====================================
// This function takes id form login InView
// and Send it to deletePostFromFirestore function for deletion.
// =====================================
const controlDeletePost = async function (postId) {
  try {
    await model.deletePostFromFirestore(postId);
    controleFetchDataInRealTime(authC.currentUser);
  } catch (error) {
    console.error(error.message);
  }
};
// ========================================================
///////////////////////////////////////////////////

//////////////////////////////

function init() {
  logInPage.signUpViewHandler(controlSignUpView);
  logInPage.signInViewHandler(controlSignInView);
  logInPage.createAccountHandler(controlUserAccountCreation);
  logInPage.signInAccountHandler(controlSignInAccount);
  publicPostsPage.renderLoginPageHandler(controlSignInView);
}
init();

function inituserProfilePageListeners() {
  //User Profile Page Listeners
  userProfilePage.addPostHandler(controlSendDataInFirestore);
  //3. Edit post
  userProfilePage.addEditPostHandler();
  //4. Delete post
  userProfilePage.addDeletePostHandler(controlDeletePost);
  // 5. Update Post
  userProfilePage.addUpdatePostHandler(controlUpdatePost);
  // 6 Log Out user Account
  // logInPage.initialDisplayHandler();
  // userProfilePage.addLogOutAccountHandler([document.querySelector('.log-in-page'), document.querySelector('.user-profile-page'),  contolSignInView]
  // , controlLogoutAccount)

  // 6. Log Out User
  userProfilePage.addLogOutAccountHandler(controlLogoutAccount);
}
