import { toast } from '@redwoodjs/web/toast'

const onSubmit = () => {
  toast.success('A link to reset your password was sent to ')

  window.alert('IT WORKS')
  //navigate(routes.login())
}

export default onSubmit
