import { html,render } from "../node_modules/lit-html/lit-html.js"
const homePageTemplate = ()=> html`
<section id="home">
          <h1>Learn more about your favorite fruits</h1>
          <img
            src="./images/pexels-pixabay-161559-dImkWBDHz-transformed (1).png"
            alt="home"
          />

        </section>
`
export function homePage(ctx,next){
    ctx.render(homePageTemplate())

    next()
}