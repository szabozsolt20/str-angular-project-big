# Angular Záró Csapatprojekt

## Feladat
Készítsetek egy adminfelületet Angular segítségével a megadott 
sablon alapján.

## Az alkalmazás leírása
Az alkalmazás feladata, hogy egy webáruház termékeit, rendeléseit, 
vásárlóit nyilvántartsa, kezelje, és statisztikai adatokat szolgáltasson 
az összefoglaló oldalon.  

__Megjelenése:__  
- Az alkalmazást a mellékelt minták alapján kell elkészíteni, amelyek a 
`material-dashboard-master` nevű almappában találhatók.
- Az alkalmazás egy fejléccel és egy bal oldali navigációval rendelkezik. Az 
egyes oldalak között a bal oldali navigáció segítségével lehet váltani.
- Az Angular alkalmazást minden csapatnak önállóan kell elkésztenie, 
a mellékelt minták csupán segítenek ebben.
- A javasolt munkamenet az, hogy a nyers .html-sablonok és 
.css-állományok alapján készítsenek a csapatok Angular komponenseket és 
ezekből építsék fel a teljes alkalmazást.   

__Főbb részei:__  
- Dashboard: ez a főoldal, itt jelennek meg a statisztikák a vásárlókról, 
termékekről, rendelésekről és a pénzügyi adatokról. Opcionálisan grafikus 
formában is megjeleníthetőek.
- Termékek: táblázatos formában jelennek meg a termékek, minden terméksor 
utolsó cellájában szerkesztés és törlés gombokkal. Itt van lehetőség új termék 
felvételére is.
- Vásárlók: táblázatos formában jelennek meg a vásárlók, minden sor utolsó 
cellájában szerkesztés és törlés gombokkal. Van lehetőség új vásárló rögzítésére 
is.
- Rendelések: a termékekhez és a vásárlókhoz hasonlóan táblázatban jelennek meg 
a törölhető és szerkeszthető rendelések. Új rendelést is lehet rögzíteni.
- Pénztár: a rendelések alapján kiállított számlákat jeleníti meg táblázatos 
formában. Van lehetőség új számla kézi rögzítésére is.  

__Közös jellemzők:__  
- Minden táblázat szűrhető az összes oszlop alapján. Minden táblázat rendezhető 
az összes oszlop alapján csökkenő és növekvő sorrendben is.
- Minden entitáshoz (ezek az adattípusok, mint például a termék vagy a rendelés) 
tartozik egy szerkesztő komponens is, amely a táblázat adott sorában lévő 
szerkesztőgombra kattintva jelenik meg. Ennek értelemszerűen nincs külön 
menüpontja.
- Az entitások szerkesztésénél a szerkesztőmezőknek illeszkedniük kell az 
adattípushoz, azaz ha boolean típusú az adat, akkor checkbox, ha listából kell 
kiválasztani az értéket, akkor legördülő menü, ha hosszabb szöveg, akkor textarea, 
és egyéb esetben a megfelelő típusú input mező jelenjen meg a szerkesztő 
űrlapon.
- Legyenek felugró üzenetek, amelyek értesítik a felhasználót a sikeres 
műveletekről vagy az esetleges hibákról.

