import request from '@/util/request'

export function fetchMessageList () {
  return request.get('/message_board/v1/list')
}

export function submitMessage (data: any) {
  return request.post('/message_board/v1/submit', data)
}

export function removeMessage (id: number) {
  return request.delete(`/message_board/v1/${id}`)
}
