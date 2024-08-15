# RelaxZ Masszázs Szolgáltatás Weboldal

## 1. Projekt bemutatása

Ez az Angular alapú weboldal Szabó Zoltán RelaxZ nevű masszázs szolgáltatásait mutatja be. A cél egy letisztult és könnyen használható felület kialakítása, amely lehetővé teszi a látogatók számára, hogy tájékozódjanak a szolgáltatásokról, árakról, és egyszerűen tudjanak időpontot foglalni. Az oldal többnyelvű támogatással rendelkezik, és mobilbarát kialakítással készült.


## 2. Technológiák

A projekt a következő technológiákat és eszközöket használja:

- **Angular**: Frontend keretrendszer a weboldal fejlesztéséhez.
- **Bootstrap**: Stíluslap könyvtár a reszponzív design biztosításához.
- **SCSS**: Stíluslapok kezelésére, mely lehetővé teszi a moduláris és könnyen karbantartható CSS használatát.
- **Firebase**: Felhasználói hitelesítés és adatbázis kezelés.
- **Mailchimp API**: Integráció a hírlevél feliratkozások kezelésére.
- **Google Maps API**: A szolgáltatás helyszínének megjelenítése térképen.
- **FontAwesome**: Ikonok használata a navigációhoz és az elérhetőségek megjelenítéséhez.

## 3. Telepítés

Az alkalmazás futtatásához kövesd az alábbi lépéseket:

1. **Projekt klónozása:** Klónozd a projektet a GitHub repozitóriumából, és navigálj a projekt könyvtárába.
```bash
 git clone https://github.com/pf-coding/sz-z-massage.git
 cd relaxz
```
2. **Függőségek telepítése:** Telepítsd a szükséges függőségeket.
```bash
npm install
```

3. **Fejlesztői szerver indítása:** Indítsd el a fejlesztői szervert, majd nyisd meg a böngészőben a `http://localhost:4200` címet.

## 4. Funkciók és Felépítés

## 4.1. Függőségek (dependencies)

- **@angular/animations**: ^15.2.9
- **@angular/common**: ^15.2.9
- **@angular/compiler**: ^15.2.9
- **@angular/core**: ^15.2.10
- **@angular/fire**: ^7.6.1
- **@angular/forms**: ^15.2.9
- **@angular/platform-browser**: ^15.2.9
- **@angular/platform-browser-dynamic**: ^15.2.9
- **@angular/router**: ^15.2.9
- **@fortawesome/angular-fontawesome**: ^0.12.0
- **@fortawesome/fontawesome-svg-core**: ^6.6.0
- **@fortawesome/free-brands-svg-icons**: ^6.6.0
- **@fortawesome/free-solid-svg-icons**: ^6.6.0
- **bootstrap**: ^5.1.3
- **cors**: ^2.8.5
- **dotenv**: ^16.4.5
- **express**: ^4.19.2
- **file-saver**: ^2.0.5
- **firebase**: ^9.23.0
- **firebase-admin**: ^12.2.0
- **gsap**: ^3.12.5
- **ngx-toastr**: ^16.0.0
- **rxfire**: ^6.0.3
- **rxjs**: ~7.8.1
- **tslib**: ^2.3.0
- **xlsx**: ^0.18.5
- **zone.js**: ~0.11.4

## 4.2. Fejlesztői függőségek (devDependencies)

- **@angular-devkit/build-angular**: ^15.2.9
- **@angular/cli**: ^15.2.9
- **@angular/compiler-cli**: ^15.2.9
- **@types/file-saver**: ^2.0.7
- **@types/jasmine**: ~3.8.0
- **@types/node**: ^15.14.9
- **jasmine-core**: ~3.8.0
- **karma**: ~6.4.2
- **karma-chrome-launcher**: ~3.1.0
- **karma-coverage**: ~2.0.3
- **karma-jasmine**: ~4.0.0
- **karma-jasmine-html-reporter**: ~1.7.0
- **typescript**: ^4.9.5




### 4.3 Főoldal és Navigációs sáv

A főoldalon a navigációs sáv segítségével a látogatók a következő menüpontok közül választhatnak:

- **Rólam**: Rövid bemutatkozás Szabó Zoltánról.
- **Masszázs típusok**: Az elérhető masszázs típusok és azok részletes leírása.
- **Helyszín**: A szolgáltatás pontos helyszíne Google Maps integrációval.
- **Kapcsolat**: Elérhetőségek (email, Facebook, Instagram, telefon).
- **Nyelv**: Az oldal nyelvének megváltoztatása (magyar, angol, német).

## Funkciók
- **Főoldal**: Navigációs sáv a következő menüpontokkal: Rólam, Masszázs típusok, Helyszín, Kapcsolat, Nyelv.
- **Rólam**: Rövid bemutatkozás Szabó Zoltánról.
- **Masszázs típusok**: Kártyák a különböző masszázs szolgáltatásokról, melyek ára és időtartama egy új komponensben jelenik meg.
- **Foglalás**: Külső Setmore oldalon történő időpontfoglalás lehetősége.
- **Kapcsolat**: Elérhetőségek, beleértve az email, Facebook, Instagram és telefonos kapcsolatot, valamint egy Google Maps iframe.
- **Süti beállítások**: Modal ablak a süti beállítások módosítására, amely összekapcsolható a Google Analytics-szel.
- **Admin Panel**: Bejelentkezési lehetőség, adminisztrátorok kezelése, hírlevél feliratkozások kezelése és exportálás Excel formátumban.
- **Hírlevél**: Automatikus regisztrálás Mailchimp rendszerébe és kuponkód küldése új feliratkozóknak.
- **Nyelvválasztás**: Nyelv választási lehetőség a navbarban, amely dinamikusan tölti be az adott nyelvhez tartozó JSON fájlt.
- **Carousel**: Képek automatikus váltása a carousel-ben.
- **Whatsapp gomb**: Fixen elhelyezett gomb, amellyel közvetlenül kapcsolatba léphetünk Zoltánnal WhatsApp-on keresztül.


