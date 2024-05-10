import { diff_match_patch as DMP } from 'diff-match-patch'

import type { Diff } from 'diff-match-patch'
import type { Patch } from './types'

export function diff(a: string, b: string): Diff[] {
  const differ = new DMP()
  const delta = differ.diff_main(a, b)
  differ.diff_cleanupSemantic(delta)
  return delta
}

export function calculatePatches(diffs: Diff[]): Patch[] {
  const patches: Patch[] = []
  let index = 0

  for (const change of diffs) {
    if (change[0] === 0) {
      index += change[1].length
    }
    else if (change[0] === -1) {
      patches.push({
        type: 'removal',
        // delete from back to front
        from: index + change[1].length,
        length: change[1].length,
      })
    }
    else if (change[0] === 1) {
      patches.push({
        type: 'insert',
        from: index,
        text: change[1],
      })
      index += change[1].length
    }
    else {
      throw new Error('unknown change type')
    }
  }
  return patches
}

export function applyPatches(input: string, patches: Patch[]) {
  let output = input

  for (const patch of patches) {
    const index = patch.from
    if (patch.type === 'insert')
      output = output.slice(0, index) + patch.text + output.slice(index)
    else
      output = output.slice(0, index - patch.length) + output.slice(index)
  }

  return output
}
