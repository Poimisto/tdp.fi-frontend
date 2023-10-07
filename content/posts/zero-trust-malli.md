---
template: BlogPost
path: /zero-trust-malli
date: 2023-10-07T07:44:52.562Z
head:
  title: Zero Trust – Verkkoturvallisuuden uusi kulmakivi
  description: "Zero Trust on suurten yritysten suosima tietoturvamalli, jota myös
    pienempien PK-yritysten kannattaa noudattaa. "
  keywords: zero trust, tietoturvamalli, kyberuhka, tunnistautuminen, nollaluottamus
thumbnail: /assets/zero-trust-tietoturvamalli.jpg
---
![Zero Trust -malli saatavilla TDP:n konsultoimana.](/assets/zero-trust-tietoturvamalli.jpg)

**Yritysten verkkojärjestelmien turvallisuudesta puhuttaessa yksi termi on noussut viime aikoina ylitse muiden: Zero Trust.** 

Zero Trust on suomeksi *nollaluottamus*, joka kuvastaa turvattomuuden tunnetta alati muuttuvassa verkkomaailmassa.Voisimmeko elää ajatuksessa, että vaikka luottamus on hyvää, kontrolli on kuitenkin parempaa, etenkin etukäteen tehtynä?

## Zero Trust on vastaus yritysten turvantarpeeseen

**Zero Trust -malli pohjautuu ajatukseen nollaluottamuksesta, jossa kaiken verkossa tapahtuvan tulkitaan olevan epäluotettavaa.** 

Nollaluottamuksen periaate voidaan jakaa yksityiskohtaisempiin prosesseihin:

* **Mikrosegmentointi**: Jakamalla verkko pieniin osiin, voimme hallita ja valvoa liikennettä tehokkaammin. Perinteisesti verkot on jaettu segmentteihin, kuten VLAN:ien (Virtual Local Area Network) avulla. Nämä segmentit voivat koostua esimerkiksi tietyistä osastoista tai palvelinryhmistä. Mikrosegmentointi menee askelta pidemmälle hajottamalla verkon vieläkin pienempiin osiin, tyypillisesti yksittäisen sovelluksen tai jopa yksittäisen laitteen tasolle.
* **Monitunnistautuminen (MFA)**: Käyttäjän tunnistautuminen useilla tekijöillä lisää turvallisuuden tasoa.
* **Least Privilege Access (LPA)**: Pääsy vain tarpeellisiin resursseihin minimoi mahdolliset riskit. Jos käyttäjällä on rajoitettu pääsy vain niihin järjestelmiin ja tietoihin, joita hän tarvitsee, mahdollinen tietomurto tai virheellinen toiminta vaikuttaa vähemmän laajasti.
* **Päätelaitteiden turvallisuus**: Jokainen laite on potentiaalinen riski ja siksi jokainen laite tarkistetaan.
* **Jatkuva valvonta**: Verkon liikenteen jatkuva tarkkailu ja analysointi pitää huolen, että poikkeavuudet tunnistetaan nopeasti.

Vaikka nämä ovat vain muutamia esimerkkejä Zero Trustin teknisistä ominaisuuksista, ne osoittavat, kuinka syvälle tällä mallilla turvallisuus halutaan ulottaa ja myös päästä

## Miksi yritykset tarvitsevat Zero Trustia?

**Se on tärkeä kysymys, vaikka tiedämmekin niiden tarvitsevan.** 

Yritysten Zero Trust -tarpeeseen vaikuttaa ainakin viisi yhteiskunnallista ja teknisesti painavaa syytä: 

* **Kasvava kyberuhkien määrä**: Joka päivä syntyy uusia tietoturva-uhkia, ja Zero Trust auttaa todistetusti yrityksiä suojautumaan niiltä tehokkaammin.
* **Laajentuva ja monimutkaistuva IT-ympäristö**: Pilvipalvelut, mobiililaitteet ja IoT-laitteet tekevät verkosta monimutkaisemman ja siten vaikeammin hallittavan, etenkin turvallisuuden osalta.
* **Käyttäjien käyttäytymisen muuttuminen**: Etätyön yleistyessä perinteiset verkkojen raja-aidat ovat kadonneet, mikä käytännössä on johtanut uusiin, erilaisiin tapoihin käyttää yrityksen laitteita ja järjestelmiä.
* **Liiketoiminnan jatkuvuus**: Tietoturvahyökkäykset voivat pahimmillaan pysäyttää yrityksen toiminnan kokonaan ja johtaa suuriin kustannustappioihin.
* **Asiakkaiden luottamuksen säilyttäminen**: Tietoturvaloukkaukset voivat aiheuttaa vakavaa mainehaittaa. Muistatko vielä tapaus Vastaamon?

## Zero Trustin konkreettiset edut

**Yksi tunnetuimmista yrityksistä, joka on ottanut käyttöön Zero Trust -mallin ja raportoinut sen toimivuudesta, on Google.** 

Yritys alkoi soveltaa Zero Trust -mallia osana laajempaa "BeyondCorp" -tietoturvamalliaan vuonna 2009, jolloin perinteinen ajattelumalli “sisäverkko on luotettava ja kaikki ulkopuolinen epäluotettava” hylättiin. 

