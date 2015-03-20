'use strict';
function handleFileSelect(evt) {
  evt.stopPropagation();
  evt.preventDefault();

  var files = evt.dataTransfer.files; // FileList object.
  var textType = /text.*/;
  // files is a FileList of File objects. List some properties.


  var output = [];
  var f=files[0];
  if (f.type.match(textType)) {
    var reader = new FileReader();

    reader.onload = function(e) {
      var dataArr= reader.result.split(/\n|\r|,\n/);
      dataArr=dataArr.slice(1, dataArr.length-1)
      dataArr.forEach(function(element, index, array){
        array[index]=element.replace(/['"]+/g, '');
      })

      //normalize the data using process function in the percolate.js
      var outputData=process(dataArr);
      var outputHTML = [];
      outputData.forEach(function(element){
        outputHTML.push('<p class="record">' + element + '</p>' )
      })
      console.log(outputHTML.length);
      document.getElementById('fileDisplayArea').innerHTML = outputHTML.join('');
    }

  reader.readAsText(f);  
  output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
              f.size, ' bytes, last modified: ',
              f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
              '</li>');
  } else {
    output.push("File not supported!");
  }  

  document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
}

function handleDragOver(evt) {
  evt.stopPropagation();
  evt.preventDefault();
  evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}


if (window.File && window.FileReader && window.FileList && window.Blob) {
    // Setup the dnd listeners.
    var dropZone = document.getElementById('drop_zone');
    dropZone.addEventListener('dragover', handleDragOver, false);
    dropZone.addEventListener('drop', handleFileSelect, false);
} else {
  alert('The File APIs are not fully supported in this browser.');
}