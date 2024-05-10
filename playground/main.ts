import { calculatePatches, createAnimator, diff } from '../packages/core/index'
import { input as _input, output as _output } from '../examples'

let input = _input
let output = _output

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

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function start() {
  typeEl.textContent = input

  const delta = diff(input, output)
  const patches = calculatePatches(delta)
  const animator = createAnimator(input, patches)

  for (const result of animator) {
    typeEl.textContent = result.output
    await sleep(Math.random() * 100)
  }
}

start()
