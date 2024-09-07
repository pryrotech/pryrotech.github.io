function openNav() {
    document.getElementById("myNav").style.width = "100%";
  }
  
  function closeNav() {
    document.getElementById("myNav").style.width = "0%";
  }

const elementToHide = document.getElementsByClassName('topnav'); // Replace 'elementId' with the actual ID of your element

  if (screen.width > 960) {
      elementToHide.style.display = 'none';
  } else {
      elementToHide.style.display = 'block';
  }