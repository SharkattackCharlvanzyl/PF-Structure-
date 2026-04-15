$root = & .\list_ftp_html.ps1 -path '/'
$rootLines = $root -split '\r?\n' | Where-Object { $_ -ne '' }
$preview = & .\list_ftp_html.ps1 -path '/Preview/'
$previewLines = $preview -split '\r?\n' | Where-Object { $_ -ne '' }
Write-Host "Root HTML count: $($rootLines.Count)"
Write-Host "Preview HTML count: $($previewLines.Count)"
Write-Host "Root files:"
$rootLines
Write-Host "Preview files:"
$previewLines
