from csscompressor import compress
import os
from jsmin import jsmin

class cd:
  """Context manager for changing the current working directory"""
  def __init__(self, newPath):
    self.newPath = os.path.expanduser(newPath)
  def __enter__(self):
    self.savedPath = os.getcwd()
    os.chdir(self.newPath)
  def __exit__(self, etype, value, traceback):
    os.chdir(self.savedPath)

with cd("css"):
  x=[]
  for file in os.listdir("./"):
    if file.endswith(".css") & (".min." not in file):
      x.append(file);
      print("- " + file)
  print ""
  for s in x:
    g = open(s, 'r')
    f = g.read()
    d = compress(f)
    a = open(s[:s.rfind(".css")] + ".min.css", 'w')
    a.write(d)
    print("Succeeded in compressing: " + s)
print ""
with cd("css/theme"):
  x=[]
  for file in os.listdir("./"):
    if file.endswith(".css") & (".min." not in file):
      x.append(file);
      print("- " + file)
  print ""
  for s in x:
    g = open(s, 'r')
    f = g.read()
    d = compress(f)
    a = open(s[:s.rfind(".css")] + ".min.css", 'w')
    a.write(d)
    print("Succeeded in compressing: " + s)
print ""
with cd("js"):
  x=[]
  for file in os.listdir("./"):
    if file.endswith(".js") & (".min." not in file):
      x.append(file);
      print("- " + file)
  print ""
  for s in x:
    g = open(s, 'r')
    f = g.read()
    d = jsmin(f)
    a = open(s[:s.rfind(".js")] + ".min.js", 'w')
    a.write(d)
    print("Succeeded in compressing: " + s)
p = raw_input()