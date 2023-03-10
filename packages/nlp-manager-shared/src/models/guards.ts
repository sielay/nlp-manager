import { ModelType } from '../types'
import { isItCorpus } from './nlp'

export const guessDataType = (content: unknown, mime: string) => {
  switch (mime) {
    case 'application/json': {
      if (isItCorpus(content)) return ModelType.NLP_CORPUS
    }
  }
  return ModelType.UNKNOWN
}
