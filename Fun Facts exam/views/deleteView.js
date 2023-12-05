import { deleteFact } from "../src/userService.js"
export async function deleteView(ctx){
    const id = ctx.params.id
    await deleteFact(id)
}