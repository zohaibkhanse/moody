export default class View {

  _clear() {
    this._parentElement.innerHTML = "";
  }

  renderSpinner() {
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

    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }


 


  
  


}