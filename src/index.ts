import { Hono } from 'hono'

const app = new Hono()
const lista = ["bro", "dude"]
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
app.get('/lista', (c) => {
  const query = Number(c.req.query("index"))
  if(Number.isInteger(query) && query < lista.length) return c.json(lista[query])
  return c.json(lista)
})
app.post('/lista', async(c) => {
  const body = await c.req.json()
  if(body.data) {
    lista.push(body.data)
    return c.json(lista)
  }
  return c.text("No mandaste 'data'")
})

export default app
