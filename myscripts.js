
//Funkcja ustawiająca pionki na tablicy, wykonywana na początku gry oraz po jej zakończeniu
function przenies()
{
    for(var i=0;i<8;i++)
    {
        for(var j=0;j<8;j++)
        {
            if(document.getElementById("c"+i+j).firstChild)
            {
                document.getElementById("c"+i+j).removeChild((document.getElementById("c"+i+j)).firstChild);
            }
        }
    }
    var o=0;
    for(i=0;i<8;i++)
    {
        for(j=0;j<8;j++)
        {
            if((((i+j)%2)==1)&&(i<3))
            {
                document.getElementById("c"+i+j).innerHTML='<img src="./images/czarny.png" id="cz'+o+'" alt="czarny_pionek" class="pionek_c" ondragstart="ondragg(event)">';
                o++
            }
            if((((i+j)%2)==1)&&(i>4))
            {
                document.getElementById("c"+i+j).innerHTML='<img src="./images/bialy.png" id="bi'+o+'" alt="bialy_pionek" class="pionek_b" ondragstart="ondragg(event)">';
                o++
            }
        }
    }
    document.getElementById("przycisk").style.visibility="hidden";
    document.getElementById("koniec").innerHTML="";
}
var aktualnatura=0;
przenies();
var iddam=0;
//Funkcja zamieniająca zwykłe pionki na damy
function czydama()
{
    var x = document.createElement('img');
    var y = document.createElement('img');
    for(var j=1;j<8;j=j+2)
    {
        if(document.getElementById("c0"+j).firstChild)
        {
            if((((document.getElementById("c0"+j)).firstChild).id).slice(0,2)=="bi")
            {
                document.getElementById("c0"+j).removeChild((document.getElementById("c0"+j)).firstChild);
                x.setAttribute("src", "./images/bialadama.png");
                x.setAttribute("id", "damabia"+iddam);
                x.setAttribute("class", "damabial");
                x.setAttribute("ondragstart", "ondragg(event)");
                iddam++;
                document.getElementById("c0"+j).appendChild(x);
            }
        }
    }
    for(var j=0;j<8;j=j+2)
    {
        if(document.getElementById("c7"+j).firstChild)
        {
            if((((document.getElementById("c7"+j)).firstChild).id).slice(0,2)=="cz")
            {
                document.getElementById("c7"+j).removeChild((document.getElementById("c7"+j)).firstChild);
                y.setAttribute("src", "./images/czarnadama.png");
                y.setAttribute("id", "damacza"+iddam);
                y.setAttribute("class", "damaczar");
                y.setAttribute("ondragstart", "ondragg(event)");
                iddam++;
                document.getElementById("c7"+j).appendChild(y);
            }
        }
    }
}
//Funkcja sprawdzajaca czy obydwa kolory mają chociaż jednego pionka, Jeśli nie - kończy grę.
function czykoniec()
{
    var biale=0;
    var czarne=0;
    for(var i=0;i<8;i++)
    {
        for(var j=0;j<8;j++)
        {
            if(document.getElementById("c"+i+j).firstChild)
            {
                if(((document.getElementById("c"+i+j).firstChild).id).slice(0,2)=="bi") biale++;
                if(((document.getElementById("c"+i+j).firstChild).id).slice(0,2)=="cz") czarne++;
            }
        }
    }
    if(biale==0||czarne==0)
    {
        document.getElementById("przycisk").style.visibility="visible";
        document.getElementById("koniec").innerHTML="Rozgrywka zakończona. Wciśnij przycisk by znów zagrać."
    }
}
function allowDrop(ev) 
{
    ev.preventDefault();
}
function ondragg(ev)
{
    if((((ev.target.id).slice(0,2)=="cz") || ((ev.target.id).slice(0,5)=="damac" ) )&&(aktualnatura%2==1))
    {
        ev.dataTransfer.setData("text", ev.target.id);
        ev.dataTransfer.setData("ij", ((ev.target).parentElement).id);
    }
    if((((ev.target.id).slice(0,2)=="bi") || ((ev.target.id).slice(0,5)=="damab" ) )&&(aktualnatura%2==0))
    {
        ev.dataTransfer.setData("text", ev.target.id);
        ev.dataTransfer.setData("ij", ((ev.target).parentElement).id);
    }
    
}
function dropp(ev)
{
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    //dwie linijki ponizej to otrzymanie C IJ czyli koordynatow
    var kwadratA = ev.dataTransfer.getData("ij");
    var kwadratA_i = kwadratA.slice(1,2);
    var kwadratA_j = kwadratA.slice(2,3);
    if(((document.getElementById(ev.target.id).id).slice(0,2)=="bi")||((document.getElementById(ev.target.id).id).slice(0,2)=="cz")||((document.getElementById(ev.target.id).id).slice(0,5)=="damac")||((document.getElementById(ev.target.id).id).slice(0,5)=="damab")) 
    {
        //numer na ktory przesuwamy
    }
    else
    {
        //ID na to co przenosimy
        var kwadratB=ev.target.id;
        var kwadratB_i=kwadratB.slice(1,2);
        var kwadratB_j=kwadratB.slice(2,3);
        kwadratA_i=parseInt(kwadratA_i);
        kwadratA_j=parseInt(kwadratA_j);
        kwadratB_i=parseInt(kwadratB_i);
        kwadratB_j=parseInt(kwadratB_j);
        //Ruszanie dla czarnych bez bicia
        if(data.slice(0,2)=="cz")
        {
            if(((kwadratB_i-1)==kwadratA_i)&&(((kwadratB_j-1)==kwadratA_j)||((kwadratB_j+1)==kwadratA_j)))
            {
                ev.target.appendChild(document.getElementById(data));
                aktualnatura++;
                czydama();
            }
        }
        //Ruszanie dla białych bez bicia
        if(data.slice(0,2)=="bi")
        {
            
            if(((kwadratB_i+1)==kwadratA_i)&&(((kwadratB_j-1)==kwadratA_j)||((kwadratB_j+1)==kwadratA_j)))
            {
                aktualnatura++;
                ev.target.appendChild(document.getElementById(data));
                czydama();
            }
        }

        //TUTAJ ZRÓB PORUSZANIE Z BICIEM DLA PIONKÓW
        if(data.slice(0,2)=="bi"||data.slice(0,2)=="cz")
        {
            if((((kwadratB_i-2)==kwadratA_i)||((kwadratB_i+2)==kwadratA_i))&&(((kwadratB_j-2)==kwadratA_j)||((kwadratB_j+2)==kwadratA_j)))
            {
                //tutaj znajdź kwadrat C
                var kwadratC="";
                var kwadratC_i=0;
                var kwadratC_j=0;
                if(kwadratA_i>kwadratB_i) 
                {
                    kwadratC_i=(kwadratA_i-1);
                }
                else
                {
                    kwadratC_i=(kwadratB_i-1);
                }
                if(kwadratA_j>kwadratB_j) 
                {
                    kwadratC_j=(kwadratA_j-1);
                }
                else
                {
                    kwadratC_j=(kwadratB_j-1);
                }
                if((document.getElementById("c"+kwadratC_i+kwadratC_j)).firstChild)
                {
                    if((((document.getElementById("c"+kwadratC_i+kwadratC_j).firstChild).id).slice(0,2))!=(data.slice(0,2)))
                    {
                    document.getElementById("c"+kwadratC_i+kwadratC_j).removeChild((document.getElementById("c"+kwadratC_i+kwadratC_j).firstChild));
                    aktualnatura++;
                    ev.target.appendChild(document.getElementById(data));
                    }
                }
            }
            
        }
        //TUTAJ ZROBIĆ PORUSZANIE Z BICIEM DLA DAM
        if((data.slice(0,5)=="damab") || (data.slice(0,5)=="damac"))
        {
            var innedziecko=0;
            var madziecko=0;
            var kwadratD_i=0;
            var kwadratD_j=0;
            //w ktora strone sie poruszamy
            var ruchi=kwadratB_i-kwadratA_i;
            var ruchj=kwadratB_j-kwadratA_j;
            //ruch do 7 zrobmy
            if((Math.abs(ruchi))==(Math.abs(ruchj)))
            {
                //okresla strone w ktora porusza sie dama
                var strona;
                var turaI=0;
                var turaJ=0;
                if(ruchi<0)
                {
                    if(ruchj<0)
                    {
                        strona=1;
                        turaI=10;
                        turaJ=10;
                        for(var i=(kwadratA_i-1);i>=kwadratB_i;i--)
                        {
                            turaI--;
                            for(var j=(kwadratA_j-1);j>=kwadratB_j;j--)
                            {
                                turaJ--;
                                if(turaI==turaJ)
                                {
                                    if((document.getElementById("c"+i+j)).firstChild)
                                    {
                                        madziecko++;
                                        kwadratD_i=i;
                                        kwadratD_j=j;
                                        if((data.slice(0,5))=="damac")
                                        {
                                            if((((((document.getElementById("c"+i+j)).firstChild).id).slice(0,5)=="damab") || ((((document.getElementById("c"+i+j)).firstChild).id).slice(0,2)=="bi")))
                                            {
                                                innedziecko=1;
                                                kwadratD_i=i;
                                                kwadratD_j=j;
                                            }
                                        }
                                        //sprawdza dla bialych dam
                                        if((data.slice(0,5))=="damab")
                                        {
                                            if((((((document.getElementById("c"+i+j)).firstChild).id).slice(0,5)=="damac") || ((((document.getElementById("c"+i+j)).firstChild).id).slice(0,2)=="cz")))
                                            {
                                                innedziecko=1;
                                                kwadratD_i=i;
                                                kwadratD_j=j;
                                            }
                                        }
                                    }
                                }
                            }
                            turaJ=10;
                        }
                    }
                    else
                    {
                        strona=2;
                        turaI=10;
                        turaJ=10;
                        for(var i=(kwadratA_i-1);i>=kwadratB_i;i--)
                        {
                            turaI--;
                            for(var j=(kwadratA_j+1);j<=kwadratB_j;j++)
                            {
                                turaJ--;
                                if(turaI==turaJ)
                                {
                                    if((document.getElementById("c"+i+j)).firstChild)
                                    {
                                        madziecko++;
                                        kwadratD_i=i;
                                        kwadratD_j=j;
                                        if((data.slice(0,5))=="damac")
                                        {
                                            if((((((document.getElementById("c"+i+j)).firstChild).id).slice(0,5)=="damab") || ((((document.getElementById("c"+i+j)).firstChild).id).slice(0,2)=="bi")))
                                            {
                                                innedziecko=1;
                                                kwadratD_i=i;
                                                kwadratD_j=j;
                                            }
                                        }
                                        //sprawdza dla bialych dam
                                        if((data.slice(0,5))=="damab")
                                        {
                                            if((((((document.getElementById("c"+i+j)).firstChild).id).slice(0,5)=="damac") || ((((document.getElementById("c"+i+j)).firstChild).id).slice(0,2)=="cz")))
                                            {
                                                innedziecko=1;
                                                kwadratD_i=i;
                                                kwadratD_j=j;
                                            }
                                        }
                                    }
                                }
                                
                            }
                            turaJ=10;
                        }
                    }
                }
                else
                {
                    
                    if(ruchj<0)
                    {
                        strona=3;
                        turaI=10;
                        turaJ=10;
                        for(var i=(kwadratA_i+1);i<=kwadratB_i;i++)
                        {
                            turaI--;
                            for(var j=(kwadratA_j-1);j>=kwadratB_j;j--)
                            {
                                turaJ--;
                                if(turaI==turaJ)
                                {
                                    if((document.getElementById("c"+i+j)).firstChild)
                                    {
                                        madziecko++;
                                        kwadratD_i=i;
                                        kwadratD_j=j;
                                        if((data.slice(0,5))=="damac")
                                        {
                                            if((((((document.getElementById("c"+i+j)).firstChild).id).slice(0,5)=="damab") || ((((document.getElementById("c"+i+j)).firstChild).id).slice(0,2)=="bi")))
                                            {
                                                innedziecko=1;
                                                kwadratD_i=i;
                                                kwadratD_j=j;
                                            }
                                        }
                                        //sprawdza dla bialych dam
                                        if((data.slice(0,5))=="damab")
                                        {
                                            if((((((document.getElementById("c"+i+j)).firstChild).id).slice(0,5)=="damac") || ((((document.getElementById("c"+i+j)).firstChild).id).slice(0,2)=="cz")))
                                            {
                                                innedziecko=1;
                                                kwadratD_i=i;
                                                kwadratD_j=j;
                                            }
                                        }
                                    }
                                }
                            }
                            turaJ=10;
                        }
                    }
                    else
                    {
                        strona=4;
                        turaI=10;
                        turaJ=10;
                        for(var i=(kwadratA_i+1);i<=kwadratB_i;i++)
                        {
                            turaI--;
                            for(var j=(kwadratA_j+1);j<=kwadratB_j;j++)
                            {
                                turaJ--;
                                if(turaI==turaJ)
                                {
                                    if((document.getElementById("c"+i+j)).firstChild)
                                    {
                                        madziecko++;
                                        kwadratD_i=i;
                                        kwadratD_j=j;
                                        if((data.slice(0,5))=="damac")
                                        {

                                            if((((((document.getElementById("c"+i+j)).firstChild).id).slice(0,5)=="damab") || ((((document.getElementById("c"+i+j)).firstChild).id).slice(0,2)=="bi")))
                                            {
                                                innedziecko=1;
                                                kwadratD_i=i;
                                                kwadratD_j=j;
                                            }
                                        }
                                        //sprawdza dla bialych dam
                                        if((data.slice(0,5))=="damab")
                                        {
                                            if((((((document.getElementById("c"+i+j)).firstChild).id).slice(0,5)=="damac") || ((((document.getElementById("c"+i+j)).firstChild).id).slice(0,2)=="cz")))
                                            {
                                                innedziecko=1;
                                                kwadratD_i=i;
                                                kwadratD_j=j;
                                            }
                                        }
                                    }
                                }
                            }
                            turaJ=10;
                        }
                    }
                }
                if((madziecko==1) && (innedziecko==1))
                {
                    if(strona==1)
                    {
                        var liczbaA=kwadratB_i+1;
                        var liczbaB=kwadratB_j+1;
                    }
                    if(strona==2)
                    {
                        var liczbaA=kwadratB_i+1;
                        var liczbaB=kwadratB_j-1;
                    }
                    if(strona==3)
                    {
                        var liczbaA=kwadratB_i-1;
                        var liczbaB=kwadratB_j+1;
                    }
                    if(strona==4)
                    {
                        var liczbaA=kwadratB_i-1;
                        var liczbaB=kwadratB_j-1;
                    }
                    if((document.getElementById("c"+liczbaA+liczbaB)).firstChild)
                    {
                        aktualnatura++;
                        czykoniec();
                        ev.target.appendChild(document.getElementById(data));
                        document.getElementById("c"+kwadratD_i+kwadratD_j).innerHTML="";
                    }
                }
                if(madziecko==0)
                {
                    aktualnatura++;
                    ev.target.appendChild(document.getElementById(data));
                }
            }
        }
        czykoniec()
        czydama();
    }
}