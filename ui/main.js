var btn = document.getElementById('counter-btn');
btn.onclick = function (){
    var request = new XMLHttpRequest();
    request.open('GET','http://localhost:8080/counter',true);
    request.send();
    request.onreadystatechange = function(){
      if (request.readyState == 4)
      if (request.status == 200){
        var counter = document.getElementById('counter');
        counter.innerHTML=request.responseText;
      }
    }
};
var submitBtn = document.getElementById('submit-btn');
var nameInput = document.getElementById('name');

submitBtn.onclick = function (){
  //Send new name to the server and get namelist as response
  var name = nameInput.value;
  var request = new XMLHttpRequest();
  request.open('GET','http://localhost:8080/submit-name?name='+name,true);
  request.send(null);
  request.onreadystatechange = function(){
    if (request.readyState == XMLHttpRequest.DONE)
      if (request.status == 200){
        var names = JSON.parse(request.responseText);
        //Update the HTML doc
        var list = ''; //converting to string
        for (var i=0;i<names.length;i++)
        list += '<li>'+names[i]+'</li>';
        var namelist = document.getElementById('namelist');
        namelist.innerHTML = list;
      }
  }
};
