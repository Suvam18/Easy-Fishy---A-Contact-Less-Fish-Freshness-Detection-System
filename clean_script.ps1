$lines = Get-Content "script.js"
$total = $lines.Count
Write-Host "Total lines before: $total"

# Keep lines 0..1283 (0-indexed), then the wire-up comment, then lines 1511..end
$keep = $lines[0..1283] + '    // Wire up roadmap card clicks' + $lines[1511..($total - 1)]

Set-Content -Path "script.js" -Value $keep -Encoding UTF8
Write-Host "Total lines after: $($keep.Count)"