Zero Trust -ajattelun tuloksena Google saavutti monia hyötyjä:

* **Joustavuus**: Googlen työntekijät voivat nyt käyttää yrityksen resursseja mistä tahansa päätelaitteesta ja mistä tahansa sijainnista ilman VPN-yhteyksiä, kunhan laite ja käyttäjä pystyvät läpäisemään tarvittavat tarkistukset.
* **Parempi tietoturva**: Koska jokainen laite ja käyttäjä tarkistetaan yksilöllisesti, mahdollisuudet tietoturvaloukkauksiin pienenevät huomattavasti. Tämä on erityisen tärkeää yritykselle, joka käsittelee niin suuria määriä tietoa kuin Google.
* **Yksinkertaistaminen**: Zero Trust -malli on yksinkertaistanut Googlen tietoturva-arkkitehtuuria, koska perinteiset palomuurit ja VPN-yhteydet eivät ole enää yhtä keskeisessä asemassa.
* **Skaalautuvuus**: BeyondCorp mahdollistaa tietoturvan tehokkaan skaalaamisen Googlen kasvavalle määrälle työntekijöitä ja päätelaitteita maailmanlaajuisesti.

Googlen edelläkävijyys onkin toiminut monille muille yrityksille inspiraationa lähteä toteuttamaan Zero Trust -mallia.

## Vaaratekijät ilman Zero Trustia

**Yrityksille voi oikeasti realisoitua joukko potentiaalisia haittoja ilman Zero Trust -mallia.**

Vaaroina voidaan nähdä niin ulkoa kuin sisältä kumpuavat tekijät:

* **Tietoturvaloukkaukset**: Perinteisissä tietoturvaratkaisuissa luotetaan yrityksen sisäverkkoon, ja kerran sisällä oleva toimija voi päästä käsiksi moniin resursseihin. Jos hyökkääjä pystyy murtautumaan sisään, hänellä voi olla laaja pääsy moniin järjestelmiin, mikä voi johtaa tietovuotoihin.
* **Sisäiset uhat**: Zero Trust -mallissa ei luoteta mihinkään toimijaan sokeasti, mukaan lukien yrityksen omiin työntekijöihin. Ilman tätä mallia, petolliset tai huonosti perehdytety työntekijät voivat aiheuttaa vakavia tietoturvaongelmia.
* **Kustannukset loukkauksen jälkeen**: Tietoturvaloukkaukset voivat aiheuttaa pahimmillaan valtavia taloudellisia menetyksiä, mukaan lukien sakot, korvaukset ja menetetyt tulot. Vertailua, tuottaako tietoturvan parantaminen suuremmat kustannukset kuin mahdolliset loukkaukset, ei kannata edes tehdä.
* **Mainetappio**: Asiakkaiden luonnollinen odotus on, että yritykset suojaavat heidän tietonsa. Tietoturvaloukkaus loukkaa tätä odotusta ja voi siten johtaa vakavaan mainetappioon, joka voi vaikuttaa liiketoimintaankin pitkällä aikavälillä.
* **Hallinnolliset haasteet**: Ilman Zero Trust -mallia IT-tiimien on vaikeampi hallita ja valvoa, kuka pääsee käsiksi mihinkin resurssiin, mikä voi johtaa hallinnollisiin haasteisiin ja virheisiin.
* **Käyttäjän luottamuksen menetys**: Käyttäjät, olivatpa he sitten työntekijöitä tai asiakkaita, odottavat nykyään korkeatasoista tietoturvaa. Jos he tuntevat, että heidän tietonsa eivät ole turvassa, he saattavat etsiä vaihtoehtoisia palveluntarjoajia.
* **Lisääntynyt monimutkaisuus**: Vaikka Zero Trust voi vaikuttaa monimutkaiselta aluksi, se voi itse asiassa yksinkertaistaa tietoturvaa pitkällä aikavälillä. Ilman sitä yritykset saattavat päätyä käyttämään monimutkaisia ja ristiriitaisia tietoturvajärjestelmiä.
* **Ei valmiudet etätyöhön**: Zero Trust mahdollistaa turvallisen pääsyn yrityksen resursseihin mistä tahansa päätelaitteesta ja sijainnista. Ilman sitä yritykset saattavat kohdata haasteita, kun ne siirtyvät etätyöhön.

Jokaista näistä haitoista voidaan pitää merkittävänä riskinä yritysten nykyaikaisessa liiketoimintaympäristössä.

## Mitä sinun pitää muistaa tästä blogista?

Zero Trust on enemmän kuin teknologia - se on perustavanlaatuinen politiikka yrityksen verkkoturvallisuudelle.

Zero Trust ei ole vain ohjelmisto tai laitteisto; se on kaiken läpitunkeva ajattelutapa. Ajattelutapa, joka lähtee olettamuksesta, että uhkat voivat tulla mistä tahansa – sisältä tai ulkoa. 

Zero Trust auttaa yrityksiä kohtaamaan nykypäivän kyberuhkat ja varmistaa, että sekä yrityksen että sen asiakkaiden tiedot ovat turvassa. Jokaisen yrityksen, joka haluaa menestyä digitaalisessa maailmassa, tulisikin vakavasti harkita Zero Trustin omaksumista.