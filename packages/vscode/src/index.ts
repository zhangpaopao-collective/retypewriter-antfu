import { Range, Selection, commands, window } from 'vscode'
import { simpleAnimator } from '../../core/index'

export interface Snapshot {
  content: string
  time: number
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function activate() {
  window.showInformationMessage('Welcome to re-typewriter')

  const snapMap = new Map<string, Snapshot[]>()

  let isPlaying: boolean = false

  commands.registerCommand('retypewriter.snap', () => {
    if (isPlaying) {
      window.showErrorMessage('re-typewriter: can not snap when playing')
      return
    }

    const doc = window.activeTextEditor?.document
    if (!doc)
      return
    const path = doc.uri.fsPath
    if (!snapMap.has(path))
      snapMap.set(path, [])
    const snaps = snapMap.get(path)!

    // prevent same snapshot
    if (snaps.length > 0 && snaps[snaps.length - 1].content === doc.getText()) {
      window.showErrorMessage('re-typewriter: Same snapshot')
      return
    }

    snaps!.push({
      content: doc.getText(),
      time: Date.now(),
    })

    window.showInformationMessage(`re-typewriter: snap added (${snaps.length})`)
  })

  commands.registerCommand('retypewriter.play', async () => {
    if (isPlaying) {
      window.showErrorMessage('re-typewriter: can not snap when playing')
      return
    }

    const editor = window.activeTextEditor
    const doc = editor?.document

    if (!doc || !editor)
      return

    const path = doc.uri.fsPath
    const snaps = snapMap.get(path)

    if (!snaps?.length) {
      window.showErrorMessage('No snapshots found')
      return
    }

    isPlaying = true

    const lastSnap = snaps[snaps.length - 1]

    // save current text to be last snapshot
    if (lastSnap.content !== doc.getText()) {
      snaps!.push({
        content: doc.getText(),
        time: Date.now(),
      })
    }

    window.showInformationMessage('re-typewriter: Playing')

    let lastContent: string | undefined
    for (const snap of snaps) {
      if (!lastContent) {
        lastContent = snap.content
        // clear current editor before playing
        await editor.edit((edit) => {
          edit.replace(
            new Range(0, 0, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY),
            lastContent!,
          )
        })
        continue
      }

      const animator = simpleAnimator(lastContent, snap.content)
      let lastIndex = 0
      for (const result of animator) {
        // sleep more when switch to next patch
        if (lastIndex !== result.patchIndex)
          await sleep(600)

        const pos = doc.positionAt(result.cursor)
        editor.selection = new Selection(pos, pos)
        await editor.edit((edit) => {
          if (result.char != null)
            edit.insert(pos, result.char)

          else
            edit.delete(new Range(doc.positionAt(result.cursor - 1), pos))
        })
        await sleep(Math.random() * 60 + 40)
        lastIndex = result.patchIndex
      }

      lastContent = snap.content
    }

    isPlaying = false
    window.showInformationMessage('re-typewriter: Finished')
  })
}

export function deactivate() {

}
