var foodItems=[];
var  foodCal=[];
var time=[];
let g;
var weight;
var height;
var age;
var totalCal
var op;

function sum(a){
  s=0
  for (var i=0;i<a.length;i++){
    s=s+parseInt(a[i]);
  }
  return s
}

function smiley(totalCal,result){

  if (totalCal>=0 && totalCal<=result){
    document.getElementById('comment').innerHTML='Seems stable till now';
    document.getElementById('smiley').innerHTML=' 😋';
  }
  else if (totalCal>result && totalCal<=2*result) {
    document.getElementById('comment').innerHTML='Oops, u exceeded the limit';
    document.getElementById('smiley').innerHTML='😟';
  }
  else if (totalCal>2*result && totalCal<=3*result) {
    document.getElementById('comment').innerHTML='Are u dreaming of becoming FAT';
    document.getElementById('smiley').innerHTML='😰';
  }
  else if(totalCal>3*result){
    document.getElementById('comment').innerHTML="For God's sake stop eating";
    document.getElementById('smiley').innerHTML='💩';
  }


}


// to get date
function getDate(){

  var date = new Date();

    var options = {

        day: "numeric"

    };

  var today=date.toLocaleDateString("en", options);

  return today;

}



var condition=localStorage.getItem('case');
var regDate=localStorage.getItem('date');
console.log(parseInt(regDate)+1);
if (condition!='true'||(parseInt(regDate)+1).toString()===getDate()){
  op=true;
  window.localStorage.setItem('itemFood',foodItems);
  window.localStorage.setItem('itemCal',foodCal);
  window.localStorage.setItem('itemTime',time);

  document.getElementById('resultcal').innerHTML='';
}

else{

  foodItems=(localStorage.getItem('itemFood')).split(',');
  foodCal=(localStorage.getItem('itemCal')).split(',');
  time=(localStorage.getItem('itemTime')).split(',');
  totalCal=sum(foodCal);
  var result=parseInt(localStorage.getItem('calcresut'));
  var resultdesc=localStorage.getItem('resultcal');
  weight=parseInt(localStorage.getItem('regWeight'));
  height=parseInt(localStorage.getItem('regHeight'));
  age=parseInt(localStorage.getItem('regAge'));
  g=localStorage.getItem('regGender');
  op=localStorage.getItem('operation');
  if(g==='male'){

    document.getElementById('male').checked=true;

  }
  else{
    document.getElementById('female').checked=true;
  }

  document.getElementById('inputAge').value=age;
  document.getElementById('inputWeight').value=weight;
  document.getElementById('inputHeight').value=height;

  document.getElementById('resultcal').innerHTML=resultdesc;
}



var getItemFood=(localStorage.getItem('itemFood')).split(',');
var getItemCal=(localStorage.getItem('itemCal')).split(',');
var getItemTime=(localStorage.getItem('itemTime')).split(',');

console.log(foodCal,result);



smiley(totalCal,result);

for(var i=0;i<getItemCal.length;i++){

  MyTable=document.getElementsByTagName('table')[0];


    var NewRow = MyTable.insertRow(1);
    var Newcell1 = NewRow.insertCell(0);
    var Newcell2 = NewRow.insertCell(1);
    var Newcell3 = NewRow.insertCell(2);

    Newcell1.innerHTML = getItemTime[i];
    Newcell2.innerHTML = getItemFood[i];
    Newcell3.innerHTML = getItemCal[i];

}

// to get time
function getTime(){

  var date = new Date();


  var time=date.toLocaleTimeString("en-US");

  return time;

}



// BMR-basal metabolic rate

function BMR(g,weight,height,age){

  if(g==='male'){
    bmr=10*weight + 6.25*height - 5*age + 5;
  }

  else{
    bmr=10*weight + 6.25*height - 5*age - 161;
  }

  return bmr;

}








document.getElementById('male').addEventListener('click',function(){
  g='male';
  window.localStorage.setItem('regGender',g);
})
document.getElementById('female').addEventListener('click',function(){
  g='female';
  window.localStorage.setItem('regGender',g);
})



document.getElementById('result').addEventListener('click',function(){

   weight=parseInt(document.getElementById('inputWeight').value);
   height=parseInt(document.getElementById('inputHeight').value);
   age=parseInt(document.getElementById('inputAge').value);

  window.localStorage.setItem('regWeight',weight);
  window.localStorage.setItem('regHeight',height);
  window.localStorage.setItem('regAge',age);



  result=BMR(g,weight,height,age);
  window.localStorage.setItem('calcresut',result);

  if (op===true){
    resultdes='Hey, u cant eat more than '+result+' calories in a day<i class="fas fa-smile-wink"></i>';
    document.getElementById('resultcal').innerHTML=resultdes;
    window.localStorage.setItem('resultcal',resultdes);
  }

  else{

    alert('You cant change ur details,Dont try to cheat!!!');

  }
op=false;
window.localStorage.setItem('operate',op);


})

document.getElementsByTagName('button')[1].addEventListener('click',function(){

 var item=document.getElementById('inputFood').value;
var cal=document.getElementById('inputFoodcal').value;
if(item===''||cal===''){
  alert('Pls dont leave the column empty');
}





else{

  foodCal.push(cal);
  foodItems.push(item);

time.push(getTime());
var r=true;
var d=getDate();
  window.localStorage.setItem('itemFood',foodItems);
  window.localStorage.setItem('itemCal',foodCal);
  window.localStorage.setItem('itemTime',time);
  window.localStorage.setItem('case',r);
  window.localStorage.setItem('date',d);



  MyTable=document.getElementsByTagName('table')[0];


    var NewRow = MyTable.insertRow(1);
    var Newcell1 = NewRow.insertCell(0);
    var Newcell2 = NewRow.insertCell(1);
    var Newcell3 = NewRow.insertCell(2);

    Newcell1.innerHTML=getTime();
    Newcell2.innerHTML = item;
    Newcell3.innerHTML = cal;

document.getElementById('inputFood').value='';
document.getElementById('inputFoodcal').value='';

totalCal=sum(foodCal);
window.localStorage.setItem('smileyres',totalCal);
console.log(totalCal);

if (totalCal>=result){
  alert('You have reached your limit');

}

}

smiley(totalCal,result);

});
