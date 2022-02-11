document.addEventListener('DOMContentLoaded', () => {
    // Functions to open and close a modal
    function openModal($el) {
      $el.classList.add('is-active');
    }
  
    function closeModal($el) {
      $el.classList.remove('is-active');
    }
  
    function closeAllModals() {
      (document.querySelectorAll('.modal') || []).forEach(($modal) => {
        closeModal($modal);
      });
    }
  
    // Add a click event on buttons to open a specific modal
    const modal = document.querySelector(".modal")
    const searchBtn = document.querySelector(".js-modal-trigger")
    const searchResult = document.querySelector('.input')

    searchBtn.addEventListener('click', (e) => {
      e.preventDefault();

      var searchItem = searchResult.value.trim()
      console.log(searchItem)
      
      getMovieInfo(searchItem)

      saveSearch(searchItem);

      // modal.classList.add('is-active')
    });

  
    // Add a click event on various child elements to close the parent modal
    (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
      const $target = $close.closest('.modal');
  
      $close.addEventListener('click', () => {
        closeModal($target);
      });
    });
  
    // Add a keyboard event to close all modals
    document.addEventListener('keydown', (event) => {
      const e = event || window.event;
  
      if (e.keyCode === 27) { // Escape key
        closeAllModals();
      }
    });
  });