import { commands, window } from 'vscode'

export interface Snapshot {
  content: string
  time: number
}

export function activate() {
  window.showInformationMessage('Hi')

  const snapMap = new Map<string, Snapshot[]>()

  commands.registerCommand('retypewriter.snap', () => {
    const doc = window.activeTextEditor?.document
    if (!doc)
      return
    const path = doc.uri.fsPath
    if (!snapMap.has(path))
      snapMap.set(path, [])
    snapMap.get(path)!.push({
      content: doc.getText(),
      time: Date.now(),
    })
  })

  commands.registerCommand('retypewriter.play', () => {
    const doc = window.activeTextEditor?.document
    if (!doc)
      return
    const path = doc.uri.fsPath
    const snaps = snapMap.get(path)
    if (!snaps?.length)
      window.showErrorMessage('No snapshots found')
      // return

    // const lastSnap = snaps[snaps.length - 1]
  })
}

export function deactivate() {

}
