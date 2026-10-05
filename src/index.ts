import { Hono } from 'hono'

const app = new Hono<{ Bindings: CloudflareBindings }>()

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
app.get('/frutas', async (c) => {
  const index = c.req.query("index")
  if (index) {
    const fruta = await c.env.DB.prepare('SELECT * FROM frutas WHERE id = ?').bind(Number(index)).first()
    return c.json(fruta ?? {}, fruta ? 200 : 404)
  }
  const { results } = await c.env.DB.prepare('SELECT * FROM frutas ORDER BY id').bind().all()
  return c.json(results)
})
app.post('/frutas', async (c) => {
  const body = await c.req.json()
  if (body.fruta) {
    await c.env.DB.prepare('INSERT INTO frutas (nombre) VALUES (?)').bind(body.fruta).run()
    const { results } = await c.env.DB.prepare('SELECT * FROM frutas ORDER BY id').bind().all()
    return c.json(results, 201)
  }
  return c.text("No mandaste 'fruta'")
})

export default app
