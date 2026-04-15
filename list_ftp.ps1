$ftpUri = "ftp://property-finder.co.za/Preview/"
$username = "charl@property-finder.co.za"
$password = "Texas@450"

$ftpRequest = [System.Net.FtpWebRequest]::Create($ftpUri)
$ftpRequest.Method = [System.Net.WebRequestMethods+Ftp]::ListDirectory
$ftpRequest.Credentials = New-Object System.Net.NetworkCredential($username, $password)

try {
    $ftpResponse = $ftpRequest.GetResponse()
    $responseStream = $ftpResponse.GetResponseStream()
    $reader = New-Object System.IO.StreamReader($responseStream)
    $files = $reader.ReadToEnd()
    $reader.Close()
    $ftpResponse.Close()
    Write-Host "Files in directory:"
    Write-Host $files
} catch {
    Write-Host "Error: $($_.Exception.Message)"
}