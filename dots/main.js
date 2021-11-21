document.querySelector(".btn").addEventListener("click", () => {
  const text = document.querySelector(".input").value.replace(' ', '');
  var length = 0;
  var arr = [...text];
  var persianLetters = Object.entries(obj).splice(0, 33);
  arr.forEach((w, i) => {
    if( w === 'ی' && arr[i+1] ) {
      const isPersian = persianLetters.filter( p => p[0] === arr[i+1] );
      if( isPersian.length ) {
        length += 2;
      }
    } else {
      
      obj[w] && (length += (obj[w]*1));
    }
  });
  document.querySelector(".result").innerHTML = length;
});