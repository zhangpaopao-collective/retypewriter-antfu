import type { Patch } from './types'

export function* createAnimator(input: string, patches: Patch[]) {
  let _input = input
  for (const patch of patches) {
    if (patch.type === 'insert') {
      for (let i = 0; i < patch.text.length; i++) {
        const index = patch.from + i
        _input = _input.slice(0, index) + patch.text[i] + _input.slice(index)
        yield {
          cursor: index,
          output: _input,
        }
      }
    }
    else {
      for (let i = 0; i < patch.length; i++) {
        const index = patch.from - i
        _input = _input.slice(0, index - 1) + _input.slice(index)
        yield {
          cursor: index,
          output: _input,
        }
      }
    }
  }
}
