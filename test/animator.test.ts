import { describe, expect, it } from 'vitest'
import { input, output } from '../examples'
import { calculatePatches, createAnimator, diff } from '../src'

describe('animator', () => {
  it('animator', () => {
    const delta = diff(input, output)
    const patches = calculatePatches(delta)

    const animator = createAnimator(input, patches)

    expect([...animator]).toMatchSnapshot()
  })
})
