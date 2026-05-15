import threading
import webbrowser
import time
import os
import sys
import tkinter as tk
from tkinter import messagebox

def get_base_dir():
    if getattr(sys, 'frozen', False):
        return os.path.dirname(sys.executable)
    return os.path.dirname(os.path.abspath(__file__))

BASE_DIR = get_base_dir()
HOST = "127.0.0.1"
PORT = 8000
URL = f"http://{HOST}:{PORT}"

def start_server():
    from app import app
    import uvicorn
    uvicorn.run(app, host=HOST, port=PORT, log_level="warning")

def wait_for_server(timeout=10):
    import socket
    start = time.time()
    while time.time() - start < timeout:
        try:
            with socket.create_connection((HOST, PORT), timeout=0.5):
                return True
        except OSError:
            time.sleep(0.1)
    return False

def open_browser():
    webbrowser.open(URL)

def make_tray_window():
    root = tk.Tk()
    root.title("Система учёта абитуриентов")
    root.geometry("320x140")
    root.resizable(False, False)
    root.configure(bg="#f0f2f5")

    root.update_idletasks()
    sw = root.winfo_screenwidth()
    sh = root.winfo_screenheight()
    x = (sw - 320) // 2
    y = (sh - 140) // 2
    root.geometry(f"320x140+{x}+{y}")

    tk.Label(root, text="Система учёта абитуриентов",
             font=("Segoe UI", 12, "bold"), bg="#f0f2f5", fg="#1a1d23").pack(pady=(18, 4))
    tk.Label(root, text=f"Сервер запущен: {URL}",
             font=("Segoe UI", 9), bg="#f0f2f5", fg="#6b7280").pack()

    btn_frame = tk.Frame(root, bg="#f0f2f5")
    btn_frame.pack(pady=14)

    open_btn = tk.Button(btn_frame, text="Открыть в браузере",
                         font=("Segoe UI", 9), bg="#2563eb", fg="white",
                         relief="flat", padx=12, pady=5, cursor="hand2",
                         command=open_browser)
    open_btn.pack(side="left", padx=6)

    stop_btn = tk.Button(btn_frame, text="Остановить",
                         font=("Segoe UI", 9), bg="#ffffff", fg="#dc2626",
                         relief="flat", padx=12, pady=5, cursor="hand2",
                         command=root.destroy)
    stop_btn.pack(side="left", padx=6)

    def on_close():
        if messagebox.askokcancel("Выход", "Остановить сервер и закрыть приложение?"):
            root.destroy()

    root.protocol("WM_DELETE_WINDOW", on_close)
    return root

if __name__ == "__main__":
    server_thread = threading.Thread(target=start_server, daemon=True)
    server_thread.start()

    if not wait_for_server():
        print("Не удалось запустить сервер")
        sys.exit(1)

    threading.Thread(target=open_browser, daemon=True).start()

    root = make_tray_window()
    root.mainloop()
