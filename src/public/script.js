document.addEventListener("DOMContentLoaded", function(event) {

  const trashButton = document.querySelectorAll('.fa-trash')

  trashButton.forEach((trashCan) => {
    trashCan.addEventListener("click", (event) => {
      let individualReviewChildren = Array.from(event.target.parentNode.children)
      let albumToDeleteId
      let albumToDeleteTitle
        individualReviewChildren.forEach((child) => {
          if(child.className.split(" ")[0] === 'review-id') {
            let reviewToDelete = child.innerHTML
            console.log(reviewToDelete)
            // fetch(`/delete/${reviewToDelete}`, {
            //   method: 'delete',
            //   credentials: 'include',
            // })
          }
        })
      })
    })

});
