/**
 * @Author: Erik Slovak <erik.slovak@technologystudio.sk>
 * @Date: 2023-04-14T18:04:40+02:00
 * @Copyright: Technology Studio
**/

import { useLoader } from '@react-three/fiber'
import {
  Loader,
  type LoadingManager,
} from 'three'
import {
  Font,
} from 'three-stdlib'
import { Text } from 'troika-three-text'

type FontData = (typeof Font)['prototype']['data']

class TTFGlyphLoader extends Loader<THREE.Mesh> {
  json: FontData | null
  constructor (manager: LoadingManager | undefined) {
    super(manager)
    this.json = null
  }

  load (
    character: string,
    onLoad?: (mesh: THREE.Mesh) => void,
    onProgress?: (event: ProgressEvent) => void,
    onError?: (event: ErrorEvent) => void,
  ): void {
    if (this.json == null) {
      onError?.(new Error('Missing FontData JSON.') as unknown as ErrorEvent)
      return
    }
    // TODO: remove when https://github.com/protectwise/troika/pull/273 is merged
    /* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */
    const textMesh = new Text()
    textMesh.text = character
    textMesh.font = new Font(this.json)
    textMesh.fontSize = 10
    textMesh.depthOffset = 2
    textMesh.sdfGlyphSize = 0
    textMesh.sync(() => {
      onLoad?.(textMesh)
    })
    /* eslint-enable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */
  }

  async loadAsync (
    character: string,
    onProgress?: (event: ProgressEvent) => void,
  ): Promise<THREE.Mesh> {
    return await super.loadAsync(character, onProgress)
  }

  parse (mesh: THREE.Mesh): THREE.Mesh {
    return mesh
  }

  setJson (json: FontData): void {
    this.json = json
  }
}

const extensionsFactory = (json: FontData) =>
  (loader: Loader) => {
    (loader as TTFGlyphLoader).setJson(json)
  }

export const useTTFGlyph = (character: string, json: FontData): THREE.Mesh => {
  const mesh = useLoader(TTFGlyphLoader, character, extensionsFactory(json))
  return mesh
}
