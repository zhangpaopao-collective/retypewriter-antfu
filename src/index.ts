import type { Diff } from 'diff-match-patch'
import { diff_match_patch as DMP } from 'diff-match-patch'

export interface InsertPatch {
  type: 'insert'
  from: number
  text: string
}

export interface RemovalPatch {
  type: 'removal'
  from: number
  length: number
}

export type Patch = InsertPatch | RemovalPatch

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
        from: index,
        length: change[1].length,
      })
    }
    else if (change[0] === 1) {
      patches.push({
        type: 'insert',
        from: index,
        text: change[1],
      })
    }
    else {
      throw new Error('unknown change type')
    }
  }
  return patches
}

export function applyPatches(input: string, patches: Patch[]) {
  let added = 0
  let output = input
  for (const patch of patches) {
    const index = patch.from + added
    if (patch.type === 'insert') {
      output = output.slice(0, index) + patch.text + output.slice(index)
      added += patch.text.length
    }
    else {
      output = output.slice(0, index) + output.slice(index + patch.length)
    }
  }

  return output
}
