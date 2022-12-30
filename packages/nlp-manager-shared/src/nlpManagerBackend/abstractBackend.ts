import { getCorpora, insertCorpus } from '../models/nlp/corpus/model'
import { FileLike, ModelType } from '../types'
import { NlpManagerBackend } from './types'

export const abstractBackend: NlpManagerBackend = {
  getCorpora,
  getVersion: async () => await Promise.resolve('0.1.0-abstract'),
  importFile: async () => await Promise.reject('Abstract'),
  ingestFile: async (file: FileLike): Promise<boolean> => {
    switch (file.type) {
      case ModelType.NLP_CORPUS: {
        await insertCorpus(file)
        return true
      }
    }
    return false
  }
}
