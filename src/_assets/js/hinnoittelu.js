	/*Tässä on TDP koneiden kk ja suoraosto hinnoittelu sekä scripti joka laskee hinnat sivuille.
	*Hinnan muutoksen voi päivittää alla oleviin kohtiin ja se päivittyy sivuille kaikkialle oikein
	*tässä myös esimerkkipakettien ja sivukohtaisten koneiden hinnoittelun functiot.
	*/

	// ensimmäinen arvo 24kk hinta, keskimmäinen 36kk hinta, viimeine arvo suoraosto hinta
	var laatukone=['70.65', '47', '1695']
	var tehokone=['133','83','2994']
	var allInOne=['61','41','1476']
	var tehokannettava=['101','68','2195']
	var toimistokone=['32','22','808']
	var ultrabook=['86.35','58','1938']
	var yrityskannettava=['54','35.5','1249']
	var naytto24 = ['9', '6', '200']
	var naytto27 = ['16', '12', '349']
	var naytto32 = ['35.15', '23.05', '830']
	var ohjainRTX4000 = ['34.90', '22.95', '820']
	var telakka = ['16', '12', '349']
	var ohjainp2000 = ['22.00', '14.90', '449']
	var konica = ['59.5', '39.5', '1400']
	var tyhja = ['0', '0', '0'] //tarpeeton
	var kkhinta=" EUR / kk";
	var boxOhjain = false;
	var boxNaytto = false;
	
	/* setText functio määrittelee esimerkkipaketit etusivun hinnat*/
	function setText(target){
		/*target on tässä tapauksessa radio nappi jossa joko arvo 0, 1 tai 2
		targetin arvo määrää 24 tai 36kk hinnan tai suoroston, joka haetaan ylhäältä.
		*/
		var txt=document.getElementById(target);
		//katsotaan onko kk hinnoittelu vai suorosto ja päätetään pääte sen mukaan.
		//temp muuttujaan talletetaan 24kk 36kk tai suoroston määrävä arvo.
		var temp=txt.value;
		if (temp == 2){
			kkhinta=" EUR";
		} else{
			kkhinta=" EUR / kk";
		}

		//haetaan sivulta oikean koneen kohta
		var targetDiv1=document.getElementById("KuukausiHinta");
		//Laatukoneen hinnastosta haetaan oikea hinta ja muutetaan se numeroksi ja talletetaan valittu muuttujaan.
		var valittu=Number(laatukone[temp])
		//tulostetaan hinta kahden desimaalin tarkkuudella ja lisätään oikea pääte kk / suoraosto
		targetDiv1.innerHTML = valittu.toFixed(2) + kkhinta;

		var targetDiv2=document.getElementById("KuukausiHinta2");
		var valittu2=Number(tehokone[temp])+Number(naytto32[temp])+Number(ohjainRTX4000[temp])
		targetDiv2.innerHTML = valittu2.toFixed(2) + kkhinta;

		var targetDiv3=document.getElementById("KuukausiHinta3");
		var valittu3=Number(allInOne[temp])
		targetDiv3.innerHTML = valittu3.toFixed(2) + kkhinta;

		var targetDiv4=document.getElementById("KuukausiHinta4");
		var valittu4=Number(tehokannettava[temp])
		targetDiv4.innerHTML = valittu4.toFixed(2) + kkhinta;

		var targetDiv5=document.getElementById("KuukausiHinta5");
		var valittu5=Number(toimistokone[temp])+Number(naytto24[temp])
		targetDiv5.innerHTML = valittu5.toFixed(2) + kkhinta;

		var targetDiv6=document.getElementById("KuukausiHinta6");
		var valittu6=Number(ultrabook[temp])
		targetDiv6.innerHTML = valittu6.toFixed(2) + kkhinta;

		var targetDiv7=document.getElementById("KuukausiHinta7");
		var valittu7=Number(yrityskannettava[temp])
		targetDiv7.innerHTML = valittu7.toFixed(2) + kkhinta;

		var targetDiv8=document.getElementById("KuukausiHinta8");
		var valittu8=Number(konica[temp])
		targetDiv8.innerHTML = valittu8.toFixed(2) + kkhinta;
	}

	/* setPrice functio määrittää hinnan koneen omalla sivulla ja mahdollistaa lisäominaisuuksien valitsemisen
	*setPrice saa parameterina paketin(koneen) hinnan ja mahdolliset lisäpalikoiden hinnat.
	*setPircea kutsuttaessa lisäpalikoita ei ole pakko välittää html sivulta (tällöin ne katsotaan nollaksi).
	*jos halutaan enemmän ominaisuuksia kuin 3, lisää vain lisaohjain=0 parametri ja kopioi yheenlaskija tälle. 
	*/
    function setPrice(paketti,naytto=0,ohjain=0){
		//tallennetaan välitetyt parametrit muuttujiin. ddd let varmaan ois parempi.""
	    	var kone = paketti	
		var naytto2 = naytto
		//ohjain voi esim näytönohjain tai telakka tms.
		var ohjain2 = ohjain
		//targetDiv eli mihin lopullinen hinta tullaan päivittämään
		var targetDiv = document.getElementById('hinta');
		//lähtö oletus hinnaksi 0 ja lasketaan aina uusiksi kun muutetan jotain.
	    	var price = 0;
		//temp kertoo 24kk 36kk tai suoraoston arvoilla(0,1,2) oletus 36kk.
		var temp = 1;
		var txt ='';
		
		//tarkastetaan mikä osto valittuna. ja valitaan joko kk hinta tai suoraosto pääte sen mukaan
		//tallettaa myös "temp" muuttujaan tiedon mikä maksusuunnitelma valittuna 
		if (document.getElementById('radios1').checked){
			txt = document.getElementById('radios1');
			temp = txt.value;
			kkhinta=" EUR / kk";
			}
		else
			if (document.getElementById('radios2').checked){
				txt = document.getElementById('radios2');
				temp = txt.value;
				kkhinta=" EUR / kk";
			}
			else if (document.getElementById('radios3').checked){
				txt = document.getElementById('radios3');
				temp = txt.value;
				//suoraosto valittu joten otetaan "/kk" pois.
				kkhinta=" EUR"
			}
	    	/*katsotaan onko kone checkbox valittuna (oletuksena on)
		*tämän jälkeen lisätään price muuttujaan koneen(sivulta välitetty konepaketti) hinta maksusuunnitelman(temp) mukaan.
		*tämän jälkeen katsotaan onko näyttö tai näytönohjain (muu lisäpalikka) valittuna ja plussataan nämä priceen.
		*
		*tarkastetaan onko checkboxit sivulla, jos on lasketaan, jos ei ohitetaan eikä kaadeta koodia.
		*/
		if(document.getElementById('option1')!=null){
	    		if (document.getElementById('option1').checked){
				price = price + Number(kone[temp]);
			}
		}
	    	if(document.getElementById('option2')!=null){
			if (document.getElementById('option2').checked){
				price = price + Number(naytto[temp]);
			}
		}
		if(document.getElementById('option3')!=null){
			if (document.getElementById('option3').checked){
				price = price + Number(ohjain[temp]);
			}
		}
	//tulostetaan targetDiv:iin hinta 2 desimaalin tarkkuudella ja + oikea pääte (/kk tai pelkkä €).
        targetDiv.innerHTML = price.toFixed(2) + kkhinta;
    }

/*updated 31.7.2020*/
