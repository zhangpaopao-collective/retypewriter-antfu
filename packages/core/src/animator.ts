import { calculatePatches, diff } from './patch'
import type { Patch } from './types'

export interface AnimatorStep {
  index: number
  char?: string
  cursor: number
  content: string
}

export function* createAnimator(input: string, patches: Patch[]): Generator<AnimatorStep> {
  let _input = input
  for (let patchIndex = 0; patchIndex < patches.length; patchIndex++) {
    const patch = patches[patchIndex]
    if (patch.type === 'insert') {
      for (let i = 0; i < patch.text.length; i++) {
        const index = patch.from + i
        _input = _input.slice(0, index) + patch.text[i] + _input.slice(index)
        yield {
          index: patchIndex,
          char: patch.text[i],
          cursor: index,
          content: _input,
        }
      }
    }
    else {
      for (let i = 0; i < patch.length; i++) {
        const index = patch.from - i
        _input = _input.slice(0, index - 1) + _input.slice(index)
        yield {
          index: patchIndex,
          cursor: index,
          content: _input,
        }
      }
    }
  }
}

export function simpleAnimator(input: string, output: string) {
  const delta = diff(input, output)
  const patches = calculatePatches(delta)

  return createAnimator(input, patches)
}
