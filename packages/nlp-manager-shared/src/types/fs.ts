import { Corpus } from '../models/nlp/corpus/types'
import { ModelType } from './models'

export type FileLikeData = string | ArrayBuffer | null | undefined

interface BaseFileLike<T extends ModelType, D> {
  name: string
  mimeType: string
  type: T
  content: D
}

export type FsFileLike = BaseFileLike<ModelType.UNKNOWN, FileLikeData>
export type CorpusFile = BaseFileLike<ModelType.NLP_CORPUS, Corpus>
export type FileLike = FsFileLike | CorpusFile
