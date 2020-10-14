
import request from '@/util/request'

export function fetchUserList () {
  return request.get('/user/v1/list')
}
