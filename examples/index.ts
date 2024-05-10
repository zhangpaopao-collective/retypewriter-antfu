export const input = `
  patches.push({
    type: 'insert',
    from: index,
    text: change[1],
  })
`

export const output = `
  patches.push({
    type: 'removal',
    from: index,
    length: change[1].length,
  })
`
