from csscompressor import compress
import os
x=[]
for file in os.listdir("./"):
    if file.endswith(".css") & (".min." not in file):
        x.append(file);
        print(file)
for s in x:
    g = open(s, 'r')
    f = g.read()
    d = compress(f)
    a = open(s[:s.rfind(".css")] + ".min.css", 'w')
    a.write(d)
    print("Succeeded in compressing: " + s)
p = raw_input()