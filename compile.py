from bs4 import BeautifulSoup
import os
import re

HTML_SRC_LOCATION = "./SRC"
CSS_SRC_LOCATION = "./SRC"

#Parse HTML file and insert included HTML files

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
            newFilepath = os.path.join("./", root[len(HTML_SRC_LOCATION)+1:], filename)
            print("New filepath: {}".format(newFilepath))
            with open(newFilepath, 'wb') as nf:
                nf.write(parsedHTML)
                
#Find and parse CSS Files, insert those
 
def ParseCSS(root, filename):
    file_path = os.path.join(root, filename)
    css = ""
    
    #open and read the css file
    with open(file_path, 'rb') as f:
        css = f.read().decode('utf-8')
    print("Opened file and read text")
    
    #look for import declarations
    split_lines = css.split("\n")
    for ln in range(len(split_lines)):
        if("@import" in split_lines[ln]):
            url = re.search('"([^"]*)"', split_lines[ln])
            includefilepath = ""
            print("Include path: {}".format(url))
            #relative to the html file
            if(url.startswith(".")):
                print("Relative to file")
                includefilepath = os.path.join(root, url)
            else:   
                #else relative to root / 
                print("Relative to root")
                includefilepath = os.path.join(url)
            print("\tInclude filepath: {}".format(includefilepath))
            replacementText = ""
            with open(includefilepath, 'rb') as incf:
                replacementText = incf.read()                    
            split_lines[ln] = replacementText
    return '\n'.join(split_lines).encode('utf-8')
    
for root, subdirs, files in os.walk(CSS_SRC_LOCATION):
    if '.git' in subdirs:
        subdirs.remove('.git')
    for filename in files:
        if(filename.endswith(".css")):
            print("Found css file: {} {}".format(root, filename))
            parsedCSS = ParseCSS(root, filename)
            newFilepath = os.path.join(".\\", root[len(CSS_SRC_LOCATION)+1:], filename)
            print("New filepath: {}".format(newFilepath))
            with open(newFilepath, 'wb') as nf:
                nf.write(parsedCSS)