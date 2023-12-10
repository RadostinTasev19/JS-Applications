import { html,render } from "../node_modules/lit-html/lit-html.js"
import { getSearchData } from "../src/userService.js"
const searchTemp = (data,isResult) => html`
 <section id="search">

<div class="form">
  <h2>Search</h2>
  <form class="search-form" @submit=${onSubmitHandler}>
    <input
      type="text"
      name="search"
      id="search-input"
    />
    <button class="button-list">Search</button>
  </form>
</div>
${isResult && resultTemplate(data)}
</section>
   `
const resultTemplate = (items) => html`
<h4>Results:</h4>
${items.length === 0 ? html`<p class="no-result">No result.</p>` : items.map((item)=> fruitCardTemp(item))}
`

const fruitCardTemp = (item) => html`
<div class="search-result">
 <div class="fruit">
  <img src="${item.imageUrl}" alt="example1" />
  <h3 class="title">${item.name}</h3>
  <p class="description">${item.description}</p>
  <a class="details-btn" href="/details/${item._id}">More Info</a>
</div>
  </div>
`
let context;
export function searchPage(ctx,next){
context = ctx
searchManager();

}
 async function onSubmitHandler(event){
    event.preventDefault()
    const searchData = new FormData(event.target)
    const searchValue = searchData.get("search")
    
if (searchValue!== undefined) {
 searchManager(searchValue)
}else{
    window.alert("no input data!")
}
}
async function searchManager(query){
    if (query) {
        const data = await getSearchData(query)
        console.log(data)
        return context.render(searchTemp(data,true))
    }
    context.render(searchTemp())
}