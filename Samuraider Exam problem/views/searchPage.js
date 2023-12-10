import { html } from "../node_modules/lit-html/lit-html.js"
import { readList } from "../services/dataService.js";
const searchTemplate = (data) => html`
<section id="search">

<div class="form">
  <h4>Search</h4>
  <form class="search-form" @submit=${onSubmitHandler}>
    <input
      type="text"
      name="search"
      id="search-input"
    />
    <button class="button-list">Search</button>
  </form>
</div>
<h4 id="result-heading">Results:</h4>
<div class="search-result">
  ${data.length > 0 ? data.map((item) => resultTemplate(item)) : html` <h2 class="no-avaliable">No result.</h2>` }
  </div>
       </section>
`
const resultTemplate = (item) => html`
  <!--If there are matches display a div with information about every motorcycle-->
 <div class="motorcycle">
  <img src="${item.imageUrl}" alt="example1" />
  <h3 class="model">${item.model}</h3>
    <a class="details-btn" href="/details/${item._id}">More Info</a>

  </div>`
  let context;
async function searchPage(ctx,next){
    context = ctx
    context.render(searchTemplate([]))
}
async function onSubmitHandler(event){
    event.preventDefault()
    const formData = new FormData(event.target)
    const searchValue = formData.get("search")
    if (searchValue) {
        const data = await readList(searchValue)
        context.render(searchTemplate(data))
    }else{
        window.alert("error")
    }
}

export {
    searchPage
}