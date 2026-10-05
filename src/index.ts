import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => c.text("Hola desde Hono"))
app.post('/', async (c) => {
  const data = c.req.query("data")
  const frutas = c.req.queries("frutas")
  const body = await c.req.json()

  data ? console.log(c.req.query("data")) : console.log("No hay 'data' en la query")
  frutas ? console.log(c.req.queries("frutas")) : console.log("No hay varias frutas en la query")
  Object.keys(body).length != 0 ? console.log(body) : console.log("No hay body")
  console.log("--------")

  const response = {data, frutas, body}
  return c.json(response)
})

export default app
