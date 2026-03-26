import re
import sys

with open('script.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Try to automatically reverse the mojibake (double-encoded UTF-8)
# The text was originally UTF-8, then read as cp1252 and written as UTF-8.
def fix_mojibake(match):
    text = match.group(0)
    try:
        # Reverse the double encoding
        fixed = text.encode('windows-1252').decode('utf-8')
        # Replace emojis with simple english or remove them
        fixed = fixed.replace('📊 ', '[Chart] ')
        fixed = fixed.replace('📈 ', '[Graph] ')
        fixed = fixed.replace('🧠 ', '[AI] ')
        fixed = fixed.replace('📋 ', '[Log] ')
        fixed = fixed.replace('🔔 ', '[Alert] ')
        fixed = fixed.replace('👥 ', '[Team] ')
        fixed = fixed.replace('⚡ ', '[Live] ')
        fixed = fixed.replace('📤 ', '[Export] ')
        fixed = fixed.replace('🔒 ', '[Secure] ')
        fixed = fixed.replace('🔴 ', '[High Risk] ')
        fixed = fixed.replace('🟡 ', '[Medium Risk] ')
        fixed = fixed.replace('🟢 ', '[Low Risk] ')
        fixed = fixed.replace('⚠️ ', '[Warning] ')
        
        # In case the dash is there
        fixed = fixed.replace('—', '-')
        return fixed
    except Exception as e:
        return text

# We can find the span and h2 to be safe, or just do a global replace on garbled chars
# Let's try to just find words with the A-tilde and other weird chars.
# "Ã" is \xc3. Basically any sequence of characters from the windows-1252 range that form valid UTF-8.
# An easier way is just to convert the whole file, but there might be valid non-ascii that gets broken.
# Since it's only script.js and the only non-ascii before were the emojis, let's try converting the whole file, ignoring errors.

try:
    # Get all chars that are mojibake
    def decode_all(text):
        res = ""
        i = 0
        while i < len(text):
            # Find a sequence of "Ã" or other latin-1 chars that look like UTF-8
            if text[i] in ['Ã', 'Å', 'â', 'œ', '”', '“', '‘', '’', 'Ë', 'Â', '§', '°', '±', '´', '¶', '¸', '¼', '½', '¾', '¿', '×', '÷', '¢', '£', '¤', '¥', '¦', '¨', '©', 'ª', '«', '¬', '®', '¯', 'µ', '¡', '»', '¿', 'À', 'Á', 'Â', 'Ä', 'Å', 'Æ', 'Ç', 'È', 'É', 'Ê', 'Ë', 'Ì', 'Í', 'Î', 'Ï', 'Ð', 'Ñ', 'Ò', 'Ó', 'Ô', 'Õ', 'Ö', 'Ø', 'Ù', 'Ú', 'Û', 'Ü', 'Ý', 'Þ', 'ß']:
                # capture a chunk of them
                start = i
                while i < len(text) and ord(text[i]) > 127: # roughly
                    i += 1
                chunk = text[start:i]
                try:
                    fixed = chunk.encode('windows-1252').decode('utf-8')
                    res += fixed
                except:
                    res += chunk
            else:
                res += text[i]
                i += 1
        return res

    content = decode_all(content)
except Exception as e:
    print("Failed to auto-decode:", e)

# Hard Fallback: regex replacements for known garbled text in the file
reps = {
    'Ã°Å¸â€œÅ\xa0': '[Chart]',
    'Ã°Å¸â€œÅ': '[Chart]',
    'Ã°Å¸â€œË†': '[Graph]',
    'Ã°Å¸Â§Â': '[AI]',
    'Ã°Å¸â€œâ€': '[Log]',
    'Ã°Å¸â€\x8dâ€': '[Alert]',
    'Ã°Å¸â€˜Â¥': '[Team]',
    'Ã¢Å¡Â¡': '[Live]',
    'Ã°Å¸â€œÂ¤': '[Export]',
    'Ã¢â‚¬â€': '-',
    'Ã°Å¸â€œÅ\xa0 SMART ANALYTICS': '[Chart] SMART ANALYTICS',
    'Ã°Å¸â€œË† VISUAL INSIGHTS': '[Graph] VISUAL INSIGHTS',
    'Ã°Å¸Â§Â AI CONFIDENCE': '[AI] AI CONFIDENCE',
    'Ã°Å¸â€œâ€ SCAN LOGS': '[Log] SCAN LOGS',
    'Ã°Å¸â€â€ SMART RECS': '[Alert] SMART RECS',
    'Ã°Å¸â€˜Â¥ MULTI-USER': '[Team] MULTI-USER',
    'Ã¢Å¡Â¡ LIVE FEED': '[Live] LIVE FEED',
    'Ã°Å¸â€œÂ¤ EXPORT & AUDITS': '[Export] EXPORT & AUDITS',
    'Ã¢Å¡Â ': '[Warning]',
    'Ã°Å¸â€\x94â€': '[Alert]', # alternate Smart Recs
    'Ã°Å¸â€œâ€¡': '[Log]',
}
for k, v in reps.items():
    content = content.replace(k, v)

# Final cleanup of remaining emojis with simple text as requested
content = content.replace('📊', '[Chart]')
content = content.replace('📈', '[Graph]')
content = content.replace('🧠', '[AI]')
content = content.replace('📋', '[Log]')
content = content.replace('🔔', '[Alert]')
content = content.replace('👥', '[Team]')
content = content.replace('⚡', '[Live]')
content = content.replace('📤', '[Export]')
content = content.replace('🔒', '[Secure]')
content = content.replace('🔴', '[High Risk]')
content = content.replace('🟡', '[Medium Risk]')
content = content.replace('🟢', '[Low Risk]')
content = content.replace('⚠️', '[Warning]')
content = content.replace('—', '-')

with open('script.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed garbled text in script.js")
