/************************************JQUERY ASSESMENT*****************************************************************/
/************************************Variables Declaration************************************************************/
var array=[]
var array2=[]
var array3=[]
var wrongObjs=[]
var parent=$("#parent")
var attempt=$("span")
var btn2=$("#sub2")
var btn=$("#sub1")
/***********************************Start Function********************************************************************/
start()
/***********************************Functions Declaration*************************************************************/
function start(){
    clrRdm()
    printArray(array)
    button1Click()
    button2Click()
}
/***********************************Random Colors Generation************************************************************/
function clrRdm(){
    for(j=0;j<10;j++){
    var obj={
        clrs:[],
        pclr:"",
        flag: false
    }
    for(i=0;i<3;i++){
        var r=Math.floor(Math.random()*256);
        var g=Math.floor(Math.random()*256);
        var b=Math.floor(Math.random()*256);
        var clr= "rgb(" + r + ", " + g + ", " + b + ")";
        obj.clrs[i]=clr;
    }
    var ran =Math.floor(Math.random()*3);
    obj.pclr=obj.clrs[ran]
    array.push(obj)
 }
}
/***********************************Printing the colors****************************************************************/
function printArray(arr1){

    for(i=0;i<arr1.length;i++){
        var child=$("<div></div>")
        child.addClass("row")
        parent.append(child)
        child.html("<b class='align'>"+arr1[i].pclr+"</b>")
        for(j=0;j<3;j++){
          
           var span=$("<div></div>")
           var select=$("<input type='radio' class='space'>")
           var ids="id"+i;
           select.attr("name",ids)
           span.addClass("color");
           span.css("backgroundColor",arr1[i].clrs[j])
           child.append(select)
           child.append(span)
        }
    }
}
/***********************************Function to click the first submit button*****************************************/
function button1Click(){
    btn.on("click",function(){
        var rbs=$("input[type=radio]")
        attempt.text("Attempt2")
        for(i=0;i<rbs.length;i++){
            if(rbs[i].checked){
                var row=Math.floor(i/3);
                var col;
                    if(i%3==1){
                        col=1;    
                    }
                    else if(i%3==2){
                        col=2;
                    }
                    else{
                        col=0
                    }
                    sts(row,col,array)
            }
            
        }
        wrong()
        printArray(array2)
        btn.css("display","none")
        btn2.css("display","block")
        var percent=(array3.length/array.length)*100
        $("#prg").text("Progress: "+percent+"%")   
    })
}
/***********************************Function to click the second submit button*******************************************/
function button2Click(){
    btn2.on("click",function(){
        var rbs2=$("input[type=radio]")
        for(i=0;i<rbs2.length;i++){
            if(rbs2[i].checked){
                var row1=Math.floor(i/3);
                    if(i%3==1){
                        var col1=1;    
                    }
                    else if(i%3==2){
                        var col1=2;
                    }
                    else{
                            col1=0
                    }
                    sts(row1,col1,array2)
            }
            
        }
        wrong2()
        display()
        parent.html("")
        btn2.css("display","none")
        
    })
}
/***********************************Function to filter the wrong answers************************************************/
function wrong(){
    var clrObj;
    for(i=0;i<array.length;i++){
        if(array[i].flag=false){
            clrObj=array[i]
            array2.push(clrObj)
        }
        else{
            clrObj=array[i]
            array3.push(clrObj)
        }
    }
}
/***********************************Function to filter the wrong answers in attempt2************************************/
function wrong2(){
    var clrObjs=[]
    for(i=0;i<array2.length;i++){
        if(array2[i].flag===true){
            clrObjs.push(array2[i])
        }
        else{
            wrongObjs.push(array2[i])
        }
    }
    crct(clrObjs)
}
/***********************************Function to get the correct answers**************************************************/
function crct(clrObjs){
    for(i=0;i<clrObjs.length;i++){
        array3.push(clrObjs[i])
    }
}
/***********************************Function to Display Lists***********************************************************/
function display(){
    var list1=$("#ul1")
    list1.html("<b id='green'>Correct</b>")
    var list2=$("#ul2")
    list2.html("<b id='red'>wrong</b>")
    attempt.text("")
    var percent=(array3.length/array.length)*100
    $("#prg").text("Progress: "+percent+"%")
    printUl(array3,list1)
    printUl(wrongObjs,list2)
}
/*********************************************COMPLETED********************************************************************/