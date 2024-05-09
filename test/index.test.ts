import { describe, expect, it } from 'vitest'
import { applyPatches, calculatePatches, diff } from '../src'

const input = `
  patches.push({
    type: 'insert',
    from: index,
    text: change[1],
  })
`

const output = `
  patches.push({
    type: 'removal',
    from: index,
    length: change[1].length,
  })
`

describe('should', () => {
  it('diff', () => {
    const delta = diff(input, output)
    expect(delta).toMatchSnapshot('delta')

    const patches = calculatePatches(delta)
    expect(patches).toMatchSnapshot('patches')

    const applied = applyPatches(input, patches)
    expect(applied).toMatchSnapshot('applied')

    expect(output).toEqual(applied)
  })
})
