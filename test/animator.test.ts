import { describe, expect, it } from 'vitest'
import { input, output } from '../examples'
import { calculatePatches, createAnimator, diff } from '../src'

describe('animator', () => {
  it('animator', () => {
    const delta = diff(input, output)
    const patches = calculatePatches(delta)

    const animator = createAnimator(input, patches)

    expect([...animator]).toMatchInlineSnapshot(`
      [
        {
          "cursor": 35,
          "output": "
        patches.push({
          type: 'inser',
          from: index,
          text: change[1],
        })
      ",
        },
        {
          "cursor": 34,
          "output": "
        patches.push({
          type: 'inse',
          from: index,
          text: change[1],
        })
      ",
        },
        {
          "cursor": 33,
          "output": "
        patches.push({
          type: 'ins',
          from: index,
          text: change[1],
        })
      ",
        },
        {
          "cursor": 32,
          "output": "
        patches.push({
          type: 'in',
          from: index,
          text: change[1],
        })
      ",
        },
        {
          "cursor": 31,
          "output": "
        patches.push({
          type: 'i',
          from: index,
          text: change[1],
        })
      ",
        },
        {
          "cursor": 30,
          "output": "
        patches.push({
          type: '',
          from: index,
          text: change[1],
        })
      ",
        },
        {
          "cursor": 29,
          "output": "
        patches.push({
          type: 'r',
          from: index,
          text: change[1],
        })
      ",
        },
        {
          "cursor": 30,
          "output": "
        patches.push({
          type: 're',
          from: index,
          text: change[1],
        })
      ",
        },
        {
          "cursor": 31,
          "output": "
        patches.push({
          type: 'rem',
          from: index,
          text: change[1],
        })
      ",
        },
        {
          "cursor": 32,
          "output": "
        patches.push({
          type: 'remo',
          from: index,
          text: change[1],
        })
      ",
        },
        {
          "cursor": 33,
          "output": "
        patches.push({
          type: 'remov',
          from: index,
          text: change[1],
        })
      ",
        },
        {
          "cursor": 34,
          "output": "
        patches.push({
          type: 'remova',
          from: index,
          text: change[1],
        })
      ",
        },
        {
          "cursor": 35,
          "output": "
        patches.push({
          type: 'removal',
          from: index,
          text: change[1],
        })
      ",
        },
        {
          "cursor": 64,
          "output": "
        patches.push({
          type: 'removal',
          from: index,
          tex: change[1],
        })
      ",
        },
        {
          "cursor": 63,
          "output": "
        patches.push({
          type: 'removal',
          from: index,
          te: change[1],
        })
      ",
        },
        {
          "cursor": 62,
          "output": "
        patches.push({
          type: 'removal',
          from: index,
          t: change[1],
        })
      ",
        },
        {
          "cursor": 61,
          "output": "
        patches.push({
          type: 'removal',
          from: index,
          : change[1],
        })
      ",
        },
        {
          "cursor": 60,
          "output": "
        patches.push({
          type: 'removal',
          from: index,
          l: change[1],
        })
      ",
        },
        {
          "cursor": 61,
          "output": "
        patches.push({
          type: 'removal',
          from: index,
          le: change[1],
        })
      ",
        },
        {
          "cursor": 62,
          "output": "
        patches.push({
          type: 'removal',
          from: index,
          len: change[1],
        })
      ",
        },
        {
          "cursor": 63,
          "output": "
        patches.push({
          type: 'removal',
          from: index,
          leng: change[1],
        })
      ",
        },
        {
          "cursor": 64,
          "output": "
        patches.push({
          type: 'removal',
          from: index,
          lengt: change[1],
        })
      ",
        },
        {
          "cursor": 65,
          "output": "
        patches.push({
          type: 'removal',
          from: index,
          length: change[1],
        })
      ",
        },
        {
          "cursor": 77,
          "output": "
        patches.push({
          type: 'removal',
          from: index,
          length: change[1].,
        })
      ",
        },
        {
          "cursor": 78,
          "output": "
        patches.push({
          type: 'removal',
          from: index,
          length: change[1].l,
        })
      ",
        },
        {
          "cursor": 79,
          "output": "
        patches.push({
          type: 'removal',
          from: index,
          length: change[1].le,
        })
      ",
        },
        {
          "cursor": 80,
          "output": "
        patches.push({
          type: 'removal',
          from: index,
          length: change[1].len,
        })
      ",
        },
        {
          "cursor": 81,
          "output": "
        patches.push({
          type: 'removal',
          from: index,
          length: change[1].leng,
        })
      ",
        },
        {
          "cursor": 82,
          "output": "
        patches.push({
          type: 'removal',
          from: index,
          length: change[1].lengt,
        })
      ",
        },
        {
          "cursor": 83,
          "output": "
        patches.push({
          type: 'removal',
          from: index,
          length: change[1].length,
        })
      ",
        },
      ]
    `)
  })
})
