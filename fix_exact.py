import io

with open('script.js', 'r', encoding='utf-8') as f:
    text = f.read()

reps = {
    'ðŸ“Š': '[Chart]',
    'ðŸ“ˆ': '[Graph]',
    'ðŸ§ ': '[AI]',
    'ðŸ“‹': '[Log]',
    'ðŸ””': '[Alert]',
    'ðŸ‘¥': '[Team]',
    'âš¡': '[Live]',
    'ðŸ“¤': '[Export]',
    'âš ': '[Warning]',
    'ðŸ“‡': '[Log]',
    'ðŸ”’': '[Secure]'
}

for k, v in reps.items():
    text = text.replace(k, v)

with open('script.js', 'w', encoding='utf-8') as f:
    f.write(text)

print("Applied strict replacements")
