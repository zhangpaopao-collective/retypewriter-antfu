import { describe, expect, it } from 'vitest'
import { input, output } from '../examples'
import { applyPatches, calculatePatches, diff } from '../src'

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
