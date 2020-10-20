// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import messageBox from '@/util/popup/messageBox'

import equipDetail from '../components/equipDetail.vue'

import compareEquip from '../components/compareEquip.vue'
import Equip from '@/views/game/core/equip'

export function showEquipDialog (equip: Equip): void {
  messageBox.show({
    content: (h: Function) => {
      return h(equipDetail, {
        equip: equip
      })
    }
  })
}

export function showCompareEquipDialog (equip1: Equip | null, equip2: Equip, props: any): void {
  messageBox.show({
    content: (h: Function) => {
      return h(compareEquip, {
        equip1,
        equip2,
        ...props
      })
    }
  })
}

export function hideDialog () {
  messageBox.hide()
}
