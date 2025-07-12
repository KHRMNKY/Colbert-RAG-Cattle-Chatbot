from googlesearch import search
import requests
import os
import re
import json


def take_titles():
    with open('./collect_data/tittle.json', 'r') as file:
        data = json.load(file)
    list_titles = []
    for value in data['cattle_datasets']:
        titles = [title for title in value['titles']]
        list_titles.append(titles)
    return list_titles
    


def sanitize_filename(filename):
    return re.sub(r'[\\/*?:"<>|]', "", filename)

def search_and_download_pdf(search_term, download_count=1):
    try:
        search_query = f"{search_term} filetype:pdf"
        print(f"Searching for PDF files for '{search_term}'...")
        
        # Add User-Agent header (to prevent bot blocking)
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
        }
        
        for url in search(search_query, num_results=download_count):
            try:
                print(f"Downloading: {url}")
                
                response = requests.get(url, headers=headers, timeout=10)
                
                if 'application/pdf' not in response.headers.get('Content-Type', ''):
                    print("Error: URL is not a PDF file!")
                    continue
                
                filename = url.split('/')[-1].split("?")[0]  # Remove query parameters
                if not filename.endswith('.pdf'):
                    filename += '.pdf'
                filename = sanitize_filename(filename)
                
                counter = 1
                original_name = filename
                while os.path.exists(filename):
                    filename = f"{original_name.split('.')[0]}_{counter}.pdf"
                    counter += 1
                
                with open("./data/"+filename, 'wb') as f:
                    f.write(response.content)
                print(f"Successfully downloaded: {filename}\n")
                
            except requests.exceptions.Timeout:
                print("Error: Server did not respond (timeout)!")
            except Exception as e:
                print(f"Download error: {str(e)}")
                
    except Exception as e:
        print(f"Search error: {str(e)}")

if __name__ == "__main__":
    list_titles = take_titles()
    for list in list_titles:
        for title in list:
            search_and_download_pdf(title, 4)