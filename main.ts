import TypeIt from 'typeit'
import { calculatePatches, diff } from './src'

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

inputEl.addEventListener('blur', () => {
  input = inputEl.value
  start()
})

outputEl.addEventListener('blur', () => {
  output = outputEl.value
  start()
})

let typeIt: TypeIt | null = null

function start() {
  if (typeIt)
    typeIt.reset(undefined)

  typeIt = new TypeIt(typeEl, {
    speed: 50,
    startDelay: 500,
  })

  typeIt.type(input, { instant: true })

  const patches = calculatePatches(diff(input, output))
  for (const patch of patches) {
    typeIt.pause(800)
    if (patch.type === 'insert') {
      typeIt
        .move(null, { to: 'START', instant: true })
        .move(patch.from, { instant: true })
        .type(patch.text)
    }
    else {
      typeIt
        .move(null, { to: 'START', instant: true })
        .move(patch.from + patch.length, { instant: true })
        .delete(patch.length)
    }
  }
  typeIt.go()
}

start()
