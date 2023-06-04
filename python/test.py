
import json


words = []
with open('/Users/rohan_v/Documents/Projects/hangman/input.txt') as f:
    for line in f.readlines():
        words.append(line.lower()[:-1])


with open("/Users/rohan_v/Documents/Projects/hangman/output.json", "w") as outfile:
    json.dump(words, outfile)