### 4.4 Rólam szekció

Ez a szekció Szabó Zoltánt és a RelaxZ márkát mutatja be. Részletezi, hogy miért érdemes a szolgáltatásokat igénybe venni, és milyen panaszokkal érdemes fordulni hozzá.

### 4.5 Masszázs típusok

Az oldal bemutatja az elérhető masszázs szolgáltatásokat kártyák formájában, melyek lapozhatóak. Minden kártya tartalmaz egy rövid leírást és egy "Árak és foglalás" gombot, amely egy új komponens megjelenítésével navigál a foglalási részhez.

### 4.6 Árak és foglalás komponens

Az "Árak és foglalás" gombra kattintva a felhasználó egy új komponenshez jut, ahol kiválaszthatja a masszázs időtartamát. Az árak magyar nyelven HUF, angol és német nyelven EUR valutában jelennek meg. A foglalás gomb kattintása után a felhasználó a Setmore foglalási oldalára kerül, ahol az adott szolgáltatásra és időtartamra vonatkozó szabad időpontokat látja.

### 4.7 Kapcsolat és Helyszín

A kapcsolat szekcióban megtalálhatók az elérhetőségek, valamint egy Google Maps iframe, amely megmutatja a szolgáltatás helyszínét. A kapcsolati információk tartalmazzák az email címet, Facebook, Instagram profilokat és a telefonszámot, mindegyikhez külön gombot társítva.

### 4.8 Adminisztrációs felület

Az oldal alján található egy admin bejelentkezési gomb, amely egy autentikációval rendelkező modal ablakot dob fel. A bejelentkezett adminok külön felületen kezelhetik a hírlevélre feliratkozottakat (törölhetik, frissíthetik az adataikat), új adminokat regisztrálhatnak, és megtekinthetik az aktuális adminok listáját. Ez szorosan össze van kötve a hozzá tartozó Firebase collection-nal.

### 4.9 Sütik kezelése

A footerben található süti beállítások egy modal ablakban jelennek meg, amelyben a felhasználók részletes információt kapnak a különböző sütikről. Lehetőségük van a nem szükséges sütik elutasítására is.

### 4.10 Hírlevél feliratkozás

A hírlevél feliratkozás egy időzített modal ablakban történik, amely az oldalra lépés után 8 másodperccel jelenik meg. Ha a felhasználó dismisseli, az ablak újra megjelenik 1, majd 15 perc múlva. A form addig disabled, amíg nincs helyesen kitöltve a név, email és az adatkezelési tájékoztató elfogadása.

### 4.11 Egyéb funkciók

- **Carousel**: A főoldal tetején található carousel 3 másodpercenként váltja a képeket, kivéve, ha az egér a carousel felett van.
- **Nyelvválasztó**: A navigációs sávban található nyelvválasztó segítségével az oldal nyelve megváltoztatható, a kiválasztott nyelvhez tartozó JSON file betöltésével.
- **WhatsApp gomb**: Az oldal jobb alsó sarkában található fix WhatsApp gomb, amely görgetéskor is fixen marad, és lehetővé teszi a közvetlen üzenetküldést.

## 5. Styling és Design

A projekt stílusa a következő elemekből épül fel:

- **Betűtípus**: A [`Quicksand`](https://fonts.google.com/specimen/Quicksand) betűtípus globálisan van használva.

- **Színpaletta**:
```bash
   - primary color: #3e4f3c
   - secondary color: #ecaa93
   - tertiary color: wheat
```
- **Globális stílus**: A `style.scss` fájl tartalmazza a globális stílusokat, amelyek minden komponens scss fájljába importálva vannak.

## 6. Fejlesztés és Bővítés

A projekt fejleszthető további funkciók és szekciók hozzáadásával. Itt van néhány javaslat:

- **További nyelvi támogatás**: További nyelvek hozzáadása az oldalhoz.
- **Blog szekció**: Egy új blog szekció, ahol Zoltán megoszthatja a masszázs előnyeit és tippjeit.

## 7. Ismert Hibák és Limitációk

Az alábbiakban néhány jelenlegi ismert hiba vagy limitáció található:

- **Böngésző kompatibilitás**: Az oldal bizonyos funkciói nem teljesen támogatottak régebbi böngészőkben.

## 8. Kapcsolat

Ha szeretnél közreműködni a projektben vagy kérdésed van, lépj kapcsolatba velünk az alábbi email címen: [zoltan.massages@gmail.com](mailto:zoltan.massages@gmail.com).

## 9. Licenc

Ez a projekt nyílt forráskódú, a [MIT Licenc](LICENSE) alatt licencelve.

## 10. Projekt állapota

A projekt jelenleg aktívan karbantartás alatt áll. Fejlesztési terveink vannak a jövőre nézve, és szívesen fogadunk ötleteket!
```
