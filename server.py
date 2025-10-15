#!/usr/bin/env python3
"""
Simple HTTP server for Justin Kombe Tonguino's portfolio website
Run this script to serve the website locally
"""

import http.server
import socketserver
import os
import sys
from pathlib import Path

# Configuration
PORT = 3000
HOST = 'localhost'

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Add CORS headers for local development
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()
    
    def guess_type(self, path):
        """Override to handle .webp files correctly"""
        mimetype, encoding = super().guess_type(path)
        if path.endswith('.webp'):
            return 'image/webp'
        return mimetype

def main():
    # Change to the directory containing this script
    script_dir = Path(__file__).parent
    os.chdir(script_dir)
    
    # Create server
    with socketserver.TCPServer((HOST, PORT), CustomHTTPRequestHandler) as httpd:
        print(f"🚀 Server running at http://{HOST}:{PORT}")
        print(f"📁 Serving files from: {script_dir}")
        print("🛑 Press Ctrl+C to stop the server")
        print("-" * 50)
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n🛑 Server stopped by user")
            sys.exit(0)

if __name__ == "__main__":
    main()

