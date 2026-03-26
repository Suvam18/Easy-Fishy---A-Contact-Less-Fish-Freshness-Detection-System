# Inject window.__rfUid = uid; after each "const uid = ..." line in render() functions
$content = Get-Content 'script.js' -Raw

# After each "const uid = '...' + Date.now();" line, add the uid storage
$content = $content -replace "(const uid = '[a-z]+' \+ Date\.now\(\);)", "`$1`r`n                window.__rfUid = uid;"

Set-Content -Path 'script.js' -Value $content -Encoding UTF8 -NoNewline
Write-Host "Done: injected window.__rfUid into render functions"
