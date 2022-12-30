import { Corpus } from '../models'
import { Audit, FileLike } from '../types'

export interface NlpManagerBackend {
  getCorpora: () => Promise<Array<Corpus & Audit>>
  getVersion: () => Promise<string>
  importFile: () => Promise<boolean>
  ingestFile: (file: FileLike) => Promise<unknown>
}
