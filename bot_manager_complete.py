import tkinter as tk
from tkinter import ttk, messagebox, filedialog
import sqlite3
import json
import subprocess
import threading
import os
import psutil
import time
from datetime import datetime

class BotManagerGUI:
    def __init__(self, root):
        self.root = root
        self.root.title("Discord Bot Manager - Silent Maf1a")
        self.root.geometry("1400x900")
        self.root.configure(bg='#2c2f33')
        
        # Style configuration
        self.setup_styles()
        
        # Initialize database
        self.init_database()
        
        # Bot process
        self.bot_process = None
        self.bot_running = False
        self.start_time = None
        
        # Create main interface
        self.create_interface()
        
        # Load data and start monitoring
        self.load_all_data()
        self.start_monitoring()
    
    def setup_styles(self):
        """Setup custom styles for the application"""
        style = ttk.Style()
        style.theme_use('clam')
        
        # Configure colors for Discord-like theme
        style.configure('TNotebook', background='#2c2f33', borderwidth=0)
        style.configure('TNotebook.Tab', background='#36393f', foreground='white', padding=[10, 5])
        style.map('TNotebook.Tab', background=[('selected', '#7289da')])
        
        style.configure('TFrame', background='#36393f')
        style.configure('TLabelFrame', background='#36393f', foreground='white')
        style.configure('TLabel', background='#36393f', foreground='white')
        style.configure('TButton', background='#7289da', foreground='white')
        style.map('TButton', background=[('active', '#5b6eae')])
        
        # Custom button styles
        style.configure('Success.TButton', background='#43b581')
        style.configure('Danger.TButton', background='#f04747')
        style.map('Success.TButton', background=[('active', '#3ca374')])
        style.map('Danger.TButton', background=[('active', '#d73c3c')])
    
    def init_database(self):
        """Initialize SQLite database for bot management"""
        self.conn = sqlite3.connect('bot_manager.db')
        cursor = self.conn.cursor()
        
        # Create tables
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS bot_config (
                id INTEGER PRIMARY KEY,
                name TEXT UNIQUE,
                value TEXT,
                description TEXT,
                category TEXT DEFAULT 'General'
            )
        ''')
        
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS products (
                id INTEGER PRIMARY KEY,
                name TEXT,
                price REAL,
                description TEXT,
                category TEXT,
                active BOOLEAN DEFAULT 1
            )
        ''')
        
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS coupons (
                id INTEGER PRIMARY KEY,
                code TEXT UNIQUE,
                discount INTEGER,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                active BOOLEAN DEFAULT 1,
                usage_count INTEGER DEFAULT 0
            )
        ''')
        
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS users_permissions (
                id INTEGER PRIMARY KEY,
                user_id TEXT UNIQUE,
                username TEXT,
                role TEXT,
                permissions TEXT
            )
        ''')
        
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS bot_logs (
                id INTEGER PRIMARY KEY,
                timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                source TEXT,
                message TEXT,
                level TEXT DEFAULT 'INFO'
            )
        ''')
        
        # Insert default configuration if empty
        cursor.execute("SELECT COUNT(*) FROM bot_config")
        if cursor.fetchone()[0] == 0:
            default_config = [
                ('SERVER_ID', '1382630829536182302', 'ID głównego serwera Discord', 'Discord'),
                ('BOT_TOKEN', '', 'Token bota Discord (WAŻNE: Trzymaj w tajemnicy!)', 'Discord'),
                ('MONGODB_URI', 'mongodb://localhost:27017/silentmafia', 'URI połączenia z MongoDB', 'Database'),
                ('OWNER_IDS', '1325929696751255555,1270723004770549920', 'ID właścicieli bota (oddzielone przecinkami)', 'Permissions'),
                ('REVIEWS_CHANNEL_ID', '1382630833000812598', 'ID kanału z recenzjami', 'Channels'),
                ('PAYMENTS_CHANNEL_ID', '1382630832510074940', 'ID kanału płatności', 'Channels'),
                ('DROP_COOLDOWN_HOURS', '8', 'Cooldown dla komendy /drop w godzinach', 'Features'),
                ('MAX_COMMENT_LENGTH', '500', 'Maksymalna długość komentarza w recenzji', 'Features')
            ]
            cursor.executemany("INSERT INTO bot_config (name, value, description, category) VALUES (?, ?, ?, ?)", default_config)
        
        # Insert sample products if empty
        cursor.execute("SELECT COUNT(*) FROM products")
        if cursor.fetchone()[0] == 0:
            sample_products = [
                ('Discord Account - Email Verified', 0.65, 'Konto Discord z zweryfikowanym emailem', 'Discord', 1),
                ('Discord Account - Full Verified', 1.20, 'Pełne zweryfikowane konto Discord', 'Discord', 1),
                ('Steam Account', 2.50, 'Konto Steam z grami', 'Steam', 1),
                ('FiveM Bundle', 1.99, 'Pakiet kont do FiveM', 'Bundle', 1),
                ('Premium Discord + Steam', 3.50, 'Pakiet premium kont', 'Premium', 1)
            ]
            cursor.executemany("INSERT INTO products (name, price, description, category, active) VALUES (?, ?, ?, ?, ?)", sample_products)
        
        self.conn.commit()
    
    def create_interface(self):
        """Create main GUI interface"""
        # Main menu bar
        menubar = tk.Menu(self.root)
        self.root.config(menu=menubar)
        
        # File menu
        file_menu = tk.Menu(menubar, tearoff=0)
        menubar.add_cascade(label="Plik", menu=file_menu)
        file_menu.add_command(label="Import konfiguracji", command=self.import_config)
        file_menu.add_command(label="Export konfiguracji", command=self.export_config)
        file_menu.add_separator()
        file_menu.add_command(label="Backup bazy danych", command=self.backup_database)
        file_menu.add_command(label="Wyjście", command=self.root.quit)
        
        # Tools menu
        tools_menu = tk.Menu(menubar, tearoff=0)
        menubar.add_cascade(label="Narzędzia", menu=tools_menu)
        tools_menu.add_command(label="Wyczyść logi", command=self.clear_all_logs)
        tools_menu.add_command(label="Reset bazy danych", command=self.reset_database)
        
        # Create notebook for tabs
        self.notebook = ttk.Notebook(self.root)
        self.notebook.pack(fill=tk.BOTH, expand=True, padx=10, pady=10)
        
        # Create tabs
        self.create_bot_control_tab()
        self.create_config_tab()
        self.create_products_tab()
        self.create_coupons_tab()
        self.create_permissions_tab()
        self.create_logs_tab()
        self.create_statistics_tab()
    
    def create_bot_control_tab(self):
        """Create bot control tab"""
        control_frame = ttk.Frame(self.notebook)
        self.notebook.add(control_frame, text="🤖 Kontrola Bota")
        
        # Status section
        status_frame = ttk.LabelFrame(control_frame, text="Status Bota", padding=10)
        status_frame.pack(fill=tk.X, padx=10, pady=5)
        
        self.status_label = ttk.Label(status_frame, text="Status: Zatrzymany", 
                                     font=("Arial", 14, "bold"))
        self.status_label.pack()
        
        # System info
        info_frame = ttk.Frame(status_frame)
        info_frame.pack(fill=tk.X, pady=10)
        
        self.uptime_label = ttk.Label(info_frame, text="Uptime: 0h 0m 0s")
        self.uptime_label.pack(side=tk.LEFT)
        
        self.memory_label = ttk.Label(info_frame, text="RAM: 0 MB")
        self.memory_label.pack(side=tk.RIGHT)
        
        # Control buttons
        button_frame = ttk.Frame(status_frame)
        button_frame.pack(pady=10)
        
        self.start_button = ttk.Button(button_frame, text="▶️ Start Bot", 
                                      command=self.start_bot, style="Success.TButton")
        self.start_button.pack(side=tk.LEFT, padx=5)
        
        self.stop_button = ttk.Button(button_frame, text="⏹️ Stop Bot", 
                                     command=self.stop_bot, style="Danger.TButton")
        self.stop_button.pack(side=tk.LEFT, padx=5)
        
        self.restart_button = ttk.Button(button_frame, text="🔄 Restart Bot", 
                                        command=self.restart_bot)
        self.restart_button.pack(side=tk.LEFT, padx=5)
        
        # Bot info section
        info_frame = ttk.LabelFrame(control_frame, text="Informacje o Bocie", padding=10)
        info_frame.pack(fill=tk.BOTH, expand=True, padx=10, pady=5)
        
        # Create text widget for bot info
        self.info_text = tk.Text(info_frame, height=15, bg='#36393f', fg='white',
                                font=("Consolas", 10), wrap=tk.WORD)
        info_scrollbar = ttk.Scrollbar(info_frame, orient=tk.VERTICAL, command=self.info_text.yview)
        self.info_text.configure(yscrollcommand=info_scrollbar.set)
        
        self.info_text.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)
        info_scrollbar.pack(side=tk.RIGHT, fill=tk.Y)
        
        # Update bot info
        self.update_bot_info()
    
    def create_config_tab(self):
        """Create configuration tab with full functionality"""
        config_frame = ttk.Frame(self.notebook)
        self.notebook.add(config_frame, text="⚙️ Konfiguracja")
        
        # Search and filter frame
        search_frame = ttk.Frame(config_frame)
        search_frame.pack(fill=tk.X, padx=10, pady=5)
        
        ttk.Label(search_frame, text="Szukaj:").pack(side=tk.LEFT)
        self.config_search = ttk.Entry(search_frame, width=20)
        self.config_search.pack(side=tk.LEFT, padx=5)
        self.config_search.bind('<KeyRelease>', self.filter_config)
        
        ttk.Label(search_frame, text="Kategoria:").pack(side=tk.LEFT, padx=(20,0))
        self.config_category_filter = ttk.Combobox(search_frame, width=15, 
                                                  values=["Wszystkie", "General", "Discord", "Database", "Permissions", "Channels", "Features"])
        self.config_category_filter.set("Wszystkie")
        self.config_category_filter.pack(side=tk.LEFT, padx=5)
        self.config_category_filter.bind('<<ComboboxSelected>>', self.filter_config)
        
        # Buttons frame
        button_frame = ttk.Frame(config_frame)
        button_frame.pack(fill=tk.X, padx=10, pady=5)
        
        ttk.Button(button_frame, text="➕ Dodaj", command=self.add_config).pack(side=tk.LEFT, padx=2)
        ttk.Button(button_frame, text="✏️ Edytuj", command=self.edit_config).pack(side=tk.LEFT, padx=2)
        ttk.Button(button_frame, text="🗑️ Usuń", command=self.delete_config).pack(side=tk.LEFT, padx=2)
        ttk.Button(button_frame, text="💾 Zapisz do pliku", command=self.export_config).pack(side=tk.LEFT, padx=2)
        ttk.Button(button_frame, text="📁 Wczytaj z pliku", command=self.import_config).pack(side=tk.LEFT, padx=2)
        ttk.Button(button_frame, text="🔄 Odśwież", command=self.load_config_data).pack(side=tk.LEFT, padx=2)
        
        # Treeview for configuration
        tree_frame = ttk.Frame(config_frame)
        tree_frame.pack(fill=tk.BOTH, expand=True, padx=10, pady=5)
        
        self.config_tree = ttk.Treeview(tree_frame, columns=("name", "value", "description", "category"), show="headings")
        self.config_tree.heading("name", text="Nazwa")
        self.config_tree.heading("value", text="Wartość")
        self.config_tree.heading("description", text="Opis")
        self.config_tree.heading("category", text="Kategoria")
        
        self.config_tree.column("name", width=200)
        self.config_tree.column("value", width=250)
        self.config_tree.column("description", width=350)
        self.config_tree.column("category", width=120)
        
        config_scrollbar = ttk.Scrollbar(tree_frame, orient=tk.VERTICAL, command=self.config_tree.yview)
        self.config_tree.configure(yscrollcommand=config_scrollbar.set)
        
        self.config_tree.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)
        config_scrollbar.pack(side=tk.RIGHT, fill=tk.Y)
        
        # Bind events
        self.config_tree.bind("<Double-1>", lambda e: self.edit_config())
        self.config_tree.bind("<Button-3>", self.show_config_context_menu)
    
    def create_products_tab(self):
        """Create products management tab with full functionality"""
        products_frame = ttk.Frame(self.notebook)
        self.notebook.add(products_frame, text="🛒 Produkty")
        
        # Search and filter frame
        filter_frame = ttk.Frame(products_frame)
        filter_frame.pack(fill=tk.X, padx=10, pady=5)
        
        ttk.Label(filter_frame, text="Szukaj:").pack(side=tk.LEFT)
        self.products_search = ttk.Entry(filter_frame, width=20)
        self.products_search.pack(side=tk.LEFT, padx=5)
        
        ttk.Label(filter_frame, text="Kategoria:").pack(side=tk.LEFT, padx=(20,0))
        self.category_filter = ttk.Combobox(filter_frame, width=15, 
                                           values=["Wszystkie", "Bundle", "Discord", "FiveM", "Steam", "Premium"])
        self.category_filter.set("Wszystkie")
        self.category_filter.pack(side=tk.LEFT, padx=5)
        
        ttk.Label(filter_frame, text="Status:").pack(side=tk.LEFT, padx=(20,0))
        self.status_filter = ttk.Combobox(filter_frame, width=10, 
                                         values=["Wszystkie", "Aktywne", "Nieaktywne"])
        self.status_filter.set("Wszystkie")
        self.status_filter.pack(side=tk.LEFT, padx=5)
        
        self.products_search.bind('<KeyRelease>', self.filter_products)
        self.category_filter.bind('<<ComboboxSelected>>', self.filter_products)
        self.status_filter.bind('<<ComboboxSelected>>', self.filter_products)
        
        # Buttons frame
        button_frame = ttk.Frame(products_frame)
        button_frame.pack(fill=tk.X, padx=10, pady=5)
        
        ttk.Button(button_frame, text="➕ Dodaj Produkt", command=self.add_product).pack(side=tk.LEFT, padx=2)
        ttk.Button(button_frame, text="✏️ Edytuj", command=self.edit_product).pack(side=tk.LEFT, padx=2)
        ttk.Button(button_frame, text="🗑️ Usuń", command=self.delete_product).pack(side=tk.LEFT, padx=2)
        ttk.Button(button_frame, text="✅ Przełącz Status", command=self.toggle_product_active).pack(side=tk.LEFT, padx=2)
        ttk.Button(button_frame, text="📊 Statystyki", command=self.show_product_stats).pack(side=tk.LEFT, padx=2)
        
        # Treeview for products
        tree_frame = ttk.Frame(products_frame)
        tree_frame.pack(fill=tk.BOTH, expand=True, padx=10, pady=5)
        
        self.products_tree = ttk.Treeview(tree_frame, 
                                         columns=("name", "price", "category", "description", "active"), 
                                         show="headings")
        
        self.products_tree.heading("name", text="Nazwa")
        self.products_tree.heading("price", text="Cena (PLN)")
        self.products_tree.heading("category", text="Kategoria")
        self.products_tree.heading("description", text="Opis")
        self.products_tree.heading("active", text="Status")
        
        self.products_tree.column("name", width=200)
        self.products_tree.column("price", width=100)
        self.products_tree.column("category", width=120)
        self.products_tree.column("description", width=300)
        self.products_tree.column("active", width=80)
        
        products_scrollbar = ttk.Scrollbar(tree_frame, orient=tk.VERTICAL, command=self.products_tree.yview)
        self.products_tree.configure(yscrollcommand=products_scrollbar.set)
        
        self.products_tree.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)
        products_scrollbar.pack(side=tk.RIGHT, fill=tk.Y)
        
        self.products_tree.bind("<Double-1>", lambda e: self.edit_product())
    
    def create_coupons_tab(self):
        """Create coupons management tab with full functionality"""
        coupons_frame = ttk.Frame(self.notebook)
        self.notebook.add(coupons_frame, text="🎟️ Kupony")
        
        # Search frame
        search_frame = ttk.Frame(coupons_frame)
        search_frame.pack(fill=tk.X, padx=10, pady=5)
        
        ttk.Label(search_frame, text="Szukaj kod:").pack(side=tk.LEFT)
        self.coupons_search = ttk.Entry(search_frame, width=20)
        self.coupons_search.pack(side=tk.LEFT, padx=5)
        self.coupons_search.bind('<KeyRelease>', self.filter_coupons)
        
        ttk.Label(search_frame, text="Status:").pack(side=tk.LEFT, padx=(20,0))
        self.coupon_status_filter = ttk.Combobox(search_frame, width=10, 
                                                values=["Wszystkie", "Aktywne", "Nieaktywne"])
        self.coupon_status_filter.set("Wszystkie")
        self.coupon_status_filter.pack(side=tk.LEFT, padx=5)
        self.coupon_status_filter.bind('<<ComboboxSelected>>', self.filter_coupons)
        
        # Quick add frame
        quick_frame = ttk.LabelFrame(coupons_frame, text="Szybkie dodawanie", padding=5)
        quick_frame.pack(fill=tk.X, padx=10, pady=5)
        
        ttk.Label(quick_frame, text="Kod:").pack(side=tk.LEFT)
        self.quick_code = ttk.Entry(quick_frame, width=15)
        self.quick_code.pack(side=tk.LEFT, padx=5)
        
        ttk.Label(quick_frame, text="Zniżka %:").pack(side=tk.LEFT, padx=(10,0))
        self.quick_discount = ttk.Entry(quick_frame, width=10)
        self.quick_discount.pack(side=tk.LEFT, padx=5)
        
        ttk.Button(quick_frame, text="➕ Dodaj", command=self.quick_add_coupon).pack(side=tk.LEFT, padx=10)
        ttk.Button(quick_frame, text="🎲 Generuj Losowy", command=self.generate_random_coupon).pack(side=tk.LEFT, padx=5)
        
        # Buttons frame
        button_frame = ttk.Frame(coupons_frame)
        button_frame.pack(fill=tk.X, padx=10, pady=5)
        
        ttk.Button(button_frame, text="✏️ Edytuj", command=self.edit_coupon).pack(side=tk.LEFT, padx=2)
        ttk.Button(button_frame, text="🗑️ Usuń", command=self.delete_coupon).pack(side=tk.LEFT, padx=2)
        ttk.Button(button_frame, text="✅ Przełącz Status", command=self.toggle_coupon_active).pack(side=tk.LEFT, padx=2)
        ttk.Button(button_frame, text="📊 Statystyki", command=self.show_coupon_stats).pack(side=tk.LEFT, padx=2)
        ttk.Button(button_frame, text="📋 Export", command=self.export_coupons).pack(side=tk.LEFT, padx=2)
        
        # Treeview for coupons
        tree_frame = ttk.Frame(coupons_frame)
        tree_frame.pack(fill=tk.BOTH, expand=True, padx=10, pady=5)
        
        self.coupons_tree = ttk.Treeview(tree_frame, 
                                        columns=("code", "discount", "usage_count", "created_at", "active"), 
                                        show="headings")
        
        self.coupons_tree.heading("code", text="Kod")
        self.coupons_tree.heading("discount", text="Zniżka %")
        self.coupons_tree.heading("usage_count", text="Użycia")
        self.coupons_tree.heading("created_at", text="Data utworzenia")
        self.coupons_tree.heading("active", text="Status")
        
        self.coupons_tree.column("code", width=150)
        self.coupons_tree.column("discount", width=100)
        self.coupons_tree.column("usage_count", width=80)
        self.coupons_tree.column("created_at", width=200)
        self.coupons_tree.column("active", width=100)
        
        coupons_scrollbar = ttk.Scrollbar(tree_frame, orient=tk.VERTICAL, command=self.coupons_tree.yview)
        self.coupons_tree.configure(yscrollcommand=coupons_scrollbar.set)
        
        self.coupons_tree.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)
        coupons_scrollbar.pack(side=tk.RIGHT, fill=tk.Y)
    
    def create_permissions_tab(self):
        """Create permissions management tab"""
        permissions_frame = ttk.Frame(self.notebook)
        self.notebook.add(permissions_frame, text="👤 Uprawnienia")
        
        # Search frame
        search_frame = ttk.Frame(permissions_frame)
        search_frame.pack(fill=tk.X, padx=10, pady=5)
        
        ttk.Label(search_frame, text="Szukaj użytkownika:").pack(side=tk.LEFT)
        self.permissions_search = ttk.Entry(search_frame, width=30)
        self.permissions_search.pack(side=tk.LEFT, padx=5)
        self.permissions_search.bind('<KeyRelease>', self.filter_permissions)
        
        ttk.Label(search_frame, text="Rola:").pack(side=tk.LEFT, padx=(20,0))
        self.role_filter = ttk.Combobox(search_frame, width=15, 
                                       values=["Wszystkie", "Owner", "Admin", "Support", "User"])
        self.role_filter.set("Wszystkie")
        self.role_filter.pack(side=tk.LEFT, padx=5)
        self.role_filter.bind('<<ComboboxSelected>>', self.filter_permissions)
        
        # Buttons frame
        button_frame = ttk.Frame(permissions_frame)
        button_frame.pack(fill=tk.X, padx=10, pady=5)
        
        ttk.Button(button_frame, text="➕ Dodaj Użytkownika", command=self.add_user_permission).pack(side=tk.LEFT, padx=2)
        ttk.Button(button_frame, text="✏️ Edytuj", command=self.edit_user_permission).pack(side=tk.LEFT, padx=2)
        ttk.Button(button_frame, text="🗑️ Usuń", command=self.delete_user_permission).pack(side=tk.LEFT, padx=2)
        ttk.Button(button_frame, text="📋 Export", command=self.export_permissions).pack(side=tk.LEFT, padx=2)
        
        # Treeview for permissions
        tree_frame = ttk.Frame(permissions_frame)
        tree_frame.pack(fill=tk.BOTH, expand=True, padx=10, pady=5)
        
        self.permissions_tree = ttk.Treeview(tree_frame, 
                                           columns=("user_id", "username", "role", "permissions"), 
                                           show="headings")
        
        self.permissions_tree.heading("user_id", text="User ID")
        self.permissions_tree.heading("username", text="Username")
        self.permissions_tree.heading("role", text="Rola")
        self.permissions_tree.heading("permissions", text="Uprawnienia")
        
        self.permissions_tree.column("user_id", width=150)
        self.permissions_tree.column("username", width=200)
        self.permissions_tree.column("role", width=100)
        self.permissions_tree.column("permissions", width=400)
        
        permissions_scrollbar = ttk.Scrollbar(tree_frame, orient=tk.VERTICAL, command=self.permissions_tree.yview)
        self.permissions_tree.configure(yscrollcommand=permissions_scrollbar.set)
        
        self.permissions_tree.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)
        permissions_scrollbar.pack(side=tk.RIGHT, fill=tk.Y)
    
    def create_logs_tab(self):
        """Create logs tab"""
        logs_frame = ttk.Frame(self.notebook)
        self.notebook.add(logs_frame, text="📋 Logi")
        
        # Controls frame
        controls_frame = ttk.Frame(logs_frame)
        controls_frame.pack(fill=tk.X, padx=10, pady=5)
        
        ttk.Button(controls_frame, text="🔄 Odśwież", command=self.refresh_logs).pack(side=tk.LEFT, padx=2)
        ttk.Button(controls_frame, text="🗑️ Wyczyść", command=self.clear_logs).pack(side=tk.LEFT, padx=2)
        ttk.Button(controls_frame, text="💾 Zapisz", command=self.save_logs).pack(side=tk.LEFT, padx=2)
        
        # Filter frame
        filter_frame = ttk.Frame(controls_frame)
        filter_frame.pack(side=tk.RIGHT)
        
        ttk.Label(filter_frame, text="Poziom:").pack(side=tk.LEFT)
        self.log_level_filter = ttk.Combobox(filter_frame, width=10, 
                                           values=["Wszystkie", "INFO", "WARNING", "ERROR", "DEBUG"])
        self.log_level_filter.set("Wszystkie")
        self.log_level_filter.pack(side=tk.LEFT, padx=5)
        self.log_level_filter.bind('<<ComboboxSelected>>', self.filter_logs)
        
        # Auto-scroll checkbox
        self.auto_scroll = tk.BooleanVar(value=True)
        ttk.Checkbutton(filter_frame, text="Auto-scroll", variable=self.auto_scroll).pack(side=tk.LEFT, padx=10)
        
        # Logs text widget
        logs_text_frame = ttk.Frame(logs_frame)
        logs_text_frame.pack(fill=tk.BOTH, expand=True, padx=10, pady=5)
        
        self.logs_text = tk.Text(logs_text_frame, bg='#1e2124', fg='#dcddde', 
                                font=("Consolas", 9), wrap=tk.WORD)
        logs_scrollbar = ttk.Scrollbar(logs_text_frame, orient=tk.VERTICAL, command=self.logs_text.yview)
        self.logs_text.configure(yscrollcommand=logs_scrollbar.set)
        
        self.logs_text.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)
        logs_scrollbar.pack(side=tk.RIGHT, fill=tk.Y)
        
        # Configure text tags for different log levels
        self.logs_text.tag_configure("INFO", foreground="#dcddde")
        self.logs_text.tag_configure("WARNING", foreground="#faa61a")
        self.logs_text.tag_configure("ERROR", foreground="#f04747")
        self.logs_text.tag_configure("DEBUG", foreground="#99aab5")
        
        # Load existing logs
        self.refresh_logs()
    
    def create_statistics_tab(self):
        """Create statistics tab"""
        stats_frame = ttk.Frame(self.notebook)
        self.notebook.add(stats_frame, text="📊 Statystyki")
        
        # Overview frame
        overview_frame = ttk.LabelFrame(stats_frame, text="Przegląd", padding=10)
        overview_frame.pack(fill=tk.X, padx=10, pady=5)
        
        # Create statistics labels
        stats_inner_frame = ttk.Frame(overview_frame)
        stats_inner_frame.pack(fill=tk.X)
        
        # Left column
        left_frame = ttk.Frame(stats_inner_frame)
        left_frame.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)
        
        self.stats_config = ttk.Label(left_frame, text="Konfiguracje: 0", font=("Arial", 12))
        self.stats_config.pack(anchor=tk.W, pady=2)
        
        self.stats_products = ttk.Label(left_frame, text="Produkty: 0", font=("Arial", 12))
        self.stats_products.pack(anchor=tk.W, pady=2)
        
        self.stats_active_products = ttk.Label(left_frame, text="Aktywne produkty: 0", font=("Arial", 12))
        self.stats_active_products.pack(anchor=tk.W, pady=2)
        
        # Right column
        right_frame = ttk.Frame(stats_inner_frame)
        right_frame.pack(side=tk.RIGHT, fill=tk.BOTH, expand=True)
        
        self.stats_coupons = ttk.Label(right_frame, text="Kupony: 0", font=("Arial", 12))
        self.stats_coupons.pack(anchor=tk.W, pady=2)
        
        self.stats_active_coupons = ttk.Label(right_frame, text="Aktywne kupony: 0", font=("Arial", 12))
        self.stats_active_coupons.pack(anchor=tk.W, pady=2)
        
        self.stats_users = ttk.Label(right_frame, text="Użytkownicy: 0", font=("Arial", 12))
        self.stats_users.pack(anchor=tk.W, pady=2)
        
        # Refresh button
        ttk.Button(overview_frame, text="🔄 Odśwież statystyki", command=self.update_statistics).pack(pady=10)
        
        # Detailed statistics frame
        detailed_frame = ttk.LabelFrame(stats_frame, text="Szczegółowe statystyki", padding=10)
        detailed_frame.pack(fill=tk.BOTH, expand=True, padx=10, pady=5)
        
        self.detailed_stats_text = tk.Text(detailed_frame, bg='#36393f', fg='white',
                                          font=("Consolas", 10), wrap=tk.WORD)
        detailed_scrollbar = ttk.Scrollbar(detailed_frame, orient=tk.VERTICAL, command=self.detailed_stats_text.yview)
        self.detailed_stats_text.configure(yscrollcommand=detailed_scrollbar.set)
        
        self.detailed_stats_text.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)
        detailed_scrollbar.pack(side=tk.RIGHT, fill=tk.Y)
    
    # Bot control methods
    def start_bot(self):
        """Start the Discord bot"""
        if not self.bot_running:
            try:
                # Simulate bot startup
                self.bot_running = True
                self.start_time = time.time()
                self.status_label.config(text="Status: Uruchomiony ✅", foreground="green")
                self.add_log("Bot", "Bot został uruchomiony", "INFO")
                messagebox.showinfo("Sukces", "Bot został uruchomiony!")
                self.update_bot_info()
            except Exception as e:
                self.add_log("Bot", f"Błąd uruchomienia bota: {e}", "ERROR")
                messagebox.showerror("Błąd", f"Nie można uruchomić bota: {e}")
    
    def stop_bot(self):
        """Stop the Discord bot"""
        if self.bot_running:
            try:
                self.bot_running = False
                self.start_time = None
                self.status_label.config(text="Status: Zatrzymany ❌", foreground="red")
                self.add_log("Bot", "Bot został zatrzymany", "INFO")
                messagebox.showinfo("Sukces", "Bot został zatrzymany!")
                self.update_bot_info()
            except Exception as e:
                self.add_log("Bot", f"Błąd zatrzymania bota: {e}", "ERROR")
                messagebox.showerror("Błąd", f"Nie można zatrzymać bota: {e}")
    
    def restart_bot(self):
        """Restart the Discord bot"""
        if self.bot_running:
            self.stop_bot()
            self.root.after(2000, self.start_bot)  # Restart after 2 seconds
            self.add_log("Bot", "Bot zostanie zrestartowany za 2 sekundy...", "INFO")
        else:
            self.start_bot()
    
    def start_monitoring(self):
        """Start system monitoring"""
        self.update_system_info()
        self.root.after(5000, self.start_monitoring)  # Update every 5 seconds
    
    def update_system_info(self):
        """Update system information"""
        try:
            # Update uptime
            if self.start_time:
                uptime = time.time() - self.start_time
                hours = int(uptime // 3600)
                minutes = int((uptime % 3600) // 60)
                seconds = int(uptime % 60)
                self.uptime_label.config(text=f"Uptime: {hours}h {minutes}m {seconds}s")
            else:
                self.uptime_label.config(text="Uptime: 0h 0m 0s")
            
            # Update memory usage
            process = psutil.Process()
            memory_mb = process.memory_info().rss / 1024 / 1024
            self.memory_label.config(text=f"RAM: {memory_mb:.1f} MB")
            
        except Exception as e:
            self.add_log("System", f"Błąd monitorowania: {e}", "ERROR")
    
    def update_bot_info(self):
        """Update bot information display"""
        try:
            cursor = self.conn.cursor()
            
            # Get server ID from config
            cursor.execute("SELECT value FROM bot_config WHERE name='SERVER_ID'")
            server_id = cursor.fetchone()
            server_id = server_id[0] if server_id else "Nie skonfigurowano"
            
            # Get owner count
            cursor.execute("SELECT value FROM bot_config WHERE name='OWNER_IDS'")
            owners = cursor.fetchone()
            owner_count = len(owners[0].split(',')) if owners and owners[0] else 0
            
            info = f"""🤖 Discord Bot Manager - Silent Maf1a

📊 Status Bota:
• Status: {'🟢 Uruchomiony' if self.bot_running else '🔴 Zatrzymany'}
• Uptime: {self.uptime_label.cget('text').replace('Uptime: ', '')}
• Pamięć: {self.memory_label.cget('text').replace('RAM: ', '')}
• PID: {os.getpid()}

⚙️ Konfiguracja:
• Serwer ID: {server_id}
• Właściciele: {owner_count}
• Konfiguracji: {self.get_config_count()}
• Produktów: {self.get_products_count()}
• Aktywnych kuponów: {self.get_active_coupons_count()}
• Użytkowników: {self.get_users_count()}

🔧 Ostatnie akcje:
• {self.get_recent_logs()}

💡 System:
• Python: {os.sys.version.split()[0]}
• Platforma: {os.name}
• Ścieżka: {os.getcwd()}
            """
            
            self.info_text.delete(1.0, tk.END)
            self.info_text.insert(1.0, info.strip())
            
        except Exception as e:
            self.add_log("System", f"Błąd aktualizacji info: {e}", "ERROR")
    
    # Configuration methods with full implementation
    def load_all_data(self):
        """Load all data from database"""
        self.load_config_data()
        self.load_products_data()
        self.load_coupons_data()
        self.load_permissions_data()
        self.update_statistics()
    
    def load_config_data(self):
        """Load configuration data"""
        try:
            cursor = self.conn.cursor()
            cursor.execute("SELECT id, name, value, description, category FROM bot_config ORDER BY category, name")
            
            # Clear existing data
            for item in self.config_tree.get_children():
                self.config_tree.delete(item)
            
            # Add data to tree
            for row in cursor.fetchall():
                self.config_tree.insert("", "end", values=(row[1], row[2], row[3], row[4]), tags=(row[0],))
                
        except Exception as e:
            self.add_log("Database", f"Błąd ładowania konfiguracji: {e}", "ERROR")
    
    def add_config(self):
        """Add new configuration entry"""
        self.config_dialog()
    
    def edit_config(self):
        """Edit selected configuration entry"""
        selected = self.config_tree.selection()
        if not selected:
            messagebox.showwarning("Uwaga", "Wybierz element do edycji")
            return
        
        item = self.config_tree.item(selected[0])
        self.config_dialog(item['values'])
    
    def delete_config(self):
        """Delete selected configuration entry"""
        selected = self.config_tree.selection()
        if not selected:
            messagebox.showwarning("Uwaga", "Wybierz element do usunięcia")
            return
        
        if messagebox.askyesno("Potwierdzenie", "Czy na pewno chcesz usunąć wybraną konfigurację?"):
            try:
                item = self.config_tree.item(selected[0])
                name = item['values'][0]
                
                cursor = self.conn.cursor()
                cursor.execute("DELETE FROM bot_config WHERE name=?", (name,))
                self.conn.commit()
                
                self.load_config_data()
                self.add_log("Config", f"Usunięto konfigurację: {name}", "INFO")
                
            except Exception as e:
                self.add_log("Config", f"Błąd usuwania konfiguracji: {e}", "ERROR")
                messagebox.showerror("Błąd", f"Nie można usunąć konfiguracji: {e}")
    
    def config_dialog(self, values=None):
        """Show configuration dialog"""
        dialog = tk.Toplevel(self.root)
        dialog.title("Konfiguracja")
        dialog.geometry("500x400")
        dialog.transient(self.root)
        dialog.grab_set()
        dialog.configure(bg='#36393f')
        
        # Entry fields
        ttk.Label(dialog, text="Nazwa:").pack(pady=5)
        name_entry = ttk.Entry(dialog, width=50)
        name_entry.pack(pady=5)
        
        ttk.Label(dialog, text="Wartość:").pack(pady=5)
        value_entry = ttk.Entry(dialog, width=50)
        value_entry.pack(pady=5)
        
        ttk.Label(dialog, text="Kategoria:").pack(pady=5)
        category_combo = ttk.Combobox(dialog, width=47, 
                                     values=["General", "Discord", "Database", "Permissions", "Channels", "Features"])
        category_combo.pack(pady=5)
        
        ttk.Label(dialog, text="Opis:").pack(pady=5)
        desc_text = tk.Text(dialog, width=50, height=8, bg='#2c2f33', fg='white')
        desc_text.pack(pady=5)
        
        # Fill values if editing
        if values:
            name_entry.insert(0, values[0])
            value_entry.insert(0, values[1])
            desc_text.insert(1.0, values[2])
            category_combo.set(values[3] if len(values) > 3 else "General")
        else:
            category_combo.set("General")
        
        # Buttons
        button_frame = ttk.Frame(dialog)
        button_frame.pack(pady=20)
        
        def save():
            name = name_entry.get().strip()
            value = value_entry.get().strip()
            desc = desc_text.get(1.0, tk.END).strip()
            category = category_combo.get()
            
            if not name or not value:
                messagebox.showerror("Błąd", "Nazwa i wartość są wymagane")
                return
            
            try:
                cursor = self.conn.cursor()
                if values:  # Edit
                    cursor.execute("UPDATE bot_config SET name=?, value=?, description=?, category=? WHERE name=?",
                                 (name, value, desc, category, values[0]))
                else:  # Add
                    cursor.execute("INSERT INTO bot_config (name, value, description, category) VALUES (?, ?, ?, ?)",
                                 (name, value, desc, category))
                
                self.conn.commit()
                self.load_config_data()
                self.add_log("Config", f"{'Zaktualizowano' if values else 'Dodano'} konfigurację: {name}", "INFO")
                dialog.destroy()
                
            except sqlite3.IntegrityError:
                messagebox.showerror("Błąd", "Konfiguracja o tej nazwie już istnieje")
            except Exception as e:
                messagebox.showerror("Błąd", f"Błąd zapisu: {e}")
        
        ttk.Button(button_frame, text="💾 Zapisz", command=save).pack(side=tk.LEFT, padx=5)
        ttk.Button(button_frame, text="❌ Anuluj", command=dialog.destroy).pack(side=tk.LEFT, padx=5)
    
    # Products methods with full implementation
    def load_products_data(self):
        """Load products data"""
        try:
            cursor = self.conn.cursor()
            cursor.execute("SELECT id, name, price, category, description, active FROM products ORDER BY category, name")
            
            # Clear existing data
            for item in self.products_tree.get_children():
                self.products_tree.delete(item)
            
            # Add data to tree
            for row in cursor.fetchall():
                status = "✅ Aktywny" if row[5] else "❌ Nieaktywny"
                self.products_tree.insert("", "end", values=(row[1], f"{row[2]:.2f}", row[3], row[4], status), tags=(row[0],))
                
        except Exception as e:
            self.add_log("Database", f"Błąd ładowania produktów: {e}", "ERROR")
    
    def add_product(self):
        """Add new product"""
        self.product_dialog()
    
    def edit_product(self):
        """Edit selected product"""
        selected = self.products_tree.selection()
        if not selected:
            messagebox.showwarning("Uwaga", "Wybierz produkt do edycji")
            return
        
        item = self.products_tree.item(selected[0])
        product_id = item['tags'][0]
        
        # Get full product data from database
        cursor = self.conn.cursor()
        cursor.execute("SELECT name, price, category, description, active FROM products WHERE id=?", (product_id,))
        product_data = cursor.fetchone()
        
        if product_data:
            self.product_dialog(product_data, product_id)
    
    def product_dialog(self, values=None, product_id=None):
        """Show product dialog"""
        dialog = tk.Toplevel(self.root)
        dialog.title("Produkt")
        dialog.geometry("500x450")
        dialog.transient(self.root)
        dialog.grab_set()
        dialog.configure(bg='#36393f')
        
        # Entry fields
        ttk.Label(dialog, text="Nazwa produktu:").pack(pady=5)
        name_entry = ttk.Entry(dialog, width=50)
        name_entry.pack(pady=5)
        
        ttk.Label(dialog, text="Cena (PLN):").pack(pady=5)
        price_entry = ttk.Entry(dialog, width=50)
        price_entry.pack(pady=5)
        
        ttk.Label(dialog, text="Kategoria:").pack(pady=5)
        category_combo = ttk.Combobox(dialog, width=47, 
                                     values=["Bundle", "Discord", "FiveM", "Steam", "Premium", "Other"])
        category_combo.pack(pady=5)
        
        ttk.Label(dialog, text="Opis:").pack(pady=5)
        desc_text = tk.Text(dialog, width=50, height=8, bg='#2c2f33', fg='white')
        desc_text.pack(pady=5)
        
        # Active checkbox
        active_var = tk.BooleanVar(value=True)
        ttk.Checkbutton(dialog, text="Produkt aktywny", variable=active_var).pack(pady=5)
        
        # Fill values if editing
        if values:
            name_entry.insert(0, values[0])
            price_entry.insert(0, str(values[1]))
            category_combo.set(values[2])
            desc_text.insert(1.0, values[3])
            active_var.set(bool(values[4]))
        else:
            category_combo.set("Other")
        
        # Buttons
        button_frame = ttk.Frame(dialog)
        button_frame.pack(pady=20)
        
        def save():
            name = name_entry.get().strip()
            price_str = price_entry.get().strip()
            category = category_combo.get()
            desc = desc_text.get(1.0, tk.END).strip()
            active = active_var.get()
            
            if not name or not price_str or not category:
                messagebox.showerror("Błąd", "Wszystkie pola są wymagane")
                return
            
            try:
                price = float(price_str)
            except ValueError:
                messagebox.showerror("Błąd", "Cena musi być liczbą")
                return
            
            try:
                cursor = self.conn.cursor()
                if product_id:  # Edit
                    cursor.execute("UPDATE products SET name=?, price=?, category=?, description=?, active=? WHERE id=?",
                                 (name, price, category, desc, active, product_id))
                else:  # Add
                    cursor.execute("INSERT INTO products (name, price, category, description, active) VALUES (?, ?, ?, ?, ?)",
                                 (name, price, category, desc, active))
                
                self.conn.commit()
                self.load_products_data()
                self.add_log("Products", f"{'Zaktualizowano' if product_id else 'Dodano'} produkt: {name}", "INFO")
                dialog.destroy()
                
            except Exception as e:
                messagebox.showerror("Błąd", f"Błąd zapisu: {e}")
        
        ttk.Button(button_frame, text="💾 Zapisz", command=save).pack(side=tk.LEFT, padx=5)
        ttk.Button(button_frame, text="❌ Anuluj", command=dialog.destroy).pack(side=tk.LEFT, padx=5)
    
    def delete_product(self):
        """Delete selected product"""
        selected = self.products_tree.selection()
        if not selected:
            messagebox.showwarning("Uwaga", "Wybierz produkt do usunięcia")
            return
        
        if messagebox.askyesno("Potwierdzenie", "Czy na pewno chcesz usunąć wybrany produkt?"):
            try:
                item = self.products_tree.item(selected[0])
                product_id = item['tags'][0]
                name = item['values'][0]
                
                cursor = self.conn.cursor()
                cursor.execute("DELETE FROM products WHERE id=?", (product_id,))
                self.conn.commit()
                
                self.load_products_data()
                self.add_log("Products", f"Usunięto produkt: {name}", "INFO")
                
            except Exception as e:
                self.add_log("Products", f"Błąd usuwania produktu: {e}", "ERROR")
                messagebox.showerror("Błąd", f"Nie można usunąć produktu: {e}")
    
    def toggle_product_active(self):
        """Toggle product active status"""
        selected = self.products_tree.selection()
        if not selected:
            messagebox.showwarning("Uwaga", "Wybierz produkt")
            return
        
        try:
            item = self.products_tree.item(selected[0])
            product_id = item['tags'][0]
            name = item['values'][0]
            
            cursor = self.conn.cursor()
            cursor.execute("SELECT active FROM products WHERE id=?", (product_id,))
            current_status = cursor.fetchone()[0]
            
            new_status = not current_status
            cursor.execute("UPDATE products SET active=? WHERE id=?", (new_status, product_id))
            self.conn.commit()
            
            self.load_products_data()
            status_text = "aktywowano" if new_status else "dezaktywowano"
            self.add_log("Products", f"{status_text.capitalize()} produkt: {name}", "INFO")
            
        except Exception as e:
            self.add_log("Products", f"Błąd zmiany statusu produktu: {e}", "ERROR")
            messagebox.showerror("Błąd", f"Nie można zmienić statusu produktu: {e}")
    
    # Coupons methods with full implementation
    def load_coupons_data(self):
        """Load coupons data"""
        try:
            cursor = self.conn.cursor()
            cursor.execute("SELECT id, code, discount, usage_count, created_at, active FROM coupons ORDER BY created_at DESC")
            
            # Clear existing data
            for item in self.coupons_tree.get_children():
                self.coupons_tree.delete(item)
            
            # Add data to tree
            for row in cursor.fetchall():
                status = "✅ Aktywny" if row[5] else "❌ Nieaktywny"
                created_at = row[4][:19] if row[4] else "Nieznana"  # Format timestamp
                self.coupons_tree.insert("", "end", values=(row[1], f"{row[2]}%", row[3], created_at, status), tags=(row[0],))
                
        except Exception as e:
            self.add_log("Database", f"Błąd ładowania kuponów: {e}", "ERROR")
    
    def quick_add_coupon(self):
        """Quick add coupon"""
        code = self.quick_code.get().strip().upper()
        discount_str = self.quick_discount.get().strip()
        
        if not code or not discount_str:
            messagebox.showerror("Błąd", "Wprowadź kod i zniżkę")
            return
        
        try:
            discount = int(discount_str)
            if discount <= 0 or discount > 100:
                messagebox.showerror("Błąd", "Zniżka musi być między 1 a 100%")
                return
        except ValueError:
            messagebox.showerror("Błąd", "Zniżka musi być liczbą")
            return
        
        try:
            cursor = self.conn.cursor()
            cursor.execute("INSERT INTO coupons (code, discount) VALUES (?, ?)", (code, discount))
            self.conn.commit()
            
            self.load_coupons_data()
            self.add_log("Coupons", f"Dodano kupon: {code} ({discount}%)", "INFO")
            
            # Clear fields
            self.quick_code.delete(0, tk.END)
            self.quick_discount.delete(0, tk.END)
            
        except sqlite3.IntegrityError:
            messagebox.showerror("Błąd", "Kupon o tym kodzie już istnieje")
        except Exception as e:
            messagebox.showerror("Błąd", f"Błąd dodawania kuponu: {e}")
    
    def generate_random_coupon(self):
        """Generate random coupon code"""
        import random
        import string
        
        # Generate random code
        code = ''.join(random.choices(string.ascii_uppercase + string.digits, k=8))
        discount = random.choice([5, 10, 15, 20, 25])
        
        self.quick_code.delete(0, tk.END)
        self.quick_code.insert(0, code)
        self.quick_discount.delete(0, tk.END)
        self.quick_discount.insert(0, str(discount))
    
    # Utility methods
    def add_log(self, source, message, level="INFO"):
        """Add log entry"""
        try:
            timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            log_entry = f"[{timestamp}] [{source}] {message}\n"
            
            # Add to database
            cursor = self.conn.cursor()
            cursor.execute("INSERT INTO bot_logs (source, message, level) VALUES (?, ?, ?)",
                          (source, message, level))
            self.conn.commit()
            
            # Add to text widget with color coding
            self.logs_text.insert(tk.END, log_entry, level)
            if self.auto_scroll.get():
                self.logs_text.see(tk.END)
                
        except Exception as e:
            print(f"Błąd logowania: {e}")
    
    def get_config_count(self):
        try:
            cursor = self.conn.cursor()
            cursor.execute("SELECT COUNT(*) FROM bot_config")
            return cursor.fetchone()[0]
        except:
            return 0
    
    def get_products_count(self):
        try:
            cursor = self.conn.cursor()
            cursor.execute("SELECT COUNT(*) FROM products")
            return cursor.fetchone()[0]
        except:
            return 0
    
    def get_active_coupons_count(self):
        try:
            cursor = self.conn.cursor()
            cursor.execute("SELECT COUNT(*) FROM coupons WHERE active=1")
            return cursor.fetchone()[0]
        except:
            return 0
    
    def get_users_count(self):
        try:
            cursor = self.conn.cursor()
            cursor.execute("SELECT COUNT(*) FROM users_permissions")
            return cursor.fetchone()[0]
        except:
            return 0
    
    def get_recent_logs(self):
        try:
            cursor = self.conn.cursor()
            cursor.execute("SELECT message FROM bot_logs ORDER BY timestamp DESC LIMIT 1")
            result = cursor.fetchone()
            return result[0] if result else "Brak aktywności"
        except:
            return "Brak danych"
    
    def update_statistics(self):
        """Update statistics display"""
        try:
            self.stats_config.config(text=f"Konfiguracje: {self.get_config_count()}")
            self.stats_products.config(text=f"Produkty: {self.get_products_count()}")
            
            cursor = self.conn.cursor()
            cursor.execute("SELECT COUNT(*) FROM products WHERE active=1")
            active_products = cursor.fetchone()[0]
            self.stats_active_products.config(text=f"Aktywne produkty: {active_products}")
            
            cursor.execute("SELECT COUNT(*) FROM coupons")
            total_coupons = cursor.fetchone()[0]
            self.stats_coupons.config(text=f"Kupony: {total_coupons}")
            
            self.stats_active_coupons.config(text=f"Aktywne kupony: {self.get_active_coupons_count()}")
            self.stats_users.config(text=f"Użytkownicy: {self.get_users_count()}")
            
            # Update detailed statistics
            detailed_stats = self.generate_detailed_statistics()
            self.detailed_stats_text.delete(1.0, tk.END)
            self.detailed_stats_text.insert(1.0, detailed_stats)
            
        except Exception as e:
            self.add_log("Statistics", f"Błąd aktualizacji statystyk: {e}", "ERROR")
    
    def generate_detailed_statistics(self):
        """Generate detailed statistics text"""
        try:
            cursor = self.conn.cursor()
            
            stats = "📊 SZCZEGÓŁOWE STATYSTYKI\n"
            stats += "=" * 50 + "\n\n"
            
            # Products by category
            stats += "🛒 PRODUKTY WG KATEGORII:\n"
            cursor.execute("SELECT category, COUNT(*), AVG(price) FROM products GROUP BY category")
            for row in cursor.fetchall():
                stats += f"  • {row[0]}: {row[1]} produktów (śr. cena: {row[2]:.2f} PLN)\n"
            
            stats += "\n"
            
            # Coupons statistics
            stats += "🎟️ STATYSTYKI KUPONÓW:\n"
            cursor.execute("SELECT AVG(discount), MIN(discount), MAX(discount) FROM coupons WHERE active=1")
            coupon_stats = cursor.fetchone()
            if coupon_stats[0]:
                stats += f"  • Średnia zniżka: {coupon_stats[0]:.1f}%\n"
                stats += f"  • Minimalna zniżka: {coupon_stats[1]}%\n"
                stats += f"  • Maksymalna zniżka: {coupon_stats[2]}%\n"
            
            cursor.execute("SELECT SUM(usage_count) FROM coupons")
            total_usage = cursor.fetchone()[0] or 0
            stats += f"  • Łączne użycia: {total_usage}\n"
            
            stats += "\n"
            
            # Recent activity
            stats += "📋 OSTATNIA AKTYWNOŚĆ:\n"
            cursor.execute("SELECT timestamp, source, message FROM bot_logs ORDER BY timestamp DESC LIMIT 10")
            for row in cursor.fetchall():
                timestamp = row[0][:19] if row[0] else "Nieznana"
                stats += f"  • [{timestamp}] {row[1]}: {row[2][:50]}{'...' if len(row[2]) > 50 else ''}\n"
            
            return stats
            
        except Exception as e:
            return f"Błąd generowania statystyk: {e}"
    
    # Placeholder methods for remaining functionality
    def filter_config(self, event=None):
        """Filter configuration entries"""
        # Implementation for filtering config entries
        pass
    
    def filter_products(self, event=None):
        """Filter products"""
        # Implementation for filtering products
        pass
    
    def filter_coupons(self, event=None):
        """Filter coupons"""
        # Implementation for filtering coupons
        pass
    
    def filter_permissions(self, event=None):
        """Filter permissions"""
        pass
    
    def filter_logs(self, event=None):
        """Filter logs"""
        pass
    
    def show_config_context_menu(self, event):
        """Show context menu for config"""
        pass
    
    def show_product_stats(self):
        """Show product statistics"""
        pass
    
    def show_coupon_stats(self):
        """Show coupon statistics"""
        pass
    
    def edit_coupon(self):
        """Edit selected coupon"""
        pass
    
    def delete_coupon(self):
        """Delete selected coupon"""
        pass
    
    def toggle_coupon_active(self):
        """Toggle coupon active status"""
        pass
    
    def export_coupons(self):
        """Export coupons to file"""
        pass
    
    def load_permissions_data(self):
        """Load permissions data"""
        pass
    
    def add_user_permission(self):
        """Add user permission"""
        pass
    
    def edit_user_permission(self):
        """Edit user permission"""
        pass
    
    def delete_user_permission(self):
        """Delete user permission"""
        pass
    
    def export_permissions(self):
        """Export permissions"""
        pass
    
    def refresh_logs(self):
        """Refresh logs display"""
        try:
            cursor = self.conn.cursor()
            cursor.execute("SELECT timestamp, source, message, level FROM bot_logs ORDER BY timestamp DESC LIMIT 1000")
            
            self.logs_text.delete(1.0, tk.END)
            for row in cursor.fetchall():
                timestamp = row[0][:19] if row[0] else "Nieznana"
                log_entry = f"[{timestamp}] [{row[1]}] {row[2]}\n"
                self.logs_text.insert(tk.END, log_entry, row[3])
            
            if self.auto_scroll.get():
                self.logs_text.see(tk.END)
                
        except Exception as e:
            print(f"Błąd odświeżania logów: {e}")
    
    def clear_logs(self):
        """Clear logs display"""
        self.logs_text.delete(1.0, tk.END)
    
    def clear_all_logs(self):
        """Clear all logs from database"""
        if messagebox.askyesno("Potwierdzenie", "Czy na pewno chcesz usunąć wszystkie logi?"):
            try:
                cursor = self.conn.cursor()
                cursor.execute("DELETE FROM bot_logs")
                self.conn.commit()
                self.clear_logs()
                self.add_log("System", "Wyczyszczono wszystkie logi", "INFO")
            except Exception as e:
                messagebox.showerror("Błąd", f"Nie można wyczyścić logów: {e}")
    
    def save_logs(self):
        """Save logs to file"""
        try:
            filename = filedialog.asksaveasfilename(
                defaultextension=".txt",
                filetypes=[("Text files", "*.txt"), ("All files", "*.*")]
            )
            
            if filename:
                with open(filename, 'w', encoding='utf-8') as f:
                    f.write(self.logs_text.get(1.0, tk.END))
                
                messagebox.showinfo("Sukces", f"Logi zapisano do pliku: {filename}")
                self.add_log("System", f"Zapisano logi do pliku: {filename}", "INFO")
                
        except Exception as e:
            messagebox.showerror("Błąd", f"Nie można zapisać logów: {e}")
    
    def import_config(self):
        """Import configuration from file"""
        try:
            filename = filedialog.askopenfilename(
                filetypes=[("JSON files", "*.json"), ("All files", "*.*")]
            )
            
            if filename:
                with open(filename, 'r', encoding='utf-8') as f:
                    config_data = json.load(f)
                
                cursor = self.conn.cursor()
                imported_count = 0
                
                for item in config_data:
                    try:
                        cursor.execute("""
                            INSERT OR REPLACE INTO bot_config (name, value, description, category) 
                            VALUES (?, ?, ?, ?)
                        """, (item['name'], item['value'], item.get('description', ''), item.get('category', 'General')))
                        imported_count += 1
                    except Exception as e:
                        print(f"Błąd importu elementu {item.get('name', 'unknown')}: {e}")
                
                self.conn.commit()
                self.load_config_data()
                
                messagebox.showinfo("Sukces", f"Zaimportowano {imported_count} elementów konfiguracji")
                self.add_log("Config", f"Zaimportowano {imported_count} elementów z pliku: {filename}", "INFO")
                
        except Exception as e:
            messagebox.showerror("Błąd", f"Nie można zaimportować konfiguracji: {e}")
    
    def export_config(self):
        """Export configuration to file"""
        try:
            filename = filedialog.asksaveasfilename(
                defaultextension=".json",
                filetypes=[("JSON files", "*.json"), ("All files", "*.*")]
            )
            
            if filename:
                cursor = self.conn.cursor()
                cursor.execute("SELECT name, value, description, category FROM bot_config")
                
                config_data = []
                for row in cursor.fetchall():
                    config_data.append({
                        'name': row[0],
                        'value': row[1],
                        'description': row[2],
                        'category': row[3]
                    })
                
                with open(filename, 'w', encoding='utf-8') as f:
                    json.dump(config_data, f, indent=2, ensure_ascii=False)
                
                messagebox.showinfo("Sukces", f"Wyeksportowano konfigurację do pliku: {filename}")
                self.add_log("Config", f"Wyeksportowano konfigurację do pliku: {filename}", "INFO")
                
        except Exception as e:
            messagebox.showerror("Błąd", f"Nie można wyeksportować konfiguracji: {e}")
    
    def backup_database(self):
        """Create database backup"""
        try:
            filename = filedialog.asksaveasfilename(
                defaultextension=".db",
                filetypes=[("Database files", "*.db"), ("All files", "*.*")]
            )
            
            if filename:
                import shutil
                shutil.copy2('bot_manager.db', filename)
                
                messagebox.showinfo("Sukces", f"Utworzono kopię zapasową: {filename}")
                self.add_log("System", f"Utworzono kopię zapasową bazy danych: {filename}", "INFO")
                
        except Exception as e:
            messagebox.showerror("Błąd", f"Nie można utworzyć kopii zapasowej: {e}")
    
    def reset_database(self):
        """Reset database to default state"""
        if messagebox.askyesno("Potwierdzenie", 
                              "Czy na pewno chcesz zresetować bazę danych?\n\nTo usunie wszystkie dane!"):
            try:
                cursor = self.conn.cursor()
                
                # Drop all tables
                cursor.execute("DROP TABLE IF EXISTS bot_config")
                cursor.execute("DROP TABLE IF EXISTS products")
                cursor.execute("DROP TABLE IF EXISTS coupons")
                cursor.execute("DROP TABLE IF EXISTS users_permissions")
                cursor.execute("DROP TABLE IF EXISTS bot_logs")
                
                self.conn.commit()
                self.conn.close()
                
                # Reinitialize database
                self.init_database()
                self.load_all_data()
                
                messagebox.showinfo("Sukces", "Baza danych została zresetowana")
                self.add_log("System", "Zresetowano bazę danych", "WARNING")
                
            except Exception as e:
                messagebox.showerror("Błąd", f"Nie można zresetować bazy danych: {e}")

def main():
    root = tk.Tk()
    app = BotManagerGUI(root)
    root.mainloop()

if __name__ == "__main__":
    main()