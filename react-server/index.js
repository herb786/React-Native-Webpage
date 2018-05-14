const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

let items = [
  {id: 1, lang: "Hello World", highlighted: false},
  {id: 2, lang: "Bonjour le monde", highlighted: false},
  {id: 3, lang: "Hallo Welt", highlighted: false},
  {id: 4, lang: "Ciao mondo", highlighted: false},
]
let nextId = 5

app.get('/items.json', (req, res) => res.send(JSON.stringify(items)))

app.post('/items.json', (req, res) => {
  items.push({
    id: nextId,
    lang: req.body.lang,
    highlighted: false
  })
  nextId = nextId + 1;
  res.send(JSON.stringify(items))
})

app.put('/items.json', (req, res) => {
  items.filter((item) => {
    return item.id == req.body.id
  }).forEach((item) => {
    item.highlighted = req.body.highlighted
  });
  res.send(JSON.stringify(items))
})

app.delete('/items.json', (req, res) => {
  items = items.filter((item) => {
    return item.id != req.body.id
  })
  res.send(JSON.stringify(items))
})

app.listen(3000, () => console.log('Listening on port 3000!'))
