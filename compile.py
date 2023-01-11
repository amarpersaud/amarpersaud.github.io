from bs4 import BeautifulSoup
import os

HTML_SRC_LOCATION = "./HTML_SRC"

def ParseHTML(root, filename):
    file_path = os.path.join(root, filename)
    html = "<html><body><include href=\"/nav.html\"/></body></html>"
    
    #open and read the html file
    with open(file_path, 'rb') as f:
        html = f.read()
    
    print("Opened file and read text")
    
    #make soup
    soup = BeautifulSoup(html, "html.parser")
    
    #Find all included html files
    includes = soup.find_all('include')
    
    print("Number of include tags: {}".format(len(includes)))
    
    for inc in includes:
        href = inc['href'] #get target file to insert
        includefilepath = ""
        
        print("Include href: {}".format(href))
        
        #relative to the html file
        if(href.startswith(".")):
            print("Relative to file")
            includefilepath = os.path.join(root, href)
        else:   
            #else relative to root / 
            print("Relative to root")
            includefilepath = os.path.join(href)
        
        print("\tInclude filepath: {}".format(includefilepath))
        
        replacementText = ""
        with open(includefilepath, 'rb') as incf:
            replacementText = incf.read()
            
        inc.replace_with(BeautifulSoup(replacementText, "html.parser"))
    
    return soup.prettify().encode('utf-8')
    
for root, subdirs, files in os.walk(HTML_SRC_LOCATION):
    if '.git' in subdirs:
        subdirs.remove('.git')

    for filename in files:
        if(filename.endswith(".html")):
            print("Found html file: {} {}".format(root, filename))
            parsedHTML = ParseHTML(root, filename)
            newFilepath = os.path.join("./", root[len(HTML_SRC_LOCATION):], filename)
            print("New filepath: {}".format(newFilepath))
            with open(newFilepath, 'wb') as nf:
                nf.write(parsedHTML)
            

    