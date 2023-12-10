import { html } from "../node_modules/lit-html/lit-html.js"

const homeViewTemplate = () => html`
<section id="home">
          <h1>
            Welcome to <span>Samurider</span> moto market, your premier destination for Japanese motorcycles.</h1>
          <img
            src="./images/motorcycle.png"
            alt="home"
          />

        </section>
`
function homePage(ctx,next){
    ctx.render(homeViewTemplate())
}
export{
    homePage
}