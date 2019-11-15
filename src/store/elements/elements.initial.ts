import { elementTypes } from '../constants'

export default {
  params: {
    [elementTypes.text]: {
      type: elementTypes.text,
      editable: true
    },
    [elementTypes.image]: {
      type: elementTypes.image,
      editable: false
    }
  },
  items: []
}
