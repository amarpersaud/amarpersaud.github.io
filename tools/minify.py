from csscompressor import compress
import os
from jsmin import jsmin

dirsToCheck = ["./css", "./js", "./fonts"]

#Move up a directory
os.chdir("../")

def checkDir(direct):
    for root, subdirs, files in os.walk(direct):
        if '.git' in subdirs:
            subdirs.remove('.git')
        for filename in files:
            if(filename.endswith(".css") & (".min." not in filename)):
                cssfpath = os.path.join(root, filename)
                g = open(cssfpath, 'r')
                f = g.read()
                d = compress(f)
                with open(os.path.join(root, filename[:filename.rfind(".css")] + ".min.css"), 'w') as a:
                    a.write(d)
                print("Succeeded in compressing: " + filename)
            elif (filename.endswith(".js") & (".min." not in filename)):
                cssfpath = os.path.join(root, filename)
                g = open(cssfpath, 'r')
                f = g.read()
                d = jsmin(f)
                with open(os.path.join(root, filename[:filename.rfind(".js")] + ".min.js"), 'w') as a:
                    a.write(d)
                print("Succeeded in compressing: " + filename)
                
for d in dirsToCheck:
    checkDir(d)