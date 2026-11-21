"""Build public-only film cast credits and title identifiers from attributed datasets."""
import ast
import csv
import gzip
from io import TextIOWrapper
import json
from pathlib import Path
import re
import sys
from zipfile import ZipFile
from pack import rows

movies, credits, destination = map(Path, sys.argv[1:])
index = {}
for row in rows(movies):
    ident = row['imdb_id']
    if re.fullmatch(r'tt\d{7,11}', ident) and row['adult'].lower()!='true' and float(row['vote_count'] or 0)>0:
        index[ident] = int(row['id'])

people = {}
with ZipFile(credits) as source, TextIOWrapper(source.open('credits.csv'), encoding='utf-8', newline='') as stream:
    for row in csv.DictReader(stream):
        if not row['id'].isdigit() or not row['cast']:
            continue
        for actor in ast.literal_eval(row['cast']):
            ident = actor.get('id')
            name = actor.get('name')
            if ident and name:
                people.setdefault(ident, [name, set()])[1].add(int(row['id']))

destination.mkdir(parents=True, exist_ok=True)
with gzip.open(destination/'movie-search-v1.part', 'wt', encoding='utf-8') as stream:
    json.dump(index, stream, separators=(',', ':'))
with gzip.open(destination/'cast-search-v1.part', 'wt', encoding='utf-8') as stream:
    json.dump([[name, sorted(titles)] for name,titles in people.values()], stream, ensure_ascii=False, separators=(',', ':'))
print(len(index), 'film identifiers and', len(people), 'cast profiles')
