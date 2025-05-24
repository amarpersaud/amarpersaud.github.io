import http.server
import socketserver
import os

#Move up a directory
os.chdir("../")

PORT = 8000

print("Serving at port {}".format(PORT))

Handler = http.server.SimpleHTTPRequestHandler
 
with socketserver.TCPServer(("", PORT), Handler) as httpd:
    httpd.serve_forever()