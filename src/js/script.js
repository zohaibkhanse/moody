
const signInBtn = document.getElementById('sign-up-view')
const signUpBtn = document.getElementById('sign-in-view')

signInBtn.addEventListener('click', function(e){
    e.preventDefault()
    document.querySelector('.log-out-view__sign-in-view').classList.add('hidden');
    document.querySelector('.log-out-view__sign-up-view').classList.remove('hidden');
})
signUpBtn.addEventListener('click', function(e){
    e.preventDefault()
    document.querySelector('.log-out-view__sign-in-view').classList.remove('hidden');
    document.querySelector('.log-out-view__sign-up-view').classList.add('hidden');
});

