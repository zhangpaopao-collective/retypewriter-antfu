import { Position, Range, Selection, commands, window } from 'vscode'
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

  commands.registerCommand('retypewriter.snap', () => {
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

    window.showInformationMessage(`re-typewriter: snap added ${snaps.length}`)
  })

  commands.registerCommand('retypewriter.play', async () => {
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

    const lastSnap = snaps[snaps.length - 1]

    // save current text to be last snapshot
    if (lastSnap.content !== doc.getText()) {
      snaps!.push({
        content: doc.getText(),
        time: Date.now(),
      })
    }

    window.showInformationMessage('re-typewriter: Playing')

    // clear current editor before playing
    editor.edit((edit) => {
      edit.replace(
        new Range(0, 0, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY),
        '',
      )
    })

    let lastContent: string | undefined
    for (const snap of snaps) {
      if (!lastContent) {
        lastContent = snap.content
        continue
      }

      const animator = simpleAnimator(lastContent, snap.content)

      for (const result of animator) {
        const pos = doc.positionAt(result.cursor)
        // if (result.char != null) {
        //   editor.edit((edit) => {
        //     edit.insert(pos, result.char!)
        //   })
        // }
        // else {
        //   editor.edit((edit) => {
        //     edit.delete(new Range(doc.positionAt(result.cursor - 1), pos))
        //   })
        // }
        editor.edit((edit) => {
          edit.replace(
            new Range(0, 0, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY),
            result.content,
          )
        })
        editor.selection = new Selection(pos, pos)
        await sleep(Math.random() * 100)
      }

      lastContent = snap.content
    }

    window.showInformationMessage('re-typewriter: Finished')
  })
}

export function deactivate() {

}
