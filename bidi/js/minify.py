from jsmin import jsmin
import os
x=[]
for file in os.listdir("./"):
    if file.endswith(".js") & (".min." not in file):
        x.append(file);
        print(file)
for s in x:
    g = open(s, 'r')
    f = g.read()
    d = jsmin(f)
    a = open(s[:s.rfind(".js")] + ".min.js", 'w')
    a.write(d)
    print("Succeeded in compressing: " + s)
p = raw_input()