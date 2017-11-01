document.addEventListener('DOMContentLoaded', () => {
  const trashButton = document.querySelectorAll('.fa-trash')
  trashButton.forEach((trashCan) => {
    trashCan.addEventListener('click', (event) => {
      const individualReviewChildren = Array.from(event.target.parentNode.children)
      individualReviewChildren.forEach((child) => {
        if (child.className.split(' ')[0] === 'review-id') {
          const reviewToDelete = child.innerHTML // check if should change back to let
          const confirmedDelete = confirm('Are you sure you want to delete this review?')
          if (confirmedDelete) {
            return fetch(`reviews/delete/${reviewToDelete}`, {
              method: 'delete',
              credentials: 'include',
            }).then(() => {
              location.reload()
            })
          }
        }
      })
    })
  })
})
