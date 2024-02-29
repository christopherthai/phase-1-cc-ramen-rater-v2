// index.js

// Callbacks
const handleClick = (ramen) => {

  const ramenImage = document.querySelector('.detail-image')
  const ramenName = document.querySelector('.name')
  const restaurant = document.querySelector('.restaurant')
  const rating = document.querySelector('#rating-display')
  const comment = document.querySelector('#comment-display')

  ramenImage.src = ramen.image
  ramenName.textContent = ramen.name
  restaurant.textContent = ramen.restaurant
  rating.textContent = ramen.rating
  comment.textContent = ramen.comment

};

const addSubmitListener = () => {

  const ramenForm = document.querySelector('#new-ramen')
  const ramenMenu = document.querySelector('#ramen-menu')
  let ramenImage = document.createElement('img')

  ramenForm.addEventListener('submit', (event) => {
    
    event.preventDefault()

    const newRamen = {
        
      "name": event.target.name.value,
      "restaurant": event.target.restaurant.value,
      "image": event.target.image.value,
      "rating": event.target.rating.value,
      "comment": event.target["new-comment"].value

    }

      ramenImage.src = newRamen.image
      ramenImage.id = newRamen.id
      
      ramenImage.addEventListener('click', (event) => {
        event.preventDefault()
        handleClick(newRamen)
      })

      event.target.reset();
      ramenMenu.append(ramenImage)


    fetch("http://localhost:3000/ramens", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
          Accept: "application/json"
      },
      body: JSON.stringify(newRamen)
    })
      .then(response => response.json())
      .then(ramen_data => {
        console.log(ramen_data)
      })
    })
}

const displayRamens = () => {

  const ramenMenu = document.querySelector('#ramen-menu')

  fetch("http://localhost:3000/ramens")
  .then(response => response.json())
  .then(ramen_data => {
    ramen_data.forEach(ramen => {
      
      let ramenImage = document.createElement('img')

      ramenImage.src = ramen.image
      ramenImage.id = ramen.id
      
      ramenImage.addEventListener('click', (event) => {
        event.preventDefault()
        handleClick(ramen)
      })

      ramenMenu.append(ramenImage)
      
    })
  })
};

const main = () => {

  displayRamens()
  addSubmitListener()

}

main()

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
