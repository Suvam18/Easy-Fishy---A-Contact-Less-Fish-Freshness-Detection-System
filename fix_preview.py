with open('script.js', 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace('Ã°Å¸â€œÂ  Preview:', '[File] Preview:')
text = text.replace('Â·', '-')

with open('script.js', 'w', encoding='utf-8') as f:
    f.write(text)

print('Fixed Export preview text')
