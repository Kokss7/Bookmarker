var bookmarkNameInput=document.getElementById('bookmarkName');
var bookmarkURLInput=document.getElementById('bookmarkURL');
var tableBody=document.getElementById('tableContent');

var siteContainer=[];

if(localStorage.getItem('sites') != null){
siteContainer=JSON.parse(localStorage.getItem('sites'));
displaySite(siteContainer);
}

function addSite(){
    if(validatename(bookmarkNameInput.value)&& validateurl(bookmarkURLInput.value)){
        var site={
            name:bookmarkNameInput.value,
            url:bookmarkURLInput.value
        }
        siteContainer.push(site);
        localStorage.setItem('sites',JSON.stringify(siteContainer))
    
    displaySite(siteContainer);
    clearForm();
    }
    else{
        alert('invalid')
    }

}
function displaySite(arr){
    var cartoona=``;

    for(var i=0;i<arr.length;i++)
    {
        var siteIndex= i +1;

        cartoona +=`  <tr>
        <td>${siteIndex}</td>
        <td>${arr[i].name}</td>
        <td><button type="button" onclick="visitSite('${arr[i].url}')" class="btn btn-danger">Visit</button></td>
        <td><button type="button" onclick="deleteSite(${i});" class="btn btn-warning">Delete</button></td>
        </tr>`
    }
    tableBody.innerHTML=cartoona
}
function clearForm(){
    bookmarkNameInput.value="";
    bookmarkURLInput.value="";
}
function deleteSite(siteIndex){
    
siteContainer.splice(siteIndex,1)
localStorage.setItem('sites',JSON.stringify(siteContainer))

displaySite(siteContainer);
}

function visitSite(url){
    if(url.startsWith('https://')||url.startsWith('http://')){
        window.open(url,"_blank");
    }
    else{
        var url1 = `https://${url}`;
        window.open(url1,"_blank");
    }
}

function validatename(name){
    var nameregex=/\w{3,}$/;
if(nameregex.test(name)){
    bookmarkNameInput.classList.replace('is-invalid','is-valid')
    return true
}
else{
    bookmarkNameInput.classList.add('is-invalid')
    return false
}
}

function validateurl(url){
    var urlregex=/^\w{3,}/;
if(urlregex.test(url)){
    bookmarkURLInput.classList.replace('is-invalid','is-valid')
    return true
}
else{
    bookmarkURLInput.classList.add('is-invalid')
    return false
}
}

