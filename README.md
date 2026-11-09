## PRA3006-Jess_2026
Author: 
Jessica Abraham 

Contact:
j.abraham@student.maastrichtuniversity.nl

Description 
This is a website design project for Programming in the life scienes PRA3006 

1. Research Question:
Which genes and biological pathways are shared between breast cancer and ovarian cancer, and which are unique to each?

2. SPARQL endpoint 
endpoint used : WikiData Query Service 
url: https://query.wikidata.org/

Properties used 
P2293 : genetic association 
P572 : has parts ( pathway -> gene )
P729 : subclass of (disease types)

3. Methods 
Defining the diseases 
- Wikidata spreads disease-gene links across near synonym items eg BRAC1 is linked to "breast carcinoma" and "ovarian neoplasm" not to "breast cancer" and "ovarian cancer".
So each cancer is defined as a group of items :
- Breast group: "breast cancer", "breast carcinoma"
- Ovarian group: "ovarian cancer", "ovarian neoplasm", "ovarian carcinoma"

Excluded: hereditary syndromes ( hereditary breast ovarian cancer , BRCA1 hereditary breast and ovarian cancer syndrome)

4. Current findings 
Breast cancer group total = 43 genes 
Ovarian cancer group total = 20 genes 
shared = 6 genes 
- Only breast = 37
- only ovarian = 14 

6 shared genes fall into two areas 
- DNA repair 
- Growth signalling 