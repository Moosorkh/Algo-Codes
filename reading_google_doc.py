import requests
from bs4 import BeautifulSoup

# This script fetches a published Google Doc containing a grid representation of a game board
def parse_published_google_doc(url: str):
    response = requests.get(url)
    response.raise_for_status()
    
    # Parse the HTML content of the document
    soup = BeautifulSoup(response.text, 'html.parser')
    # Find all tables in the document
    tables = soup.find_all('table')
    
    # Extract the grid data from the tables
    grid = {}
    for table in tables:
        for row in table.find_all('tr'):
            cells = [cell.get_text(strip=True) for cell in row.find_all(['td', 'th'])]
            # Each cell should contain "x char y" format
            try:
                x, char, y = int(cells[0]), cells[1], int(cells[2])
                grid[(x, y)] = char
            except (ValueError, IndexError):
                continue
    # Print the grid in a readable format
    if not grid:
        return
    
    # Find the maximum x and y values to determine the grid size
    max_x = max(x for x, y in grid.keys())
    max_y = max(y for x, y in grid.keys())
    
  
    for y in range(max_y, -1, -1):
        line = ''
        for x in range(max_x + 1):
            line += grid.get((x, y), ' ')
        print(line)
        
# Example usage        
parse_published_google_doc("https://docs.google.com/document/d/e/2PACX-1vQGUck9HIFCyezsrBSnmENk5ieJuYwpt7YHYEzeNJkIb9OSDdx-ov2nRNReKQyey-cwJOoEKUhLmN9z/pub")
