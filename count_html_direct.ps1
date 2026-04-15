param(
    [string]$path = "/"
)

$ftpUri = "ftp://property-finder.co.za$path"
$username = "charl@property-finder.co.za"
$password = "Texas@450"

$ftpRequest = [System.Net.FtpWebRequest]::Create($ftpUri)
$ftpRequest.Method = [System.Net.WebRequestMethods+Ftp]::ListDirectory
$ftpRequest.Credentials = New-Object System.Net.NetworkCredential($username, $password)

try {
    $ftpResponse = $ftpRequest.GetResponse()
    $reader = New-Object System.IO.StreamReader($ftpResponse.GetResponseStream())
    $files = $reader.ReadToEnd() -split '\r?\n' | Where-Object { $_ -ne '' }
    $reader.Close()
    $ftpResponse.Close()
    $htmlFiles = $files | Where-Object { $_ -match '\.html$' }
    Write-Host $htmlFiles.Count
    $htmlFiles | ForEach-Object { Write-Host $_ }
} catch {
    Write-Host "Error: $($_.Exception.Message)"
}