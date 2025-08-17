# 🤖 Dokumentacja Funkcji Discord Bota - Silent Maf1a

## 📋 Spis treści

1. [Modele Danych](#modele-danych)
2. [Konfiguracja](#konfiguracja)
3. [Eventy](#eventy)
4. [Handlery](#handlery)
5. [Komendy](#komendy)
6. [Komponenty Interakcji](#komponenty-interakcji)
7. [Narzędzia](#narzędzia)

---

## 🗄️ Modele Danych

### **Ticket.js**
**Opis:** Model MongoDB do zarządzania ticketami supportu
- **channelId**: ID kanału Discord (unikalne)
- **userId**: ID użytkownika tworzącego ticket
- **payment**: Metoda płatności (opcjonalne)
- **status**: Status ticketu (domyślnie 'unClaimed')
- **claimedBy**: ID supporta przejmującego ticket
- **timestamps**: Automatyczne znaczniki czasu

### **Coupon.js**
**Opis:** Model do zarządzania kodami promocyjnymi
- **code**: Kod promocyjny (unikalne, wielkie litery)
- **discount**: Wartość zniżki w procentach
- **timestamps**: Automatyczne znaczniki czasu

### **DropCooldown.js**
**Opis:** Model do śledzenia cooldownów komendy /drop
- **userId**: ID użytkownika (unikalne)
- **lastDrop**: Ostatni czas użycia komendy (domyślnie teraz)

### **TicketReview.js**
**Opis:** Model do przechowywania recenzji supportu
- **ticketId**: ID ticketu
- **userId**: ID klienta
- **supportId**: ID supporta
- **rating**: Ocena 1-5
- **comment**: Komentarz (max 500 znaków)
- **category**: Kategoria ticketu
- **channelId**: ID kanału ticketu

---

## ⚙️ Konfiguracja

### **config.js**
**Opis:** Podstawowa konfiguracja bota
- **registerGlobally**: Flaga rejestracji globalnych komend (false)

### **reviewConfig.js**
**Opis:** Centralna konfiguracja systemu recenzji i rankingu
- **SERVER_ID**: ID głównego serwera
- **OWNER_IDS**: Lista ID właścicieli
- **Kanały**: ID kanałów (recenzje, topka, płatności, vouches)
- **Uprawnienia**: Listy użytkowników z dostępem do komend
- **Ustawienia rankingu**: Harmonogram, progi, limity
- **Funkcje pomocnicze**:
  - `getDiscordLink()`: Generuje linki Discord
  - `getPaymentsLink()`: Link do płatności
  - `getVouchesLink()`: Link do vouches
  - `getProofsLink()`: Link zewnętrzny do proofs
  - `getReviewsLink()`: Link do recenzji

### **rolesConfig.js**
**Opis:** Konfiguracja ID ról Discord
- Role: FREE_STUFF, CONTENT, CUSTOMER, OTHER_PINGS, CHANGELOG

### **verificationConfig.js**
**Opis:** Konfiguracja systemu weryfikacji
- **VERIFY_CHANNEL_ID**: Kanał weryfikacji
- **VERIFY_ROLE_ID**: Rola po weryfikacji
- **TIMEOUT_MS**: Czas timeout (60s)
- **DM_MESSAGE**: Wiadomość przy odrzuceniu
- **STICKY_MESSAGE**: Instrukcje weryfikacji

---

## 🎯 Eventy

### **ready.js**
**Opis:** Event uruchamiany po zalogowaniu bota
**Funkcje:**
- Łączenie z bazą danych MongoDB
- Synchronizacja indeksów modelu Ticket
- Ładowanie handlerów komend i interakcji
- Wyświetlanie informacji o zalogowaniu

### **messageCreate.js**
**Opis:** Event obsługujący wszystkie wiadomości
**Funkcje:**
- **Weryfikacja użytkowników**: Sprawdza 2 zdjęcia, nadaje rolę lub timeout
- **Kanał content**: Automatyczne pingowanie przy linkach
- **Tworzenie ticketów**: Specjalny trigger "ticket fortnite"
- **Sugestie**: Automatyczne embedy z reakcjami i wątkami
- **Legit check**: Sticky message z instrukcjami
- **Automatyczne usuwanie**: Na określonych kanałach

### **InteractionCreate.js**
**Opis:** Główny event obsługujący wszystkie interakcje Discord
**Funkcje:**
- **Komendy slash**: Przekierowanie do odpowiednich handlerów
- **Modals**: Obsługa formularzy (recenzje, tickety)
- **Buttony**: Obsługa przycisków (ranking, standardowe)
- **Select Menu**: Obsługa menu wyboru
- **Tworzenie ticketów**: Kompleksowy system z różnymi kategoriami
- **Zarządzanie uprawnieniami**: Automatyczne ustawianie dostępów do kanałów

---

## 🔧 Handlery

### **commandHandler.js**
**Opis:** System ładowania i rejestracji komend slash
**Funkcje:**
- `loadFiles()`: Rekurencyjne ładowanie plików .js
- `registerCommand()`: Rejestracja komend na serwerach lub globalnie
- **Główna funkcja**: Ładuje wszystkie komendy z folderu commands
- **Walidacja**: Sprawdza poprawność struktury komend
- **Error handling**: Obsługa błędów podczas ładowania

### **eventHandler.js**
**Opis:** System ładowania eventów Discord
**Funkcje:**
- Automatyczne ładowanie wszystkich plików z folderu events
- Rejestracja eventów jako `once` lub `on` w zależności od konfiguracji

### **interactionHandler.js**
**Opis:** System ładowania komponentów interakcji
**Funkcje:**
- Ładowanie modali do `client.modals`
- Ładowanie buttonów do `client.buttons`
- Ładowanie select menu do `client.selectMenus`

---

## 💬 Komendy

### **ticket.js**
**Opis:** Komenda do wysyłania paneli ticketów
**Opcje:** 34 różne panele produktów
**Funkcje:**
- Generowanie embedów dla każdego produktu
- Tworzenie buttonów i select menu
- Sprawdzanie uprawnień użytkownika
- **Produkty**: Bundle, Discord, FG, HX, IPVanish, Keyser, Macho, Red Engine, Steam, Support, FiveM, Tiago, Unicore, Susano i inne

### **drop.js**
**Opis:** System losowania nagród z cooldownem
**Funkcje:**
- **Cooldown**: 8 godzin (pomijany dla właścicieli)
- **Szanse**:
  - 0.1%: FiveM Ready (specjalna)
  - 0.1%: Steam Konto (specjalna)
  - 7%: -5% zniżka
  - 4%: -10% zniżka
  - 2%: -15% zniżka
  - 86.8%: Przegrana
- Automatyczne zarządzanie cooldownem w bazie danych

### **coupon.js**
**Opis:** Zarządzanie kodami promocyjnymi
**Funkcje:**
- `add`: Dodawanie nowych kodów z wartością procentową
- `remove`: Usuwanie istniejących kodów
- Sprawdzanie uprawnień administratora
- Walidacja: unikalność, wartość > 0
- Automatyczne formatowanie na wielkie litery

### **opinion.js**
**Opis:** System recenzji z oceną w gwiazdkach
**Funkcje:**
- Ocena w 3 kategoriach: Time, Implementation, Course (1-5 ⭐)
- Tworzenie embedu z opinią użytkownika
- Ograniczenie do określonego kanału
- Sticky message z instrukcjami
- Automatyczne usuwanie starych sticky messages

### **Inne komendy**:
- **blik.js**: Informacje o płatności BLIK
- **cleanup.js**: Czyszczenie wiadomości
- **embed.js**: Tworzenie embedów
- **emotes.js**: Zarządzanie emotkami
- **f.js**: System +rep
- **legit.js**: Informacje o legitności
- **products.js**: Lista produktów
- **ranking-support.js**: Zarządzanie rankingiem
- **select-role.js**: Wybór ról
- **wiadomosc.js**: Wysyłanie wiadomości

---

## 🎛️ Komponenty Interakcji

### **Modals (Formularze)**
- **adduser_modal.js**: Dodawanie użytkowników do ticketu
- **removeuser_modal.js**: Usuwanie użytkowników z ticketu
- **review_modal.js**: Formularz recenzji supportu
- **coupon_modal.js**: Zarządzanie kuponami
- **embed_modal.js**: Tworzenie embedów

### **Buttons (Przyciski)**
- **coupon.js**: Obsługa kuponów
- **delete.js**: Usuwanie elementów
- **open.js**: Otwieranie ticketów
- **ranking.js**: Obsługa rankingu

### **Select Menus (Menu wyboru)**
**70+ różnych menu dla różnych produktów i kategorii:**
- **Produkty FiveM**: keyser, macho, tiago, unicore, red engine
- **Produkty Fortnite/Valorant**: ventiq, keyser
- **Inne**: bundle, discord, steam, ipvanish, premium, free keys
- **Support**: settings, product_guide

---

## 🛠️ Narzędzia

### **weeklyRanking.js**
**Opis:** Kompleksowy system rankingu supportu
**Funkcje:**
- `createRankingEmbed()`: Tworzenie embedów rankingu
  - TOP 3 z medalami
  - Paginacja dla większej liczby supportów
  - Statystyki tygodniowe
  - Automatyczne pobieranie nazw użytkowników

- `generateWeeklyRanking()`: Generowanie rankingu
  - Analiza danych z ostatniego tygodnia
  - Grupowanie po supportId
  - Obliczanie średnich ocen
  - Sortowanie według oceny i liczby ticketów
  - Wysyłanie na kanał z przyciskami nawigacji

- `scheduleWeeklyRanking()`: Automatyczne planowanie
  - Uruchamianie co niedzielę o 20:00
  - Automatyczne ponowne planowanie
  - Obliczanie czasu do następnego rankingu

**Cache system**: Globalne przechowywanie embedów dla przycisków nawigacji

---

## 🔄 Przepływ Działania

### **Tworzenie Ticketu**
1. Użytkownik klika button/wybiera z menu
2. Wyświetla się modal z polami do wypełnienia
3. System tworzy kanał z odpowiednimi uprawnieniami
4. Zapisuje ticket w bazie danych
5. Wysyła embed z informacjami i menu zarządzania

### **System Recenzji**
1. Support kończy obsługę ticketu
2. Klient otrzymuje możliwość wystawienia recenzji
3. Wypełnia modal z oceną i komentarzem
4. Recenzja trafia do bazy i kanału recenzji
5. Dane wykorzystywane w cotygodniowym rankingu

### **Weryfikacja Użytkowników**
1. Użytkownik wysyła 2 zdjęcia na kanał weryfikacji
2. Bot sprawdza liczbę załączników
3. Sukces: nadanie roli, reakcja ✅, nowy sticky
4. Porażka: usunięcie wiadomości, timeout, DM z instrukcjami

---

## 📊 Statystyki i Monitoring

Bot automatycznie śledzi:
- Liczba ticketów per support
- Średnie oceny supportu
- Aktywność tygodniowa
- Cooldowny użytkowników
- Historia recenzji

Wszystkie dane przechowywane w MongoDB z automatycznymi indeksami dla wydajności.

---

## 🚀 Funkcje Specjalne

- **Automatyczne sticky messages** na różnych kanałach
- **System cooldownów** z pominięciem dla właścicieli
- **Dynamiczne tworzenie kanałów** z konfigurowalnymi uprawnieniami
- **Wielopoziomowy system uprawnień** (właściciele, administratorzy, supporty)
- **Automatyczne zarządzanie reakcjami** i wątkami
- **System powiadomień** dla niskich ocen
- **Backup i cache** danych rankingu

---

*Dokumentacja wygenerowana automatycznie - Silent Maf1a Discord Bot v1.0*