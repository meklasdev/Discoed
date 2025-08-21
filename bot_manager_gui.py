import tkinter as tk
from tkinter import ttk, messagebox, filedialog
import sqlite3
import json
import subprocess
import threading
import os
from datetime import datetime

class BotManagerGUI:
    def __init__(self, root):
        self.root = root
        self.root.title("Discord Bot Manager - Silent Maf1a")
        self.root.geometry("1200x800")
        self.root.configure(bg='#2c2f33')
        
        # Initialize database
        self.init_database()
        
        # Bot process
        self.bot_process = None
        self.bot_running = False
        
        # Create main interface
        self.create_interface()
        
        # Load data
        self.load_all_data()
    
    def init_database(self):
        """Initialize SQLite database for bot management"""
        self.conn = sqlite3.connect('bot_manager.db')
        cursor = self.conn.cursor()
        
        # Create tables
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS bot_config (
                id INTEGER PRIMARY KEY,
                name TEXT,
                value TEXT,
                description TEXT
            )
        ''')
        
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS products (
                id INTEGER PRIMARY KEY,
                name TEXT,
                price REAL,
                description TEXT,
                category TEXT,
                active BOOLEAN
            )
        ''')
        
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS coupons (
                id INTEGER PRIMARY KEY,
                code TEXT UNIQUE,
                discount INTEGER,
                created_at TIMESTAMP,
                active BOOLEAN
            )
        ''')
        
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS users_permissions (
                id INTEGER PRIMARY KEY,
                user_id TEXT,
                username TEXT,
                role TEXT,
                permissions TEXT
            )
        ''')
        
        self.conn.commit()
    
    def create_interface(self):
        """Create main GUI interface"""
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
    
    def create_bot_control_tab(self):
        """Create bot control tab"""
        control_frame = ttk.Frame(self.notebook)
        self.notebook.add(control_frame, text="🤖 Kontrola Bota")
        
        # Status section
        status_frame = ttk.LabelFrame(control_frame, text="Status Bota", padding=10)
        status_frame.pack(fill=tk.X, padx=10, pady=5)
        
        self.status_label = ttk.Label(status_frame, text="Status: Zatrzymany", 
                                     font=("Arial", 12, "bold"))
        self.status_label.pack()
        
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
                                font=("Consolas", 10))
        info_scrollbar = ttk.Scrollbar(info_frame, orient=tk.VERTICAL, command=self.info_text.yview)
        self.info_text.configure(yscrollcommand=info_scrollbar.set)
        
        self.info_text.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)
        info_scrollbar.pack(side=tk.RIGHT, fill=tk.Y)
        
        # Update bot info
        self.update_bot_info()
    
    def create_config_tab(self):
        """Create configuration tab"""
        config_frame = ttk.Frame(self.notebook)
        self.notebook.add(config_frame, text="⚙️ Konfiguracja")
        
        # Search frame
        search_frame = ttk.Frame(config_frame)
        search_frame.pack(fill=tk.X, padx=10, pady=5)
        
        ttk.Label(search_frame, text="Szukaj:").pack(side=tk.LEFT)
        self.config_search = ttk.Entry(search_frame, width=30)
        self.config_search.pack(side=tk.LEFT, padx=5)
        self.config_search.bind('<KeyRelease>', self.filter_config)
        
        # Buttons frame
        button_frame = ttk.Frame(config_frame)
        button_frame.pack(fill=tk.X, padx=10, pady=5)
        
        ttk.Button(button_frame, text="➕ Dodaj", command=self.add_config).pack(side=tk.LEFT, padx=2)
        ttk.Button(button_frame, text="✏️ Edytuj", command=self.edit_config).pack(side=tk.LEFT, padx=2)
        ttk.Button(button_frame, text="🗑️ Usuń", command=self.delete_config).pack(side=tk.LEFT, padx=2)
        ttk.Button(button_frame, text="💾 Zapisz", command=self.save_config).pack(side=tk.LEFT, padx=2)
        ttk.Button(button_frame, text="📁 Import", command=self.import_config).pack(side=tk.LEFT, padx=2)
        ttk.Button(button_frame, text="📤 Export", command=self.export_config).pack(side=tk.LEFT, padx=2)
        
        # Treeview for configuration
        tree_frame = ttk.Frame(config_frame)
        tree_frame.pack(fill=tk.BOTH, expand=True, padx=10, pady=5)
        
        self.config_tree = ttk.Treeview(tree_frame, columns=("name", "value", "description"), show="headings")
        self.config_tree.heading("name", text="Nazwa")
        self.config_tree.heading("value", text="Wartość")
        self.config_tree.heading("description", text="Opis")
        
        self.config_tree.column("name", width=200)
        self.config_tree.column("value", width=300)
        self.config_tree.column("description", width=400)
        
        config_scrollbar = ttk.Scrollbar(tree_frame, orient=tk.VERTICAL, command=self.config_tree.yview)
        self.config_tree.configure(yscrollcommand=config_scrollbar.set)
        
        self.config_tree.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)
        config_scrollbar.pack(side=tk.RIGHT, fill=tk.Y)
        
        # Bind double-click to edit
        self.config_tree.bind("<Double-1>", lambda e: self.edit_config())
    
    def create_products_tab(self):
        """Create products management tab"""
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
        
        self.products_search.bind('<KeyRelease>', self.filter_products)
        self.category_filter.bind('<<ComboboxSelected>>', self.filter_products)
        
        # Buttons frame
        button_frame = ttk.Frame(products_frame)
        button_frame.pack(fill=tk.X, padx=10, pady=5)
        
        ttk.Button(button_frame, text="➕ Dodaj Produkt", command=self.add_product).pack(side=tk.LEFT, padx=2)
        ttk.Button(button_frame, text="✏️ Edytuj", command=self.edit_product).pack(side=tk.LEFT, padx=2)
        ttk.Button(button_frame, text="🗑️ Usuń", command=self.delete_product).pack(side=tk.LEFT, padx=2)
        ttk.Button(button_frame, text="✅ Aktywuj", command=self.toggle_product_active).pack(side=tk.LEFT, padx=2)
        
        # Treeview for products
        tree_frame = ttk.Frame(products_frame)
        tree_frame.pack(fill=tk.BOTH, expand=True, padx=10, pady=5)
        
        self.products_tree = ttk.Treeview(tree_frame, 
                                         columns=("name", "price", "category", "description", "active"), 
                                         show="headings")
        
        self.products_tree.heading("name", text="Nazwa")
        self.products_tree.heading("price", text="Cena")
        self.products_tree.heading("category", text="Kategoria")
        self.products_tree.heading("description", text="Opis")
        self.products_tree.heading("active", text="Aktywny")
        
        self.products_tree.column("name", width=150)
        self.products_tree.column("price", width=80)
        self.products_tree.column("category", width=100)
        self.products_tree.column("description", width=300)
        self.products_tree.column("active", width=80)
        
        products_scrollbar = ttk.Scrollbar(tree_frame, orient=tk.VERTICAL, command=self.products_tree.yview)
        self.products_tree.configure(yscrollcommand=products_scrollbar.set)
        
        self.products_tree.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)
        products_scrollbar.pack(side=tk.RIGHT, fill=tk.Y)
        
        self.products_tree.bind("<Double-1>", lambda e: self.edit_product())
    
    def create_coupons_tab(self):
        """Create coupons management tab"""
        coupons_frame = ttk.Frame(self.notebook)
        self.notebook.add(coupons_frame, text="🎟️ Kupony")
        
        # Search frame
        search_frame = ttk.Frame(coupons_frame)
        search_frame.pack(fill=tk.X, padx=10, pady=5)
        
        ttk.Label(search_frame, text="Szukaj kod:").pack(side=tk.LEFT)
        self.coupons_search = ttk.Entry(search_frame, width=20)
        self.coupons_search.pack(side=tk.LEFT, padx=5)
        self.coupons_search.bind('<KeyRelease>', self.filter_coupons)
        
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
        
        # Buttons frame
        button_frame = ttk.Frame(coupons_frame)
        button_frame.pack(fill=tk.X, padx=10, pady=5)
        
        ttk.Button(button_frame, text="✏️ Edytuj", command=self.edit_coupon).pack(side=tk.LEFT, padx=2)
        ttk.Button(button_frame, text="🗑️ Usuń", command=self.delete_coupon).pack(side=tk.LEFT, padx=2)
        ttk.Button(button_frame, text="✅ Aktywuj/Dezaktywuj", command=self.toggle_coupon_active).pack(side=tk.LEFT, padx=2)
        ttk.Button(button_frame, text="📊 Statystyki", command=self.show_coupon_stats).pack(side=tk.LEFT, padx=2)
        
        # Treeview for coupons
        tree_frame = ttk.Frame(coupons_frame)
        tree_frame.pack(fill=tk.BOTH, expand=True, padx=10, pady=5)
        
        self.coupons_tree = ttk.Treeview(tree_frame, 
                                        columns=("code", "discount", "created_at", "active"), 
                                        show="headings")
        
        self.coupons_tree.heading("code", text="Kod")
        self.coupons_tree.heading("discount", text="Zniżka %")
        self.coupons_tree.heading("created_at", text="Data utworzenia")
        self.coupons_tree.heading("active", text="Aktywny")
        
        self.coupons_tree.column("code", width=150)
        self.coupons_tree.column("discount", width=100)
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
        
        # Buttons frame
        button_frame = ttk.Frame(permissions_frame)
        button_frame.pack(fill=tk.X, padx=10, pady=5)
        
        ttk.Button(button_frame, text="➕ Dodaj Użytkownika", command=self.add_user_permission).pack(side=tk.LEFT, padx=2)
        ttk.Button(button_frame, text="✏️ Edytuj", command=self.edit_user_permission).pack(side=tk.LEFT, padx=2)
        ttk.Button(button_frame, text="🗑️ Usuń", command=self.delete_user_permission).pack(side=tk.LEFT, padx=2)
        
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
        self.permissions_tree.column("permissions", width=300)
        
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
        
        # Auto-scroll checkbox
        self.auto_scroll = tk.BooleanVar(value=True)
        ttk.Checkbutton(controls_frame, text="Auto-scroll", variable=self.auto_scroll).pack(side=tk.RIGHT)
        
        # Logs text widget
        logs_text_frame = ttk.Frame(logs_frame)
        logs_text_frame.pack(fill=tk.BOTH, expand=True, padx=10, pady=5)
        
        self.logs_text = tk.Text(logs_text_frame, bg='#1e2124', fg='#dcddde', 
                                font=("Consolas", 9), wrap=tk.WORD)
        logs_scrollbar = ttk.Scrollbar(logs_text_frame, orient=tk.VERTICAL, command=self.logs_text.yview)
        self.logs_text.configure(yscrollcommand=logs_scrollbar.set)
        
        self.logs_text.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)
        logs_scrollbar.pack(side=tk.RIGHT, fill=tk.Y)
        
        # Add some sample logs
        self.add_log("System", "Bot Manager uruchomiony")
    
    # Bot control methods
    def start_bot(self):
        """Start the Discord bot"""
        if not self.bot_running:
            try:
                # Here you would start your Discord bot process
                # For demo purposes, we'll simulate it
                self.bot_running = True
                self.status_label.config(text="Status: Uruchomiony", foreground="green")
                self.add_log("Bot", "Bot został uruchomiony")
                messagebox.showinfo("Sukces", "Bot został uruchomiony!")
            except Exception as e:
                messagebox.showerror("Błąd", f"Nie można uruchomić bota: {e}")
    
    def stop_bot(self):
        """Stop the Discord bot"""
        if self.bot_running:
            try:
                self.bot_running = False
                self.status_label.config(text="Status: Zatrzymany", foreground="red")
                self.add_log("Bot", "Bot został zatrzymany")
                messagebox.showinfo("Sukces", "Bot został zatrzymany!")
            except Exception as e:
                messagebox.showerror("Błąd", f"Nie można zatrzymać bota: {e}")
    
    def restart_bot(self):
        """Restart the Discord bot"""
        self.stop_bot()
        self.root.after(2000, self.start_bot)  # Restart after 2 seconds
        self.add_log("Bot", "Bot zostanie zrestartowany za 2 sekundy...")
    
    def update_bot_info(self):
        """Update bot information display"""
        info = f"""
🤖 Discord Bot Manager - Silent Maf1a

📊 Statystyki:
• Status: {'Uruchomiony' if self.bot_running else 'Zatrzymany'}
• Uptime: 0h 0m 0s
• Pamięć: 0 MB
• CPU: 0%

⚙️ Konfiguracja:
• Serwer ID: 1382630829536182302
• Właściciele: 3
• Komendy: {self.get_config_count()}
• Produkty: {self.get_products_count()}
• Kupony: {self.get_coupons_count()}

🔧 Ostatnie akcje:
• Brak aktywności
        """
        
        self.info_text.delete(1.0, tk.END)
        self.info_text.insert(1.0, info.strip())
    
    # Configuration methods
    def load_all_data(self):
        """Load all data from database"""
        self.load_config_data()
        self.load_products_data()
        self.load_coupons_data()
        self.load_permissions_data()
        self.update_bot_info()
    
    def load_config_data(self):
        """Load configuration data"""
        cursor = self.conn.cursor()
        cursor.execute("SELECT id, name, value, description FROM bot_config")
        
        # Clear existing data
        for item in self.config_tree.get_children():
            self.config_tree.delete(item)
        
        # Add data to tree
        for row in cursor.fetchall():
            self.config_tree.insert("", "end", values=(row[1], row[2], row[3]), tags=(row[0],))
    
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
    
    def config_dialog(self, values=None):
        """Show configuration dialog"""
        dialog = tk.Toplevel(self.root)
        dialog.title("Konfiguracja")
        dialog.geometry("400x300")
        dialog.transient(self.root)
        dialog.grab_set()
        
        # Entry fields
        ttk.Label(dialog, text="Nazwa:").pack(pady=5)
        name_entry = ttk.Entry(dialog, width=40)
        name_entry.pack(pady=5)
        
        ttk.Label(dialog, text="Wartość:").pack(pady=5)
        value_entry = ttk.Entry(dialog, width=40)
        value_entry.pack(pady=5)
        
        ttk.Label(dialog, text="Opis:").pack(pady=5)
        desc_text = tk.Text(dialog, width=40, height=5)
        desc_text.pack(pady=5)
        
        # Fill values if editing
        if values:
            name_entry.insert(0, values[0])
            value_entry.insert(0, values[1])
            desc_text.insert(1.0, values[2])
        
        # Buttons
        button_frame = ttk.Frame(dialog)
        button_frame.pack(pady=10)
        
        def save():
            name = name_entry.get().strip()
            value = value_entry.get().strip()
            desc = desc_text.get(1.0, tk.END).strip()
            
            if not name or not value:
                messagebox.showerror("Błąd", "Nazwa i wartość są wymagane")
                return
            
            cursor = self.conn.cursor()
            if values:  # Edit
                cursor.execute("UPDATE bot_config SET name=?, value=?, description=? WHERE name=?",
                             (name, value, desc, values[0]))
            else:  # Add
                cursor.execute("INSERT INTO bot_config (name, value, description) VALUES (?, ?, ?)",
                             (name, value, desc))
            
            self.conn.commit()
            self.load_config_data()
            self.add_log("Config", f"{'Zaktualizowano' if values else 'Dodano'} konfigurację: {name}")
            dialog.destroy()
        
        ttk.Button(button_frame, text="💾 Zapisz", command=save).pack(side=tk.LEFT, padx=5)
        ttk.Button(button_frame, text="❌ Anuluj", command=dialog.destroy).pack(side=tk.LEFT, padx=5)
    
    # Helper methods
    def get_config_count(self):
        cursor = self.conn.cursor()
        cursor.execute("SELECT COUNT(*) FROM bot_config")
        return cursor.fetchone()[0]
    
    def get_products_count(self):
        cursor = self.conn.cursor()
        cursor.execute("SELECT COUNT(*) FROM products")
        return cursor.fetchone()[0]
    
    def get_coupons_count(self):
        cursor = self.conn.cursor()
        cursor.execute("SELECT COUNT(*) FROM coupons WHERE active=1")
        return cursor.fetchone()[0]
    
    def add_log(self, source, message):
        """Add log entry"""
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        log_entry = f"[{timestamp}] [{source}] {message}\n"
        
        self.logs_text.insert(tk.END, log_entry)
        if self.auto_scroll.get():
            self.logs_text.see(tk.END)
    
    # Placeholder methods for other functionality
    def delete_config(self): pass
    def save_config(self): pass
    def import_config(self): pass
    def export_config(self): pass
    def filter_config(self, event=None): pass
    
    def load_products_data(self): pass
    def add_product(self): pass
    def edit_product(self): pass
    def delete_product(self): pass
    def toggle_product_active(self): pass
    def filter_products(self, event=None): pass
    
    def load_coupons_data(self): pass
    def quick_add_coupon(self): pass
    def edit_coupon(self): pass
    def delete_coupon(self): pass
    def toggle_coupon_active(self): pass
    def show_coupon_stats(self): pass
    def filter_coupons(self, event=None): pass
    
    def load_permissions_data(self): pass
    def add_user_permission(self): pass
    def edit_user_permission(self): pass
    def delete_user_permission(self): pass
    def filter_permissions(self, event=None): pass
    
    def refresh_logs(self): pass
    def clear_logs(self): pass
    def save_logs(self): pass

def main():
    root = tk.Tk()
    app = BotManagerGUI(root)
    root.mainloop()

if __name__ == "__main__":
    main()