## Előkészítés
- A csapat egyik tagja hozza létre a csapatot a GitHub Classroom felületén.
- A többi csapattag a Classroom felületén lépjen be a már létrehozott csapatba.
- A csapat hozzon létre egy saját azonosítót, ami maximum 8 angol karakterből áll.
- Ezt az azonosítót adja meg a gyakorlatvezetőnek, aki ez alapján elkészíti számukra 
az adatbázist a távoli json szerveren.
- [A szerver URL a következő lesz](https://nettuts.hu/jms/<azonosító>/
- Ezt az URL-t kell majd beállítani az environment változóban az alkalmazásban.
- Beszéljék meg a csapat tagjai, hogy milyen entitásokat és milyen mezőket szeretnének 
használni és ezek alapján generálják le az adatokat tartalmazó .json fájlokat a 
[Mockaroo](https://www.mockaroo.com/) alkalmazásban.
- Küldjék el a generált .json fájlokat a gyakorlatvezetőknek, akik majd elhelyeziik 
ezeket a szerveren.

## Technikai leírás - fejlesztés lépései
### 1. Szükséges osztályok
A leírás alapján látható, hogy milyen osztályokra lesz szükség a fejlesztés 
során.
- Category (id, name, description)
- Product (id, name, type, catID, description, price, featured, active)
- Address (zip, country, city, street, notes)
- Customer (id, firstName, lastName, email, address: Address, active)
- Order (id, customerID, productID, amount, status: new|shipped|paid)
- Bill (id, orderID, amount, status: new|paid)  
> Ha szükséges, akkor a tárolt adatok listája tovább bővíthető, de ezeknek 
minimálisan szerepelniük kell az osztályokban.

### 2. Szükséges szolgáltatások
A szolgáltatások felelnek az adatok kezeléséért, azok mozgatásáért 
az adatbázis-szerver és a komponensek között. 
- Minden fő adattípushoz tartozzon egy szolgáltatás 
(product, customer, order, bill).
- Az adatokat JSON-fájlban tároljuk, ezek lehetnek egy fájlban is azért, hogy 
ne kelljen mindegyikhez külön json-server-t indítani.
- Az adattartalom tetszőleges. Minden csapat válasszon magának egy termékkört, 
amelyet a webshop forgalmaz, és annak megfelelően vegye fel a termékek adatait.
- Az egyes szervizek legyenek képesek az alapvető adatműveletekre (CRUD), és 
támogassák a speciális keresést is, ha szükséges.

### 3. Szerkesztő komponensek
Minden entitáshoz (adattípushoz) tartoznak szerkesztőoldalak. Ezek egységesen 
a következőek szerint működjenek:
- Az URL alapján döntsék el, hogy melyik entitást kérik le az adatbázisból.
- Érdemes a nevüket mindig az edit előtaggal kezdeni a könnyebb azonosítás 
érdekében, például: edit-product vagy edit-bill.
- Ha nem kapnak megjeleníthető adatot, akkor automatikusan egy új entitást 
hozzanak létre. Például, ha egy üres Product példányt kapnak 0 id-vel, abból 
tudják, hogy nem az update, hanem a create metódust kell meghívniuk a kapcsolódó 
szervizből.
- Minden adat kötelező legyen. 
- Minden adatot validálni kell, a tanult `template-driven` űrlaptechnikákkal.
- Ha nincs megfelelően kitöltve az űrlap, akkor ne engedje elküldeni az adatokat, 
és jelenítsen meg releváns hibaüzenetet.
- Sikeres mentés vagy hiba esetén jelenjen meg felugró üzenet. Ezt többféle 
kiegészítővel is meg lehet valósítani, néhány példa:  
[Ng Toaster](https://www.npmjs.com/package/ngx-toaster)  
[Ng Toastr](https://www.npmjs.com/package/ngx-toastr)  
- Létrehozás vagy módosítás után a komponens navigáljon vissza a hozzá tartozó 
listához. Például, ha sikeresen módosították a számlát, akkor a számla listázó 
oldala nyíljon meg.

### 4. Listázó oldalak
- Ezeken az oldalakon táblázatos formában jelennek meg az entitások. 
- Mindhez tartozik szerkesztés és törlés gomb is. Szerkesztés esetén az 
alkalmazás a kapcsolódó szerkesztőfelületre navigál. Például, ha a rendelés 
táblázatának egyik sorában kattintottak a szerkesztés gombra, akkor az EditOrder komponens nyílik meg.
- Minden táblázat felett legyen egy teljes szélességű gomb, amely az új entitás 
létrehozását indítja el. Ekkor is a kapcsolódó editor nyílik meg, csak egy üres 
űrlappal.
- Az adatok szűrhetőek az összes oszlop szerint a táblázat felett elhelyezett 
beviteli mező segítségével.
- Az adatok rendezhetőek az összes oszlop szerint növekvő és csökkenő sorrendbe 
is. Ezt az oszlop fejlécére kattintva lehet kezdeményezni, amely mellett egy ikon 
jelzi, hogy éppen milyen irányú a rendezés. Első kattintásra mindig növekvő 
a rendezési sorrend, ha pedig másodszor is ugyanarra az oszlopfejlécre 
kattintanak, akkor csökkenő irányú.

### 5. Dashboard
Ez az alkalmazás kezdőoldala. Itt alapvetően áttekintő nézet jelenik meg a 
webshop állapotáról.  
__Megjelenített adatok:__  
- Aktív termékek száma.
- Aktív vásárlók száma.
- Még nem fizetett rendelések száma.
- Még nem fizetett számlák összege.
- Opcionális: ugyanezen adatok grafikonon történő megjelenítése. Például a 
rendelések grafikon külön oszlopokban mutatja a különböző státuszú rendelések 
számát, vagy a számlák összegét láthatjuk státuszuk szerint.

## Megjelenés
A projekt mappájában mellékeltünk egy teljes keretrendszert a megjelenítéshez. 
Ez Bootstrap-alapú, kiegészítve saját CSS-állományokkal.  
__Hogyan használjuk?__  
- Először lokalizáljuk a sablon HTML-állományokban a fejléc és a navigáció 
elemeit. Ezeknek készítsünk külön komponenseket.
- Az app.component.html állományban helyezzük el ezeket a komponenseket, majd 
az oldal tartalmi részének a helyére szúrjuk be a 
`<router-outlet></router-outlet>` elemet, hogy ott jelenjenek meg az egyes 
komponensek. 
- Keressük meg a sablonokban a szükséges CSS- és JS-állományokat, és azokat 
helyezzük el az assets mappában. Ezután szúrjuk be őket az `angular.json` 
állományba a megfelelő helyre ügyelve a helyes elérési útra.
- A mellékelt sablon alapvetően reszponzív, az Angular alkalmazásnak is annak 
kell lennie.

-------

## Extrák
- Tesztelés: komponensenként legyen legalább 5 unit teszt.  
(Erről külön konzultációt fogunk tartani.)
- Grafikonos megjelenítések a Dashboard oldalon.
- Azoknál a gomboknál, ahol kattintás után a szerver válaszára várunk, legyen 
animáció, amely ezt jelzi.
- A táblázatok utolsó sorában legyenek összesítve az oszlopok, például, hogy hány 
darab vagy mekkora összeg a szumma egy adott oszlopban.
- A felhasználó szerkeszthesse azt, hogy milyen sorrendben legyenek a táblázatok 
oszlopai.  
Segédlet: https://nettuts.hu/blog/angular-material-tablazat-dinamikus-oszlopokkal

## Sok sikert!

