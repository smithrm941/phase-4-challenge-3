document.addEventListener("DOMContentLoaded", function(event) {

  const trashButton = document.querySelectorAll('.fa-trash')

  trashButton.forEach((trashCan) => {
    trashCan.addEventListener("click", (event) => {
    let individualReviewChildren = Array.from(event.target.parentNode.children)
      individualReviewChildren.forEach((child) => {
        if(child.className.split(" ")[0] === 'review-id') {
          let reviewToDelete = child.innerHTML
          let confirmedDelete = confirm('Are you sure you want to delete this review?')
          if(confirmedDelete) {
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
  
});
