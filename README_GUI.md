# Discord Bot Manager GUI - Silent Maf1a

Kompletny interfejs graficzny do zarządzania botem Discord z edytowalnymi tabelami i pełną funkcjonalnością.

## 🚀 Funkcje

### 🤖 Kontrola Bota
- **Start/Stop/Restart** bota Discord
- **Monitoring w czasie rzeczywistym** (uptime, pamięć, CPU)
- **Szczegółowe informacje** o statusie bota
- **Automatyczne odświeżanie** danych systemowych

### ⚙️ Zarządzanie Konfiguracją
- **Edytowalne tabele** z wszystkimi ustawieniami bota
- **Kategorie konfiguracji** (Discord, Database, Permissions, Channels, Features)
- **Import/Export** konfiguracji do plików JSON
- **Wyszukiwanie i filtrowanie** ustawień
- **Walidacja** danych wejściowych

### 🛒 Zarządzanie Produktami
- **Pełna tabela produktów** z cenami, opisami, kategoriami
- **Dodawanie/Edytowanie/Usuwanie** produktów
- **Aktywacja/Dezaktywacja** produktów
- **Filtrowanie** po kategorii i statusie
- **Statystyki** produktów

### 🎟️ System Kuponów
- **Zarządzanie kodami promocyjnymi**
- **Szybkie dodawanie** kuponów
- **Generator losowych kodów**
- **Śledzenie użyć** kuponów
- **Export** kuponów do pliku
- **Statystyki zniżek**

### 👤 Uprawnienia Użytkowników
- **Zarządzanie rolami** i uprawnieniami
- **Dodawanie użytkowników** z różnymi poziomami dostępu
- **Filtrowanie** po rolach
- **Export** uprawnień

### 📋 System Logowania
- **Kolorowe logi** z różnymi poziomami (INFO, WARNING, ERROR, DEBUG)
- **Auto-scroll** i filtrowanie logów
- **Zapis logów** do pliku
- **Historia działań** w bazie danych

### 📊 Statystyki i Monitoring
- **Przegląd systemu** w czasie rzeczywistym
- **Szczegółowe statystyki** produktów i kuponów
- **Analiza aktywności** użytkowników
- **Wykresy wykorzystania**

## 🛠️ Instalacja

### Wymagania
- Python 3.7 lub nowszy
- Tkinter (zwykle dołączony do Pythona)

### Kroki instalacji

1. **Zainstaluj zależności:**
```bash
pip install -r requirements.txt
```

2. **Uruchom aplikację:**
```bash
python bot_manager_complete.py
```

## 💡 Jak używać

### Pierwsze uruchomienie
1. Aplikacja automatycznie utworzy bazę danych SQLite (`bot_manager.db`)
2. Załaduje przykładową konfigurację i produkty
3. Będzie gotowa do użycia

### Zarządzanie danymi w tabelach

#### ⚙️ Konfiguracja
- **Dodawanie:** Kliknij "➕ Dodaj" → Wypełnij formularz → "💾 Zapisz"
- **Edytowanie:** Kliknij dwukrotnie na wiersz LUB wybierz i kliknij "✏️ Edytuj"
- **Usuwanie:** Wybierz wiersz → "🗑️ Usuń" → Potwierdź
- **Filtrowanie:** Użyj pola "Szukaj" lub wybierz kategorię
- **Import/Export:** Użyj przycisków "📁 Wczytaj z pliku" / "💾 Zapisz do pliku"

#### 🛒 Produkty
- **Dodawanie produktu:** "➕ Dodaj Produkt" → Formularz → "💾 Zapisz"
- **Edytowanie:** Dwukrotne kliknięcie na produkt
- **Zmiana statusu:** Wybierz produkt → "✅ Przełącz Status"
- **Filtrowanie:** Po nazwie, kategorii lub statusie
- **Statystyki:** "📊 Statystyki" dla szczegółów

#### 🎟️ Kupony
- **Szybkie dodawanie:** Wpisz kod i zniżkę → "➕ Dodaj"
- **Losowy kupon:** "🎲 Generuj Losowy" → "➕ Dodaj"
- **Zarządzanie:** Edytuj, usuń lub zmień status kuponu
- **Export:** "📋 Export" dla kopii zapasowej

