import { onAction } from 'mobx-state-tree'
import { textType } from '@/store/types/elements'

export default (element: textType) => {
  onAction(element, action => {
    const elHTML = document.getElementById(element.id)
    if (!elHTML || !elHTML.firstElementChild) return // error log here

    if (action.name === 'setText') {
      element.style.setStyle({ height: elHTML.firstElementChild.clientHeight })
    } else if (action.name === 'setStyle') {
      if (action.args && action.args.length > 0 && action.args[0].fontSize) {
        setTimeout(() => {
          //@ts-ignore
          element.style.setStyle({ height: elHTML.firstElementChild.clientHeight })
        }, 32)
      }
    }
  })
}
