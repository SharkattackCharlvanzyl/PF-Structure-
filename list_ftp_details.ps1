param(
    [string]$path = "/"
)

$ftpUri = "ftp://property-finder.co.za$path"
$username = "charl@property-finder.co.za"
$password = "Texas@450"

$ftpRequest = [System.Net.FtpWebRequest]::Create($ftpUri)
$ftpRequest.Method = [System.Net.WebRequestMethods+Ftp]::ListDirectoryDetails
$ftpRequest.Credentials = New-Object System.Net.NetworkCredential($username, $password)

try {
    $ftpResponse = $ftpRequest.GetResponse()
    $responseStream = $ftpResponse.GetResponseStream()
    $reader = New-Object System.IO.StreamReader($responseStream)
    $lines = $reader.ReadToEnd()
    $reader.Close()
    $ftpResponse.Close()
    Write-Host "Details for ${path}:"
    Write-Host $lines
} catch {
    Write-Host "Error: $($_.Exception.Message)"
}