### Kontrola Bota
- **Start:** "▶️ Start Bot" (symulacja uruchomienia)
- **Stop:** "⏹️ Stop Bot" 
- **Restart:** "🔄 Restart Bot"
- **Monitoring:** Automatyczne odświeżanie co 5 sekund

### Logi i Monitoring
- **Poziomy logów:** INFO (biały), WARNING (pomarańczowy), ERROR (czerwony), DEBUG (szary)
- **Filtrowanie:** Wybierz poziom z listy
- **Auto-scroll:** Automatyczne przewijanie do najnowszych logów
- **Zapis:** "💾 Zapisz" dla eksportu logów

## 🗃️ Struktura bazy danych

### Tabele
- **bot_config** - Konfiguracja bota (nazwa, wartość, opis, kategoria)
- **products** - Produkty (nazwa, cena, kategoria, opis, status)
- **coupons** - Kupony (kod, zniżka, użycia, data, status)
- **users_permissions** - Uprawnienia (user_id, username, rola, uprawnienia)
- **bot_logs** - Logi (timestamp, źródło, wiadomość, poziom)

### Przykładowe dane
Aplikacja automatycznie tworzy przykładową konfigurację:
- ID serwera Discord
- Tokeny i URI połączeń
- Kanały i uprawnienia
- Ustawienia funkcji bota

## 🎨 Interfejs

### Motyw Discord
- **Kolory:** Ciemny motyw inspirowany Discordem
- **Ikony:** Emoji dla łatwej identyfikacji funkcji
- **Responsywność:** Automatyczne dopasowanie do rozmiaru okna

### Zakładki
1. **🤖 Kontrola Bota** - Start/stop i monitoring
2. **⚙️ Konfiguracja** - Ustawienia bota
3. **🛒 Produkty** - Zarządzanie produktami
4. **🎟️ Kupony** - Kody promocyjne
5. **👤 Uprawnienia** - Role użytkowników
6. **📋 Logi** - Historia działań
7. **📊 Statystyki** - Analiza danych

## 🔧 Funkcje zaawansowane

### Menu główne
- **Plik:** Import/Export konfiguracji, Backup bazy danych
- **Narzędzia:** Wyczyść logi, Reset bazy danych

### Skróty klawiszowe
- **Ctrl+S** - Zapis (w formularzach)
- **Delete** - Usuń wybrany element
- **F5** - Odśwież dane
- **Ctrl+F** - Fokus na wyszukiwanie

### Walidacja danych
- **Automatyczna** walidacja pól
- **Komunikaty błędów** w przypadku nieprawidłowych danych
- **Potwierdzenia** przed usunięciem

## 🚨 Rozwiązywanie problemów

### Błędy bazy danych
```
Błąd: database is locked
Rozwiązanie: Zamknij wszystkie instancje aplikacji
```

### Problemy z importem
```
Błąd: Invalid JSON format
Rozwiązanie: Sprawdź format pliku JSON
```

### Brak uprawnień
```
Błąd: Permission denied
Rozwiązanie: Uruchom jako administrator (Windows) lub sudo (Linux)
```

## 📝 Rozwój

### Dodawanie nowych funkcji
1. **Nowa tabela:** Dodaj definicję w `init_database()`
2. **Nowa zakładka:** Stwórz metodę `create_[nazwa]_tab()`
3. **Nowe operacje:** Implementuj CRUD w odpowiednich metodach

### Customizacja
- **Kolory:** Zmień w `setup_styles()`
- **Ikony:** Zamień emoji w tekstach przycisków
- **Rozmiary:** Dostosuj w `geometry()` i `column()` metodach

## 🔐 Bezpieczeństwo

### Dane wrażliwe
- **Tokeny** są przechowywane w bazie lokalnie
- **Hasła** nie są szyfrowane (dodaj szyfrowanie dla produkcji)
- **Backup** bazy danych regularnie

### Uprawnienia
- **Lokalna aplikacja** - pełny dostęp do bazy
- **Walidacja** danych wejściowych
- **Logi** wszystkich operacji

---

**Autor:** AI Assistant  
**Wersja:** 1.0  
**Licencja:** MIT  

Aplikacja gotowa do użycia! 🚀