import TypeIt from 'typeit'
import { calculatePatches } from './src'

let input = `
  patches.push({
    type: 'insert',
    from: index,
    text: change[1],
  })
`

let output = `
  patches.push({
    type: 'removal',
    from: index,
    length: change[1].length,
  })
`

const typeEl = document.getElementById('typeing') as HTMLPreElement
const inputEl = document.getElementById('input') as HTMLTextAreaElement
const outputEl = document.getElementById('output') as HTMLTextAreaElement

inputEl.value = input
outputEl.value = output

inputEl.addEventListener('input', () => {
  input = inputEl.value
})

outputEl.addEventListener('input', () => {
  output = outputEl.value
})

new TypeIt(typeEl, {
  speed: 50,
  startDelay: 900,
})
  .type('the mot versti', { delay: 100 })
  .move(-8, { delay: 100 })
  .type('s', { delay: 400 })
  .move(null, { to: 'START', instant: true, delay: 300 })
  .move(1, { delay: 200 })
  .delete(1)
  .type('T', { delay: 225 })
  .pause(200)
  .move(2, { instant: true })
  .pause(200)
  .move(5, { instant: true })
  .move(5, { delay: 200 })
  .type('a', { delay: 350 })
  .move(null, { to: 'END' })
  .type('le typing utlity')
  .move(-4, { delay: 150 })
  .type('i')
  .move(null, { to: 'END' })
  .type(' on the <span class="place">internet</span>', { delay: 400 })
  .delete('.place', { delay: 800, instant: true })
  .type('<em><strong class="font-semibold">planet.</strong></em>', {
    speed: 100,
  })
  .go()
